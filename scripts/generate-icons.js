import fs from "fs";
import sharp from "sharp";

const sizes = [64, 192, 512];
const appleIconSize = 180;

async function generateIcons() {
  const svg = fs.readFileSync("public/favicon.svg");

  for (const size of sizes) {
    await sharp(svg)
      .resize(size, size)
      .png()
      .toFile(`public/icon-${size}x${size}.png`);

    console.log(`Generated icon-${size}x${size}.png`);
  }

  // Generate Apple Touch Icon
  await sharp(svg)
    .resize(appleIconSize, appleIconSize)
    .png()
    .toFile("public/apple-touch-icon.png");

  console.log("Generated apple-touch-icon.png");
}

generateIcons().catch(console.error);
