import React from 'react';
import RouteShowBox from '../user/route_show_box';
import {withRouter} from 'react-router-dom';

class MyRoutesItem extends React.Component {

  constructor(props){
    super(props);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  componentDidMount () {
    const mapOptions = {
      center: { lat: 40.778541, lng: -73.968195 }, // this is NY
      zoom: 14
    };

    this.map = new google.maps.Map(this.mapNode, mapOptions);
    this.calcRoute(this.props.markers);
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
          } else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
              let wait = true;
              setTimeout("wait = true", 2000);
            }
        });
      }

    handleRedirect () {
      
      this.props.history.push(`/routes/${this.props.route.id}`)
    }

    render () {

      return (
        <div onClick={this.handleRedirect} className="route-index-page">
          <div className="route-show-container">
            <div className='route-index-map' ref={ map => this.mapNode = map }/>
          </div>
          <RouteShowBox route={this.props.route}/>
        </div>
      );
    };
  }

export default withRouter(MyRoutesItem);
