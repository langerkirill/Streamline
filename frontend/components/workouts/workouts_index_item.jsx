import React from 'react';
import {fetchUser} from '../../actions/user_actions';
import {connect} from 'react-redux';
import WorkoutRoute from './workout_route';
import {withRouter} from 'react-router-dom';

class WorkoutIndexItem extends React.Component {

  constructor(props){
    super(props);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleRedirect () {
    this.props.history.push(`/routes/${this.props.route.id}`)
  }

  render () {

    const icon = () => {
      if (this.props.workout.workout_type === "biking") {
        return (<i className="index-icon material-icons">&#xe52f;</i>);
      } else {
        return (<i className="index-icon material-icons">&#xe566;</i>);
      }
    }

    let comments;

    if (this.props.comment.length > 0) {
      let i = 0;
      comments = this.props.comment.map((comment) => {
        i+=1;

        let commentator = this.props.commenters.map(commenter => {
          if (commenter.id === comment.user_id){
            return commenter;
          }
        })

        return (
          <div key={i+1} className="wbox-comment">
            <img src={commentator[0].photoUrl} className="commenter-image"></img>
            <div className="comment-text">
              <strong>{commentator[0].username}</strong>
              <div key={i}>{comment.text}</div>
            </div>
          </div>
        );
      });
    } else {
      comment = "";
    }

    return (
      <div onClick={this.handleRedirect} className="workout-box">
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
            <div className="elevation">{this.props.workout.elevation} ft</div>
          </div>
          <div>
            <div className="stats-label"> Time: </div>
            <div className="time"> {this.props.workout.duration} minutes</div>
          </div>
        </div>
        <div className="map-container">
          <WorkoutRoute key={this.props.workout.route_id} routeId={this.props.workout.route_id}/>
        </div>
        {comments}
        <div className="like-comment">
          <button className="lc"><i className="fa">&#xf0a4;</i></button>
          <button className="lc"><i className="fa">&#xf0e5;</i></button>
        </div>
      </div>
    );
  }
}

const msp = (state, ownProps) => {

  const user = state.entities.users[ownProps.workout['user_id']];
  const route = state.entities.routes[ownProps.workout['route_id']];
  let commenterIds = ownProps.comment.map((comment) => {
    return comment.user_id;
  });
  let commenters = [];
  Object.values(state.entities.users).forEach((person) => {
    if (commenterIds.includes(person.id)){
      commenters.push(person);
    }
  });
  return {
    user,
    route,
    commenters
  }
}

export default withRouter(connect(msp)(WorkoutIndexItem));
