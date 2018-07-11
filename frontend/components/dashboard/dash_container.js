import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Dashboard from './dashboard'

function mapDispatchToProps(dispatch) {
  // here we want to dispatch an action to signup a user and call it formAction
  return {
    logout: () => dispatch(logout())
  };
}

export default connect(null, mapDispatchToProps)(Dashboard);
