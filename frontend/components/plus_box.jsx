import React from 'react';
import {NavLink, Redirect} from 'react-router-dom'

class PlusBox extends React.Component {

  render() {

    return (
        <div className="plus-box">
          <div className="cover"></div>
          <button>Upload activity</button>
          <button>Add manual entry</button>
          <NavLink style={{textDecoration: 'none'}} className="create-route" to="/route/create">Create a route</NavLink >
          <button>Create a post</button>
        </div>
    );
  }
}

export default PlusBox;
