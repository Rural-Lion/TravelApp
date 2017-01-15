const chai = require('chai');
const should = chai.should();

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

getEntitiesWithinRadiusModel = require('../../models.js').getEntitiesWithinRadiusModel;

const latitude = 32.715738;
const longitude = -117.16108380000003;
const distance = 200;
const activities = JSON.stringify(['HIKING']);


describe('getEntitiesWithinRadiusModel', () => {
  it('Should be a function', () => {
    should.exist(getEntitiesWithinRadiusModel);
    getEntitiesWithinRadiusModel.should.be.a('function');
  });

  it('Should return an array of max 50 items', (done) => {
    const result = getEntitiesWithinRadiusModel(latitude, longitude, distance, activities);
    result.should.eventually.be.an('array').and.have.lengthOf(50).notify(done);
  });
});
