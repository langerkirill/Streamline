import React from 'react';
import {fetchUser} from '../../actions/user_actions';
import {connect} from 'react-redux';
import WorkoutRoute from './workout_route';
import { createComment, deleteComment } from '../../actions/comment_actions'
import {withRouter} from 'react-router-dom';

class WorkoutIndexItem extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      addComment: false,
      text: ""
    }
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleAddComment = this.handleAddComment.bind(this);
    this.updateText = this.updateText.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleRedirect () {
    this.props.history.push(`/routes/${this.props.route.id}`);
  }

  handleAddComment(){
    let bool = !this.state.addComment;
    this.setState({addComment: bool});
  }

  updateText () {
    return e => {
      this.setState({text:e.currentTarget.value})
    }
  }

  handleSave(){
    let comment = {};
    comment.text = this.state.text;
    comment.workout_id = this.props.workout.id;
    this.props.createComment(comment);
    this.setState({text: ""});
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

    const addComment = () => {
      if (this.state.addComment) {
        return (
          <div className="step">
            <img className="user-img" src={this.props.currentUser.photoUrl}/>
            <div className="comment-info-container">
              <input onChange={this.updateText()} placeholder="Add a comment..." value={this.state.text} className="comment-input"></input>
              <button onClick={this.handleSave} className="comment-post" >Post</button>
            </div>
          </div>
        );
      } else {
        return ("");
      }
    }

    if (this.props.comment.length > 0) {
      let i = 0;
      comments = this.props.comment.map((comment) => {
        i+=1;

        let commentator = this.props.commenters.filter(function(commenter) {
          return comment.user_id === commenter.id;
        })

        const removeComment = () => {
          if (this.props.currentUser.id === comment.user_id){
            return (<button className="delete-comment">X</button>);
          } else {
            return ("");
          }
        }

        return (
          <div key={i+1} className="wbox-comment">
            <div className="comment-left">
              <img src={commentator[0].photoUrl} className="commenter-image"></img>
              <div className="comment-text">
                <strong>{commentator[0].username}</strong>
                <div key={i}>{comment.text}</div>
              </div>
            </div>
            {removeComment()}
          </div>
        );
      });
    } else {
      comments = "";
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
        <div onClick={this.handleRedirect} className="workout-title">
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
          <button onClick={this.handleAddComment} className="lc"><i className="fa">&#xf0e5;</i></button>
        </div>
        {addComment()}
      </div>
    );
  }
}

const msp = (state, ownProps) => {
  const currentUser = state.entities.users[state.session.id];
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
  debugger
  return {
    user,
    route,
    commenters,
    commenterIds,
    currentUser
  }
}

const mdp = (dispatch) => {
  return {
    createComment: (comment) => dispatch(createComment(comment)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId))
  }
}

export default withRouter(connect(msp, mdp)(WorkoutIndexItem));
