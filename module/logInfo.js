function printInfo(event) {
    console.log(`現在時間:${new Date(event.timestamp)}`);
    console.log(`GroupId: ${event.source.groupId}`);
    console.log(`UserId: ${event.source.userId}`);
    console.log(`ReplyToken: ${event.replyToken}`);
    console.log(`MessageType: ${event.message.type}`);
    if (event.message.type === 'text') console.log(`MessageText: ${event.message.text}`);
    if (event.message.type === 'sticker') console.log(`StickerId: ${event.message.stickerId}`);
    if (event.message.type === 'image') console.log(`Image Link: https://whotalk.herokuapp.com/img/${event.message.id}.jpg`);
}

module.exports = {
    printInfo
}