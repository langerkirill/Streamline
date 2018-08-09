export const fetchChallenges = (challengeId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/challenges`
  });
};

export const fetchChallenge = (challengeId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/challenges/${challengeId}`
  });
};
