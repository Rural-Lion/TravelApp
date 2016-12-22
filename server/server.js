let express = require('express');
let sequelize = require('../database/database.js');
let bodyparser = require('body-parser');
require('dotenv-safe').load();

let port = process.env.PORT || 8000;

let app = express();

app.use(bodyparser.json());

app.use(express.static(__dirname + './../client/public'));

app.listen(port);
console.log('listening on', port);


