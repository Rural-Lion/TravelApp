let Sequelize = require('sequelize');
require('dotenv-safe').load();

//TO BE UNCOMMENTED WHEN USING AMAZON RDS
var testDb = new Sequelize(process.env.DB_TEST_NAME, process.env.DB_TEST_USERNAME, process.env.DB_TEST_PASSWORD, {
  host: process.env.DB_TEST_HOST,
  port: process.env.DB_TEST_PORT,
  dialectOptions: {
    ssl: 'Amazon RDS'
  },
  pool: {
    maxIdleTime: 30000
  }
});


//Verifying DB Connection~
testDb.authenticate().then(function(err) {
  console.log('Connection has been established successfully'); 
})
.catch(function(err) {
  console.log('Unable to connect to DB: ', err);
});


module.exports = testDb;