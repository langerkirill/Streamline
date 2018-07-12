import React from 'react';
import WorkoutIndex from '../workouts/workouts_index';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.fetchWorkouts();
  }

  render () {
    return (
      <div>
        <WorkoutIndex/>
      </div>
    );
  }

}

export default Dashboard;
