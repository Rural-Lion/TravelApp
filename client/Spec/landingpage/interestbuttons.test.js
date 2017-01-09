import React from 'react';
import {expect} from 'chai';
import { mount, shallow } from 'enzyme';
import { FancyBorder } from '../../app/helpers.js';
import InterestButton from '../../app/LandingPage/InterestButton.jsx';
import InterestButtons from '../../app/LandingPage/InterestButtons.jsx'

const interests = [
  ['Biking', false], ['Boating', false], ['Historic & Cultural Site', false], ['Camping', false], ['Fishing', false],
  ['Hiking', true], ['Off Highway Vehicle', false], ['Picnicking', false], ['Recreational Vehicles', false],
  ['Visitor Center', false], ['Water Sports', false], ['Wildlife Viewing', false], ['Other Recreation Concession Site', false],
];

describe('< InterestButtons />', () => {
  it ('should contain 13 buttons', () => {
    const wrapper = mount(<InterestButtons interests = {interests}/>);
    expect(wrapper.find(InterestButton)).to.have.length(interests.length);
  });
  // it ('should update the interest state on click', () => {
  //   const wrapper = mount(<InterestButtons interests = {interests}/>);
  //   wrapper.find('button').first().simulate('click');
  //   expect(wrapper.props().interests[0][1]).to.equal(true);
  // });
})
