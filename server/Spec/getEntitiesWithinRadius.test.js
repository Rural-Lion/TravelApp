const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('getEntitiesWithinRadius', function() {
  this.timeout(30000);
  it ('Should return an array of entities on GET', function(done) {
    chai.request('localhost:8000')
    .get('/entitiesWithinRadius')
    .query({latitude: 39.742043, longitude: -104.991531, distance: 50, activities: ["\'BOATING\'"]})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      done();
    });
  });

  // it ('Should return the adequate entity\'s properties', function(done) {
    // chai.request('localhost:8000')
  //   .get('/entitiesWithinRadius')
  //   .query({latitude: 39.742043, longitude: -104.991531, distance: 200, activities: ['BOATING']})
  //   .end(function(err, res){
  //     res.body[0].should.have.property('FacilityLatitude');
  //     res.body[0].should.have.property('FacilityLongitude');
  //     res.body[0].should.have.property('FacilityName');
  //     res.body[0].should.have.property('FacilityPhone');
  //     res.body[0].should.have.property('FacilityDescription');
  //     res.body[0].should.have.property('FacilityEmail');
  //     res.body[0].should.have.property('RecAreaName');
  //     res.body[0].should.have.property('RecAreaLatitude');
  //     res.body[0].should.have.property('RecAreaLongitude');
  //     res.body[0].should.have.property('RecAreaPhone');
  //     res.body[0].should.have.property('RecAreaDescription');
  //     res.body[0].should.have.property('RecAreaEmail');
  //     res.body[0].should.have.property('URL');
  //     res.body[0].should.have.property('EntityID');
  //     res.body[0].should.have.property('EntityType');
  //     res.body[0].should.have.property('ActivityDescription');
  //     done();
  //   });
  // });

  // it ('Should return the correct Facility address', function(done) {
  //   chai.request('localhost:8000')
  //   .get('/entitiesWithinRadius')
  //   .query({latitude: 39.742043, longitude: -104.991531, distance: 200, activities: ['BOATING']})
  //   .end(function(err, res){
  //     res.body.length.should.equal(50); 
  //     done();
  //   });
  // });

});
