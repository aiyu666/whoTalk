const linebot = require('linebot');
const MongoDB = require('./module/connectMongoDB');
// const getProfile = require('./module/getProfile');

const bot = linebot({
    channelId: "1653974492",
    channelSecret: "fabcb037585812a1f5c1dd956fd3b8aa",
    channelAccessToken: "xCY575htizGkFZjqvwUawc0XVmM+oz3SV/CnBGdt9tE8TlGsYjmDh7bpkzHq7bTrRop0PltjlcqJzJLmB0VIKezMUKVySmqc4udTCoS6d/IotCD80JXxPjBPTyfv6BUTnJLnOgFLkE208JpClSViwwdB04t89/1O/w1cDnyilFU="
});


bot.on('message', async function (event) {
    const profile = await bot.getUserProfile(event.source.userId);
    await console.log(`I got ${profile.displayName} say the message -> ${event.message.text}`)
    // const db = await mongo.connectMongo();
    // await mongo.close(db);

    // await console.log(`${JSON.stringify(event)}`)
    // await console.log(`${JSON.stringify(event.source.userId)}`)

    const queryData = await MongoDB.queryData();
    // await event.reply(`@${profile.displayName} : ${event.message.text}`)
    await event.reply(`尬~${queryData}`)

    await console.log(`Reply success`)
});
bot.on('join', function (event) {
    const member = bot.getGroupMember(event.source.groupId)
    console.log(`I got the join -> ${JSON.stringify(member.memberIds)}`)
});
bot.on('leave', function (event) {
    console.log(`I got the leave -> ${JSON.stringify(event)}`)
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

