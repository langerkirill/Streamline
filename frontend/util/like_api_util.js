export const fetchWorkoutLikes = (workoutId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/workout/${workoutId}/likes`
  });
};

export const fetchLike = (likeId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/likes/${likeId}`
  });
};

export const createLike = (like) => {
  return $.ajax({
    method: 'POST',
    url: `/api/likes`,
    data: { like }
  });
};
