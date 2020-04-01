const MongoDB = require("./connectMongoDB");

async function verifyDefenseStatus(timestamp, defenseCode) {
    const db = await MongoDB.connectMongo();
    const collection = await db.collection;
    const defenseData = await collection.find({ "timestamp": { $gt: timestamp }, "message": defenseCode }).toArray().catch(err => console.log(`Got some error from query defense code in messageDefense ->${err}`));
    if (defenseData.length === 0) return false
    return true
}

module.exports = {
    verifyDefenseStatus
}