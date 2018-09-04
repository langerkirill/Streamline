import * as FollowApiUtil from "../util/follow_api_util";

export const RECEIVE_FOLLOWS = "RECEIVE_FOLLOWS";
export const RECEIVE_FOLLOW = "RECEIVE_FOLLOW";

const receiveFollows = ({ follows }) => {
  return {
    type: RECEIVE_FOLLOWS,
    follows
  };
};

const receiveFollow = follow => {
  return {
    type: RECEIVE_FOLLOW,
    follow
  };
};

export const fetchFollows = () => {
  return dispatch => {
    return FollowApiUtil.fetchFollows().then(follows => {
      return dispatch(receiveFollows(follows));
    });
  };
};

export const fetchFollow = follow => {
  return dispatch => {
    return FollowApiUtil.fetchFollow(follow).then(follow => {
      return dispatch(receiveFollow(follow));
    });
  };
};

export const follow = followId => {
  return dispatch => {
    return FollowApiUtil.follow(followId).then(follow => {
      return dispatch(receiveFollow(follow));
    });
  };
};
