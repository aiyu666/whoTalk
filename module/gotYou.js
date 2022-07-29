const MongoDB = require("./connectMongoDB");
const sleep = require("./sleep");

module.exports = async function (groupId, userId, defenseCode) {

    const db = await MongoDB.connectMongo();
    const collection = db.collection;
    const queryData = await collection.find({ "groupId": groupId, "userId": { $ne: userId } }).sort({ _id: -1 }).limit(1).toArray().catch(err => console.log(`Got some error from query data in got you ->${err}`));
    console.log("抓到了！！！");

    const defenseStatus = queryData[0].defenseStatus;

    if (defenseStatus !== "") return ["skip", ""]

    const messageID = queryData[0]._id;
    const defenseReplyToken = queryData[0].replyToken;
    const messageTag = queryData[0].tag;
    const messageTimestamp = queryData[0].timestamp;

    await collection.updateOne({ "_id": messageID }, { $set: { "defenseStatus": "In Defense" } }).catch(err => console.log(`Got some error from update data in got you ->${err}`));

    if (messageTag === "userTextMessage") {
        const msg = await queryData[0].message;
        return ["text", msg, defenseCode, defenseReplyToken, messageTimestamp]
    }
    if (messageTag === "userStickerMessage") {
        const stickerID = await queryData[0].stickerId;
        return ["sticker", stickerID, defenseCode, defenseReplyToken, messageTimestamp]
    }
    if (messageTag === "userImageMessage") {
        const imagePath = await queryData[0].imagePath;
        return ["image", imagePath, defenseCode, defenseReplyToken, messageTimestamp, messageID, queryData[0].uploadStatus]
    }
}
