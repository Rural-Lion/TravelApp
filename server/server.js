let express = require('express');
let bodyparser = require('body-parser');

var port = process.env.PORT || 8000;

var app = express();

app.use(bodyparser.json());

app.use(express.static(__dirname + './../client'));

app.listen(port);
console.log('listening on', port);


