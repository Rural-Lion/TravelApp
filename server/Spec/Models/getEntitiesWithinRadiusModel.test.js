const chai = require('chai');
const should = chai.should();

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

getEntitiesWithinRadiusModel = require('../../models.js').getEntitiesWithinRadiusModel;


describe('getEntitiesWithinRadiusModel', () => {
  const latitude = 32.715738;
  const longitude = -117.16108380000003;
  const distance = 200;
  const activities = JSON.stringify(['HIKING']);

  const result = getEntitiesWithinRadiusModel(latitude, longitude, distance, activities);

  it('Should be a function', () => {
    should.exist(getEntitiesWithinRadiusModel);
    getEntitiesWithinRadiusModel.should.be.a('function');
  });

  it('Should return an array of max 50 items', (done) => {
    result.should.eventually.be.an('array').and.have.lengthOf(50).notify(done);
  });

  it('Should have items with correct properties', (done) => {
    result.then((data) => {
      data[0].should.have.property('FacilityLatitude');
      data[0].should.have.property('FacilityLongitude');
      data[0].should.have.property('FacilityName');
      data[0].should.have.property('FacilityPhone');
      data[0].should.have.property('FacilityDescription');
      data[0].should.have.property('FacilityEmail');
      data[0].should.have.property('RecAreaName');
      data[0].should.have.property('RecAreaLatitude');
      data[0].should.have.property('RecAreaLongitude');
      data[0].should.have.property('RecAreaPhone');
      data[0].should.have.property('RecAreaDescription');
      data[0].should.have.property('RecAreaEmail');
      data[0].should.have.property('URL');
      data[0].should.have.property('EntityID');
      data[0].should.have.property('EntityType');
      data[0].should.have.property('ActivityDescription');
      done();
    })
    .catch(err => done(err));
  });
});

