import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import React from 'react';
import {fetchRouteMarkers} from '../../actions/marker_actions';

class RouteShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    this.props.fetchRouteMarkers(this.props.match.params.routeId);
    const mapOptions = {
      center: { lat: 40.778541, lng: -73.968195 }, // this is NY
      zoom: 14
    };

    this.map = new google.maps.Map(this.mapNode, mapOptions);
  }

  componentWillReceiveProps() {
    this.calcRoute()
  }

  calcRoute() {
    let request = {
      travelMode: google.maps.TravelMode.BICYCLING
    };

    const directionsDisplay = new google.maps.DirectionsRenderer;
    const directionsService = new google.maps.DirectionsService();
    directionsDisplay.setMap(this.map);
    let infowindow = new google.maps.InfoWindow();

    for (let i=0; i<this.props.markers.length; i++) {
      let marker;
      let pos;
      if (i===0) {
        pos = new google.maps.LatLng(this.props.markers[i].lat, this.props.markers[i].long);
        marker = new google.maps.Marker({
          position: pos,
          map: this.map
        });
      } else {
          pos = new google.maps.LatLng(this.props.markers[i].lat, this.props.markers[i].long);
          marker = new google.maps.Marker({
            position: pos,
            draggable: true
          });
      }

      if (i == 0) request.origin = marker.getPosition();
      else if (i == this.props.markers.length - 1) request.destination = marker.getPosition();
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
    return (
      <div>
        <div className='create-route-map' ref={ map => this.mapNode = map }/>
      </div>
    );
  };
}

const msp = (state, ownProps) => {
  const route = state.entities.routes[ownProps.match.params.routeId];
  const markers = Object.values(state.entities.markers) || [];
  return {
    route,
    markers
  }
}

const mdp = (dispatch) => {
  return {
    fetchRouteMarkers: (routeId) => dispatch(fetchRouteMarkers(routeId))
  }
}

export default withRouter(connect(msp, mdp)(RouteShow));
