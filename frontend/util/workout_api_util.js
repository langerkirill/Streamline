export const fetchWorkouts = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/workouts'
  });
};

export const createWorkout = workout => {
  return $.ajax({
    method: 'POST',
    url: `/api/workouts`,
    data: { workout }
  });
};

export const fetchUserWorkouts = (userId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${userId}/workouts`
  });
};
