import React from 'react';
import {fetchUser} from '../../actions/user_actions';
import {connect} from 'react-redux';
import WorkoutRoute from './workout_route';

class WorkoutIndexItem extends React.Component {

  render () {

    const icon = () => {
      if (this.props.workout.workout_type === "biking") {
        return (<i className="material-icons">&#xe52f;</i>);
      } else {
        return (<i className="material-icons">&#xe566;</i>);
      }
    }

    return (
      <div className="workout-box">
        <div className="top-left-image">
          <img className="dash-feed-image" src={`${this.props.user.photoUrl}`}/>
        </div>
        {icon()}
        <div className="wbox-header">
          <div className="wbox-name">{this.props.user.username}</div>
          <div className="wbox-date"> {this.props.workout.date}</div>
        </div>
        <div className="workout-title">
          <div className="title">{this.props.workout.title}</div>
        </div>
        <div className="wbox-stats-container">
          <div className="wbox-workout-stats">
            <div className="stats-label">Distance:</div>
            <div className="distance">{this.props.workout.miles} mi</div>
          </div>
          <div className="workout-elevation">
            <div className="stats-label">Elevation Gain:</div>
            <div className="elevation">{this.props.workout.elevation}</div>
          </div>
          <div>
            <div className="stats-label"> Time: </div>
            <div className="time"> {this.props.workout.duration}</div>
          </div>
        </div>
        <div className="map-container">
          <WorkoutRoute routeId={this.props.workout.route_id}/>
        </div>
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
