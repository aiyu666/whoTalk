const MongoDB = require("./connectMongoDB");

module.exports = async function(groupId, userId) {

    const db = await MongoDB.connectMongo();
    const collection = await db.collection;
    const queryData = await collection.find({ "groupId": groupId, "userId": { $ne: userId } }).sort({ _id: -1 }).limit(1).toArray().catch(err => console.log(`Got some error from query data in got you ->${err}`));
    await console.log("抓到了！！！")

    const defenseStatus = queryData[0].defenseStatus;

    if (defenseStatus !== "") return ["skip", ""]

    const defenseReplyToken = queryData[0].replyToken;
    const messageTag = queryData[0].tag;
    const messageTimestamp = queryData[0].timestamp;
    const defensCode = getRandomNumber(3);

    await collection.updateOne({ "_id": queryData[0]._id }, { $set: { "defenseStatus": "In Defense" } }).catch(err => console.log(`Got some error from update data in got you ->${err}`));

    if (messageTag === "userTextMessage") {
        const msg = await queryData[0].message;
        return ["text", msg, defensCode, defenseReplyToken, messageTimestamp]
    }
    if (messageTag === "userStickerMessage") {
        const stikerID = await queryData[0].stickerId;
        return ["sticker", stikerID, defensCode, defenseReplyToken, messageTimestamp]
    }
    if (messageTag === "userImageMessage") {
        const imagePath = await queryData[0].imagePath;
        return ["image", imagePath, defensCode, defenseReplyToken, messageTimestamp]
    }
}

function getRandomNumber(len) {
    let randomNum = "";
    for (let i = 0; i < len; i++) {
        randomNum += Math.floor(Math.random() * 10).toString();
    }
    return randomNum
}