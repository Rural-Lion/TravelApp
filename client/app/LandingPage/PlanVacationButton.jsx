import React from 'react';
import { FancyBorder } from '../helpers.js';
import { Link } from 'react-router';

const PlanVacationButton = () => (
  <FancyBorder color="yellow">
    <Link to="/results">
      <button className="centered planVacationButton">Plan My Vacation</button>
    </Link>
  </FancyBorder>

);

export default PlanVacationButton;
