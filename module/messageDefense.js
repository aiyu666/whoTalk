const MongoDB = require("./connectMongoDB");

async function verifyDefenseStatus(timestamp, defenseCode) {
    const db = await MongoDB.connectMongo();
    const collection = await db.collection;
    const defenseData = await collection.updateMany({ "timestamp": { $gt: timestamp }, "message": defenseCode.toString() }, { $set: { "catch": defenseCode } }).catch(err => console.log(`Got some error from query defense code in messageDefense ->${err}`));
    console.log(defenseData);
    if (defenseData.matchedCount === 0) return false
    return true
}

module.exports = {
    verifyDefenseStatus
}