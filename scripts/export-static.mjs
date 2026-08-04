import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { basename, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const root = fileURLToPath(new URL("..", import.meta.url));
const distDir = join(root, "dist");
const exportRoot = join(root, "export");
const exportDir = join(exportRoot, "autonoma-landing");
const zipPath = join(exportRoot, "autonoma-landing.zip");

const FONT_NAME_MAP = {
  "bricolage-grotesque-latin-ext-wght-normal": "bricolage-latin-ext",
  "bricolage-grotesque-latin-wght-normal": "bricolage-latin",
  "bricolage-grotesque-vietnamese-wght-normal": "bricolage-vietnamese",
};

if (!existsSync(distDir)) {
  console.error("Missing dist/. Run `npm run build` first.");
  process.exit(1);
}

const indexPath = join(distDir, "index.html");
if (!existsSync(indexPath)) {
  console.error("Missing dist/index.html.");
  process.exit(1);
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
    const base = file.replace(/\.[A-Za-z0-9]+\.woff2$/, "");
    const clean = FONT_NAME_MAP[base] || base.replace(/-wght-normal$/, "");
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
  return match;
});
writeFileSync(join(cssDir, "styles.css"), css, "utf8");

const assetsSrc = join(distDir, "assets");
if (existsSync(assetsSrc)) {
  cpSync(assetsSrc, join(exportDir, "assets"), {
    recursive: true,
    filter: (src) => !basename(src).startsWith(".") && basename(src) !== ".DS_Store",
  });
}

for (const fav of ["favicon.svg", "favicon.ico"]) {
  const src = join(distDir, fav);
  if (existsSync(src)) cpSync(src, join(exportDir, fav));
}

let html = readFileSync(indexPath, "utf8");
const scripts = [];
html = html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (full, _attrs, body) => {
  const trimmed = body.trim();
  if (!trimmed) return full;
  scripts.push(trimmed);
  return "";
});

const mainJs = `${scripts.map((body) => `(() => {\n${body}\n})();\n`).join("\n")}`;
writeFileSync(join(jsDir, "main.js"), mainJs, "utf8");

html = html
  .replace(/<link\b[^>]*href=["']\/_astro\/[^"']+\.css["'][^>]*>\s*/gi, "")
  .replace(/<meta\b[^>]*name=["']generator["'][^>]*>\s*/gi, "")
  .replace(/(href|src|poster|content)=["']\/assets\//gi, '$1="assets/')
  .replace(/(href|src)=["']\/favicon\./gi, '$1="favicon.')
  .replace(/url\(\/assets\//g, "url(assets/")
  .replace(/href=["']\/["']/g, 'href="./"');

if (!/<link\b[^>]*href=["']css\/styles\.css["']/i.test(html)) {
  html = html.replace(
    /<\/head>/i,
    '  <link rel="stylesheet" href="css/styles.css">\n</head>',
  );
}

if (!/<script\b[^>]*src=["']js\/main\.js["']/i.test(html)) {
  html = html.replace(
    /<\/body>/i,
    '  <script defer src="js/main.js"></script>\n</body>',
  );
} else {
  html = html.replace(
    /<script\b[^>]*src=["']js\/main\.js["'][^>]*>\s*<\/script>/i,
    '<script defer src="js/main.js"></script>',
  );
}

html = prettyHtml(html);
writeFileSync(join(exportDir, "index.html"), html, "utf8");

const readme = `Landing Autónoma — export limpio (HTML / CSS / JS)
=================================================

Paquete estático listo para compartir y validar.
Misma apariencia que el deploy de Astro/Vercel.

Estructura
----------
  index.html
  css/styles.css
  js/main.js
  fonts/
  assets/figma/
  favicon.svg
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
console.log(`  js/main.js      (${mainJs.length} bytes, ${scripts.length} modules)`);
console.log(`  fonts/          (${fontMap.size / 2} files)`);
if (existsSync(zipPath)) {
  console.log(`Zip → ${relative(root, zipPath)}`);
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
