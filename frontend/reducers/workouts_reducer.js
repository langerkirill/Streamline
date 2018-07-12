import { RECEIVE_WORKOUTS, RECEIVE_WORKOUT } from '../actions/workout_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {

  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_WORKOUTS:
      return action.workouts;
    case RECEIVE_WORKOUT:
      return merge({}, newState, {[action.workout.id]: action.workout})
    default:
      return state;
  }
};
