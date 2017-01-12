const generateDetailedEntity = require('../../app/helpers.js').generateDetailedEntity;
const expect = require('expect.js');

const entity = [{
  URL: 'https://en.wikipedia.org/wiki/Westworld_(s%C3%A9rie_t%C3%A9l%C3%A9vis%C3%A9e)',
  EntityID: 58,
  RecAreaLatitude: 30.61,
  RecAreaLongitude: -96.33,
  RecAreaName: 'WestWorld',
  RecAreaPhone: '760-557-9875',
  RecAreaDescription: 'WestWorld is located in north Scottsdale at the base of the McDowell Mountains.',
  RecAreaEmail: 'westworld@gmail.com'
}];
const address = {
  Address: "El Centro Field Office 1661 S. 4th Street ",
  City: " El Centro ",
  PostalCode: "92243",
  State: "CA"
};
const entityDetails = {
  activities: ['HIKING', 'BOATING'],
  trails: [{
      coordinates:"LINESTRING (-116.46 32.86, -116.46 32.86)",
      id: "188010443",
      length: 4.061,
      name: "SUNSET"
    },
    {
      coordinates:"LINESTRING (-116.47 32.87, -116.47 32.87)",
      id: "188010444",
      length: 4.062,
      name: "SUNRISE"
    }
  ]
}

describe('generateDetailedEntity', () => {
  it('Should return an Object', () => {
    expect(typeof generateDetailedEntity(entity, address, entityDetails)).to.be('object');
  });

  it('Should reformat data appropriately', () => {
    expect(generateDetailedEntity(entity, address, entityDetails).trails[0].id).to.be('188010443');
    expect(generateDetailedEntity(entity, address, entityDetails).activities[0]).to.be('Hiking');
    expect(generateDetailedEntity(entity, address, entityDetails).address.State).to.be('CA');
  });
});


