import * as ChallengeApiUtil from "../util/challenge_api_util";

export const RECEIVE_CHALLENGES = "RECEIVE_CHALLENGES";
export const RECEIVE_CHALLENGE = "RECEIVE_CHALLENGE";

const receiveChallenges = ({ challenges }) => {
  return {
    type: RECEIVE_CHALLENGES,
    challenges
  };
};

const receiveChallenge = challenge => {
  return {
    type: RECEIVE_CHALLENGE,
    challenge
  };
};

export const fetchChallenges = (workoutId) => {
  return dispatch => {
    return ChallengeApiUtil.fetchChallenges(workoutId).then(challenges => {
      return dispatch(receiveChallenges(challenges));
    });
  };
};

export const fetchChallenge = challenge => {
  return dispatch => {
    return ChallengeApiUtil.fetchChallenge(challenge).then(challenge => {
      return dispatch(receiveChallenge(challenge));
    });
  };
};
