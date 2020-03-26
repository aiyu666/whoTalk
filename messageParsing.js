const recordMessage = require('../recordMessage')

async function messageParsing(message) {
    if (message === '抓') return
    return recordMessage(message)

}

module.exports = {
    messageParsing
}