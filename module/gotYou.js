const MongoDB = require("./connectMongoDB");

module.exports = async function(groupId) {

    const db = await MongoDB.connectMongo();
    const collection = await db.collection;
    const queryData = await collection.find({ "groupId": groupId }).sort({ _id: -1 }).limit(1).toArray().catch(err => console.log("Got some error from query data in got you ->${err}"));
    await console.log("抓到了！！！")
    if (queryData[0].tag === "userTextMessage") {
        const msg = await queryData[0].message;
        return ["text", msg]

    }
    if (queryData[0].tag === "userStickerMessage") {
        const stikerID = await queryData[0].stickerId;
        return ["sticker", stikerID]
    }
}