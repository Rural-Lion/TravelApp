import { connect } from 'react-redux';
import InterestFavicons from './InterestFavicons.jsx';
import { toggleInterest } from '../../actions/inputActions.js';

const mapStateToProps = state => ({
  interests: state.interests,
});

const mapDispatchToProps = dispatch => ({
  handleInterestButtonClick: (index) => {
    dispatch(toggleInterest(index));
  },
});

const InterestsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InterestFavicons);

export default InterestsContainer;

