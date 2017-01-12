const toTitleCase = require('../../app/helpers.js').toTitleCase;
const expect = require('expect.js');


describe('toTitleCase', () => {
  it('Should capitalize first letter', () => {
    expect(toTitleCase('hello')).to.be('Hello');
  });
  it('Should change to lower case all letters except the first letter', () => {
    expect(toTitleCase('HELLO')).to.be('Hello');
  });
});