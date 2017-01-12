import React from 'react';
import {expect} from 'chai';
import { mount, shallow } from 'enzyme';
import { FancyBorder } from '../../app/helpers.js';
import InterestButton from '../../app/LandingPage/InterestButton.jsx'

const interest =  {
  index: 0,
  interest: [['Biking', false], ['Boating', false]]
}

describe('< InterestButton />', () => {
  it ('should contain a button', function () {
    const wrapper = mount(<InterestButton interest = {interest}/>);
    expect(wrapper.find('button')).to.have.length(1);
  });

})
