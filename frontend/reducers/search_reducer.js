import { USER_SEARCH } from '../actions/user_actions';
import { merge } from 'lodash';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';

export default (state = {}, action) => {

  Object.freeze(state);

  switch (action.type) {
    case USER_SEARCH:
      return merge({}, action.users.search)
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};
