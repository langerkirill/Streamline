import { RECEIVE_MARKERS, RECEIVE_MARKER } from '../actions/marker_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {

  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_MARKERS:
      return merge({}, newState, action.markers)
    case RECEIVE_MARKER:
      return merge({}, newState, {[action.marker.id]: action.marker})
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};
