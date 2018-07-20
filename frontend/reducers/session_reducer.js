import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER, LOGIN_USER } from '../actions/session_actions';
import { RECEIVE_USER } from '../actions/user_actions';

const defaultState = {
  id: null
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { id: action.user.id };
    case LOGOUT_CURRENT_USER:
      return defaultState;
    default:
      return state;
  }
}
