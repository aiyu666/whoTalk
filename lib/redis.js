require('dotenv').config();
const redis = require('redis');
const { promisify } = require('util');

/** Connect redis
 * @return {object} return an object about connect redis
 */
function connect() {
  const client = redis.createClient(process.env.RDS_PORT, process.env.RDS_HOST);
  return client;
}

/**
 * @param  {string}  key which key you want to set hmset
 * @param  {array} data the data which you want to set as hash
 */
async function hgetall(key) {
  const client = connect();
  const asyncHgetall = promisify(client.hgetall).bind(client);
  await asyncHgetall(key);
  return;
}

/**
 * @param  {string}  key which key you want to set hmset
 * @param  {array} data the data which you want to set as hash
 */
async function hmset(key, data) {
  const client = connect();
  const asynchmset = promisify(client.hmset).bind(client);
  await asynchmset(key, data);
  // client.hmset(key, data, function(err) {
  //   if (err) console.error(`Some error in hmset: ${err}`);
  // });
  return;
}

/**
 * @param  {string}  key which key you want to set expire
 * @param  {seconds} seconds set the expire seconds
 */
async function setExpire(key, seconds) {
  const client = connect();
  const asyncExpire = promisify(client.expire).bind(client);
  await asyncExpire(key, seconds);
}

module.exports = {
  connect,
  hgetall,
  hmset,
  setExpire,
};
