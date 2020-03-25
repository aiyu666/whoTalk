
var MongoClient = require('mongodb').MongoClient;

async function connectMongo() {
    const db = await MongoClient.connect("mongodb://localhost:27017/whoTalk", { useUnifiedTopology: true }).catch(err => {
        console.log(`Some error with => ${err}`)
        throw err;
    });
    console.log(`Connect success`)
    return db
};

async function closeDB(db) {
    db.close();
    console.log(`closeDB success`);
    return
};

async function inserData(data) {
    const db = await connectMongo();
    const collection = await db.db('whoTalk').collection('whoTalk');
    await collection.insertOne(data);
    console.log(`Insert data sucess`)
    closeDB(db);
    return
}

async function queryData() {
    const db = await connectMongo();
    const collection = await db.db('whoTalk').collection('whoTalk');
    const queryData = await collection.find({}).toArray();
    await console.log(JSON.stringify(queryData))
    await console.log(`qerry success`);
    closeDB(db);
    return JSON.stringify(queryData);
}

// async function queryData(data) {
//     const db = await connectMongo();
//     const collection = await db.collection('whoTalk');
//     const queryData = await collection.find(data);
//     console.log(`qerry success`);
//     closeDB(db);
//     return queryData
// }

module.exports = {
    connectMongo,
    closeDB,
    inserData,
    queryData
}