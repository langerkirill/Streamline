import React from 'react';
import WorkoutIndex from '../workouts/workouts_index';
import UserBox from '../user/user_box';
import { connect } from 'react-redux';

class Dashboard extends React.Component {

  componentDidMount() {
    this.props.fetchWorkouts();
  }

  render () {
    return (
      <div className="dash-bored">
        <UserBox />
        <WorkoutIndex workouts={this.props.workouts}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const workouts = Object.values(state.entities.workouts);
  const users = state.entities.users;
  return {
    workouts,
    users
  };
};

const mapDispatchToProps = (dispatch) => {
  // here we want to dispatch an action to signup a user and call it formAction
  return {
    fetchWorkouts: () => dispatch(fetchWorkouts())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
