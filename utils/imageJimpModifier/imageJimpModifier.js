const jimp = require("jimp");

const imageJimpModifier = async (tempUpload) => {

    const image = await jimp.read(tempUpload);
    await image.resize(250, 250);
    await image.writeAsync(tempUpload);

};

module.exports = imageJimpModifier;