export const fetchWorkoutKudos = (workoutId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/workout/${workoutId}/kudos`
  });
};

export const fetchKudo = (kudoId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/kudos/${kudoId}`
  });
};

export const createKudo = (kudo) => {
  return $.ajax({
    method: 'POST',
    url: `/api/kudos`,
    data: { kudo }
  });
};
