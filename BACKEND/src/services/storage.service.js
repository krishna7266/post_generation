const { ImageKit } = require("@imagekit/nodejs");

console.log("ImageKit key exists:", !!process.env.IMAGEKIT_PRIVATE_KEY);
console.log(
    "ImageKit key length:",
    process.env.IMAGEKIT_PRIVATE_KEY
        ? process.env.IMAGEKIT_PRIVATE_KEY.length
        : 0
);

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(buffer) {
    const result = await imagekit.files.upload({
        file: buffer.toString("base64"),
        fileName: "image.png"
    });

    return result;
}

module.exports = uploadFile;
