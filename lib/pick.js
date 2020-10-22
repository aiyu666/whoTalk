require('dotenv').config();

const got = require('got');

/**
 * @param  {Boolean} dirty the photo you want to sex or beauty ,default is dirty
 * @param  {Number} amount the amount of photo you want to see max is 10
 * @param  {Number} limit the limit you want to get from dcard
 */
async function pickPhoto(dirty = true, amount = 10, limit = 100) {
  const targetBoard = (dirty) ? 'sex' : 'beauty';
  let mediaList = [];
  const url = `https://www.dcard.tw/service/api/v2/forums/${targetBoard}/posts?limit=${limit}`;
  try {
    const resp = await got(url, { responseType: 'json' });
    const targetPosts = resp.body.filter((post) =>
      'mediaMeta' in post && post.mediaMeta.length !== 0);
    for (targetPost of targetPosts) {
      const mediaData = targetPost.mediaMeta.filter((mediaMeta) =>
        mediaMeta.type !== 'image/thumbnail');
      mediaList.push(mediaData[0].url);
    }
  } catch (error) {
    console.error(`Pick photo have some problem: ${error}`);
    mediaList = [];
    mediaList.push(process.env.BAD_THING_IMAGE);
  }
  return mediaList;
}

module.exports = {
  pickPhoto,
};
