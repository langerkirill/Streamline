import React from 'react'
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {createRoute} from '../../actions/route_actions';
import {createMarker} from '../../actions/marker_actions';

class CreateRoute extends React.Component {

  constructor (props){
    super(props);
    this.state = {
      miles: 0,
      duration: 0,
      elevation: 0,
      black: false,
      name: "",
      chart: true
    }
    this.coordinates = [];
    this.latlngs = [];
    this.markers = [];
    this.handleSave = this.handleSave.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.plotElevation = this.plotElevation.bind(this);
    this.showChart = this.showChart.bind(this);
    this.setMapOnAll = this.setMapOnAll.bind(this);
    this.clearMarkers = this.clearMarkers.bind(this);
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

  componentWillUnmount() {
    $(window).off('resizeEnd');
    $(window).off('resize');
  }

  placeMarker(position, map) {
    this.coordinates.push([position.lat(), position.lng()]);
    this.calcRoute();
  }

  parseData(data) {
    this.getMiles(data);
    this.getDuration(data);
    this.elevationChart(this.coordinates);
  }

  getMiles(data) {
    if (data === undefined) return;
    let total = 0;
    for (let i=0;i<data.length;i++){
      total += parseFloat(data[i].distance.text.split(" ")[0]);
    }
    let newMiles = this.state.miles + total;
    let roundedMiles = Math.round(newMiles*10)/10;
    this.setState({miles: roundedMiles});
  }

  getDuration(data){
    if (data === undefined) return;
    let total = 0;
    for (let i=0;i<data.length;i++){
      total += parseFloat(data[i].duration.text.split(" ")[0]);
    }
    let newDuration = this.state.duration + total;
    this.setState({duration: newDuration});
  }

  elevationChart(latlngs){
    if (latlngs.length < 2) return;
    let elevator = new google.maps.ElevationService();
    let path = [];

    latlngs.forEach(marker => {
      let lat = marker[0];
      let lng = marker[1];
      let pos = {lat, lng};
      path.push(pos);
    })

    elevator.getElevationAlongPath({
      'path': path,
      'samples': 256
    }, this.plotElevation);
  }

    draw (chart, data) {
      chart.draw(data, {
        height: 150,
        width: '50%',
        legend: 'none',
        titleY: 'Elevation (m)',
        chartArea:{left:0,top:0,width:"50%",height:"100%"}
      });
    }

  plotElevation(elevations, status) {

    let chartDiv = this.refs.cechart;
    if (status !== 'OK') {
      // Show the error code inside the chartDiv.
      chartDiv.innerHTML = 'Cannot show elevation: request failed because ' +
          status;
      return;
    }
    // Create a new chart in the elevation_chart DIV.
    let chart = new google.visualization.ColumnChart(chartDiv);
    let data = new google.visualization.DataTable();

    data.addColumn('string', 'Sample');
    data.addColumn('number', 'Elevation');

    let elevationGain = 0;
    let lastElevation = 0;

    for (var i = 0; i < elevations.length; i++) {
      data.addRow(['', elevations[i].elevation]);
      if (elevations[i].elevation > lastElevation) {
        elevationGain += (elevations[i].elevation - lastElevation);
      }
      lastElevation = elevations[i].elevation;
    }

    let roundedElevation = Math.round(elevationGain*10)/10;
    this.setState({elevation: roundedElevation});

    google.maps.event.addDomListener(window, "load", this.draw(chart, data));

    if (window.resize === undefined){
      $(window).resize(function() {
        if(this.resizeTO) clearTimeout(this.resizeTO);
        this.resizeTO = setTimeout(function() {
            $(this).trigger('resizeEnd');
        }, 500);
      });
    }

    let that = this;
    let points = this.coordinates;

    //redraw graph when window resize is completed
    $(window).on('resizeEnd', function() {
      that.elevationChart(points);
    });
  }

  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  clearMarkers() {
    this.setMapOnAll(null);
  }

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
      if (this.coordinates.length===1) {
        pos = new google.maps.LatLng(this.coordinates[i][0], this.coordinates[i][1]);
        marker = new google.maps.Marker({
          position: pos,
          map: this.map
        });
      } else {
        this.clearMarkers();
          pos = new google.maps.LatLng(this.coordinates[i][0], this.coordinates[i][1]);
          marker = new google.maps.Marker({
            position: pos,
            draggable: true
          });
      }
      this.latlngs.push(pos);
      this.markers.push(marker);

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

      if (this.coordinates.length === 1) return;

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

  handleSave() {
    let copy = this.state;
    delete copy['black'];
    delete copy['chart'];
    copy.startlat = parseFloat(this.coordinates[0][0]);
    copy.startlong = parseFloat(this.coordinates[0][1]);
    copy.endlat = parseFloat(this.coordinates[this.coordinates.length-1][0]);
    copy.endlong = parseFloat(this.coordinates[this.coordinates.length-1][1]);
    copy.user_id = this.props.userId;
    copy.route_type = "biking";
    copy.name = this.state.name;

    let newRoute = this.props.createRoute(copy).then(data => {
      this.props.history.push(`/routes/${data.route.id}`)
    });
  }

  componentWillReceiveProps(nextProps) {

    let routeId = nextProps.route;
    this.setMarkers(routeId);
    this.setState({black:true});
  }

  setMarkers(routeId) {

    let coords = this.coordinates;
    for (let i=0; i<coords.length; i++){
      let marker = {};
      marker.lat = coords[i][0];
      marker.lng = coords[i][1];
      marker.route_id = routeId;
      marker.order = i;
      this.props.createMarker(marker);
    }
  }

  changeColor(){
    this.setState({black: !this.state.black})
  }

  showChart(){
    this.setState({chart: !this.state.chart})
  }

  handleChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  render() {

    let btn_class = this.state.black ? "blackButton" : "whiteButton";
    let chartDisplay = this.state.chart ? "chart" : "nochart";
    let chartButton = this.state.chart ? "On" : "Off";

    let savedModal;

    if (this.state.black) {
      savedModal = () => {
        return (
          <div className="route-modal">
            <div></div>
            <div className="route-modal-title"> Save</div>
            <div className="route-modal-text"> Enter a name for your route below. On the next page, you'll be able to see, edit, and share your route.</div>
            <form className="route-modal-form" onSubmit={this.handleSubmit}>
              <label>Route Name</label><br/>
              <input type="text" className="modal-email"
              onChange={this.handleChange}></input>
            </form>
            <div className="route-bottom-buttons">
              <button className="route-modal-exit" onClick={this.changeColor.bind(this)}>Cancel</button>
              <button onClick={this.handleSave} className="save-modal">Save</button>
            </div>
          </div>
        );
      };
    } else {
      savedModal = () => {
        return ("");
      }
    }

    return (
      <div className={`route-container`}>
        {savedModal()}
        <nav className={`${btn_class} create-route-nav`}>
          <div className="left-nav-cr">
            <NavLink className="route-create-icon" to="/dashboard">Streamline</NavLink>
            <div className="route-nav-text">ROUTE BUILDER</div>
            <div className="route-nav-beta">Pedal Harder</div>
          </div>
          <div className="right-nav-cr">
            <NavLink style={{textDecoration: 'none'}} className="route-navlink" to="/dashboard">Exit Builder</NavLink>
          </div>
        </nav>
          <div className={`${btn_class} create-route-bar`}>
            <button className="route-save-button" onClick={this.changeColor}>Save</button>
          </div>
          <div className={`${btn_class} create-route-map`} ref={ map => this.mapNode = map }/>
          <div className="path-info-container">
            <div className={chartDisplay} ref="cechart"></div>
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
                  <h4 className="path-stats">{this.state.elevation} m</h4>
                  <div className="mini-labels" >Elevation Gain</div>
                </div>
              </div>
              <div className="path-right">
                <div onClick={this.showChart}>Elevation {chartButton}</div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

const msp = (state) => {
  let route;
  let routesArray = Object.values(state.entities.routes);
  if (routesArray.length > 0){
    route = routesArray[(routesArray.length-1)].id;
  } else {
    route = 0;
  }

  const userId = state.session.id;
  return {
    route,
    userId
  }
}

const mdp = (dispatch) => {
  return {
    createRoute: (route) => dispatch(createRoute(route)),
    createMarker: (marker) => dispatch(createMarker(marker))
  }
}

export default connect(msp, mdp)(CreateRoute);
