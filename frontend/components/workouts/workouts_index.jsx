import React from 'react';
import { connect } from 'react-redux';
import WorkoutIndexItem from './workouts_index_item';
import {fetchWorkouts} from '../../actions/workout_actions';

class WorkoutIndex extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      workouts: [],
      display: "Your Activities"
    }
    this.dateSorter = this.dateSorter.bind(this);
    this.workoutSorter = this.workoutSorter.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ display: nextProps.display }, this.workoutSorter);
  }

  workoutSorter() {
    let workouts = this.props.workouts;
    let filteredWorkouts = [];
    if (this.state.display === "Your Activities"){
      workouts.forEach((workout) => {
        if (workout.user_id === this.props.user.id){
          filteredWorkouts.push(workout);
        }
      });
    } else {
      workouts.forEach((workout) => {
        if (workout.user_id !== this.props.user.id){
          filteredWorkouts.push(workout);
        }
      });
    }
    
    this.dateSorter(filteredWorkouts);
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
