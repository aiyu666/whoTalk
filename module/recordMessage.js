const MongoDB = require('./connectMongoDB');

async function recordMessage(userId, name, message, timestamp) {
    return await MongoDB.insertData(
        {
            "userId": userId,
            "name": name,
            "message": message,
            "tag": "userMessage",
            "timestamp": timestamp
        });
}
module.exports = {
    recordMessage
}
