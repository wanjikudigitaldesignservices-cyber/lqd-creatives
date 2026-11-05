const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = 'C:/Users/wanji/.gemini/antigravity/brain/84498615-13b6-48e4-86c9-23b2308421d2/.user_uploaded/media_1793854818755_b25097c9.jpg';
const outDir = path.join(__dirname, '..', 'public');
const imgDir = path.join(outDir, 'images');

async function processLogo() {
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });

  // 1. Inpaint/patch the watermark sticker at bottom right (x: 550..750, y: 660..820)
  // We copy from symmetric left area x: 260..460, y: 660..820
  for (let y = 660; y < 820; y++) {
    for (let x = 550; x < 750; x++) {
      const srcX = x - 290;
      const srcIdx = (y * info.width + srcX) * 3;
      const destIdx = (y * info.width + x) * 3;
      data[destIdx] = data[srcIdx];
      data[destIdx + 1] = data[srcIdx + 1];
      data[destIdx + 2] = data[srcIdx + 2];
    }
  }

  // 2. Crop the 820x820 tile
  const cropped = await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 3
    }
  })
  .extract({ left: 102, top: 102, width: 820, height: 820 })
  .png()
  .toBuffer();

  // 3. Create rounded mask PNG (rx=165, ry=165)
  const maskSvg = Buffer.from(
    '<svg width="820" height="820" viewBox="0 0 820 820">' +
    '<rect x="0" y="0" width="820" height="820" rx="165" ry="165" fill="#ffffff"/>' +
    '</svg>'
  );
  const maskPng = await sharp(maskSvg).png().toBuffer();

  // Composite with mask for clean transparent rounded corners
  const maskedTile = await sharp(cropped)
    .ensureAlpha()
    .composite([{
      input: maskPng,
      blend: 'dest-in'
    }])
    .png()
    .toBuffer();

  // Save 512x512 logo.png
  await sharp(maskedTile)
    .resize(512, 512)
    .png()
    .toFile(path.join(imgDir, 'logo.png'));

  // Save 512x512 logo.webp
  await sharp(maskedTile)
    .resize(512, 512)
    .webp({ quality: 95 })
    .toFile(path.join(imgDir, 'logo.webp'));

  // Save 192x192 icon.png
  await sharp(maskedTile)
    .resize(192, 192)
    .png()
    .toFile(path.join(outDir, 'icon.png'));

  // Save 512x512 icon-512.png
  await sharp(maskedTile)
    .resize(512, 512)
    .png()
    .toFile(path.join(outDir, 'icon-512.png'));

  // Save apple-touch-icon.png 180x180
  await sharp(maskedTile)
    .resize(180, 180)
    .png()
    .toFile(path.join(outDir, 'apple-touch-icon.png'));

  // Save favicon.ico (as 48x48 PNG container)
  await sharp(maskedTile)
    .resize(48, 48)
    .png()
    .toFile(path.join(outDir, 'favicon.ico'));

  // Save src/app/icon.png
  await sharp(maskedTile)
    .resize(192, 192)
    .png()
    .toFile(path.join(__dirname, '..', 'src', 'app', 'icon.png'));

  // Save src/app/apple-icon.png
  await sharp(maskedTile)
    .resize(180, 180)
    .png()
    .toFile(path.join(__dirname, '..', 'src', 'app', 'apple-icon.png'));

  console.log('All logo and favicon assets generated successfully!');
}

processLogo().catch(err => {
  console.error(err);
  process.exit(1);
});
