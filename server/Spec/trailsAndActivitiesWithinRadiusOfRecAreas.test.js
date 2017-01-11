const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('trailsAndActivitiesWithinRadiusOfRecAreas', function() {
  this.timeout(30000);
  it ('Should return trails and activities around a recArea on GET', function(done) {
    chai.request('localhost:8000')
    .get('/trailsAndActivitiesWithinRadiusOfRecAreas')
    .query({latitude: 36.245525, longitude: -106.427714, recAreaID: 27})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      done();
    });
  });

  it ('Should return the adequate entity\'s properties', function(done) {
    chai.request('localhost:8000')
    .get('/trailsAndActivitiesWithinRadiusOfRecAreas')
    .query({latitude: 36.245525, longitude: -106.427714, recAreaID: 27})
    .end(function(err, res){
      res.body.should.have.property('trails');
      res.body.trails.should.be.a('array');
      res.body.should.have.property('activities');
      res.body.activities.should.be.a('array');
      res.body.trails[0].should.have.property('id');
      res.body.trails[0].should.have.property('name');
      res.body.trails[0].should.have.property('length');
      res.body.trails[0].should.have.property('coordinates');
      done();
    });
  });

  it ('Should return the correct trails and activities', function(done) {
    chai.request('localhost:8000')
    .get('/trailsAndActivitiesWithinRadiusOfRecAreas')
    .query({latitude: 36.245525, longitude: -106.427714, recAreaID: 27})
    .end(function(err, res){
      res.body.trails.length.should.equal(13); 
      res.body.activities.length.should.equal(7); 
      done();
    });
  });

});
