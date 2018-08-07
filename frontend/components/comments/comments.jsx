import React from 'react';
import {connect} from 'react-redux';
import { deleteComment } from '../../actions/comment_actions';


class Comments extends React.Component{
  constructor(props){
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(commentId) {
    return () => {
      this.props.deleteComment(commentId);
    }
  }

  render(){

    let comment;

    if (this.props.comment) {
      let i = 0;
      comment = this.props.comment;

        const removeComment = () => {
          if (this.props.currentUser.id === comment.user_id){
            let commentId = comment.id;
            return (<button onClick={this.handleDelete(commentId)} className="delete-comment">X</button>);
          } else {
            return "";
          }
        }

        return (
          <div key={i+1} className="wbox-comment">
            <div className="comment-left">
              <img src={this.props.commentator[0].photoUrl} className="commenter-image"></img>
              <div className="comment-text">
                <strong>{this.props.commentator[0].username}</strong>
                <div key={i}>{this.props.comment.text}</div>
              </div>
            </div>
            {removeComment()}
          </div>
        );
    } else {
      return ("");
    }
  }
}

const mdp = (dispatch) => {
  return {
    deleteComment: (commentId) => dispatch(deleteComment(commentId))
  }
}

export default connect(null, mdp)(Comments);
