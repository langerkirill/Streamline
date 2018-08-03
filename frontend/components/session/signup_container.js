import { connect } from 'react-redux';
import SignUpForm from './signup_form';
import { signup, clearErrors } from '../../actions/session_actions';

function mapStateToProps(state, ownProps) {
  const image = "";
  const errors = state.errors.session;
  return {
    image,
    errors,
    buttonText: "Sign Up"
  };
}

function mapDispatchToProps(dispatch) {
  // here we want to dispatch an action to signup a user and call it formAction
  return {
    signup: user => dispatch(signup(user)),
    clearErrors: () => dispatch(clearErrors())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
