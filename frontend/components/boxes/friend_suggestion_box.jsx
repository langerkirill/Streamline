import React from 'react';
import {NavLink, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {follow} from '../../actions/follow_actions';

class FriendSuggestionBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {top:false}
    this.handleScroll = this.handleScroll.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount () {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll () {
    let lastScrollY = window.scrollY;
    if (lastScrollY > 142){
      this.setState({top:true})
    } else {
      this.setState({top:false})
    }
  }

  handleClick(id){
    return () =>{
      this.props.history.push(`/users/${id}`)
    }
  }

  handleFollow(id){
    return () => {
      this.props.follow(id);
    }
  }

  render() {
    let scroll_class = this.state.top ? "scroll-friend" : "stay";

    let that = this;
    let friends = this.props.users.map(user => {
      if (that.props.following) {
        if (!that.props.following.includes(user.id)){
        return (
          <section key={user.id} className="friend-suggestion">
            <img className="friend-image" src={user.photoUrl}>
            </img>
            <div>
              <div onClick={this.handleClick(user.id)} className="friend_username">{user.username}</div>
              <button onClick={this.handleFollow(user.id)} className="follow">Follow</button>
            </div>
          </section>);
        }
      }
    })

    return (
        <div className={`${scroll_class} friend-box`}>
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

export default withRouter(connect(msp, mdp)(FriendSuggestionBox));
