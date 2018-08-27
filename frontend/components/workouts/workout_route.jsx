import React from 'react'
import MarkerManager from '../../util/marker_manager';
import {connect} from 'react-redux';

class WorkoutRoute extends React.Component {
  //...
  componentDidMount() {
    // set the map to show NY
    const mapOptions = {
      center: { lat: 40.7128, lng: -74.0060 }, // this is NY
      zoom: 11
    };
    this.map = new google.maps.Map(this.mapNode, mapOptions);
    this.MarkerManager = new MarkerManager(this.map);
    if (this.props.route) {
      this.createMarkersFromRoute(this.props.route);
    }
  }

  createMarkersFromRoute(route){
    let myStart = new google.maps.LatLng(route.startlat, route.startlong);
    let myEnd = new google.maps.LatLng(route.endlat, route.endlong);
    let directionMap = this.map;
      this.calcRoute(myStart, myEnd, directionMap);
    }

  calcRoute(start, end, map) {
    let directionsDisplay = new google.maps.DirectionsRenderer;
    let directionsService = new google.maps.DirectionsService();
    let bounds = new google.maps.LatLngBounds();

    let request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            directionsDisplay.setMap(map);
        } else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            let wait = true;
            setTimeout("wait = true", 2000);
      }
    });

    // setTimeout(function () { map.setZoom(map.getZoom() + 1); }, 5000);
  }

  render() {
    return (
        <div ref={ map => this.mapNode = map }/>
      // this ref gives us access to the map dom node
    );
  }
}

const msp = (state, ownProps) => {
  const route = state.entities.routes[ownProps.routeId];
  return {
    route
  }
}


export default connect(msp)(WorkoutRoute);
