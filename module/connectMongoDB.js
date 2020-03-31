var MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

async function connectMongo() {
    const db = await MongoClient.connect(process.env.MONGO_HOST, { useUnifiedTopology: true }).catch(err => {
        console.log(`Some error with => ${err}`);
        throw err;
    });
    console.log("Connect success");
    return {
        connectDB: db,
        collection: db.db("whoTalk").collection("whoTalk");
    }
}

async function closeDB(db) {
    db.close();
    console.log("closeDB success");
    return
};

async function queryData(data) {
    const db = await connectMongo();
    const collection = await db.collection;
    const queryData = await collection.find(data).toArray();
    await closeDB(db.connectDB);
    await console.log("qerry success");
    return JSON.stringify(queryData);
}

async function insertData(data) {
    const db = await connectMongo();
    const collection = await db.collection;
    await collection.insertOne(data);
    await console.log("Insert data sucess");
    await closeDB(db.connectDB);
    return
}

async function deleteData(data) {
    const db = await connectMongo();
    const collection = await db.collection;
    await collection.deleteOne(data);
    await console.log("Delete data sucess");
    await closeDB(db.connectDB);
    return
}

async function updateData(query, data) {
    const db = await connectMongo();
    const collection = await db.collection;
    await collection.updateOne(query, data);
    await console.log("Delete data sucess");
    await closeDB(db.connectDB);
    return
}

module.exports = {
    connectMongo,
    closeDB,
    insertData,
    queryData,
    deleteData,
    updateData
}