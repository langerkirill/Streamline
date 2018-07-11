import { connect } from 'react-redux';
import SignUpForm from './signup_form';
import { signup } from '../../actions/session_actions';

function mapStateToProps(state, ownProps) {
  return {
    buttonText: "Sign Up"
  };
}

function mapDispatchToProps(dispatch) {
  // here we want to dispatch an action to signup a user and call it formAction
  return {
    signup: user => dispatch(signup(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
