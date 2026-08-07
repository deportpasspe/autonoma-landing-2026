/**
 * Convierte los exports crudos de Figma (public/assets/figma/img_autonoma landing_Arequipa)
 * a las rutas finales que consume el sitio (public/assets/figma/arequipa/**).
 *
 * Los PNG se reencodean a WebP; los SVG se copian tal cual con el nombre final.
 * Ejecutar tras subir un nuevo lote de exports: npm run assets -w apps/landing-arequipa
 */
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(root, "public/assets/figma/img_autonoma landing_Arequipa");
const OUT = path.join(root, "public/assets/figma/arequipa");

/** [origen relativo a SRC, destino relativo a OUT] */
const MAP = [
  ["header/imagen-principal.png", "hero/hero-cover.webp"],

  ["Oferta Académica/pregrado.png", "oferta/pregrado.webp"],
  ["Oferta Académica/posgrado.png", "oferta/posgrado.webp"],

  ["cifras/Landings Ministe Autónoma (1)/ico-experiencias.svg", "icons/stat-1.svg"],
  ["cifras/Landings Ministe Autónoma (1)/ico-egresados.svg", "icons/stat-2.svg"],
  ["cifras/Landings Ministe Autónoma (1)/ico-empleabilidad.svg", "icons/stat-3.svg"],
  ["cifras/Landings Ministe Autónoma (1)/ico-convenios.svg", "icons/stat-4.svg"],

  ["oficina arequipa/foto principal.png", "oficina/atencion.webp"],
  ["oficina arequipa/foto principal.png", "oficina/oficina.webp"],
  ["oficina arequipa/fotos/admision.png", "oficina/admision.webp"],
  ["oficina arequipa/fotos/espacios.png", "oficina/espacios.webp"],
  ["oficina arequipa/fotos/comunidad.png", "oficina/comunidad.webp"],
  ["oficina arequipa/iconos/ICONSInfra Asesoría 3.svg", "icons/atencion.svg"],
  ["oficina arequipa/iconos/ICONSInfra Admisión 3.svg", "icons/admision.svg"],
  ["oficina arequipa/iconos/ICONSInfra Espacios 3.svg", "icons/espacios.svg"],
  ["oficina arequipa/iconos/ICONSInfra Comunidad 3.svg", "icons/comunidad.svg"],

  ["porque estudiar/porque-estudiar.png", "virtual/porque-estudiar.webp"],
  ["ubicacion/world university rankings.svg", "virtual/qs-rankings.svg"],

  ["ubicacion/ubicacion.png", "espacios/espacios.webp"],
  ["ubicacion/ubicacion.png", "espacios/overview.webp"],
  ["oficina arequipa/fotos/admision.png", "espacios/gerencial.webp"],
  ["oficina arequipa/fotos/espacios.png", "espacios/coworking.webp"],

  ["testimonios/tesimonio.png", "testimonios/testimonio-1.webp"],
  ["testimonios/tesimonio-2.png", "testimonios/testimonio-2.webp"],
  ["testimonios/tesimonio-3.png", "testimonios/testimonio-3.webp"],

  ["alianzas/logo-1.png", "aliados/logo-1.webp"],
  ["alianzas/logo-2.svg", "aliados/logo-2.svg"],
  ["alianzas/logo-3.svg", "aliados/logo-3.svg"],
  ["alianzas/logo-4.png", "aliados/logo-4.webp"],
  ["alianzas/logo-5.png", "aliados/logo-5.webp"],

  ["mapa/mapa.png", "contacto/mapa.webp"],

  ["blog/blog-destacado.png", "blog/destacado.webp"],
  ["blog/blog-2.png", "blog/blog-2.webp"],
  ["blog/blog-3.png", "blog/blog-3.webp"],
];

const missing = [];

for (const [from, to] of MAP) {
  const src = path.join(SRC, from);
  const dest = path.join(OUT, to);

  try {
    await fs.access(src);
  } catch {
    missing.push(from);
    continue;
  }

  await fs.mkdir(path.dirname(dest), { recursive: true });

  if (path.extname(dest) === ".svg") {
    await fs.copyFile(src, dest);
  } else {
    let pipeline = sharp(src);
    const meta = await pipeline.metadata();
    if ((meta.width ?? 0) > 1328) {
      pipeline = pipeline.resize({ width: 1328, withoutEnlargement: true });
    }
    await pipeline.webp({ quality: 82, effort: 6 }).toFile(dest);
  }

  const { size } = await fs.stat(dest);
  console.log(`${to.padEnd(34)} ${(size / 1024).toFixed(0)} KB`);
}

if (missing.length) {
  console.warn(`\nNo encontrados (${missing.length}):`);
  for (const m of missing) console.warn(`  - ${m}`);
  process.exitCode = 1;
}
