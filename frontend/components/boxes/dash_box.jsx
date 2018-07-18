import React from 'react';
import {NavLink, Redirect} from 'react-router-dom'

class DashBox extends React.Component {

  render() {
    return (
        <div className="dash-box">
          <div className="dash-cover"></div>
          <button>Activity Feed</button>
          <NavLink style={{textDecoration: 'none'}} className="dash-create-route create-route" to="/routes">My Routes</NavLink >
        </div>
    );
  }
}

export default DashBox;
