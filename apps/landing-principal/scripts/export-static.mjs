import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const root = fileURLToPath(new URL("..", import.meta.url));
const distDir = join(root, "dist");
const exportRoot = join(root, "export");
const exportDir = join(exportRoot, "autonoma-landing");
const zipPath = join(exportRoot, "autonoma-landing.zip");
const assetsSrc = join(distDir, "assets");
const assetsDest = join(exportDir, "assets");

/**
 * Routes to include in the handoff. The export is flat, so every route lands as
 * a sibling .html at the package root and site-absolute links are rewritten to
 * match (see rewriteLinks).
 */
const PAGES = [
  { dist: "index.html", out: "index.html", js: "js/main.js", route: "/" },
  { dist: join("gracias", "index.html"), out: "gracias.html", js: "js/gracias.js", route: "/gracias" },
];

const FONT_NAME_MAP = {
  "bricolage-grotesque-latin-ext-wght-normal": "bricolage-latin-ext",
  "bricolage-grotesque-latin-wght-normal": "bricolage-latin",
  "bricolage-grotesque-vietnamese-wght-normal": "bricolage-vietnamese",
  "bricolage-grotesque-latin-ext-standard-normal": "bricolage-latin-ext",
  "bricolage-grotesque-latin-standard-normal": "bricolage-latin",
  "bricolage-grotesque-vietnamese-standard-normal": "bricolage-vietnamese",
};

if (!existsSync(distDir)) {
  console.error("Missing dist/. Run `npm run build` first.");
  process.exit(1);
}

for (const page of PAGES) {
  if (!existsSync(join(distDir, page.dist))) {
    console.error(`Missing dist/${page.dist}.`);
    process.exit(1);
  }
}

rmSync(exportDir, { recursive: true, force: true });
rmSync(zipPath, { force: true });

const cssDir = join(exportDir, "css");
const jsDir = join(exportDir, "js");
const fontsDir = join(exportDir, "fonts");
mkdirSync(cssDir, { recursive: true });
mkdirSync(jsDir, { recursive: true });
mkdirSync(fontsDir, { recursive: true });

const astroDir = join(distDir, "_astro");
const fontMap = new Map();

if (existsSync(astroDir)) {
  for (const file of readdirSync(astroDir)) {
    if (!file.endsWith(".woff2")) continue;
    // Astro hashes may include hyphens, e.g. name.qp-RdZgh.woff2
    const base = file.replace(/\.[A-Za-z0-9_-]+\.woff2$/i, "").replace(/\.woff2$/i, "");
    const clean =
      FONT_NAME_MAP[base] ||
      base
        .replace(/^bricolage-grotesque-/, "bricolage-")
        .replace(/-(?:wght|standard)-normal$/, "");
    const destName = `${clean}.woff2`;
    cpSync(join(astroDir, file), join(fontsDir, destName));
    fontMap.set(file, destName);
    fontMap.set(`/_astro/${file}`, `../fonts/${destName}`);
  }
}

const cssFiles = existsSync(astroDir)
  ? readdirSync(astroDir).filter((f) => f.endsWith(".css"))
  : [];

if (cssFiles.length === 0) {
  console.error("No CSS files found in dist/_astro/.");
  process.exit(1);
}

