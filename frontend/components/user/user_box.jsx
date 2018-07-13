import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {fetchUser} from '../../actions/user_actions';

class UserBox extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount () {

    this.props.fetchUser(this.props.user.id);
  }

  componentWillReceiveProps(newProps){

  }

  render () {

    const img = () => {
      if(this.props.user.photoUrl === undefined){
        return("");
      } else {
        return(this.props.user.photoUrl);
      }
    }

    return(
      <section className="user-box">
        <div className="icon-container">
          <img className="user-icon" src={img()} ></img>
        </div>
        <div className="username">{this.props.user.username}</div>
        <div className="user-info"></div>
        <div className="user-activity"></div>
        <NavLink className="nav-left-links" to="/training"> Training </NavLink>
      </section>
    )
  }
}

const msp = (state) => {
  const dummy = {username:""}
  const user_id = state.session.id;
  const user = state.entities.users[user_id] || dummy;
  return {
    user
  }
}

const mdp = (dispatch) => {
  return {
    fetchUser: (id) => dispatch(fetchUser(id))
  }
}

export default connect(msp, mdp)(UserBox);
