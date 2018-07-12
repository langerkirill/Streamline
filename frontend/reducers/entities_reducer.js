import users from './users_reducer';
import workouts from './workouts_reducer'
import { combineReducers } from 'redux';

export default combineReducers({
  users: users,
  workouts: workouts
});
