const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('trailsAndActivitiesWithinRadiusOfFacility', function() {
  this.timeout(30000);
  it ('Should return trails and activities around a facility on GET', function(done) {
    chai.request('localhost:8000')
    .get('/trailsAndActivitiesWithinRadiusOfFacility')
    .query({latitude: 47.2487, longitude: -120.6776, facilityID: 201792})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      done();
    });
  });

  it ('Should return the adequate entity\'s properties', function(done) {
    chai.request('localhost:8000')
    .get('/trailsAndActivitiesWithinRadiusOfFacility')
    .query({latitude: 47.2487, longitude: -120.6776, facilityID: 201792})
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
    .get('/trailsAndActivitiesWithinRadiusOfFacility')
    .query({latitude: 47.2487, longitude: -120.6776, facilityID: 201792})
    .end(function(err, res){
      res.body.trails.length.should.equal(366); 
      res.body.activities.length.should.equal(2); 
      done();
    });
  });

});
