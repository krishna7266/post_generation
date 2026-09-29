const {ImageKit} = require("@imagekit/nodejs")
const imagekit = new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
})
async function uploadFile(buffer){
    const result = await imagekit.files.upload({
        file: buffer.toString("base64"),
        fileName: "image.png"
    })
    return result;
}
module.exports = uploadFile;