// One-off script to generate favicon / apple-touch-icon / social share (OG) images
// from the Strive Running Club logo SVG, composited onto a white background.
//
// Run with: node scripts/generate-social-images.mjs

import sharp from "sharp";
import { readFileSync } from "node:fs";
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
  // Favicons
  await (await logoOnWhite({ canvasW: 32, canvasH: 32, pad: 0.08 })).toFile(
    path.join(publicDir, "favicon-32x32.png")
  );
  await (await logoOnWhite({ canvasW: 16, canvasH: 16, pad: 0.06 })).toFile(
    path.join(publicDir, "favicon-16x16.png")
  );
  await (await logoOnWhite({ canvasW: 180, canvasH: 180, pad: 0.14 })).toFile(
    path.join(publicDir, "apple-touch-icon.png")
  );
  await (await logoOnWhite({ canvasW: 192, canvasH: 192, pad: 0.14 })).toFile(
    path.join(publicDir, "icon-192.png")
  );
  await (await logoOnWhite({ canvasW: 512, canvasH: 512, pad: 0.14 })).toFile(
    path.join(publicDir, "icon-512.png")
  );

  // Social share image (WhatsApp / Facebook / Instagram / Twitter use 1200x630)
  await (await logoOnWhite({ canvasW: 1200, canvasH: 630, pad: 0.22 })).toFile(
    path.join(publicDir, "og-image.png")
  );

  console.log("Generated favicons, apple touch icon, and OG/social share image in /public.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
