import React from 'react'
import MarkerManager from '../../util/marker_manager';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {createRoute} from '../../actions/route_actions'

class CreateRoute extends React.Component {

  constructor (props){
    super(props);
    this.state = {
      miles: 0,
      duration: 0,
      elevation: 0
    }
    this.coordinates = [];
    this.markers = [];
  }


  componentDidMount() {
    // set the map to show NY
    const mapOptions = {
      center: { lat: 40.778541, lng: -73.968195 }, // this is NY
      zoom: 14
    };

    this.map = new google.maps.Map(this.mapNode, mapOptions);
    this.parseData = this.parseData.bind(this);
    this.map.addListener('click', (e) => {
      this.placeMarker(e.latLng, this.map);
    });
  }

  placeMarker(position, map) {
      this.coordinates.push([position.lat(), position.lng()]);
      this.calcRoute();
    }

  parseData(data) {
    this.getMiles(data);
    this.getDuration(data);
    this.getElevation(this.markers);
  }

  getMiles(data) {
    let total = 0;
    for (let i=0;i<data.length;i++){
      total += parseFloat(data[i].distance.text.split(" ")[0]);
    }
    let newMiles = this.state.miles + total;
    let roundedMiles = Math.round(newMiles*10)/10;
    this.setState({miles: roundedMiles});
  }

  getDuration(data){
    let total = 0;
    for (let i=0;i<data.length;i++){
      total += parseFloat(data[i].duration.text.split(" ")[0]);
    }
    let newDuration = this.state.duration + total;
    this.setState({duration: newDuration});
  }

  getElevation(locations){

    let elevator = new google.maps.ElevationService();
    let dif;
    let request = {
      'locations': locations
    };
      elevator.getElevationForLocations(request, function(results, status) {
        let total;
        if (status == google.maps.ElevationStatus.OK) {
            if (results[0]) {
              let elevations = results;
              let eCalc = [];
              for (let i=0; i<elevations.length; i++){
                if (!eCalc.includes(elevations[i].elevation)) {
                  eCalc.push(elevations[i].elevation);
                }
              }
              dif = Math.floor(Math.max(...eCalc) - Math.min(...eCalc));

            }
          }
        });
        let that = this;

        setTimeout(() => {

          that.setState({elevation: dif});
        }, 500);

    }

//  function createUpdateProfile(){
//     var path=[];
//     for (var i = 0; i < markers.length; i++) {
//       path.push(markers[i].getPosition());
//       };
//     var elevator = new google.maps.ElevationService;
//     // Draw the path, using the Visualization API and the Elevation service.
//     displayPathElevation(path, elevator, map);
//   }
//
// function displayPathElevation(path, elevator, map) {
//   elevator.getElevationAlongPath({
//   'path': path,
//   'samples': 256
//   }, plotElevation);
// }
//
// function plotElevation(elevations, status) {
//   var chartDiv = document.getElementById('elevation_chart');
//   if (status !== google.maps.ElevationStatus.OK) {
//    // Show the error code inside the chartDiv.
//    chartDiv.innerHTML = 'Cannot show elevation: request failed because ' +
//       status;
//    return;
//  }
//  // Create a new chart in the elevation_chart DIV.
//   var chart = new google.visualization.ColumnChart(chartDiv);
//
//  // Extract the data from which to populate the chart.
//  // Because the samples are equidistant, the 'Sample'
//  // column here does double duty as distance along the
//  // X axis.
//   var data = new google.visualization.DataTable();
//   data.addColumn('string', 'Sample');
//   data.addColumn('number', 'Elevation');
//   for (var i = 0; i < elevations.length; i++) {
//   data.addRow(['', elevations[i].elevation]);
// }
//
//  // Draw the chart using the data within its DIV.
// chart.draw(data, {
//  height: 200,
// legend: 'none',
// titleY: 'Elevation (m)'
//
//
// });

  calcRoute() {

    let request = {
      travelMode: google.maps.TravelMode.BICYCLING
    };

    const directionsDisplay = new google.maps.DirectionsRenderer;
    const directionsService = new google.maps.DirectionsService();
    directionsDisplay.setMap(this.map);
    let infowindow = new google.maps.InfoWindow();

    for (let i=0; i<this.coordinates.length; i++) {
      let marker;
      let pos;
      if (i===0) {
        pos = new google.maps.LatLng(this.coordinates[i][0], this.coordinates[i][1]);
        marker = new google.maps.Marker({
          position: pos,
          map: this.map
        });
      } else {
          pos = new google.maps.LatLng(this.coordinates[i][0], this.coordinates[i][1]);
          marker = new google.maps.Marker({
            position: pos,
            draggable: true
          });
      }
      this.markers.push(pos);

      if (i == 0) request.origin = marker.getPosition();
      else if (i == this.coordinates.length - 1) request.destination = marker.getPosition();
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

      setTimeout(() => {
        that.parseData(routeData);
      }, 500);
    }

  render() {
    return (
      <div className="route-container">
        <nav className="create-route-nav">
          <div className="left-nav-cr">
            <div className="route-icon">Streamline</div>
            <div className="route-nav-text">ROUTE BUILDER</div>
            <div className="route-nav-beta">Hiya</div>
          </div>
          <div className="right-nav-cr">
            <NavLink style={{textDecoration: 'none'}} className="route-navlink" to="/dashboard">Exit Builder</NavLink>
          </div>
          <button onClick={createRoute}>Save Route</button>
        </nav>
          <div className="create-route-map" ref={ map => this.mapNode = map }/>
            <div className="path-info">
              <div className="path-left">
                <div className="info-bar-labels">
                  <h4 className="path-stats"> Ride </h4>
                  <div className="mini-labels" >Route Type</div>
                </div>
                <div className="info-bar-labels">
                  <h4 className="path-stats">{this.state.miles} mi</h4>
                  <div className="mini-labels" > Distance </div>
                </div>
                <div className="info-bar-labels">
                  <h4 className="path-stats">{this.state.duration} minutes</h4>
                  <div className="mini-labels" >Est. Moving Time </div>
                </div>
                <div className="info-bar-labels">
                  <h4 className="path-stats">{this.state.elevation} ft</h4>
                  <div className="mini-labels" >Elevation Gain</div>
                </div>
              </div>
          </div>
        </div>
    );
  }
}

const mdp = (dispatch) => {
  return {
    createRoute: (route) => dispatch(createRoute(route))
  }
}

export default connect(null, mdp)(CreateRoute);
