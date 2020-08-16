require('dotenv').config();

const linebot = require('linebot');
const express = require('express');
const { EventEmitter } = require('events');
const parseMessage = require('./lib/parseMessage');
const messageEvent = new EventEmitter();
const app = express();

const PORT = process.env.PORT || 5000;

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

bot.on('message', function(event) {
  const profile = bot.getUserProfile(userId);
  const userName = profile.displayName ? profile.displayName : '某某某';
  return parseMessage(messageType, event, userName);
});

bot.on('join', function(event) {
  return;
});

bot.on('leave', function(event) {
  return;
});

bot.on('memberJoined', function(event) {
  return;
});

bot.on('unsend', function(event) {
  return;
});

messageEvent.on('replyMessage', function(replyToken, message) {
  return bot.reply(replyToken, message);
});

const linebotParser = bot.parser();
app.post('/lineWebhook', linebotParser);
app.use(express.static('public'));
app.listen(PORT);
console.log(`Listening ${PORT} port ...`);
