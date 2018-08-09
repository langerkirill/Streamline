
import { RECEIVE_CHALLENGES, RECEIVE_CHALLENGE, REMOVE_CHALLENGE } from '../actions/challenge_actions';
import { RECEIVE_WORKOUTS } from '../actions/workout_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {

  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_CHALLENGES:
      return merge({}, newState, action.challenges)
    case RECEIVE_CHALLENGE:
      return merge({}, newState, {[action.challenge.id]: action.challenge})
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};
