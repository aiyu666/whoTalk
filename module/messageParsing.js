const recordMessage = require('./recordMessage')
const gotYou = require('./gotYou')
async function messageSelector(groupId, userId, name, message, timestamp) {
    if (message === '抓') return await gotYou(groupId)
    recordMessage.textMessage(groupId, userId, name, message, timestamp)
    return
}

module.exports = {
    messageSelector
}