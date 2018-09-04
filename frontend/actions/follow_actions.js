import * as FollowApiUtil from "../util/follow_api_util";

export const RECEIVE_FOLLOWING = "RECEIVE_FOLLOWING";
export const RECEIVE_FOLLOWERS = "RECEIVE_FOLLOWERS";
export const RECEIVE_FOLLOW = "RECEIVE_FOLLOW";

const receiveFollowers = ({ followers }) => {
  return {
    type: RECEIVE_FOLLOWERS,
    followers
  };
};

const receiveFollow = ({ follow }) => {
  return {
    type: RECEIVE_FOLLOW,
    follow
  };
};

const receiveFollowing = following => {
  return {
    type: RECEIVE_FOLLOWING,
    following
  };
};

export const fetchFollowers = () => {
  return dispatch => {
    return FollowApiUtil.fetchFollowers().then(followers => {
      return dispatch(receiveFollowers(followers));
    });
  };
};

export const fetchFollowing = () => {
  return dispatch => {
    return FollowApiUtil.fetchFollowing().then(following => {
      return dispatch(receiveFollowing(following));
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
