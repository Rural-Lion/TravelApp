let Sequelize = require('sequelize');
let schemas = require('../database/schemas.js');

module.exports.getRecOrganization = function(req, res) {
  let {query: { recArea }} = req;
  schemas.recAreas.findOne({ where: {RecAreaName: recArea } })
  .then((recreationArea) => schemas.)
};

