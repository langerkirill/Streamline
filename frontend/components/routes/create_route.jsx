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
      black: false
    }
    this.coordinates = [];
    this.markers = [];
    this.handleSave = this.handleSave.bind(this);
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

  handleSave() {
    let copy = this.state;
    delete copy['black'];
    copy.startlat = parseFloat(this.coordinates[0][0]);
    copy.startlong = parseFloat(this.coordinates[0][1]);
    copy.endlat = parseFloat(this.coordinates[this.coordinates.length-1][0]);
    copy.endlong = parseFloat(this.coordinates[this.coordinates.length-1][1]);
    copy.user_id = this.props.userId;
    copy.route_type = "biking";
    let newRoute = this.props.createRoute(copy);
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
      this.props.createMarker(marker);
    }
  }

  changeColor(){
    this.setState({black: !this.state.black})
  }

  updateField(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  render() {

    let btn_class = this.state.black ? "blackButton" : "whiteButton";

    let savedModal;

    if (this.state.black) {
      savedModal = () => {
        return (
          <div className="route-modal">
            <div></div>
            <div className="route-modal-title"> Save</div>
            <div className="route-modal-text"> Enter a name for your route below. On the next page, you'll be able to see, edit, and share your route.</div>
            <form className="route-modal-form" onSubmit={this.handleSubmit}>
              <div>
                <label>Route Name</label><br/>
                <input type="text" className="modal-email" value={this.state.username}
                onChange={this.updateField('username')}></input>
              </div>
            </form>
            <div className="route-bottom-buttons">
              <button className="route-modal-exit" onClick={this.changeColor.bind(this)}>Cancel</button>
              <button className="save-modal">Save</button>
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
            <div className="route-icon">Streamline</div>
            <div className="route-nav-text">ROUTE BUILDER</div>
            <div className="route-nav-beta">Hiya</div>
          </div>
          <div className="right-nav-cr">
            <NavLink style={{textDecoration: 'none'}} className="route-navlink" to="/dashboard">Exit Builder</NavLink>
          </div>
          <button onClick={this.handleSave}>Save Route</button>
        </nav>
          <div className={`${btn_class} create-route-map`} ref={ map => this.mapNode = map }/>
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
