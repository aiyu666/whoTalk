require('dotenv').config();
const redis = require('redis');
const { promisify } = require('util');

/** Connect redis
 * @return {object} return an object about connect redis
 */
function connect() {
  const client = redis.createClient(process.env.RDS_PORT, process.env.RDS_HOST);
  return client;
};

/**
 * @param  {object} client which get from connect redis
 * @return {object} return an object about disconnect redis
 */
function disconnect(client) {
  console.log('斷線啦');
  return client.end(true);
}

/**
 * @param  {string}  key which key you want to set hmset
 * @param  {array} data the data which you want to set as hash
 */
async function hgetall(key) {
  const client = connect();
  const asyncHgetall = promisify(client.hgetall).bind(client);
  await asyncHgetall(key);
  disconnect(client);
  return;
}

/**
 * @param  {string}  key which key you want to set hmset
 * @param  {array} data the data which you want to set as hash
 */
async function hmset(key, data) {
  const client = connect();
  const asynchmset = promisify(client.hmset).bind(client);
  try {
    await asynchmset(key, data);
    disconnect(client);
  } catch (error) {
    console.error(`Some error in hmset: ${err}`);
  }
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
  disconnect(client);
}


module.exports = {
  connect,
  disconnect,
  hgetall,
  hmset,
  setExpire,
};
