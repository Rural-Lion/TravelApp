const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('getRecAreas', () => {
  
  it ('Should return a RecArea on GET', () => {
    chai.request('localhost:8000')
    .get('/recArea')
    .query({recAreaID: 6})
    .end(function(err, res){
      err.should.be.null;
      res.should.have.status(200);
      res.should.be.json;
      res.body[0].should.be.a('object');
      done();
    });
  });

  it ('Should return the adequate RecArea properties', () => {
    chai.request('localhost:8000')
    .get('/recArea')
    .query({recAreaID: 6})
    .end(function(err, res){
      res.body[0].should.have.property('PostalCode');
      res.body[0].should.have.property('RecAreaAddressID');
      res.body[0].should.have.property('City');
      res.body[0].should.have.property('RecAreaID');
      res.body[0].should.have.property('RecAreaAddressType');
      res.body[0].should.have.property('AddressCountryCode');
      res.body[0].should.have.property('RecAreaStreetAddress1');
      res.body[0].should.have.property('RecAreaStreetAddress2');
      res.body[0].should.have.property('RecAreaStreetAddress3');
      res.body[0].should.have.property('LastUpdatedDate');
      res.body[0].should.have.property('AddressStateCode');
      done();
    });
  });

  it ('Should return the correct RecArea', () => {
    chai.request('localhost:8000')
    .get('/recArea')
    .query({recAreaID: 6})
    .end(function(err, res){
      res.body[0].RecAreaID.should.equal(6); 
      done();
    });
  });

});
