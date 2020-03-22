var linebot = require('linebot');

var bot = linebot({
    channelId: "1653974492",
    channelSecret: "fabcb037585812a1f5c1dd956fd3b8aa",
    channelAccessToken: "xCY575htizGkFZjqvwUawc0XVmM+oz3SV/CnBGdt9tE8TlGsYjmDh7bpkzHq7bTrRop0PltjlcqJzJLmB0VIKezMUKVySmqc4udTCoS6d/IotCD80JXxPjBPTyfv6BUTnJLnOgFLkE208JpClSViwwdB04t89/1O/w1cDnyilFU="
});

bot.on('message', function (event) {
    console.log(`I got the message -> ${event.message.text}`)
    event.reply("尬~").then(function (data) {
        // success
        console.log(`Reply success`)
    }).catch(function (error) {
        // error
        console.log(`Some error message => ${error}`)
    });
});


bot.listen('/linewebhook', 5000);
console.log("Listening...5000 port")