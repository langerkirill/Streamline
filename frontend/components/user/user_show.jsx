import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

class UserShow extends React.Component {

  render(){
    debugger
    return (
      <div>
        <img className="show-img" src={this.props.user.photoUrl}>
        </img>
      </div>
    );
  }
}

const msp = (state, ownProps) => {
  const user = state.entities.users[ownProps.match.params.userId];
  debugger
  return {
    user
  }
}

export default withRouter(connect(msp)(UserShow));
