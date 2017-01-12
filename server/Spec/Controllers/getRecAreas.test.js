const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('getRecAreas', function() {
  
  it ('Should return a RecArea on GET', function(done) {
    chai.request('localhost:8000')
    .get('/recArea')
    .query({recAreaID: 6})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      done();
    });
  });

  it ('Should return the adequate RecArea properties', function(done) {
    chai.request('localhost:8000')
    .get('/recArea')
    .query({recAreaID: 6})
    .end(function(err, res){
      res.body.should.have.property('OrgRecAreaID');
      res.body.should.have.property('LastUpdatedDate');
      res.body.should.have.property('RecAreaEmail');
      res.body.should.have.property('RecAreaReservationURL');
      res.body.should.have.property('RecAreaLongitude');
      res.body.should.have.property('RecAreaID');
      res.body.should.have.property('RecAreaPhone');
      res.body.should.have.property('RecAreaDescription');
      res.body.should.have.property('RecAreaMapURL');
      res.body.should.have.property('RecAreaLatitude');
      res.body.should.have.property('StayLimit');
      res.body.should.have.property('RecAreaFeeDescription');
      res.body.should.have.property('RecAreaDirections');
      res.body.should.have.property('Keywords');
      res.body.should.have.property('RecAreaName');
      res.body.should.have.property('recAreaAddress');
      res.body.should.have.property('activities');
      res.body.should.have.property('entityMedia');
      done();
    });
  });

  it ('Should return the correct RecArea', function(done) {
    chai.request('localhost:8000')
    .get('/recArea')
    .query({recAreaID: 6})
    .end(function(err, res){
      res.body.RecAreaID.should.equal(6); 
      done();
    });
  });

});
