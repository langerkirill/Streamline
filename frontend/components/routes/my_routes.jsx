import React from 'react';
import MyRoutesItem from './my_routes_item';
import { fetchUserMarkers } from '../../actions/marker_actions';
import { fetchRoutes } from '../../actions/route_actions';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

class MyRoutes extends React.Component {
  constructor(props){
    super(props);
    this.markerSorter = this.markerSorter.bind(this);
    this.state = {
      markers: []
    }
  }

  componentDidMount() {
    this.props.fetchRoutes();
    this.props.fetchUserMarkers(this.props.user.id);
  }

  componentWillReceiveProps (nextProps) {
    this.markerSorter(nextProps.markers);
  }

  markerSorter(markers) {
    let allMarkers = [];
      for (let i=0; i<markers.length-1; i++){
        let current = [];
        while ((markers[i].route_id) === (markers[i+1].route_id)) {
          current.push(markers[i])
          i+=1
          if ((markers[i+1]) === undefined) break;
        }
        current.push(markers[i]);
        allMarkers.push(current);
        current = [];
      }
    let sorted = allMarkers.sort(function(a,b){
      return b[0].created_at > a[0].created_at;
    });

    this.setState({markers: allMarkers});
  }

  render () {

    const routes = this.state.markers.map(markers => {
      let route = this.props.routes[markers[0].route_id];
      
      return(<MyRoutesItem route={route} key={markers[0].id} markers={markers}/>);
    })

    return (
      <div className='my-routes-index'>
        <h1 className="my-routes"> My Routes</h1>
        <NavLink style={{textDecoration: 'none'}} className="routes-link" to="/route/create">Create New Route</NavLink>
        <div className="my-routes-container">
          {routes}
        </div>
      </div>
    );
  }
}

const msp = state => {

  const routes = state.entities.routes;
  const user = state.entities.users[state.session.id] || [];
  const markers = Object.values(state.entities.markers);
  return {
    markers,
    user,
    routes
  }
}

const mdp = dispatch => {
  return {
    fetchUserMarkers: (userId) => dispatch(fetchUserMarkers(userId)),
    fetchRoutes: () => dispatch(fetchRoutes())
  }
}

export default connect(msp, mdp)(MyRoutes);
