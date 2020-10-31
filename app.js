require('dotenv').config();

const linebot = require('linebot');
const express = require('express');

const parseMessage = require('./lib/parseMessage');
const { messageBuff } = require('./lib/eventWorker');
const app = express();

const PORT = process.env.PORT || 5000;

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

bot.on('message', async function(event) {
  try {
    parseMessage(event);
  } catch (error) {
    console.log(`Some error on got message: ${error}`);
  }
});

bot.on('join', async function(event) {
  const resp = await event.source.member();
  console.log(resp);
  console.log(resp.statusCode);
  console.log(resp.body);
  return;
});

bot.on('leave', function(event) {
  return;
});

bot.on('memberJoined', async function(event) {
  console.log(event);
  const resp = await event.source.member();
  console.log(resp);
  console.log(resp.statusCode);
  console.log(resp.body);
  return;
});

bot.on('unsend', function(event) {
  return messageBuff(event);
});

const linebotParser = bot.parser();
app.post('/lineWebhook', linebotParser);
app.use(express.static('public'));
app.listen(PORT);
console.log(`Listening ${PORT} port ...`);