let css = cssFiles.map((f) => readFileSync(join(astroDir, f), "utf8")).join("\n");
css = css.replace(/url\((['"]?)([^)'"]+)\1\)/g, (match, quote, rawUrl) => {
  const url = rawUrl.trim();
  const fileName = basename(url.split("?")[0]);
  if (fontMap.has(fileName)) {
    return `url(${quote || ""}../fonts/${fontMap.get(fileName)}${quote || ""})`;
  }
  if (fontMap.has(url)) {
    return `url(${quote || ""}${fontMap.get(url)}${quote || ""})`;
  }
  if (url.startsWith("/_astro/") && fileName.endsWith(".woff2")) {
    const mapped = fontMap.get(fileName);
    if (mapped) return `url(${quote || ""}../fonts/${mapped}${quote || ""})`;
  }
  // Absolute site assets → relative from css/
  if (url.startsWith("/assets/")) {
    return `url(${quote || ""}..${url}${quote || ""})`;
  }
  return match;
});
writeFileSync(join(cssDir, "styles.css"), css, "utf8");

for (const fav of ["favicon.png", "favicon.ico"]) {
  const src = join(distDir, fav);
  if (existsSync(src)) cpSync(src, join(exportDir, fav));
}

const report = [];

for (const page of PAGES) {
  let html = readFileSync(join(distDir, page.dist), "utf8");

  const scripts = [];
  html = html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (full, _attrs, body) => {
    const trimmed = body.trim();
    if (!trimmed) return full;
    scripts.push(trimmed);
    return "";
  });

  // Each route keeps its own bundle so page-specific scripts don't run elsewhere.
  const pageJs = scripts.map((body) => `(() => {\n${rewriteLinks(body)}\n})();\n`).join("\n");
  writeFileSync(join(exportDir, page.js), pageJs, "utf8");

  html = html
    .replace(/<link\b[^>]*href=["']\/_astro\/[^"']+\.css["'][^>]*>\s*/gi, "")
    .replace(/<meta\b[^>]*name=["']generator["'][^>]*>\s*/gi, "")
    .replace(/(href|src|srcset|poster|content)=["']\/assets\//gi, '$1="assets/')
    .replace(/(href|src)=["']\/favicon\./gi, '$1="favicon.')
    .replace(/url\(\/assets\//g, "url(assets/");

  html = rewriteLinks(html);

  if (!/<link\b[^>]*href=["']css\/styles\.css["']/i.test(html)) {
    html = html.replace(
      /<\/head>/i,
      '  <link rel="stylesheet" href="css/styles.css">\n</head>',
    );
  }

  const scriptTag = `<script defer src="${page.js}"></script>`;
  if (!new RegExp(`<script\\b[^>]*src=["']${page.js}["']`, "i").test(html)) {
    html = html.replace(/<\/body>/i, `  ${scriptTag}\n</body>`);
  } else {
    html = html.replace(
      new RegExp(`<script\\b[^>]*src=["']${page.js}["'][^>]*>\\s*</script>`, "i"),
      scriptTag,
    );
  }

  html = prettyHtml(html);
  writeFileSync(join(exportDir, page.out), html, "utf8");

  report.push({ out: page.out, js: page.js, bytes: pageJs.length, modules: scripts.length });
}

// Copy only assets referenced by the final HTML/CSS/JS handoff package.
const seedPaths = [
  ...PAGES.map((page) => join(exportDir, page.out)),
  join(cssDir, "styles.css"),
  ...PAGES.map((page) => join(exportDir, page.js)),
];
const usedAssets = collectAssetRefs(seedPaths);
const assetStats = copyUsedAssets(usedAssets);

const readme = `Landing Autónoma — export limpio (HTML / CSS / JS)
=================================================

Paquete estático listo para compartir y validar.
Misma apariencia que el deploy de Astro/Vercel.

Estructura
----------
  index.html      Landing principal
  gracias.html    Página de gracias (destino del formulario)
  css/styles.css
  js/main.js      Scripts de index.html
  js/gracias.js   Scripts de gracias.html
  fonts/
  assets/         Solo imágenes referenciadas por el frontend
  favicon.png
  favicon.ico

Cómo abrir
----------
Puedes abrir index.html con doble clic (file://).
CSS, JS e imágenes usan rutas relativas.

También puedes servirlo localmente:

  npx serve autonoma-landing

Regenerar
---------
En el repo del proyecto:

  npm run export:static
`;

writeFileSync(join(exportDir, "LEEME.txt"), readme, "utf8");

try {
  execFileSync(
    "zip",
    ["-r", "-q", zipPath, "autonoma-landing", "-x", "*.DS_Store", "-x", "**/.DS_Store"],
    {
      cwd: exportRoot,
      stdio: "inherit",
    },
  );
} catch (error) {
  console.warn("zip CLI unavailable; folder export created without .zip");
  console.warn(String(error));
}

console.log(`Clean export → ${relative(root, exportDir)}`);
console.log(`  css/styles.css  (${css.length} bytes)`);
for (const entry of report) {
  console.log(`  ${entry.out.padEnd(15)} → ${entry.js} (${entry.bytes} bytes, ${entry.modules} modules)`);
}
console.log(`  fonts/          (${fontMap.size / 2} files)`);
console.log(
  `  assets/         kept ${assetStats.keptCount} (${formatBytes(assetStats.keptBytes)}), pruned ${assetStats.prunedCount} (${formatBytes(assetStats.prunedBytes)})`,
);
if (existsSync(zipPath)) {
  console.log(`Zip → ${relative(root, zipPath)}`);
}

/**
 * Maps site-absolute routes onto the flat export filenames, in both markup
 * (href="/gracias") and inline JS (location.assign("/gracias")).
 */
function rewriteLinks(input) {
  let output = input;

  for (const page of PAGES) {
    if (page.route === "/") continue;
    const route = page.route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Quote class covers backticks: the JS minifier rewrites string literals as templates.
    output = output.replace(new RegExp("([\"'`])" + route + "/?(?=[\"'`#?])", "g"), `$1${page.out}`);
  }

  return output
    .replace(/(href=["'])\/(?=#)/g, "$1index.html")
    .replace(/href=["']\/["']/g, 'href="index.html"');
}

/**
 * Collect every local `assets/...` reference from the final handoff files.
 * Covers HTML attrs, CSS url(), and quoted JS strings (including backticks).
 */
function collectAssetRefs(paths) {
  const refs = new Set();

  for (const filePath of paths) {
    if (!existsSync(filePath)) continue;
    const text = readFileSync(filePath, "utf8");

    for (const match of text.matchAll(/\b(?:href|src|poster|content)=["']([^"']+)["']/gi)) {
      addAssetCandidate(refs, match[1]);
    }

    for (const match of text.matchAll(/\bsrcset=["']([^"']+)["']/gi)) {
      for (const candidate of match[1].split(",")) {
        addAssetCandidate(refs, candidate.trim().split(/\s+/)[0] || "");
      }
    }

    for (const match of text.matchAll(/url\(\s*(['"]?)([^)'"]+)\1\s*\)/gi)) {
      addAssetCandidate(refs, match[2]);
    }

    for (const match of text.matchAll(/["'`]((?:\.\.\/)?(?:\/)?assets\/[^"'`?#]+)/g)) {
      addAssetCandidate(refs, match[1]);
    }
  }

  return [...refs].sort();
}

function addAssetCandidate(refs, raw) {
  const normalized = normalizeAssetPath(raw);
  if (normalized) refs.add(normalized);
}

/**
 * Normalize a raw URL/path into a relative path under `assets/`.
 * Returns null for external, data, fragment, or non-asset refs.
 */
function normalizeAssetPath(raw) {
  if (!raw) return null;
  let value = raw.trim().replace(/\\/g, "/");
  if (!value) return null;
  if (/^(?:data:|https?:|\/\/|#|mailto:|tel:)/i.test(value)) return null;

  value = value.split(/[?#]/)[0];
  try {
    value = decodeURIComponent(value);
  } catch {
    // Keep the original path if decoding fails.
  }

  if (value.startsWith("/assets/")) value = value.slice(1);
  if (value.startsWith("../assets/")) value = value.slice(3);
  if (!value.startsWith("assets/")) return null;

  // Reject path traversal outside assets/
  const resolved = resolve(exportDir, value);
  const assetsRoot = resolve(assetsDest);
  if (resolved !== assetsRoot && !resolved.startsWith(assetsRoot + sep)) {
    console.error(`Unsafe asset path escaped assets/: ${raw}`);
    process.exit(1);
  }

  return value;
}

/**
 * Copy only referenced assets from dist/assets into the export package.
 * Aborts if a referenced file is missing.
 */
function copyUsedAssets(usedRelativePaths) {
  const allFiles = existsSync(assetsSrc) ? listFilesRecursive(assetsSrc) : [];
  const allRelative = allFiles.map((abs) => relative(distDir, abs).split(sep).join("/"));

  let keptBytes = 0;
  const kept = [];

  for (const rel of usedRelativePaths) {
    const src = join(distDir, rel);
    if (!existsSync(src) || !statSync(src).isFile()) {
      console.error(`Missing referenced asset: ${rel}`);
      process.exit(1);
    }
    const dest = join(exportDir, rel);
    mkdirSync(dirname(dest), { recursive: true });
    cpSync(src, dest);
    const size = statSync(src).size;
    keptBytes += size;
    kept.push(rel);
  }

  const keptSet = new Set(kept);
  const pruned = allRelative.filter((rel) => !keptSet.has(rel));
  let prunedBytes = 0;
  for (const rel of pruned) {
    prunedBytes += statSync(join(distDir, rel)).size;
  }

  // Sanity: every file under export/assets must be in the kept set.
  if (existsSync(assetsDest)) {
    const exported = listFilesRecursive(assetsDest).map((abs) =>
      relative(exportDir, abs).split(sep).join("/"),
    );
    const orphans = exported.filter((rel) => !keptSet.has(rel));
    if (orphans.length > 0) {
      console.error("Unexpected orphan assets in export:");
      for (const orphan of orphans) console.error(`  ${orphan}`);
      process.exit(1);
    }
  }

  return {
    keptCount: kept.length,
    keptBytes,
    prunedCount: pruned.length,
    prunedBytes,
    kept,
  };
}

function listFilesRecursive(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === ".DS_Store") continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFilesRecursive(full));
    else if (entry.isFile()) out.push(full);
  }
  return out;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Lightweight HTML pretty-printer for handoff readability.
 * Keeps script/style and void tags intact; does not parse as a full DOM.
 */
function prettyHtml(input) {
  const voidTags = new Set([
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
  ]);

  const tokens = input
    .replace(/>\s+</g, "><")
    .replace(/\n+/g, " ")
    .trim()
    .split(/(<[^>]+>)/)
    .filter((t) => t.length > 0);

  const lines = [];
  let indent = 0;

  for (const token of tokens) {
    if (!token.startsWith("<")) {
      const text = token.trim();
      if (text) lines.push(`${"  ".repeat(indent)}${text}`);
      continue;
    }

    const isComment = token.startsWith("<!--");
    const isDoctype = /^<!doctype/i.test(token);
    const isClosing = /^<\//.test(token);
    const isSelfClosing = /\/>$/.test(token) || isComment || isDoctype;
    const tagMatch = token.match(/^<\/?([a-zA-Z0-9-]+)/);
    const tag = tagMatch ? tagMatch[1].toLowerCase() : "";
    const isVoid = voidTags.has(tag);

    if (isClosing) indent = Math.max(0, indent - 1);
    lines.push(`${"  ".repeat(indent)}${token}`);
    if (!isClosing && !isSelfClosing && !isVoid) indent += 1;
  }

  return `${lines.join("\n")}\n`;
}
