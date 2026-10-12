// One-off script to generate favicon / apple-touch-icon / social share (OG) images
// from the Strive Running Club logo SVG, composited onto a white background.
//
// Run with: node scripts/generate-social-images.mjs

import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");
const logoPath = path.join(publicDir, "strive-running-club-glasgow-logo.svg");
const logoSvg = readFileSync(logoPath);

async function logoOnWhite({ canvasW, canvasH, pad = 0.16 }) {
  const maxW = Math.round(canvasW * (1 - pad * 2));
  const maxH = Math.round(canvasH * (1 - pad * 2));

  const logoBuffer = await sharp(logoSvg)
    .resize({ width: maxW, height: maxH, fit: "inside" })
    .png()
    .toBuffer();

  const logoMeta = await sharp(logoBuffer).metadata();
  const left = Math.round((canvasW - (logoMeta.width ?? maxW)) / 2);
  const top = Math.round((canvasH - (logoMeta.height ?? maxH)) / 2);

  return sharp({
    create: {
      width: canvasW,
      height: canvasH,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: logoBuffer, left, top }])
    .png();
}

async function main() {
  // Square icon mark: the runner from the logo (the full wordmark is unreadable at favicon size).
  const big = await sharp(logoSvg, { density: 300 }).resize({ width: 2870 }).png().toBuffer();
  const runner = await sharp(big)
    .extract({ left: 2030, top: 0, width: 840, height: 1090 })
    .png()
    .toBuffer();

  async function markOnWhite(size, pad) {
    const inner = Math.round(size * (1 - pad * 2));
    const mark = await sharp(runner).resize({ width: inner, height: inner, fit: "inside" }).png().toBuffer();
    const m = await sharp(mark).metadata();
    return sharp({
      create: { width: size, height: size, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } },
    })
      .composite([
        { input: mark, left: Math.round((size - m.width) / 2), top: Math.round((size - m.height) / 2) },
      ])
      .png();
  }

  // Favicons / app icons (Google wants a square, multiple of 48px: 48 and 192 qualify)
  const sizes = [
    ["favicon-16x16.png", 16, 0.04],
    ["favicon-32x32.png", 32, 0.04],
    ["icon-48.png", 48, 0.05],
    ["apple-touch-icon.png", 180, 0.1],
    ["icon-192.png", 192, 0.1],
    ["icon-512.png", 512, 0.1],
  ];
  for (const [file, size, pad] of sizes) {
    await (await markOnWhite(size, pad)).toFile(path.join(publicDir, file));
  }

  // favicon.ico (PNG-compressed entries: 16, 32, 48) replaces the Next.js default in /app
  const icoSizes = [16, 32, 48];
  const pngs = [];
  for (const s of icoSizes) pngs.push(await (await markOnWhite(s, s === 48 ? 0.05 : 0.04)).toBuffer());
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  let offset = 6 + 16 * pngs.length;
  const entries = pngs.map((buf, i) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(icoSizes[i], 0);
    e.writeUInt8(icoSizes[i], 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(buf.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += buf.length;
    return e;
  });
  writeFileSync(path.join(root, "app", "favicon.ico"), Buffer.concat([header, ...entries, ...pngs]));
}

async function mainSocial() {
  // Social share image (WhatsApp / Facebook / Instagram / Twitter use 1200x630)
  await (await logoOnWhite({ canvasW: 1200, canvasH: 630, pad: 0.22 })).toFile(
    path.join(publicDir, "og-image.png")
  );

  // Logo for HTML emails (email clients don't support SVG). 2x for retina, displayed at ~260px wide.
  await (await logoOnWhite({ canvasW: 560, canvasH: 260, pad: 0.04 })).toFile(
    path.join(publicDir, "email-logo.png")
  );

  console.log("Generated favicons, apple touch icon, OG/social share image and email logo in /public.");
}

main()
  .then(mainSocial)
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
