const request = require('request');

/**
 * @param  {object} options the request url, body ,headers
 */
async function getRequest(options) {
    return new Promise((resolve, reject) => {
        request.get(options, (error, response) => {
            if (error) reject(new Error(`Ops! Some error about get request-> ${error}`));
            resolve(response);
        });
    });
}

module.exports = {
    getRequest,
};
