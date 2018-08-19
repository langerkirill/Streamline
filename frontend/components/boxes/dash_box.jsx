import React from 'react';
import {NavLink, Redirect} from 'react-router-dom'

class DashBox extends React.Component {

  render() {
    return (
        <div className="dash-box">
          <div className="dash-cover"></div>
          <NavLink className="goto-dash create-route" to="/dashboard">Activity Feed</NavLink >
          <NavLink  className="dash-create-route create-route" to="/routes">My Routes</NavLink >
        </div>
    );
  }
}

export default DashBox;
