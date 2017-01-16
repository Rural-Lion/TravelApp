const chai = require('chai');
const should = chai.should();

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

getFacilitiesActivitiesModel = require('../../models.js').getFacilitiesActivitiesModel;

describe('getFacilitiesActivitiesModel', () => {
  const result = getFacilitiesActivitiesModel(201792);

  it('Should be a function', () => {
    should.exist(getFacilitiesActivitiesModel);
    getFacilitiesActivitiesModel.should.be.a('function');
  });

  it('Should return an object', (done) => {
    result.should.eventually.be.an('object').and.notify(done);
  });
  it('Should return an object with a property "activities" that is an array', (done) => {
    result.should.eventually.have.property('activities').and.be.an('array').and.notify(done);
  });
  it('Should return an object with correct properties', (done) => {
    result.then((data) => {
      data.activities[0].should.have.property('ActivityParentID');
      data.activities[0].should.have.property('ActivityLevel');
      data.activities[0].should.have.property('ActivityName');
      data.activities[0].should.have.property('ActivityID');
      data.activities[0].should.have.property('createdAt');
      data.activities[0].should.have.property('updatedAt');
      data.activities[0].should.have.property('entityactivities');
      data.activities[0].entityactivities.should.have.property('createdAt');
      data.activities[0].entityactivities.should.have.property('updatedAt');
      data.activities[0].entityactivities.should.have.property('EntityID');
      data.activities[0].entityactivities.should.have.property('ActivityID');
      done();
    })
    .catch(err => done(err));
  });
  it('Should have the correct facility\'s activity list', (done) => {
    result.then((data) => {
      data.activities.length.should.equal(2);
      data.activities[0].entityactivities.EntityID.should.equal(201792);
      done();
    });
  });
});
