import * as LikeApiUtil from "../util/like_api_util";

export const RECEIVE_LIKES = "RECEIVE_LIKES";
export const RECEIVE_LIKE = "RECEIVE_LIKE";

const receiveLikes = ({ likes }) => {
  return {
    type: RECEIVE_LIKES,
    likes
  };
};

const receiveLike = like => {
  return {
    type: RECEIVE_LIKE,
    like
  };
};

export const fetchWorkoutLikes = (workoutId) => {
  return dispatch => {
    return LikeApiUtil.fetchWorkoutLikes(workoutId).then(likes => {
      return dispatch(receiveLikes(likes));
    });
  };
};

export const createLike = like => {
  return dispatch => {
    return LikeApiUtil.createLike(like).then(like => {
      return dispatch(receiveLike(like));
    });
  };
};
