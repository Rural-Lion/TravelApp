let request = require('request');
require('dotenv-safe').load();
let schemas = require('../database/schemas.js');

var organizationsCaching = function () {
  let offset = 0;
  let params = {offset: offset};

  request({ 
    url: 'https://ridb.recreation.gov/api/v1/organizations?apikey=' + process.env.RIDB_API_KEY,
    qs: params }, function(err, resp, body) {
    if (err) {
      console.log('Error: ', err);
      return;
    }
    let data = JSON.parse(body).RECDATA;
    for (var i = 0; i < data.length; i++) {
      schemas.organizations.create({
        OrgID: data[i].OrgID,
        OrgImageURL: data[i].OrgImageURL,
        OrgURLText: data[i].OrgURLText,
        OrgURLAddress: data[i].OrgURLAddress,
        OrgType: data[i].OrgType,
        OrgAbbrevName: data[i].OrgAbbrevName,
        OrgName: data[i].OrgName,
        OrgJurisdictionType: data[i].OrgJurisdictionType,
        OrgParentID: data[i].OrgParentID,
        LastUpdatedDate: data[i].LastUpdatedDate
      }).catch((err) => {
        console.log('Error creating organization: ', err);
      });
    }
    return;
  });
};
   
organizationsCaching();