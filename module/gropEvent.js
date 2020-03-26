const MongoDB = require('./connectMongoDB');

async function joinGroup(groupId, timestamp) {
    return await MongoDB.insertData({
        "groupId": groupId,
        "memberList": {},
        "count": 0,
        "tag": "groupMessage",
        "timestamp": timestamp
    });
}
module.exports = {
    joinGroup
}

