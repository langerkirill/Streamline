import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {fetchUser} from '../../actions/user_actions';
import {fetchUserWorkouts} from '../../actions/workout_actions';

class UserBox extends React.Component {
  constructor(props){
    super(props);
  }

  render () {

    const img = () => {
      if(this.props.user.photoUrl === undefined){
        return("");
      } else {
        return(this.props.user.photoUrl);
      }
    }

    let latestWorkout = this.props.latestWorkout.title;
    let latestDate = this.props.latestWorkout.date;

    if (Object.values(this.props.latestWorkout) === 0){

      latestWorkout = "";
      latestDate = "";
    }

    return(
      <section className="user-box">
        <div className="icon-container">
          <img className="user-icon" src={img()} ></img>
        </div>
        <div className="username">{this.props.user.username}</div>
        <div className="user-info"></div>
        <div className="user-activity">
          <div>Latest Activity</div>
          <strong>{latestWorkout}</strong>
          <div>{latestDate}</div>
        </div>
        <NavLink className="user-training-link" to="/training/log"> Your Training Log </NavLink>
      </section>
    );
  }
}

const msp = (state) => {
  const dummy = {username:""}
  const user_id = state.session.id;
  const user = state.entities.users[user_id] || dummy;
  const latestWorkout = state.entities.workouts[user.workoutIds[0]] || [];
  return {
    user,
    latestWorkout
  }
}

const mdp = (dispatch) => {
  return {
    fetchUser: (id) => dispatch(fetchUser(id)),
    fetchUserWorkouts: (userId) => dispatch(fetchUserWorkouts(userId))
  }
}

export default connect(msp, mdp)(UserBox);
