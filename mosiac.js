const fs = require('fs');

async function mosiac(version, sharp) {
  try {
    const buffer = fs.readFileSync('./resize_62_40_z6.webp');
    const quad = await Promise.all([
      sharp(buffer).resize(32768, 32768).extract({ top: 16384, left: 16384, width: 256, height: 256 }).webp().toBuffer(),
      sharp(buffer).resize(32768, 32768).extract({ top: 16384 + 256, left: 16384, width: 256, height: 256 }).webp().toBuffer(),
      sharp(buffer).resize(32768, 32768).extract({ top: 16384 + 256, left: 16384 + 256, width: 256, height: 256 }).webp().toBuffer(),
      sharp(buffer).resize(32768, 32768).extract({ top: 16384, left: 16384 + 256, width: 256, height: 256 }).webp().toBuffer(),
    ])

    const pipeline = sharp({
      create: {
        width: 512, height: 512, channels: 4, background: {
          r: 0, g: 0, b: 0, alpha: 0
        }
      }
    })
    pipeline.composite([
      { input: quad[0], top: 0, left: 0 },
      { input: quad[1], top: 256, left: 0 },
      { input: quad[2], top: 256, left: 256 },
      // { input: quad[3], top: 0, left: 256 },
    ])

    const buf = await pipeline.webp().toBuffer();
    fs.writeFileSync(`mosiac-${version}.webp`, buf)
  } catch (e) {
    console.log('Failed...', e);
  }
}


module.exports = { mosiac }