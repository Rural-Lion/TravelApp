import React from 'react';
import {expect} from 'chai';
import { mount, shallow } from 'enzyme';
import { FancyBorder } from '../../app/helpers.js';
import PlanVacationButton from '../../app/LandingPage/PlanVacationButton.jsx'

describe('< PlanVacationButton />', () => {
  it ('should contains a button', function () {
    const wrapper = mount(<PlanVacationButton/>);
    expect(wrapper.find('button')).to.have.length(1);
  });

})
