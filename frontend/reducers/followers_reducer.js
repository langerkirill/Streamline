import { RECEIVE_FOLLOWERS, RECEIVE_FOLLOWER, REMOVE_FOLLOWER } from '../actions/follow_actions';
import { RECEIVE_WORKOUTS } from '../actions/workout_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {

  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_FOLLOWERS:
      return merge({}, newState, action.follows)
    case RECEIVE_FOLLOWER:
      return merge({}, newState, {[action.follow.id]: action.follow})
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};
