require('dotenv-safe').load();
const redis = require('redis');
const client = redis.createClient();

client.on('connect', function() {
  console.log('connected to Redis');
});

module.exports = client;