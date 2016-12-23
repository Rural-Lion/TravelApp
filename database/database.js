let Sequelize = require('sequelize');
require('dotenv-safe').load();

var db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialectOptions: {
    ssl: 'Amazon RDS'
  }
});

//Verifying DB Connection
db.authenticate().then(function(err) {
  console.log('Connection has been established successfully'); 
})
.catch(function(err) {
  console.log('Unable to connect to DB: ', err);
});


module.exports = db;