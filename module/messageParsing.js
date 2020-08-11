const recordMessage = require("./recordMessage");
const gotYou = require("./gotYou");
const pickDirty = require("./pickDirty");
const ronKeyword = ["抓ron", "抓Ron"];
const ronID = "Ub0d1d64651a42ab071b4231dec86cae5";

async function messageSelector(replyToken, groupId, userId, name, message, timestamp) {
    if (message === "抓") return await gotYou(groupId, userId);
    if (ronKeyword.includes(message)) return await gotYou(groupId, ronID, ron = true);
    if (message === "抽") {
        const random_dirty = Math.random() >= 0.5;
        const label = (random_dirty) ? 'dirty' : 'beauty';
        const columns = []
        const mediaList = await pickDirty(random_dirty);
        for (mediaURL of mediaList) {
            columns.push({
                "imageUrl": mediaURL,
                "action": {
                    "type": "message",
                    "label": label,
                    "text": "我色胚，我丟臉，我偷點圖片。"
                }
            })
        }
        const imageCarouselTemplate = {
            "type": "template",
            "altText": "舒服的圖片",
            "template": {
                "type": "image_carousel",
                "columns": columns,
            }
        };
        return ["pick", imageCarouselTemplate];
    }
    await recordMessage.textMessage(replyToken, groupId, userId, name, message, timestamp);
    return
}

async function stickerRecorder(replyToken, groupId, userId, name, stickerId, timestamp) {
    console.log("我接收到貼圖");
    return await recordMessage.stickerMessage(replyToken, groupId, userId, name, stickerId, timestamp);
}

async function imageRecorder(replyToken, groupId, userId, name, imagePath, timestamp) {
    console.log("我接收到圖片");
    return await recordMessage.imageMessage(replyToken, groupId, userId, name, imagePath, timestamp);
}

module.exports = {
    messageSelector,
    stickerRecorder,
    imageRecorder
}
