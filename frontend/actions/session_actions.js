import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const LOGIN_USER = "LOGIN_USER";
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';

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

const loginCurrentUser = (user) => {
  return {
    type: LOGIN_USER,
    user
  };
};

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const clearSessionErrors = () => {
  return {
    type: CLEAR_SESSION_ERRORS
  };
};

export const login = user => {
  return dispatch => {
    return SessionApiUtil.login(user).then(user => {
      return dispatch(loginCurrentUser(user));
    }, errors => (
      dispatch(receiveErrors(errors.responseJSON))
    ));
  };
};
export const signup = user => {
  return dispatch => {
    return SessionApiUtil.signup(user).then(user => {
      return dispatch(loginCurrentUser(user));
    }, errors => (
        dispatch(receiveErrors(errors.responseJSON))
    ));
  };
};

export const logout = () => {
  return dispatch => {
    return SessionApiUtil.logout().then(() => dispatch(logoutCurrentUser()));
  };
};

export const clearErrors = () => {
  return dispatch => {
    dispatch(clearSessionErrors());
  };
};
