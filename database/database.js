let Sequelize = require('sequelize');
// require('dotenv-safe').load();

if (process.env.NODE_ENV === "production") {
  require('dotenv').config({ path: __dirname.slice(0, -8)  + '/.env' })
  console.log('production env');
} else {
  require('dotenv').config({ path: __dirname.slice(0, -8) + '/.env.test' })
  console.log('testing env');
}

//TO BE UNCOMMENTED WHEN USING AMAZON RDS
var db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialectOptions: {
    ssl: 'Amazon RDS'
  },
  pool: {
    maxIdleTime: 30000
  }
});

//TEMPORARY USE WHILE RUNNING DB ON LOCAL MACHINE TO CACHE DATA
// let username = 'root';
// let password = '';

// var db = new Sequelize('rurallion', username, password, {
//   host: 'localhost',
//   dialect: 'mysql',
// });

//Verifying DB Connection~
db.authenticate().then(function(err) {
  console.log('Connection has been established successfully to ', process.env.DB_NAME); 
})
.catch(function(err) {
  console.log('Unable to connect to DB: ', err);
});


module.exports = db;