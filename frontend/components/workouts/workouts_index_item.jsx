import React from 'react';
import {fetchUser} from '../../actions/user_actions';
import {connect} from 'react-redux';
import WorkoutRoute from './workout_route';
import { createComment } from '../../actions/comment_actions';
import {withRouter} from 'react-router-dom';
import Comment from '../comments/comments';
import Kudos from '../kudos/kudos';
import { createKudo } from '../../actions/kudo_actions';


class WorkoutIndexItem extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      addComment: false,
      text: "",
      comments: []
    }
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleAddComment = this.handleAddComment.bind(this);
    this.updateText = this.updateText.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.giveKudo = this.giveKudo.bind(this);
  }

  handleRedirect () {
    this.props.history.push(`/routes/${this.props.route.id}`);
  }

  handleClick(id){
    return () =>{
      this.props.history.push(`/users/${id}`)
    }
  }


  handleAddComment(){
    let bool = !this.state.addComment;
    this.setState({addComment: bool});
  }

  giveKudo(){
    let kudo = {};
    kudo.workout_id = this.props.workout.id;
    this.props.createKudo(kudo);
  }

  componentDidMount() {
    let newComments = this.props.comment;
    this.setState({comments: newComments});
  }

  componentWillReceiveProps(nextProps, ownProps) {
    let newComments = nextProps.comment;
    this.setState({comments: newComments});
  }

  updateText () {
    return e => {
      this.setState({text: e.currentTarget.value})
    }
  }

  handleSave(){
    let comment = {};
    if (this.state.text.length === 0) return;
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

    if (this.state.comments.length > 0) {
      let i = 0;
      comments = this.state.comments.map((comment) => {
        i+=1;

        let commentator = this.props.commenters.filter(function(commenter) {
          return comment.user_id === commenter.id;
        })

        const removeComment = () => {
          if (this.props.currentUser.id === comment.user_id){
            let commentId = comment.id;

            return (<button onClick={this.handleDelete(commentId)} className="delete-comment">X</button>);
          } else {
            return "";
          }
        }

        return (
            <Comment key={i} currentUser={this.props.currentUser} commentator={commentator} comment={comment}></Comment>
        );
      });
    } else {
      comments = "";
    }

    let color;
    if (this.props.kudosIds.includes(this.props.currentUser.id)){
      color = "orange";
    } else {
      color = ""
    }

    let image;
    if (this.props.workout.photoUrl && !this.props.workout.route_id) {
      image = (<img className="dash-workout-image-bigger" src={`${this.props.workout.photoUrl}`}/>);
    } else if (this.props.workout.photoUrl) {
      image = (<img className="dash-workout-image" src={`${this.props.workout.photoUrl}`}/>);
    } else {
      image = "";
    }

    let map;
    if (this.props.workout.route_id) {
      map = (<div className="map-container">
              <WorkoutRoute key={this.props.workout.route_id} routeId={this.props.workout.route_id}/>
            </div>);
    } else {
      map = ""
    }

    return (
      <div className="workout-box">
        <div className="top-left-image">
          <img onClick={this.handleClick(this.props.user.id)} className="dash-feed-image" src={`${this.props.user.photoUrl}`}/>
        </div>
        {icon()}
        <div className="wbox-header">
          <div onClick={this.handleClick(this.props.user.id)} className="wbox-name">{this.props.user.username}</div>
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
            <div className="elevation">{this.props.workout.elevation} m</div>
          </div>
          <div>
            <div className="stats-label"> Time: </div>
            <div className="time"> {this.props.workout.duration} minutes</div>
          </div>
        </div>
        {map}
        {image}
        <Kudos currentUser={this.props.currentUser} workout={this.props.workout}/>
        {comments}
        <div className="like-comment">
          <button onClick={this.giveKudo} className={`${color} kudo-button lc`}><i className="fa">&#xf0a4;</i></button>
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

  let kudosIds = Object.values(state.entities.kudos).map((kudos) => {
    if (ownProps.workout.id === kudos.workout_id){
      return kudos.user_id;
    }
  });

  return {
    user,
    route,
    commenters,
    commenterIds,
    currentUser,
    kudosIds
  }
}

const mdp = (dispatch) => {
  return {
    createComment: (comment) => dispatch(createComment(comment)),
    createKudo: (comment) => dispatch(createKudo(comment)),
  }
}

export default withRouter(connect(msp, mdp)(WorkoutIndexItem));
