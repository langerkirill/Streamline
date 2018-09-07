import React from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class IconBox extends React.Component {

  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout () {
    this.props.logout().then(() =>
    this.props.history.push(`/`));
  }

  render() {
      return (
          <div className="icon-box">
            <div className="icon-cover"></div>
            <Link className="logout-button" style={{textDecoration: "none"}} to={`/users/${this.props.user.id}`}>My Profile</Link>
            <Link className="logout-button" style={{textDecoration: "none"}} onClick={this.handleLogout} to="/">Log Out</Link>
          </div>
      );
    }
  }

const msp = (state) => {
  const loggedIn = state.session.id;
  const user = state.entities.users[state.session.id];
  
  return {
    user,
    loggedIn
  }
}

export default withRouter(connect(msp, null)(IconBox));
