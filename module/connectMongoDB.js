
var MongoClient = require('mongodb').MongoClient;

async function connectMongo() {
    const db = await MongoClient.connect("mongodb://localhost:27017/whoTalk", { useUnifiedTopology: true }).catch(err => {
        console.log(`Some error with => ${err}`)
        throw err;
    });
    console.log(`Connect success`)
    return {
        connectDB: db, collection: db.db('whoTalk').collection('whoTalk')
    }
}

async function closeDB(db) {
    db.close();
    console.log(`closeDB success`);
    return
};

async function queryData() {
    const db = await connectMongo();
    const collection = db.collection;
    const queryData = await collection.find({}).toArray();
    await console.log(JSON.stringify(queryData))
    await console.log(`qerry success`);
    closeDB(db.connectDB);
    return JSON.stringify(queryData);
}

async function inserData(data) {
    const db = await connectMongo();
    const collection = db.collection;
    await collection.insertOne(data);
    console.log(`Insert data sucess`)
    closeDB(db.connectDB);
    return
}

async function deleteData(data) {
    const db = await connectMongo();
    const collection = db.collection;
    await collection.deleteOne(data);
    console.log(`Delete data sucess`)
    closeDB(db.connectDB);
    return
}

module.exports = {
    connectMongo,
    closeDB,
    inserData,
    queryData,
    deleteData
}