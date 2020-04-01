const recordMessage = require("./recordMessage");
const gotYou = require("./gotYou");

async function messageSelector(replyToken, groupId, userId, name, message, timestamp) {
    if (message === "抓") return await gotYou(groupId, userId);
    if (message === "抽") return ["pick", "抽你老木 林北不是Orz"];
    console.log(replyToken);
    return recordMessage.textMessage(replyToken, groupId, userId, name, message, timestamp);
}

async function stickerRecorder(replyToken, groupId, userId, name, stickerId, timestamp) {
    console.log("我接收到貼圖");
    return await recordMessage.stickerMessage(replyToken, groupId, userId, name, stickerId, timestamp);
}

module.exports = {
    messageSelector,
    stickerRecorder
}