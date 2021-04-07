/**
 * @param  {millisec} ms millisec which you want to wait
 * @return {object} a promise which setTimeout return
 */
module.exports = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
