const chai = require('chai');
const should = chai.should();

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

trailsAndActivitiesWithinRadiusOfRecAreasModel = require('../../models.js').trailsAndActivitiesWithinRadiusOfRecAreasModel;

describe('trailsAndActivitiesWithinRadiusOfRecAreasModel', () => {
  const latitude1 = 36.245525;
  const longitude1 = -106.427714;
  const recAreaID1 = 27;
  const result1 = trailsAndActivitiesWithinRadiusOfRecAreasModel(latitude1, longitude1, recAreaID1);

  const latitude2 = 34.758009;
  const longitude2 = -90.125476;
  const recAreaID2 = 146;
  const result2 = trailsAndActivitiesWithinRadiusOfRecAreasModel(latitude2, longitude2, recAreaID2);

  it('Should be a function', () => {
    should.exist(trailsAndActivitiesWithinRadiusOfRecAreasModel);
    trailsAndActivitiesWithinRadiusOfRecAreasModel.should.be.a('function');
  });
  it('Should return an object', (done) => {
    result1.should.eventually.be.an('object').and.notify(done);
  });
  it('Should return the adequate entity\'s properties for longitude < -100', (done) => {
    result1.should.eventually.have.property('trails').and.be.an('array');
    result1.should.eventually.have.property('activities').and.be.an('array').and.notify(done);
  });
  it('Should return the correct trails and activities for longitude < -100', (done) => {
    result1.should.eventually.have.property('trails').and.have.lengthOf(13);
    result1.should.eventually.have.property('activities').and.have.lengthOf(7).and.notify(done);
  });

  it('Should return the adequate entity\'s properties for longitude > -100', (done) => {
    result2.should.eventually.have.property('trails').and.be.an('array');
    result2.should.eventually.have.property('activities').and.be.an('array').and.notify(done);
  });
  it('Should return the correct trails and activities for longitude > -100', (done) => {
    result2.should.eventually.have.property('trails').and.have.lengthOf(1);
    result2.should.eventually.have.property('activities').and.have.lengthOf(10).and.notify(done);
  });
});
