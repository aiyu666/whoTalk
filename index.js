var linebot = require('linebot');

var bot = linebot({
    channelId: CHANNEL_ID,
    channelSecret: CHANNEL_SECRET,
    channelAccessToken: CHANNEL_ACCESS_TOKEN
});

bot.on('message', function (event) {
    event.reply(event.message.text).then(function (data) {
        // success
        console.log(data)
    }).catch(function (error) {
        // error
        console.log(error)
    });
});

bot.listen('/linewebhook', 3000);