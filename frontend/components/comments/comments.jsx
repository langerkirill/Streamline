import React from 'react';
import {connect} from 'react-redux';

class Comments extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text: ""
    }
    this.handleAddComment = this.handleAddComment.bind(this);
    this.updateText = this.updateText.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(commentId) {
    return () => {
      this.props.deleteComment(commentId);
    }
  }

  updateText () {
    return e => {
      this.setState({text:e.currentTarget.value})
    }
  }

  render(){

    let comments;

    if (this.props.comments.length > 0) {
      let i = 0;
      comments = this.props.comments.map((comment) => {
        i+=1;

        let commentator = this.props.commenters.filter(function(commenter) {
          return comment.user_id === commenter.id;
        })

        const removeComment = () => {
          if (this.props.currentUser.id === comment.user_id){
            let commentId = comment.id;
            debugger
            return (<button onClick={this.handleDelete(commentId)} className="delete-comment">X</button>);
          } else {
            return "";
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
  }
}

const msp = (state, ownProps) => {
  const currentUser = state.entities.users[state.session.id];
  const user = state.entities.users[ownProps.workout['user_id']];
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
    commenters,
    commenterIds,
    currentUser
  }
}

const mdp = (dispatch) => {
  return {
    deleteComment: (commentId) => dispatch(deleteComment(commentId))
  }
}

export default connect(msp, mdp)(Comment);
