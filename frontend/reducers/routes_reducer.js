import { RECEIVE_ROUTES, RECEIVE_ROUTE } from '../actions/route_actions';
import { RECEIVE_WORKOUTS } from '../actions/workout_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {

  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_ROUTES:
    case RECEIVE_WORKOUTS:
      return merge({}, newState, action.routes)
    case RECEIVE_ROUTE:
      return merge({}, newState, {[action.route.id]: action.route})
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};
