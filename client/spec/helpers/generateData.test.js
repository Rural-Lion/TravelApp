const generateData = require('../../app/helpers.js').generateData;
const expect = require('expect.js');


describe('generateData', () => {
  it('Should return an Array of Objects', () => {
    const entities = [{
      URL: 'https://en.wikipedia.org/wiki/Westworld_(s%C3%A9rie_t%C3%A9l%C3%A9vis%C3%A9e)',
      EntityID: 58,
      RecAreaLatitude: 30.61,
      RecAreaLongitude: -96.33,
      RecAreaName: 'WestWorld',
      RecAreaPhone: '760-557-9875',
      RecAreaDescription: 'WestWorld is located in north Scottsdale at the base of the McDowell Mountains.',
      RecAreaEmail: 'westworld@gmail.com'
    }];
    expect(Array.isArray(generateData(entities))).to.be(true);
    expect(typeof generateData(entities)[0]).to.be('object');
  });

  it('Should reformat the recAreas data appropriately', () => {
    const entities = [{
      URL: 'https://en.wikipedia.org/wiki/Westworld_(s%C3%A9rie_t%C3%A9l%C3%A9vis%C3%A9e)',
      EntityID: 58,
      RecAreaLatitude: 30.61,
      RecAreaLongitude: -96.33,
      RecAreaName: 'WestWorld',
      RecAreaPhone: '760-557-9875',
      RecAreaDescription: 'WestWorld is located in north Scottsdale at the base of the McDowell Mountains.',
      RecAreaEmail: 'westworld@gmail.com'
    }];
    expect(generateData(entities)[0].name).to.be('WestWorld');
    expect(generateData(entities)[0].image).to.be('https://en.wikipedia.org/wiki/Westworld_(s%C3%A9rie_t%C3%A9l%C3%A9vis%C3%A9e)');
    expect(generateData(entities)[0].email).to.be('westworld@gmail.com');
    expect(generateData(entities)[0].phoneNumber).to.be('760-557-9875');
    expect(generateData(entities)[0].description).to.be('WestWorld is located in north Scottsdale at the base of the McDowell Mountains.');
    expect(generateData(entities)[0].coordinates[0]).to.be(30.61);
    expect(generateData(entities)[0].coordinates[1]).to.be(-96.33);
    expect(generateData(entities)[0].recArea).to.be(true);
    expect(generateData(entities)[0].entityID).to.be(58);
    expect(generateData(entities)[0].facility).to.be(false);
  });

  it('Should reformat the facilities data appropriately', () => {
    const entities = [{
      URL: 'https://en.wikipedia.org/wiki/Westworld_(s%C3%A9rie_t%C3%A9l%C3%A9vis%C3%A9e)',
      EntityID: 58,
      FacilityLatitude: 30.61,
      FacilityLongitude: -96.33,
      FacilityName: 'WestWorld',
      FacilityPhone: '760-557-9875',
      FacilityDescription: 'WestWorld is located in north Scottsdale at the base of the McDowell Mountains.',
      FacilityEmail: 'westworld@gmail.com'
    }];
    expect(generateData(entities)[0].name).to.be('WestWorld');
    expect(generateData(entities)[0].image).to.be('https://en.wikipedia.org/wiki/Westworld_(s%C3%A9rie_t%C3%A9l%C3%A9vis%C3%A9e)');
    expect(generateData(entities)[0].email).to.be('westworld@gmail.com');
    expect(generateData(entities)[0].phoneNumber).to.be('760-557-9875');
    expect(generateData(entities)[0].description).to.be('WestWorld is located in north Scottsdale at the base of the McDowell Mountains.');
    expect(generateData(entities)[0].coordinates[0]).to.be(30.61);
    expect(generateData(entities)[0].coordinates[1]).to.be(-96.33);
    expect(generateData(entities)[0].recArea).to.be(false);
    expect(generateData(entities)[0].entityID).to.be(58);
    expect(generateData(entities)[0].facility).to.be(true);
  });
});


