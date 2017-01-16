const chai = require('chai');
const should = chai.should();

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

trailsAndActivitiesWithinRadiusOfFacilityModel = require('../../models.js').trailsAndActivitiesWithinRadiusOfFacilityModel;

describe('trailsAndActivitiesWithinRadiusOfFacilityModel', () => {
  const latitude1 = 47.2487;
  const longitude1 = -120.6776;
  const facilityID1 = 201792;
  const result1 = trailsAndActivitiesWithinRadiusOfFacilityModel(latitude1, longitude1, facilityID1);

  const latitude2 = 43.833;
  const longitude2 = -72.6345;
  const facilityID2 = 203842;
  const result2 = trailsAndActivitiesWithinRadiusOfFacilityModel(latitude2, longitude2, facilityID2);

  it('Should be a function', () => {
    should.exist(trailsAndActivitiesWithinRadiusOfFacilityModel);
    trailsAndActivitiesWithinRadiusOfFacilityModel.should.be.a('function');
  });
  it('Should return an object', (done) => {
    result1.should.eventually.be.an('object').and.notify(done);
  });
  it('Should return the adequate entity\'s properties for longitude < -100', (done) => {
    result1.should.eventually.have.property('trails').and.be.an('array');
    result1.should.eventually.have.property('activities').and.be.an('array').and.notify(done);
  });
  it('Should return the correct trails and activities for longitude < -100', (done) => {
    result1.should.eventually.have.property('trails').and.have.lengthOf(366);
    result1.should.eventually.have.property('activities').and.have.lengthOf(2).and.notify(done);
  });

  it('Should return the adequate entity\'s properties for longitude > -100', (done) => {
    result2.should.eventually.have.property('trails').and.be.an('array');
    result2.should.eventually.have.property('activities').and.be.an('array').and.notify(done);
  });
  it('Should return the correct trails and activities for longitude > -100', (done) => {
    result2.should.eventually.have.property('trails').and.have.lengthOf(282);
    result2.should.eventually.have.property('activities').and.have.lengthOf(3).and.notify(done);
  });
});
