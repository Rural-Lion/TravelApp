const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('getFacility', function () {
  this.timeout(10000);
  it('Should return a Facility on GET', (done) => {
    chai.request('localhost:8000')
    .get('/facility')
    .query({ facilityID: 200001 })
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      done();
    });
  });

  it('Should return the adequate Facility properties', (done) => {
    chai.request('localhost:8000')
    .get('/facility')
    .query({ facilityID: 200001 })
    .end((err, res) => {
      res.body.should.have.property('FacilityDescription');
      res.body.should.have.property('FacilityEmail');
      res.body.should.have.property('FacilityLatitude');
      res.body.should.have.property('FacilityUseFeeDescription');
      res.body.should.have.property('LegacyFacilityID');
      res.body.should.have.property('OrgFacilityID');
      res.body.should.have.property('FacilityMapURL');
      res.body.should.have.property('FacilityName');
      res.body.should.have.property('LastUpdatedDate');
      res.body.should.have.property('FacilityTypeDescription');
      res.body.should.have.property('FacilityDirections');
      res.body.should.have.property('FacilityID');
      res.body.should.have.property('FacilityReservationURL');
      res.body.should.have.property('StayLimit');
      res.body.should.have.property('FacilityLongitude');
      res.body.should.have.property('FacilityPhone');
      res.body.should.have.property('Keywords');
      res.body.should.have.property('createdAt');
      res.body.should.have.property('updatedAt');
      res.body.should.have.property('permitentrances');
      res.body.should.have.property('facilitiesAddress');
      res.body.should.have.property('activities');
      res.body.should.have.property('entityMedia');
      res.body.should.have.property('campsites');
      done();
    });
  });

  it('Should return the correct Facility', (done) => {
    chai.request('localhost:8000')
    .get('/facility')
    .query({ facilityID: 200001 })
    .end((err, res) => {
      res.body.FacilityID.should.equal(200001);
      done();
    });
  });
});
