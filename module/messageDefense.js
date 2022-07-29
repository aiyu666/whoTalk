const MongoDB = require("./connectMongoDB");

async function verifyDefenseStatus(timestamp, defenseCode) {
    const db = await MongoDB.connectMongo();
    const collection = await db.collection;
    const defenseUpdate = await collection.updateMany({ "timestamp": { $gt: timestamp }, "message": defenseCode.toString() }, { $set: { "defenseStatus": defenseCode } }).catch(err => console.log(`Got some error from query defense code in messageDefense ->${err}`));
    console.log(`{ $gt: ${timestamp}, $lte: ${timestamp + 1000} }`);
    console.log(`defenseUpdate: ${defenseUpdate}`);

    const defenseData = await collection.findOne({ "timestamp": { $gt: timestamp }, "message": defenseCode.toString() }).catch(err => console.log(`Got some error from query defense code in messageDefense ->${err}`));

    console.log(`defenseData: ${defenseData}`);

    return defenseData ? defenseData.timestamp - timestamp : false;
}

module.exports = {
    verifyDefenseStatus
}
