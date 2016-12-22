let Sequelize = require('sequelize');

const dnName = 'rurallion';
const username = 'rurallion';
const password = 'hackreactor69';

var sequelize = new Sequelize(dnName, username, password, {
  host: 'rurallion.cgnjbb8knqep.us-west-2.rds.amazonaws.com',
  port: '3306',
  dialectOptions: {
    ssl: 'Amazon RDS'
  }
});

//Verifying DB Connection
sequelize.authenticate().then(function(err) {
  console.log('Connection has been established successfully'); 
})
.catch(function(err) {
  console.log('Unable to connect to DB: ', err);
});


module.exports = sequelize;