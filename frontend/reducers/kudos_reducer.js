import { RECEIVE_KUDOS, RECEIVE_KUDO } from '../actions/kudo_actions';
import { RECEIVE_WORKOUTS } from '../actions/workout_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {

  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_KUDOS:
    case RECEIVE_WORKOUTS:
      return merge({}, newState, action.kudos)
    case RECEIVE_KUDO:
      return merge({}, newState, {[action.kudo.id]: action.kudo})
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};
