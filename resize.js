const fs = require('fs');

async function resize(version, sharp) {
    try {
        const buffer = fs.readFileSync('./resize_62_40_z6.webp');
        const buf = await sharp(buffer).resize(32768, 32768).extract({ top: 16384, left: 16384, width: 1024, height: 1024 }).webp().toBuffer()
        fs.writeFileSync(`./resize-${version}.webp`, buf)
    } catch (e) {
        console.log('Failed...',{ version}, e);
    }
}


module.exports = { resize }