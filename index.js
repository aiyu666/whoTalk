const linebot = require('linebot');
const MongoDB = require('./module/connectMongoDB');
// const getProfile = require('./module/getProfile');


const bot = linebot({
    channelId: "",
    channelSecret: "",
    channelAccessToken: ""
});


bot.on('message', async function (event) {
    const profile = await bot.getUserProfile(event.source.userId);
    await console.log(`I got ${profile.displayName} say the message -> ${event.message.text}`)
    // const db = await mongo.connectMongo();
    // await mongo.close(db);

    // await console.log(`${JSON.stringify(event)}`)
    // await console.log(`${JSON.stringify(event.source.userId)}`)

    // const queryData = await MongoDB.queryData();
    // await event.reply(`@${profile.displayName} : ${event.message.text}`)
    // await event.reply(`尬~${queryData}`)

    await console.log(`Reply success`)
});
bot.on('join', async function (event) {
    await console.log(`I join the channel -> ${JSON.stringify(event.source.groupId)}`)
    await MongoDB.inserData({
        "groupId": event.source.groupId,
        "data": {},
        "timestamp": event.timestamp
    });
});
bot.on('leave', async function (event) {
    await console.log(`I got the leave -> ${JSON.stringify(event.source.groupId)}`)
    await MongoDB.deleteData({
        "groupId": event.source.groupId,
    });
});
bot.on('memberJoined', function (event) {
    console.log(`I got the memberJoined -> ${JSON.stringify(event)}`)
    event.reply(`尬～～～初次見面你好`).then(function (data) {
        // success
        console.log(`Reply success`)
    }).catch(function (error) {
        // error
        console.log(`Some error message => ${error}`)
    });
});


bot.listen('/linewebhook', 5000);
console.log("Listening...5000 port")

