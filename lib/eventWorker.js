const { pickPhoto } = require('./pick');
const { flexImageCarousel, imageBubble } = require('./replyTemplate');
/**
 * @param  {object} event JSON object containing events generated
 */
async function gotYouEvent(event) {
  console.log(event);
  const personalProfile = await event.source.profile();
  const member = await event.source.member();
  console.log(member);
  return event.reply(`抓屁抓啊 ${personalProfile.displayName}，\n抓的功能暫時停用，\n付費解鎖~。`);
}

/**
 * @param  {object} event JSON object containing events generated
 */
async function pickEvent(event) {
  const targetBoard = (Math.floor(Math.random() * 2)) ? 'sex' : 'beauty';
  const photoList = await pickPhoto(targetBoard);
  const contents = [];
  for (let i = 0; i < 10; i += 1) {
    const indexTarget = Math.floor(Math.random() * photoList.length);
    const targetPhoto = photoList[indexTarget];
    photoList.splice(indexTarget, 1);
    const content = imageBubble(targetPhoto[1], `https://www.dcard.tw/f/${targetBoard}/p/${targetPhoto[0]}`);
    contents.push(content);
  }
  const replyMessage = flexImageCarousel(contents);
  return event.reply(replyMessage).then((val) => console.log(val));
}

async function messageBuff(event) {
  console.log(`Somebody unsend message ${event}`);
}

module.exports = {
  gotYouEvent,
  pickEvent,
  messageBuff,
};
