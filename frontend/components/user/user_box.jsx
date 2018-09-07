import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {fetchUser} from '../../actions/user_actions';
import {fetchUserWorkouts} from '../../actions/workout_actions';

class UserBox extends React.Component {

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

    let following;
    let followers;

    if (this.props.follows.length > 0){
      following = this.props.follows[0].length;
      followers = this.props.follows[1].length;
    } else {
      following = "";
      followers = "";
    }

    let workouts = 0;

    if (this.props.workouts.length > 0){
      this.props.workouts.forEach(workout => {
        if (workout.user_id == this.props.user.id) {workouts += 1};
      })
    }

    return(
      <section className="user-box">
        <div className="icon-container">
          <img className="user-icon" src={img()} ></img>
        </div>
        <div className="username">{this.props.user.username}</div>
        <div className="user-info">
          <article>
            <div className="bts-text"> Following
            </div>
            <div className="bts-data"> {following}
            </div>
          </article>
          <article>
            <div className="bts-text"> Followers
            </div>
            <div className="bts-data"> {followers}
            </div>
          </article>
          <article>
            <div className="bts-text"> Activites
            </div>
            <div className="bts-data"> {workouts}
            </div>
          </article>
        </div>
        <div className="user-activity">
          <div className="l-a"> Latest Activity</div>
          <strong>{latestWorkout}</strong>
          <div className="l-d" >{latestDate}</div>
        </div>
        <NavLink className="user-training-link" to="/training/log"> Your Training Log </NavLink>
      </section>
    );
  }
}

const msp = (state) => {
  const dummy = {username:""};
  const user_id = state.session.id;
  const user = state.entities.users[user_id] || dummy;
  const latestWorkout = state.entities.workouts[user.workoutIds[0]] || [];
  return {
    user,
    latestWorkout
  }
}

export default connect(msp)(UserBox);
