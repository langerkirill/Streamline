import { connect } from 'react-redux';
import SessionForm from './session_form';
import { login } from '../../actions/session_actions';

function mapStateToProps(state, ownProps) {
  return {
    buttonText: "Log In"
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: user => dispatch(login(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
