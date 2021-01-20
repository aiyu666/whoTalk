const redis = require('./redis.js');

/**
 * @param  {object} event JSON object containing events generated
 * @param  {string} userName userName who talk to me
 */
async function textMessage(event) {
  try {
    await redis.hmset(`${event.source.groupId}:${event.message.id}`, [
      'type', event.message.type,
      'text', event.message.text,
    ]);
    await redis.setExpire(`${event.source.groupId}:${event.message.id}`, 60);
  } catch (error) {
    console.error(`Some error in textMessage:${error}`);
  }
  return;
}

/**
 * @param  {object} event JSON object containing events generated
 */
async function stickerMessage(event) {
  console.log(`${event.source.groupId}:${event.message.id}`);
  await redis.hmset(`${event.source.groupId}:${event.message.id}`, [
    'type', event.message.type,
    'stickerId', event.message.stickerId,
  ]);
  return await redis.setExpire(`${event.source.groupId}:${event.message.id}`, 60);
}

/**
 * @param  {object} event JSON object containing events generated
 * @param  {string} userName userName who talk to me
 */
async function imageMessage(event, userName) {
  const image = await event.message.content();
  await redis.hmset(event.message.id, [
    'userName', userName,
    'groupId', event.source.groupId,
    'userId', event.source.userId,
    'type', event.message.type,
    'image', image.toString('base64'),
  ]);
  await redis.setExpire(event.message.id, 60);
  return;
}

module.exports = {
  textMessage,
  stickerMessage,
  imageMessage,
};
