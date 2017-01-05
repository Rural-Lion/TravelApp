require('dotenv-safe').load();
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_DB_PORT, 'rurallion1.xzhv3s.ng.0001.usw2.cache.amazonaws.com');

client.on('connect', function() {
  console.log('connected to Redis');
});

module.exports = client;