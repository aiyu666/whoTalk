const MongoDB = require('./connectMongoDB');

async function textMessage(groupId, userId, name, message, timestamp) {
    return await MongoDB.insertData(
        {
            "groupId": groupId,
            "userId": userId,
            "name": name,
            "message": message,
            "tag": "userMessage",
            "timestamp": timestamp
        });
}
module.exports = {
    textMessage
}
