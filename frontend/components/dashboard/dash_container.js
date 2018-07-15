import { connect } from 'react-redux';
import { fetchWorkouts } from '../../actions/workout_actions';
import Dashboard from './dashboard';

function mapStateToProps(state) {
  const workouts = state.entities.workouts;
  const users = state.entities.users;
  return {
    workouts,
    users
  };
};

function mapDispatchToProps(dispatch) {
  // here we want to dispatch an action to signup a user and call it formAction
  return {
    fetchWorkouts: () => dispatch(fetchWorkouts())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
