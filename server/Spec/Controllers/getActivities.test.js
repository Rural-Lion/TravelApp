const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('getActivities', function () {
  this.timeout(5000);

  it('Should return activities on GET', (done) => {
    chai.request('localhost:8000')
    .get('/activities')
    .query({ activity: 'DOCUMENTARY SITE' })
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      done();
    });
  });

  it('Should return the adequate Activities properties', (done) => {
    chai.request('localhost:8000')
    .get('/activities')
    .query({ activity: 'DOCUMENTARY SITE' })
    .end((err, res) => {
      res.body.should.have.property('ActivityParentID');
      res.body.should.have.property('ActivityLevel');
      res.body.should.have.property('ActivityName');
      res.body.should.have.property('ActivityID');
      res.body.should.have.property('createdAt');
      res.body.should.have.property('updatedAt');
      res.body.should.have.property('recAreas');
      res.body.recAreas[0].should.have.property('OrgRecAreaID');
      res.body.recAreas[0].should.have.property('LastUpdatedDate');
      res.body.recAreas[0].should.have.property('RecAreaEmail');
      res.body.recAreas[0].should.have.property('RecAreaReservationURL');
      res.body.recAreas[0].should.have.property('RecAreaLongitude');
      res.body.recAreas[0].should.have.property('RecAreaID');
      res.body.recAreas[0].should.have.property('RecAreaPhone');
      res.body.recAreas[0].should.have.property('RecAreaDescription');
      res.body.recAreas[0].should.have.property('RecAreaMapURL');
      res.body.recAreas[0].should.have.property('RecAreaLatitude');
      res.body.recAreas[0].should.have.property('StayLimit');
      res.body.recAreas[0].should.have.property('RecAreaFeeDescription');
      res.body.recAreas[0].should.have.property('RecAreaDirections');
      res.body.recAreas[0].should.have.property('Keywords');
      res.body.recAreas[0].should.have.property('RecAreaName');
      res.body.recAreas[0].should.have.property('createdAt');
      res.body.recAreas[0].should.have.property('updatedAt');
      res.body.recAreas[0].should.have.property('entityactivities');
      done();
    });
  });

  it('Should return the correct activity', (done) => {
    chai.request('localhost:8000')
    .get('/activities')
    .query({ activity: 'DOCUMENTARY SITE' })
    .end((err, res) => {
      res.body.ActivityName.should.equal('DOCUMENTARY SITE');
      done();
    });
  });
});
