import { connect } from 'react-redux';
import Inputs from './Inputs.jsx';

const mapStateToProps = state => ({
  userQuery: state.userQuery,
});

const mapDispatchToProps = dispatch => ({
  handleChange: (setField, value) => {
    dispatch(setField(value));
  },
});

const InputsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Inputs);

export default InputsContainer;

