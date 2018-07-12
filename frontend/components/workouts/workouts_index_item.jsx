import React from 'react';
import {fetchUser} from '../../actions/user_actions';
import {connect} from 'react-redux';

class WorkoutIndexItem extends React.Component {

  render () {
    debugger
    const icon = () => {
      if (this.props.workout.workout_type === "biking") {
        return (<i class="material-icons">&#xe52f;</i>);
      } else {
        return (<i class="material-icons">&#xe566;</i>);
      }
    }

    return (
      <div className="workout-box">
        {icon()}
        <div>{this.props.user.username}</div>
        <div>Date: {this.props.workout.date}</div>
        <div>Distance: {this.props.workout.miles}</div>
        <div>Time: {this.props.workout.duration}</div>
      </div>
    );
  }
}

const msp = (state, ownProps) => {
  const user = state.entities.users[ownProps.workout['user_id']];
  return {
    user
  }
}

export default connect(msp)(WorkoutIndexItem);
