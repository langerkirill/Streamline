import Entities from './entities_reducer';
import Session from './session_reducer';
import Errors from './errors_reducer';
import Workouts from './workouts_reducer';
import Routes from './routes_reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  entities: Entities,
  session: Session,
  errors: Errors,
});
