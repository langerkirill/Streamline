import React from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {follow} from '../../actions/follow_actions';

class FriendSuggestionBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  handleFollow(id){
    return () => {

      this.props.follow(id);
    }
    this.setState({id: true});
  }

  render() {
    debugger
    let that = this;
    let friends = this.props.users.map(user => {
      if (that.props.following) {
        if (!that.props.following.includes(user.id)){
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

const msp = (state) => {
  const following = state.entities.follows.followingIds;
  return {
    following
  }
}

const mdp = (dispatch) => {
  return {
    follow: (followId) => dispatch(follow(followId))
  }
}

export default connect(msp, mdp)(FriendSuggestionBox);
