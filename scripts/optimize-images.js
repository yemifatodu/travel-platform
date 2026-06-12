// scripts/optimize-images.js
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const INPUT_DIR = './public/images';
const QUALITY = 85;
const MAX_FILE_SIZE = 500 * 1024; // 500KB

const SIZES = {
  desktop: { width: 1200, height: 800 },
  tablet: { width: 800, height: 600 },
  mobile: { width: 600, height: 450 }
};

const continents = ['africa', 'middle-east', 'europe', 'americas', 'asia', 'pacific'];

async function optimizeImage(inputPath, outputDir, baseName) {
  const imageBuffer = fs.readFileSync(inputPath);
  
  for (const [size, dimensions] of Object.entries(SIZES)) {
    const outputPath = path.join(outputDir, `${baseName}-${size}.webp`);
    
    await sharp(imageBuffer)
      .resize(dimensions.width, dimensions.height, { 
        fit: 'cover', 
        position: 'attention'
      })
      .webp({ quality: QUALITY })
      .toFile(outputPath);
    
    const stats = fs.statSync(outputPath);
    const fileSizeKB = (stats.size / 1024).toFixed(2);
    console.log(`  ✅ ${size}: ${fileSizeKB}KB`);
  }
  
  // Create JPG fallback
  const jpgPath = path.join(outputDir, `${baseName}.jpg`);
  await sharp(imageBuffer)
    .resize(1200, 800, { fit: 'cover' })
    .jpeg({ quality: QUALITY })
    .toFile(jpgPath);
}

async function main() {
  console.log('🚀 Starting image optimization...\n');
  
  let totalOptimized = 0;
  
  for (const continent of continents) {
    const continentPath = path.join(INPUT_DIR, continent);
    if (!fs.existsSync(continentPath)) continue;
    
    const files = fs.readdirSync(continentPath);
    const images = files.filter(f => 
      f.match(/\.(jpg|jpeg|png)$/i) && 
      !f.includes('-desktop') && 
      !f.includes('-tablet') && 
      !f.includes('-mobile')
    );
    
    console.log(`📂 ${continent.toUpperCase()} (${images.length} images)`);
    
    for (const file of images) {
      const inputPath = path.join(continentPath, file);
      const baseName = path.basename(file, path.extname(file));
      
      console.log(`\n  📸 Optimizing: ${baseName}`);
      await optimizeImage(inputPath, continentPath, baseName);
      totalOptimized++;
    }
  }
  
  console.log(`\n✨ OPTIMIZATION COMPLETE!`);
  console.log(`📊 Total images optimized: ${totalOptimized}`);
  console.log(`\n📁 Output: public/images/[continent]/`);
  console.log(`   Each image now has: desktop, tablet, mobile + original JPG`);
}

main().catch(console.error);