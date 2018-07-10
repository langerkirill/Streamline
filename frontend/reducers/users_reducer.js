import { RECEIVE_USERS, RECEIVE_USER } from '../actions/user_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
  debugger
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_USERS:
      return action.users;
    case RECEIVE_USER:
      return merge({}, newState, {[action.user.id]: action.user})
    default:
      return state;
  }
};
