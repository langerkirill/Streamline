import { connect } from 'react-redux';
import LogInForm from './login_form';
import { login, signup } from '../../actions/session_actions';

function mapStateToProps(state, ownProps) {
  const errors = state.errors.session;
  const image = "";
  return {
    errors,
    image,
    buttonText: "Log In"
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: user => dispatch(login(user)),
    signup: (user) => dispatch(signup(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);
