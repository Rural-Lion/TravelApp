const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('getRecAddress', () => {
  it('Should return a RecArea address on GET', (done) => {
    chai.request('localhost:8000')
    .get('/recAddress')
    .query({ recAreaID: 6 })
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      done();
    });
  });

  it('Should return the adequate RecArea address properties', (done) => {
    chai.request('localhost:8000')
    .get('/recAddress')
    .query({ recAreaID: 6 })
    .end((err, res) => {
      res.body.should.have.property('State');
      res.body.should.have.property('City');
      res.body.should.have.property('PostalCode');
      res.body.should.have.property('Address');
      done();
    });
  });

  it('Should return the correct RecArea address', (done) => {
    chai.request('localhost:8000')
    .get('/recAddress')
    .query({ recAreaID: 6 })
    .end((err, res) => {
      res.body.PostalCode.should.equal('85342');
      done();
    });
  });
});
