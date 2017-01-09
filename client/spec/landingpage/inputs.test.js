import React from 'react';
import {expect} from 'chai';
import { mount, shallow } from 'enzyme';
import { FancyBorder } from '../../app/helpers.js';
import Inputs from '../../app/LandingPage/Inputs.jsx'


const userQuery =  {
  startingLocation: "san diego",
  budgetOfTrip: 0,
  lengthOfTrip: 0,
  distanceOfTrip: 200,
}

describe('< Inputs />', () => {
  it ('should mount a component with 4 props', function () {
    const wrapper = mount(<Inputs userQuery = {userQuery}/>);
    expect(wrapper.props().userQuery.startingLocation).to.be.defined;
    expect(wrapper.props().userQuery.budgetOfTrip).to.be.defined;
    expect(wrapper.props().userQuery.lengthOfTrip).to.be.defined;
    expect(wrapper.props().userQuery.distanceOfTrip).to.be.defined;
  });

  it ('should contains 4 input fields', function () {
    const wrapper = mount(<Inputs userQuery = {userQuery}/>);
    expect(wrapper.find('input')).to.have.length(4);
  });
})