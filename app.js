const linebot = require("linebot");
const Buffer = require('buffer').Buffer;
const express = require('express')
const app = express()
const messageParsing = require("./module/messageParsing");
const messageDefense = require("./module/messageDefense");
const gropEvent = require("./module/gropEvent");


require("dotenv").config();

const bot = linebot({
    channelId: process.env.CHANNEL_ID,
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

const sleep = () => new Promise((res, rej) => setTimeout(res, 2500));

async function saveImage(data, filename) {
    let imageBuffer = new Buffer(data, 'base64');

    require('fs').writeFile('./public/img/' + filename, imageBuffer, function(err) {
        if (err) {
            console.error(err);
        }
        console.log('file ' + filename + ' saved.')
    });
}

bot.on("message", async function(event) {
    console.log(new Date());
    console.log(event);

    const eventReplyToken = event.replyToken;
    const groupID = event.source.groupID;
    const userId = event.source.userID;
    const eventTimestamp = event.timestamp;
    const messageType = event.message.type;
    const messageID = event.message.id;

    const profile = await bot.getUserProfile(userId);
    const name = await profile.displayName === undefined ? "見不得人的怪人" : profile.displayName;

    if (messageType === "text") {
        const msg = await messageParsing.messageSelector(eventReplyToken, groupID, userId, name, event.message.text, eventTimestamp);

        if (msg === undefined) return

        const messageType = msg[0];
        const messageData = msg[1];

        if (messageType === "skip") return
        if (messageType === "pick") return await event.reply(messageData);

        const defenseCode = msg[2];
        const replyToken = msg[3];
        const messageTimestamp = msg[4];
        let replyMessage;

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
                image = {
                    type: "image",
                    originalContentUrl: `https://stickershop.line-scdn.net/stickershop/v1/sticker/${messageData}/android/sticker.png`,
                    previewImageUrl: `https://stickershop.line-scdn.net/stickershop/v1/sticker/${messageData}/android/sticker.png`
                };
                replyMessage = ["尬~他剛剛貼下面這張貼圖，\n真的當本尬是塑膠", image];
                break;
            case "image":
                image = {
                    type: "image",
                    originalContentUrl: messageData,
                    previewImageUrl: messageData
                };
                replyMessage = ["尬~他剛剛貼下面這張圖，\n真的當本尬是塑膠", image];
                break;
        }

        await event.reply(replyMessage);
        await console.log("Reply success");
    }
    if (messageType === "sticker") await messageParsing.stickerRecorder(eventReplyToken, groupID, userId, name, event.message.stickerId, eventTimestamp);
    if (messageType === "image") {
        const imageContent = await bot.getMessageContent(messageID);
        await saveImage(imageContent, `${messageID}.jpg`);
        const imagePath = `https://whotalk.herokuapp.com/img/${messageID}.jpg`;
        await messageParsing.imageRecorder(eventReplyToken, groupID, userId, name, imagePath, eventTimestamp);
    }
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

const linebotParser = bot.parser();
app.post('/linewebhook', linebotParser);
app.use(express.static("public"));
app.listen(5000);
console.log("Listening...5000 port")