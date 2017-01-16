const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('getFacilityAddress', () => {
  it('Should return a Facility address on GET', (done) => {
    chai.request('localhost:8000')
    .get('/facilityAddress')
    .query({ facilityID: 201792 })
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      done();
    });
  });

  it('Should return the adequate Facility address properties', (done) => {
    chai.request('localhost:8000')
    .get('/facilityAddress')
    .query({ facilityID: 201792 })
    .end((err, res) => {
      res.body.should.have.property('State');
      res.body.should.have.property('City');
      res.body.should.have.property('PostalCode');
      res.body.should.have.property('Address');
      done();
    });
  });

  it('Should return the correct Facility address', (done) => {
    chai.request('localhost:8000')
    .get('/facilityAddress')
    .query({ facilityID: 201792 })
    .end((err, res) => {
      res.body.PostalCode.should.equal('99212');
      done();
    });
  });
});
