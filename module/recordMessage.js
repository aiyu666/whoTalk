const MongoDB = require("./connectMongoDB");

async function textMessage(replyToken, groupId, userId, name, message, timestamp) {
    return await MongoDB.insertData({
        "replyToken": replyToken,
        "groupId": groupId,
        "userId": userId,
        "name": name,
        "message": message,
        "tag": "userTextMessage",
        "timestamp": timestamp,
        "defenseStatus": ""
    });
}

async function stickerMessage(replyToken, groupId, userId, name, stickerId, timestamp) {
    return await MongoDB.insertData({
        "replyToken": replyToken,
        "groupId": groupId,
        "userId": userId,
        "name": name,
        "stickerId": stickerId,
        "tag": "userStickerMessage",
        "timestamp": timestamp,
        "defenseStatus": ""
    });
}

async function imageMessage(replyToken, groupId, userId, name, imagePath, timestamp) {
    return await MongoDB.insertData({
        "replyToken": replyToken,
        "groupId": groupId,
        "userId": userId,
        "name": name,
        "imagePath": imagePath,
        "tag": "userImageMessage",
        "timestamp": timestamp,
        "defenseStatus": ""
    });
}

module.exports = {
    textMessage,
    stickerMessage,
    imageMessage
}