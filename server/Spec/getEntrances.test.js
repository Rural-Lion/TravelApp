const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('getEntrances', function() {

  it ('Should return Permit Entrances on GET', function(done) {
    chai.request('localhost:8000')
    .get('/permitEntrances')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      done();
    });
  });

  it ('Should return the adequate Permit Entrances properties', function(done) {
    chai.request('localhost:8000')
    .get('/permitEntrances')
    .end(function(err, res){
      res.body[0].should.have.property('PermitEntranceDescription');
      res.body[0].should.have.property('Longitude');
      res.body[0].should.have.property('PermitEntranceType');
      res.body[0].should.have.property('LastUpdatedDate');
      res.body[0].should.have.property('PermitEntranceID');
      res.body[0].should.have.property('District');
      res.body[0].should.have.property('CreatedDate');
      res.body[0].should.have.property('Town');
      res.body[0].should.have.property('FacilityID');
      res.body[0].should.have.property('PermitEntranceName');
      res.body[0].should.have.property('Latitude');
      res.body[0].should.have.property('PermitEntranceAccessible');
      res.body[0].should.have.property('createdAt');
      res.body[0].should.have.property('updatedAt');
      done();
    });
  });

  it ('Should return the correct number of Permit Entrances' , function(done) {
    chai.request('localhost:8000')
    .get('/permitEntrances')
    .end(function(err, res){
      res.body.length.should.equal(865);
      done();
    });
  });

});
