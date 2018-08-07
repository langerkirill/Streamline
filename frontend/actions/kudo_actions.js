import * as KudoApiUtil from "../util/kudos_api_util";

export const RECEIVE_KUDOS = "RECEIVE_KUDOS";
export const RECEIVE_KUDO = "RECEIVE_KUDO";

const receiveKudos = ({ kudos }) => {
  return {
    type: RECEIVE_KUDOS,
    kudos
  };
};

const receiveKudo = kudo => {
  return {
    type: RECEIVE_KUDO,
    kudo
  };
};

const removeKudo = kudoId => {
  return {
    type: REMOVE_KUDO,
    kudoId
  };
};

export const fetchWorkoutKudos = (workoutId) => {
  return dispatch => {
    return KudoApiUtil.fetchWorkoutKudos(workoutId).then(kudos => {
      return dispatch(receiveKudos(kudos));
    });
  };
};

export const createKudo = kudo => {
  return dispatch => {
    return KudoApiUtil.createKudo(kudo).then(kudo => {
      return dispatch(receiveKudo(kudo));
    });
  };
};
