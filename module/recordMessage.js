const MongoDB = require('./connectMongoDB');

async function textMessage(groupId, userId, name, message, timestamp) {
    return await MongoDB.insertData(
        {
            "groupId": groupId,
            "userId": userId,
            "name": name,
            "message": message,
            "tag": "userTextMessage",
            "timestamp": timestamp
        });
}

async function stickerMessage(groupId, userId, name, stickerId, timestamp) {
    return await MongoDB.insertData(
        {
            "groupId": groupId,
            "userId": userId,
            "name": name,
            "stickerId": stickerId,
            "tag": "userStickerMessage",
            "timestamp": timestamp
        });
}

module.exports = {
    textMessage,
    stickerMessage
}
