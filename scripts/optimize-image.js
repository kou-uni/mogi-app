const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'public', 'osakana-dao-bg.jpeg');
const outputPath = path.join(__dirname, '..', 'public', 'osakana-dao-bg-optimized.jpg');

async function optimizeImage() {
  try {
    await sharp(inputPath)
      .rotate() // Auto-rotate based on EXIF orientation
      .resize(1920, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({
        quality: 85,
        progressive: true
      })
      .toFile(outputPath);

    console.log('✓ Image optimized successfully!');
    console.log(`  Input: ${inputPath}`);
    console.log(`  Output: ${outputPath}`);
  } catch (error) {
    console.error('Error optimizing image:', error);
    process.exit(1);
  }
}

optimizeImage();
