const chai = require('chai');
const should = chai.should();

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

getFacilityAddressModel = require('../../models.js').getFacilityAddressModel;

describe('getFacilityAddressModel', () => {
  const result = getFacilityAddressModel(201792);

  it('Should be a function', () => {
    should.exist(getFacilityAddressModel);
    getFacilityAddressModel.should.be.a('function');
  });

  it('Should return an object', (done) => {
    result.should.eventually.be.an('object').and.notify(done);
  });

  it('Should have correct properties', (done) => {
    result.should.eventually.have.property('State');
    result.should.eventually.have.property('City');
    result.should.eventually.have.property('Address');
    result.should.eventually.have.property('PostalCode').and.notify(done);
  });

  it('Should return the correct RecArea address', (done) => {
    result.should.eventually.have.property('State').and.equal('WA');
    result.should.eventually.have.property('City').and.equal('Spokane');
    result.should.eventually.have.property('PostalCode').and.equal('99212').and.notify(done);
  });
});
