const MongoDB = require('./connectMongoDB');

module.exports = async function (groupId) {
    const db = await MongoDB.connectMongo();
    const collection = await db.collection;
    const queryData = await collection.find({ "groupId": groupId }).sort({ _id: -1 }).limit(1).toArray().catch(err => console.log(`Got some error from query data in got you ->${err}`));
    await console.log(`抓到了！！！`)
    const msg = await `尬~他剛剛說 \n"${queryData[0].message}"! \n當本尬是塑膠逆？`
    console.log(`我在抓到了這邊處理了這個${msg}`)
    return msg
}