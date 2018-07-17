import * as UserApiUtil from "../util/user_api_util";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER = "RECEIVE_USER";

const receiveUsers = users => {
  return {
    type: RECEIVE_USERS,
    users
  };
};

const receiveUser = user => {
  return {
    type: RECEIVE_USER,
    user
  };
};

export const fetchUsers = () => {
  return dispatch => {
    return UserApiUtil.fetchUsers().then(users => {
      return dispatch(receiveUsers(users));
    });
  };
};

export const fetchUser = (userId) => {
  return dispatch => {
    return UserApiUtil.fetchUser(userId).then(user => {
      return dispatch(receiveUser(user));
    });
  };
};

export const createUser = user => {
  return dispatch => {
    return UserApiUtil.createUser(user).then(user => {
      return dispatch(receiveUser(user));
    });
  };
};
