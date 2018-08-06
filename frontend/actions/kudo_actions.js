import * as KudoApiUtil from "../util/kudos_api_util";

export const RECEIVE_KUDOS = "RECEIVE_KUDOS";
export const RECEIVE_KUDO = "RECEIVE_KUDO";
export const REMOVE_KUDO = "REMOVE_KUDO";

const receiveKudos = ({ kudoss }) => {
  return {
    type: RECEIVE_KUDOS,
    kudoss
  };
};

const receiveKudo = kudos => {
  return {
    type: RECEIVE_KUDO,
    kudos
  };
};

const removeKudo = kudosId => {
  return {
    type: REMOVE_KUDO,
    kudosId
  };
};

export const fetchWorkoutKudos = (workoutId) => {
  return dispatch => {
    return KudoApiUtil.fetchWorkoutKudos(workoutId).then(kudos => {
      return dispatch(receiveKudos(kudos));
    });
  };
};

export const createKudo = kudos => {
  return dispatch => {
    return KudoApiUtil.createKudo(kudos).then(kudos => {
      return dispatch(receiveKudo(kudos));
    });
  };
};
