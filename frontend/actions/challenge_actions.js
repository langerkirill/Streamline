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

export const fetchChallenges = () => {
  return dispatch => {
    return ChallengeApiUtil.fetchChallenges().then(challenges => {
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

export const joinChallenge = challengeId => {
  return dispatch => {
    return ChallengeApiUtil.joinChallenge(challengeId).then(challenge => {
      return dispatch(receiveChallenge(challenge));
    });
  };
};
