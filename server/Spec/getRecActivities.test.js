const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('getRecActivities', function() {
  this.timeout(5000);

  it ('Should return activities on GET', function(done) {
    chai.request('localhost:8000')
    .get('/recActivities')
    .query({recArea: "Lake Pleasant"})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      done();
    });
  });

  it ('Should return the adequate Activities properties', function(done) {
    chai.request('localhost:8000')
    .get('/recActivities')
    .query({recArea: "Lake Pleasant"})
    .end(function(err, res){
      res.body[0].should.have.property('ActivityParentID');
      res.body[0].should.have.property('ActivityLevel');
      res.body[0].should.have.property('ActivityName');
      res.body[0].should.have.property('ActivityID');
      res.body[0].should.have.property('createdAt');
      res.body[0].should.have.property('updatedAt');
      res.body[0].should.have.property('entityactivities');
      res.body[0].entityactivities.should.have.property('createdAt');
      res.body[0].entityactivities.should.have.property('updatedAt');
      res.body[0].entityactivities.should.have.property('EntityID');
      res.body[0].entityactivities.should.have.property('ActivityID');
      done();
    });
  });

  it ('Should return the correct RecArea\'s activities' , function(done) {
    chai.request('localhost:8000')
    .get('/recActivities')
    .query({recArea: "Lake Pleasant"})
    .end(function(err, res){
      res.body.length.should.equal(13);
      res.body[0].entityactivities.EntityID.should.equal(6);
      done();
    });
  });

});
