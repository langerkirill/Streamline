import React from 'react';
import { connect } from 'react-redux';
import WorkoutIndexItem from './workouts_index_item';
import {fetchWorkouts} from '../../actions/workout_actions';

class WorkoutIndex extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      workouts: []
    }
    this.dateSorter = this.dateSorter.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    let workouts = nextProps.workouts;
    this.dateSorter(workouts)
  }

  dateSorter(workouts) {
    workouts.sort(function(a,b){
    var c = new Date(a.date);
    var d = new Date(b.date);
    return d-c;
    });
    this.setState({workouts: workouts})
  }

  render () {
    let workoutIndex;
    if (Object.values(this.state.workouts).length === 0) {
      workoutIndex = "";
    } else {
      workoutIndex = this.state.workouts.map(workout => {
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
