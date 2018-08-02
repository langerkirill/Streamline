import * as WorkoutApiUtil from "../util/workout_api_util";

export const RECEIVE_WORKOUTS = "RECEIVE_WORKOUTS";
export const RECEIVE_WORKOUT = "RECEIVE_WORKOUT";

const receiveWorkouts = ({ workouts, users, routes, comments }) => {
  return {
    type: RECEIVE_WORKOUTS,
    workouts,
    users,
    routes,
    comments
  };
};

const receiveWorkout = workout => {
  return {
    type: RECEIVE_WORKOUT,
    workout
  };
};

export const fetchWorkouts = () => {
  return dispatch => {
    return WorkoutApiUtil.fetchWorkouts().then(payload => {
      return dispatch(receiveWorkouts(payload));
    });
  };
};

export const fetchUserWorkouts = (userId) => {
  return dispatch => {
    return WorkoutApiUtil.fetchUserWorkouts(userId).then(workouts => {
      return dispatch(receiveWorkouts(workouts));
    });
  };
};

export const createWorkout = workout => {
  return dispatch => {
    return WorkoutApiUtil.createWorkout(workout).then(workout => {
      return dispatch(receiveWorkout(workout));
    });
  };
};
