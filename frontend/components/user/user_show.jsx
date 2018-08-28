import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {fetchUserWorkouts} from '../../actions/workout_actions';
import {fetchUser} from '../../actions/user_actions';
import Calendar from 'rc-calendar';

class UserShow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userId: 0,
      workoutCount: 0
    }
    this.parseData = this.parseData.bind(this);
  }

  componentWillMount() {
    this.props.fetchUser(this.props.userId);
    let that = this;
    this.props.fetchUserWorkouts(this.props.userId).then(response => {
      that.parseData(response.workouts);
    });
  }

  parseData(workouts){
    let count = 0;
    let fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);
    Object.values(workouts).forEach(workout => {
      if (workout.user_id === this.state.userId) {
        let dates = workout.date.split("-");
        let wDate = new Date(parseInt(dates[0]), parseInt(dates[1])-1, parseInt(dates[2]));
        if (wDate > fourWeeksAgo){
          count+=1;
        }
      }
    })
    this.setState({workoutCount:count});
  }

  componentWillReceiveProps(newProps){
    const id = parseInt(newProps.match.params.userId);
    if (this.state.userId !== id) {
      this.setState({userId: id});
      this.props.fetchUser(id);
      let that = this;
      this.props.fetchUserWorkouts(id).then(response => {
        that.parseData(response.workouts);
      });;
    }
  }

  render(){

    debugger

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
        <section className="middle-user-show">
          <article className="last-four">
            <div>Last 4 Weeks</div>
            <div className="workouts-number">{this.state.workoutCount}</div>
            <div> Total Activities </div>
          </article>
          <Calendar className="user-calendar"/>
        </section>
      </div>
    );
  }
}

const msp = (state, ownProps) => {
  const workouts = state.entities.workouts;
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
