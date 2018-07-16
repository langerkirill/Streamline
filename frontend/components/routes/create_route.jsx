import React from 'react'
import MarkerManager from '../../util/marker_manager';
import {connect} from 'react-redux';

class CreateRoute extends React.Component {

  constructor (props){
    super(props);
    this.state = {
      miles: 0
    }
    this.markers = [];
  }


  componentDidMount() {
    // set the map to show NY
    const mapOptions = {
      center: { lat: 40.778541, lng: -73.968195 }, // this is NY
      zoom: 14
    };

    this.map = new google.maps.Map(this.mapNode, mapOptions);
    this.MarkerManager = new MarkerManager(this.map);
    this.parseData = this.parseData.bind(this);
    this.map.addListener('click', (e) => {
      this.placeMarker(e.latLng, this.map);
    });
  }

  placeMarker(position, map) {
      this.markers.push([position.lat(), position.lng()]);

      let marker = new google.maps.Marker({
        position: position,
        map: map
      });
      let data = this.calcRoute();
    }

  parseData(data) {
    let total = 0;
    for (let i=0;i<data.length;i++){
      total += parseFloat(data[i].distance.text.split(" ")[0]);
    }
    let newMiles = this.state.miles + total;
    this.setState({miles: newMiles});
    debugger
  }

  calcRoute() {

    let request = {
      travelMode: google.maps.TravelMode.DRIVING
    };
    const directionsDisplay = new google.maps.DirectionsRenderer;
    const directionsService = new google.maps.DirectionsService();
    directionsDisplay.setMap(this.map);
    let infowindow = new google.maps.InfoWindow();

    for (let i=0; i<this.markers.length; i++) {
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.markers[i][0], this.markers[i][1]),
        map: this.map
      });

      if (i == 0) request.origin = marker.getPosition();
      else if (i == this.markers.length - 1) request.destination = marker.getPosition();
      else {
        if (!request.waypoints) request.waypoints = [];
          request.waypoints.push({
            location: marker.getPosition(),
            stopover: true
          });
        }
      }

      let routeData;

      directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(result);
          routeData = directionsDisplay.directions.routes[0].legs;
        }
      });

      let that = this;
      debugger

      setTimeout(() => {
        debugger
        that.parseData(routeData);
      }, 500);
    }

  render() {
    debugger
    return (
      <div>
        <div className="create-route-map" ref={ map => this.mapNode = map }/>
        <h3> Miles: {this.state.miles} </h3>
      </div>
      // this ref gives us access to the map dom node
    );
  }
}


export default CreateRoute;
