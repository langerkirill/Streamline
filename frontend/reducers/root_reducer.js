import Entities from './entities_reducer';
import Session from './session_reducer';
import { combineReducers } from 'redux';


export default combineReducers({
  entities: Entities,
  session: Session
});
