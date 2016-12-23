const express = require('express');
const db = require('../database/database.js');
const schemas = require('../database/schemas.js');
const bodyparser = require('body-parser');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('webpack')(require('../webpack.config.js'));
const schemas = require('../database/schemas.js');

require('dotenv-safe').load();

const port = process.env.PORT || 8000;

const app = express();

app.use(bodyparser.json());
app.use(webpackMiddleware(webpackConfig, {}));
app.use(webpackHotMiddleware(webpackConfig));
app.use(express.static(`${__dirname}./../client/public`));

app.listen(port);
console.log('listening on', port);

