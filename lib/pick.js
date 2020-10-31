require('dotenv').config();
const got = require('got');

/**
 * @param  {Boolean} targetBoard the photo you want get from.
 * @param  {Number} limit the limit you want to get from dcard
 */
async function pickPhoto(targetBoard, limit = 50) {
  let mediaList = [];
  const url = `https://www.dcard.tw/service/api/v2/forums/${targetBoard}/posts?&limit=${limit}`;
  try {
    const resp = await got(url, { responseType: 'json' });
    const targetPosts = resp.body.filter((post) =>
      'mediaMeta' in post && post.mediaMeta.length !== 0);
    targetPosts.splice(0, 2);
    for (targetPost of targetPosts) {
      const postID = targetPost.id;
      const mediaData = targetPost.mediaMeta.filter((mediaMeta) =>
        mediaMeta.type !== 'image/thumbnail');
      mediaList.push([postID, mediaData[0].url]);
    }
  } catch (error) {
    console.error(`Pick photo have some problem: ${error}`);
    mediaList = [];
    mediaList.push([-1, process.env.BAD_THING_IMAGE]);
  }
  return mediaList;
}

module.exports = {
  pickPhoto,
};
