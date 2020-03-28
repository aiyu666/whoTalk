const linebot = require('linebot');
const MongoDB = require('./module/connectMongoDB');
const messageParsing = require('./module/messageParsing');
const gropEvent = require('./module/gropEvent')

require('dotenv').config();

const bot = linebot({
    channelId: process.env.CHANNEL_ID,
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});
bot.on('message', async function (event) {
    if (event.message.type != 'text') return
    const profile = await bot.getUserProfile(event.source.userId);
    const name = await profile.displayName === undefined ? "見不得人的怪人" : profile.displayName
    const msg = await messageParsing.messageSelector(event.source.groupId, event.source.userId, name, event.message.text, event.timestamp)
    await console.log(`MSG => ${msg}`)
    if (msg != undefined) await event.reply(msg)
    await console.log(`Reply success`)
});
bot.on('join', async function (event) {
    return await gropEvent.joinGroup(event.source.groupId, event.timestamp);
});
bot.on('leave', async function (event) {
    await console.log(`I am leaved group -> ${JSON.stringify(event.source.groupId)}`)
    // await MongoDB.deleteData({
    //     "groupId": event.source.groupId,
    // });
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