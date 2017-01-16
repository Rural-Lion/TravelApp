const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('getRecActivities', function () {
  this.timeout(5000);

  xit('Should return activities on GET', (done) => {
    chai.request('localhost:8000')
    .get('/recActivities')
    .query({ recAreaID: 6 })
    .end((err, res) =>  {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      done();
    });
  });

  xit('Should return the adequate Activities properties', (done) => {
    chai.request('localhost:8000')
    .get('/recActivities')
    .query({ recAreaID: 6 })
    .end((err, res) =>  {
      res.body.activities[0].should.have.property('ActivityParentID');
      res.body.activities[0].should.have.property('ActivityLevel');
      res.body.activities[0].should.have.property('ActivityName');
      res.body.activities[0].should.have.property('ActivityID');
      res.body.activities[0].should.have.property('createdAt');
      res.body.activities[0].should.have.property('updatedAt');
      res.body.activities[0].should.have.property('entityactivities');
      res.body.activities[0].entityactivities.should.have.property('createdAt');
      res.body.activities[0].entityactivities.should.have.property('updatedAt');
      res.body.activities[0].entityactivities.should.have.property('EntityID');
      res.body.activities[0].entityactivities.should.have.property('ActivityID');
      done();
    });
  });

  xit('Should return the correct RecArea\'s activities', (done) => {
    chai.request('localhost:8000')
    .get('/recActivities')
    .query({ recAreaID: 6 })
    .end((err, res) =>  {
      res.body.activities.length.should.equal(13);
      res.body.activities[0].entityactivities.EntityID.should.equal(6);
      done();
    });
  });
});
