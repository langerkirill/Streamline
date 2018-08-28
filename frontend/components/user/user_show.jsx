import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {fetchUserWorkouts} from '../../actions/workout_actions'
import {fetchUser} from '../../actions/user_actions'

class UserShow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userId: 0
    }
  }

  componentWillMount() {
    this.props.fetchUser(this.props.userId);
    this.props.fetchUserWorkouts(this.props.userId);
  }

  componentWillReceiveProps(newProps){
    const id = parseInt(newProps.match.params.userId);
    this.setState({userId: id});
    if (this.state.userId !== id) {
      this.props.fetchUser(id);
      this.props.fetchUserWorkouts(id);
    }
  }

  render(){
    let i = 0;
    let pictures = this.props.photos.map(photo => {
      if (photo !== undefined && i < 4) {
        i++;
        return (
          <img key={i} className="workout-photo" src={photo}></img>
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
  const workouts = state.entities.workouts;
  debugger
  const userId = ownProps.match.params.userId;
  const user = state.entities.users[ownProps.match.params.userId] || {};
  let photos = Object.values(state.entities.workouts).map(workout => {
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
