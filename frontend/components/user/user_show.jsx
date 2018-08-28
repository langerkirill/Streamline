import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {fetchUserWorkouts} from '../../actions/workout_actions'
import {fetchUser} from '../../actions/user_actions'

class UserShow extends React.Component {

  componentWillMount() {
    this.props.fetchUser(this.props.userId);
    this.props.fetchUserWorkouts(this.props.userId);
  }

  render(){

    debugger

    let pictures = this.props.photos.map(photo => {
      if (photo !== undefined) {
        return (
          <img className="workout-photo" src={photo}></img>
        );
      }
    })

    return (
      <div className="user-page-container">
        <div className="user-images">
          {pictures}
          <div className="user-page">
            <img className="show-img" src={this.props.user.photoUrl}>
            </img>
            <div className="user-username"> {this.props.user.username}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const msp = (state, ownProps) => {
  const userId = ownProps.match.params.userId;
  const user = state.entities.users[ownProps.match.params.userId] || {};
  let photos = Object.values(state.entities.workouts).map(workout => {
    debugger
    if (workout.user_id == userId) {
      return workout.photoUrl;
    }
  })

  return {
    userId,
    photos,
    user
  }
}

const mdp = (dispatch) => {
  return {
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    fetchUserWorkouts: (userId) => dispatch(fetchUserWorkouts(userId))
  }
}

export default withRouter(connect(msp,mdp)(UserShow));
