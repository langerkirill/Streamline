import users from './users_reducer';
import workouts from './workouts_reducer'
import routes from './routes_reducer';
import markers from './markers_reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  users: users,
  workouts: workouts,
  routes: routes,
  markers: markers
});
