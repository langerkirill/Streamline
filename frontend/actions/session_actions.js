import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";

const receiveCurrentUser = user => {
  return {
    type: RECEIVE_CURRENT_USER,
    user
  };
};
const logoutCurrentUser = () => {
  return {
    type: LOGOUT_CURRENT_USER
  };
};

export const login = user => {
  return dispatch => {
    return SessionApiUtil.login(user).then(user => {
      return dispatch(receiveCurrentUser(user));
    }, errors => {
      return console.log(errors.responseJSON);
    });
  };
};
export const signup = user => {
  return dispatch => {
    return SessionApiUtil.signup(user).then(user => {
      return dispatch(receiveCurrentUser(user));
    });
  };
};

export const logout = () => {
  return dispatch => {
    return SessionApiUtil.logout().then(() => dispatch(logoutCurrentUser()));
  };
};
