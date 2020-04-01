const linebot = require("linebot");
const messageParsing = require("./module/messageParsing");
const messageDefense = require("./module/messageDefense");
const gropEvent = require("./module/gropEvent");

require("dotenv").config();

const bot = linebot({
    channelId: process.env.CHANNEL_ID,
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

const sleep = () => new Promise((res, rej) => setTimeout(res, 2000));

bot.on("message", async function(event) {
    console.log(new Date());
    console.log(event);
    const profile = await bot.getUserProfile(event.source.userId);
    const name = await profile.displayName === undefined ? "見不得人的怪人" : profile.displayName;
    if (event.message.type === "text") {
        const msg = await messageParsing.messageSelector(event.replyToken, event.source.groupId, event.source.userId, name, event.message.text, event.timestamp);

        if (msg === undefined) return

        const messageType = msg[0];
        const messageData = msg[1];

        if (messageType === "skip") return
        if (messageType === "pick") return await event.reply(messageData);

        const defenseCode = msg[2];
        const replyToken = msg[3];
        const messageTimestamp = msg[4];
        var replyMessage;

        replyMessage = `一秒內輸入防禦碼: ${defenseCode}`;
        await bot.reply(replyToken, replyMessage);
        await sleep();
        if (await messageDefense.verifyDefenseStatus(messageTimestamp, defenseCode)) {
            replyMessage = "防禦成功";
            await event.reply(replyMessage);
            return
        }

        switch (messageType) {
            case "text":
                replyMessage = ["尬~他剛剛說下面這句話，\n真的當本尬是塑膠", messageData];
                break;
            case "sticker":
                replyMessage = {
                    type: "image",
                    originalContentUrl: `https://stickershop.line-scdn.net/stickershop/v1/sticker/${messageData}/android/sticker.png`,
                    previewImageUrl: `https://stickershop.line-scdn.net/stickershop/v1/sticker/${messageData}/android/sticker.png`
                };
                break;
        }

        await event.reply(replyMessage);
        await console.log("Reply success");
    }
    if (event.message.type === "sticker") await messageParsing.stickerRecorder(event.replyToken, event.source.groupId, event.source.userId, name, event.message.stickerId, event.timestamp);
});

bot.on("join", async function(event) {
    return await gropEvent.joinGroup(event.source.groupId, event.timestamp);
});

bot.on("leave", async function(event) {
    await console.log(`I am leaved group -> ${JSON.stringify(event.source.groupId)}`)
    // await MongoDB.deleteData({
    //     "groupId": event.source.groupId,
    // });
});
bot.on("memberJoined", function(event) {
    console.log(`I got the memberJoined -> ${JSON.stringify(event)}`)
    event.reply("尬～～～初次見面你好").then(function(data) {
        // success
        console.log("Reply success")
    }).catch(function(error) {
        // error
        console.log(`Some error message => ${error}`)
    });
});


bot.listen("/linewebhook", process.env.PORT || 5000);
console.log("Listening...5000 port")