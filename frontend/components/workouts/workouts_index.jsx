import React from 'react';
import { connect } from 'react-redux';
import WorkoutIndexItem from './workouts_index_item'

class WorkoutIndex extends React.Component {

  componentDidMount() {

    this.props.fetchWorkouts();
  }

  render () {

    const workoutIndex = this.props.workouts.map(workout => {
        return (<WorkoutIndexItem workout={workout} key={workout.id} />);
      });

    return (
      <div className="dashboard-parent">
        {workoutIndex}
      </div>
    );
  }
}

const msp = (state) => {
  const workouts = Object.values(state.entities.workouts);

  return {
    workouts
  }
}

const mdp = (dispatch) => {
  return {
    fetchWorkouts: () => dispatch(fetchWorkouts())
  }
}

export default connect(msp, mdp)(WorkoutIndex);
