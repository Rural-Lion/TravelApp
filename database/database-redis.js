require('dotenv-safe').load();
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_DB_PORT, process.env.REDIS_DB_ENDPOINT);

client.on('connect', function() {
  console.log('connected to Redis');
});

module.exports = client;