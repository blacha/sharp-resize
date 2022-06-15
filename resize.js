const fs = require('fs');

async function resize(sharp) {
    try {
        const buffer = fs.readFileSync('./resize_62_40_z6.webp');
        const pipeline = sharp(buffer)
        const buf = await pipeline.resize(32768, 32768).extract({ top: 16384, left: 16384, width: 1024, height: 1024 }).webp().toBuffer()
        fs.writeFileSync('./output.webp', buf)
    } catch (e) {
        console.log('Failed...', e);
    }
}


module.exports = { resize }