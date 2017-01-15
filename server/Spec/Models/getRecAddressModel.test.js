const chai = require('chai');
const should = chai.should();

getRecAddressModel = require('../../models.js').getRecAddressModel;

describe('getRecAddressModel', () => {
  it('Should be a function', () => {
    should.exist(getRecAddressModel);
    getRecAddressModel.should.be.a('function');
  });
});
