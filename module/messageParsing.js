const recordMessage = require("./recordMessage");
const gotYou = require("./gotYou");
const ronID = "Ub0d1d64651a42ab071b4231dec86cae5";

async function messageSelector(replyToken, groupId, userId, name, message, timestamp) {
    const regexResult = message.match(/^抓 ([0-9]{3})$/);
    if (regexResult) return await gotYou(groupId, userId, regexResult[1]);
    if (message === "抽") return ["pick", "抽你老木 林北不是Orz"];
    await recordMessage.textMessage(replyToken, groupId, userId, name, message, timestamp);
    return
}

async function stickerRecorder(replyToken, groupId, userId, name, stickerId, timestamp) {
    console.log("我接收到貼圖");
    return await recordMessage.stickerMessage(replyToken, groupId, userId, name, stickerId, timestamp);
}

async function imageRecorder(replyToken, groupId, userId, name, imagePath, timestamp) {
    console.log("我接收到圖片");
    return await recordMessage.imageMessage(replyToken, groupId, userId, name, imagePath, timestamp);
}

module.exports = {
    messageSelector,
    stickerRecorder,
    imageRecorder
}
