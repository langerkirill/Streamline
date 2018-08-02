import * as CommentApiUtil from "../util/comment_api_util";

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";

const receiveComments = ({ comments }) => {

  return {
    type: RECEIVE_COMMENTS,
    comments
  };
};

const receiveComment = comment => {
  return {
    type: RECEIVE_COMMENT,
    comment
  };
};

export const fetchWorkoutComments = (workoutId) => {
  return dispatch => {
    return CommentApiUtil.fetchWorkoutComments(workoutId).then(comments => {
      return dispatch(receiveComments(comments));
    });
  };
};

export const createComment = comment => {
  return dispatch => {
    return CommentApiUtil.createComment(comment).then(comment => {
      return dispatch(receiveComment(comment));
    });
  };
};
