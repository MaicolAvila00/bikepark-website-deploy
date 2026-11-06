/**
 * generar-og-placeholder.js — Genera app/opengraph-image.png (1200x630)
 * PNG 100% puro (Node + zlib, sin dependencias externas).
 *
 * Arte placeholder "Manifesto": cielo degradado en papel oscuro,
 * dos siluetas de montaña en tinta y luna acento rojo sobre una
 * banda inferior tipo "cinta de obra" (y >= H - 56, color [219,3,16]
 * al 100%, pintada por encima de las montañas) — alineado a la paleta de
 * tokens.css. Reemplazar por una foto/og real cuando lleguen
 * los assets definitivos (mismo tamaño 1200x630).
 *
 * Uso: node scripts/generar-og-placeholder.js
 */
const zlib = require('zlib'); // <-- built-in
const fs = require('fs');
const path = require('path');

const W = 1200;
const H = 630;

/* Conversión sRGB de los tokens OKLCH de styles/tokens.css (tema Manifesto). */
const cieloTop = [10, 7, 4];          // --papel oklch(13% 0.01 60) #0A0704
const cieloBottom = [19, 14, 11];     // --papel-2 oklch(17% 0.011 60) #130E0B
const montanaFondo = [147, 138, 130]; // --tinta-apagada oklch(64% 0.016 65) #938A82
const montanaFrente = [243, 238, 228];// --tinta oklch(95% 0.014 85) #F3EEE4
const luna = [219, 3, 16];            // --acento oklch(56% 0.228 28) #DB0310 (solo como bloque)

function lerp(a, b, t) {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

/* Solidez de polígono por ray-marching vertical (par/impar). */
function dentroPoligono(x, y, poligono) {
  let dentro = false;
  for (let i = 0, j = poligono.length - 1; i < poligono.length; j = i++) {
    const [xi, yi] = poligono[i];
    const [xj, yj] = poligono[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      dentro = !dentro;
    }
  }
  return dentro;
}

/* Siluetas de montaña (coordenadas en píxeles 1200x630) */
const montanasFondo = [
  [0, 630], [180, 340], [340, 470], [560, 250], [760, 440],
  [940, 330], [1200, 520], [1200, 630],
];
const montanasFrente = [
  [0, 630], [140, 470], [420, 330], [700, 520], [980, 380],
  [1200, 560], [1200, 630],
];

const buf = Buffer.alloc(H * (1 + W * 4));

let p = 0;
for (let y = 0; y < H; y++) {
  buf[p++] = 0; // filtro "None" por scanline
  const tCielo = y / (H - 1);
  for (let x = 0; x < W; x++) {
    let [r, g, b] = lerp(cieloTop, cieloBottom, tCielo * tCielo * 0.9 + tCielo * 0.1);

    // Luna (disco suave)
    const dx = x - 980;
    const dy = y - 120;
    const d = Math.sqrt(dx * dx + dy * dy);
    if (d < 44) {
      [r, g, b] = lerp([r, g, b], luna, 0.95);
    } else if (d < 52) {
      [r, g, b] = lerp([r, g, b], luna, (1 - (d - 44) / 8) * 0.35);
    }

    // Montañas (mezcla alta para que se lean sobre el fondo claro)
    if (dentroPoligono(x, y, montanasFondo)) {
      [r, g, b] = lerp([r, g, b], montanaFondo, 0.85);
    }
    if (dentroPoligono(x, y, montanasFrente)) {
      [r, g, b] = lerp([r, g, b], montanaFrente, 0.95);
    }

    // Banda inferior tipo "cinta de obra" (por encima de montañas)
    if (y >= H - 56) {
      [r, g, b] = luna; // --acento #DB0310, pintura de bloque
    }

    buf[p++] = r; buf[p++] = g; buf[p++] = b; buf[p++] = 255;
  }
}

/* ===== Codificación PNG (chunks / CR32) ===== */
const crcTable = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(data) {
  let crc = -1;
  for (let i = 0; i < data.length; i++) {
    crc = crcTable[(crc ^ data[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ -1) >>> 0;
}

function chunk(tipo, datos) {
  const largo = Buffer.alloc(4);
  largo.writeUInt32BE(datos.length, 0);
  const tipoBuf = Buffer.from(tipo, 'ascii');
  const contenido = Buffer.concat([tipoBuf, datos]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(contenido), 0);
  return Buffer.concat([largo, contenido, crc]);
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8;   // profundidad de bits
ihdr[9] = 6;   // colorType RGBA
ihdr[10] = 0;  // compresión deflate
ihdr[11] = 0;  // filtro adaptativo (no buscado: scanlines con filtro 0)
ihdr[12] = 0;  // sin entrelazado

const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), // firma
  chunk('IHDR', ihdr),
  chunk('IDAT', zlib.deflateSync(buf, { level: 9 })),
  chunk('IEND', Buffer.alloc(0)),
]);

const destino = path.join(__dirname, '..', 'app', 'opengraph-image.png');
fs.writeFileSync(destino, png);
console.log(`OK ${destino} (${(png.length / 1024).toFixed(1)} KB, ${W}x${H})`);
