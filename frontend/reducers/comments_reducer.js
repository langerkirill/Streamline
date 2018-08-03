
import { RECEIVE_COMMENTS, RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comment_actions';
import { RECEIVE_WORKOUTS } from '../actions/workout_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {

  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_COMMENTS:
    case RECEIVE_WORKOUTS:
      return merge({}, newState, action.comments)
    case RECEIVE_COMMENT:
      return merge({}, newState, {[action.comment.id]: action.comment})
    case REMOVE_COMMENT:
      delete newState[action.commentId]
      return newState;
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};
