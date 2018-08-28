export const fetchWorkouts = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/workouts'
  });
};

export const createWorkout = formData => {

  return $.ajax({
    method: 'POST',
    url: `/api/workouts`,
    data: formData,
    contentType: false,
    processData: false
  });
};

export const fetchUserWorkouts = (userId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${userId}/workouts`
  });
};
