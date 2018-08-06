
import { RECEIVE_LIKES, RECEIVE_LIKE, REMOVE_LIKE } from '../actions/like_actions';
import { RECEIVE_WORKOUTS } from '../actions/workout_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {

  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_LIKES:
    case RECEIVE_WORKOUTS:
      return merge({}, newState, action.likes)
    case RECEIVE_LIKE:
      return merge({}, newState, {[action.like.id]: action.like})
    case REMOVE_LIKE:
      delete newState[action.likeId];
      return newState;
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};
