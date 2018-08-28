import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {fetchUserWorkouts} from '../../actions/workout_actions'

class UserShow extends React.Component {

  componentWillMount() {
    this.props.fetchUserWorkouts(this.props.user.id);
  }

  render(){

    let pictures = this.props.photos.map(photo => {
      return (
        <img className="workout-photo" src={photo}></img>
      );
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
  const user = state.entities.users[ownProps.match.params.userId];
  let photos = Object.values(state.entities.workouts).map(workout => {
    return workout.photoUrl;
  })

  return {
    photos,
    user
  }
}

const mdp = (dispatch) => {
  return {
    fetchUserWorkouts: (userId) => dispatch(fetchUserWorkouts(userId))
  }
}

export default withRouter(connect(msp,mdp)(UserShow));
