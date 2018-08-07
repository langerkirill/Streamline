import users from './users_reducer';
import workouts from './workouts_reducer'
import routes from './routes_reducer';
import markers from './markers_reducer';
import comments from './comments_reducer';
<<<<<<< HEAD
import likes from './likes_reducer';
=======
import kudos from './kudos_reducer';
>>>>>>> whateverdanwants
import { combineReducers } from 'redux';

export default combineReducers({
  users: users,
  workouts: workouts,
  routes: routes,
  markers: markers,
<<<<<<< HEAD
  comments, comments,
  likes: likes
=======
  comments: comments,
  kudos: kudos
>>>>>>> whateverdanwants
});
