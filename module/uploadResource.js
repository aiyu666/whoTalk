const Buffer = require('buffer').Buffer;

async function saveImage(data, filename) {
    let imageBuffer = new Buffer(data, 'base64');

    await require('fs').writeFile('./public/img/' + filename, imageBuffer, function(err) {
        if (err) console.error(err);
        console.log(`file ${filename} saved.`);
    });
}

module.exports = {
    saveImage
}