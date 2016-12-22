let express = require('express');
let bodyparser = require('body-parser');

let port = process.env.PORT || 8000;

let app = express();

app.use(bodyparser.json());

app.use(express.static(__dirname + './../client'));

app.listen(port);
console.log('listening on', port);


