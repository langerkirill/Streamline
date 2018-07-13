import React from 'react';
import WorkoutIndex from '../workouts/workouts_index';
import UserBox from '../user/user_box';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.fetchWorkouts();
  }

  render () {

    return (
      <div className="dash-bored">
        <UserBox/>
        <WorkoutIndex users={this.props.users}/>
      </div>
    );
  }

}

export default Dashboard;
