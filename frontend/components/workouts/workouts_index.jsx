import React from 'react';
import { connect } from 'react-redux';
import WorkoutIndexItem from './workouts_index_item';
import {fetchWorkouts} from '../../actions/workout_actions';

class WorkoutIndex extends React.Component {

  render () {
    let workoutIndex;

    if (Object.values(this.props.workouts).length === 0) {
      workoutIndex = ""; 
    } else {
      workoutIndex = this.props.workouts.map(workout => {
        return (<WorkoutIndexItem workout={workout} key={workout.id} />);
      });
    }

    return (
      <div className="dashboard-parent">
        {workoutIndex}
      </div>
    );
  }
}

export default WorkoutIndex;
