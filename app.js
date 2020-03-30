const linebot = require('linebot');
const messageParsing = require('./module/messageParsing');
const gropEvent = require('./module/gropEvent')

require('dotenv').config();

const bot = linebot({
    channelId: process.env.CHANNEL_ID,
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

bot.on('message', async function (event) {
    console.log(new Date());
    console.log(event)
    const profile = await bot.getUserProfile(event.source.userId);
    const name = await profile.displayName === undefined ? "見不得人的怪人" : profile.displayName
    if (event.message.type === 'text') {
        const msg = await messageParsing.messageSelector(event.source.groupId, event.source.userId, name, event.message.text, event.timestamp)
        if (msg != undefined && msg[0] === 'pick') await event.reply(msg[1])
        if (msg != undefined && msg[0] === 'text') await event.reply(["尬~他剛剛說下面這句話，\n真的當本尬是塑膠", msg[1]])
        if (msg != undefined && msg[0] === 'sticker') await event.reply({
            type: 'image',
            originalContentUrl: `https://stickershop.line-scdn.net/stickershop/v1/sticker/${msg[1]}/android/sticker.png`,
            previewImageUrl: `https://stickershop.line-scdn.net/stickershop/v1/sticker/${msg[1]}/android/sticker.png`
        })
        await console.log(`Reply success`)
    }
    if (event.message.type === 'sticker') await messageParsing.stickerRecorder(event.source.groupId, event.source.userId, name, event.message.stickerId, event.timestamp)
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


bot.listen('/linewebhook', process.env.PORT || 5000);
console.log("Listening...5000 port")