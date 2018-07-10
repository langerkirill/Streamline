import { connect } from 'react-redux';
import SessionForm from './session_form';
import { login } from '../../actions/session_actions';

function mapStateToProps(state, ownProps) {
  return {
    buttonText: "LOGIN"
  };
}

function mapDispatchToProps(dispatch) {
  // here we want to dispatch an action to login a user and call it formAction
  return {
    formAction: user => dispatch(login(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
