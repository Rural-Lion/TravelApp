import React from 'react';
import { FancyBorder } from '../helpers.js';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';

const PlanVacationButton = () => (
  <FancyBorder color="yellow">
    <Link to="/results">
      <Button bsStyle="success" className="centered plan-vacation-button">Plan My Vacation</Button>
    </Link>
  </FancyBorder>
);

export default PlanVacationButton;
