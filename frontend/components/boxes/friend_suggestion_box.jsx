import React from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {follow} from '../../actions/follow_actions';

class FriendSuggestionBox extends React.Component {

  handleFollow(id){
    return () => {
      debugger
      this.props.follow(id);
    }
  }

  render() {
    let that = this;
    let friends = this.props.users.map(user => {
      debugger
      if (that.props.follows.length > 0) {
        if (!that.props.follows[0].includes(user.id) && (user.id != this.props.user.id)){
        return (
          <section key={user.id} className="friend-suggestion">
            <img className="friend-image" src={user.photoUrl}>
            </img>
            <div>
              <div>{user.username}</div>
              <button onClick={this.handleFollow(user.id)} className="follow">Follow</button>
            </div>
          </section>);
        }
      }
    })

    return (
        <div className="friend-box">
          <div className="s-f">Suggested Friends</div>
          {friends}
        </div>
    );
  }
}

const mdp = (dispatch) => {
  return {
    follow: (followId) => dispatch(follow(followId))
  }
}

export default connect(null, mdp)(FriendSuggestionBox);
