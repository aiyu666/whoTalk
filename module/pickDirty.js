const { getRequest } = require('./request')

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
};

module.exports = async (dirty = true) => {
    const targetBoard = (dirty) ? 'sex' : 'beauty';
    const mediaList = []
    const res = await getRequest(`https://www.dcard.tw/service/api/v2/forums/${targetBoard}/posts?limit=100`);
    if (!(res.statusCode === 200)) return;
    const responseBody = JSON.parse(res.body);
    const targetPosts = responseBody.filter((post) => 'mediaMeta' in post && post.mediaMeta.length !== 0);
    for (targetPost of targetPosts) {
        const mediaData = targetPost.mediaMeta.filter((mediaMeta) => mediaMeta.type !== 'image/thumbnail');
        mediaList.push(mediaData[0].url)
    }
    console.log(mediaList);
    return getRandom(mediaList, 10);
};