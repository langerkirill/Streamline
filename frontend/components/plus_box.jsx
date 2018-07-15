import React from 'react';
import {NavLink} from 'react-router-dom'

class PlusBox extends React.Component {

  render() {
    debugger
    return (
        <div className="plus-box">
          <button>Upload activity</button>
          <button>Add manual entry</button>
          <NavLink className="create-route" to="/create/route">Create a route</NavLink >
          <button>Create a post</button>
        </div>
    );
  }
}

export default PlusBox;
