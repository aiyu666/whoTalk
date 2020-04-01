const MongoDB = require("./connectMongoDB");

async function verifyDefenseStatus(timestamp, defenseCode) {
    const db = await MongoDB.connectMongo();
    const collection = await db.collection;
    const defenseData = await collection.updateMany({ "timestamp": { $gt: timestamp }, "message": defenseCode }, { $set: { "catch": defenseCode } }).catch(err => console.log(`Got some error from query defense code in messageDefense ->${err}`));
    if (defenseData.matchedCount === 0) return false
    return true
}

module.exports = {
    verifyDefenseStatus
}