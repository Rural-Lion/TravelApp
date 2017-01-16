const chai = require('chai');
const should = chai.should();

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

getRecAddressModel = require('../../models.js').getRecAddressModel;

describe('getRecAddressModel', () => {
  const result = getRecAddressModel(6);

  it('Should be a function', () => {
    should.exist(getRecAddressModel);
    getRecAddressModel.should.be.a('function');
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
    result.should.eventually.have.property('State').and.equal('AZ');
    result.should.eventually.have.property('City').and.equal('Morristown');
    result.should.eventually.have.property('Address').and.equal('Lake Pleasant Regional Park Maricopa County Parks & Recreation 41835 N. Castle Hot Springs Rd.');
    result.should.eventually.have.property('PostalCode').and.equal('85342').and.notify(done);
  });
});
