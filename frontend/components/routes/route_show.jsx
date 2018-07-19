import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React from 'react';
import { fetchRouteMarkers } from '../../actions/marker_actions';
import { fetchUser } from '../../actions/user_actions';
import { fetchRoute } from '../../actions/route_actions';
import RouteCreateBox from '../user/route_create_box';


class RouteShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    this.props.fetchRoute(this.props.match.params.routeId).then(data => {
      this.props.fetchUser(data.route.user_id);
    });
    this.props.fetchRouteMarkers(this.props.match.params.routeId);
    const mapOptions = {
      center: { lat: 40.778541, lng: -73.968195 }, // this is NY
      zoom: 14
    };

    this.map = new google.maps.Map(this.mapNode, mapOptions);
  }

  componentWillReceiveProps(nextProps, ownProps) {
    let coordinates = [];
    for (let i=0; i<nextProps.markers.length; i++) {
      if (nextProps.markers[i].route_id == nextProps.match.params.routeId) {
        coordinates.push(nextProps.markers[i]);
      }
    }
    this.calcRoute(coordinates);
  }

  calcRoute(markers) {
    let request = {
      travelMode: google.maps.TravelMode.BICYCLING
    };

    const directionsDisplay = new google.maps.DirectionsRenderer;
    const directionsService = new google.maps.DirectionsService();
    directionsDisplay.setMap(this.map);
    let infowindow = new google.maps.InfoWindow();
    for (let i=0; i<markers.length; i++) {
      let marker;
      let pos;
      if (i===0) {
        pos = new google.maps.LatLng(markers[i].lat, markers[i].lng);
        marker = new google.maps.Marker({
          position: pos,
          map: this.map
        });
      } else {
          pos = new google.maps.LatLng(markers[i].lat, markers[i].lng);
          marker = new google.maps.Marker({
            position: pos,
            draggable: true
          });
      }

      if (i == 0) request.origin = marker.getPosition();
      else if (i == markers.length - 1) request.destination = marker.getPosition();
      else {
        if (!request.waypoints) request.waypoints = [];
          request.waypoints.push({
            location: marker.getPosition(),
            stopover: true
          });
        }
      }

      directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

          directionsDisplay.setDirections(result);
        }
      });
    }

  render () {
    debugger

    const createBox = () => {
      if (this.props.creator.length !== 0) {
        return (<RouteCreateBox route={this.props.route} user={this.props.creator}/>);
      } else {
        return ("");
      }
    }


    return (
      <div className="map-show-page">
        <div className="show-map-container">
          <div className='show-route-map' ref={ map => this.mapNode = map }/>
        </div>
        <div className="user-info-stats">
          {createBox()}
        </div>
      </div>
    );
  };
}

const msp = (state, ownProps) => {

  const route = state.entities.routes[ownProps.match.params.routeId] || [];
  const markers = Object.values(state.entities.markers) || [];
  const creator = state.entities.users[route.user_id] || [];
  return {
    route,
    markers,
    creator
  }
}

const mdp = (dispatch) => {
  return {
    fetchRouteMarkers: (routeId) => dispatch(fetchRouteMarkers(routeId)),
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    fetchRoute: (routeId) => dispatch(fetchRoute(routeId))
  }
}

export default withRouter(connect(msp, mdp)(RouteShow));
