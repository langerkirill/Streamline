import React from 'react';
import MyRoutesItem from './my_routes_item';
import { fetchUserMarkers } from '../../actions/marker_actions';
import {connect} from 'react-redux';

class MyRoutes extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.fetchUserMarkers(this.props.user.id).then();
  }

  componentWillReceiveProps (nextProps) {
    debugger
  }

  render () {
    const routes = this.props.routes.map(route => {
      return(<MyRoutesItem route={route}/>);
    })

    return (
      <div>
        <h1>Hi</h1>
      </div>
    );
  }
}

const msp = state => {
  const user = state.entities.users[state.session.id] || [];
  const markers = Object.values(state.entities.markers);
  return {
    markers,
    user
  }
}

const mdp = dispatch => {
  return {
    fetchUserMarkers: (userId) => dispatch(fetchUserMarkers(userId))
  }
}

export default connect(msp, mdp)(MyRoutes);
