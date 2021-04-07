const { imageMessage, stickerMessage } = require('./recordMessage');
const { pickEvent, gotYouEvent } = require('./eventWorker');

/**
 * @param  {object} event JSON object containing events generated
 * @param  {string} userName userName who talk to me
 */
async function parseText(event) {
  switch (event.message.text) {
    case '抓':
      await gotYouEvent(event);
      break;
    case '抽':
      await pickEvent(event);
      break;
    default:
      break;
  }
}

/**
 * @param  {object} event JSON object containing events generated
 */
async function parseImage(event) {
  // return await imageMessage(event);
  return
}

/**
 * @param  {object} event JSON object containing events generated
 */
async function parseSticker(event) {
  // return stickerMessage(event);
  return
}

/**
 * @param  {object} event JSON object containing events generated
 */
module.exports = async (event) => {
  let result;
  switch (event.message.type) {
    case 'text':
      result = await parseText(event);
      break;
    case 'image':
      result = await parseImage(event);
      break;
    case 'sticker':
      result = await parseSticker(event);
      break;
  }
  return result;
};
