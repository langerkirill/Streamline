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
    this.plotElevation = this.plotElevation.bind(this);
    google.load('visualization', '1', {
      packages: ['columnchart']
    });
  }

  componentDidMount () {
    this.props.fetchRoute(this.props.match.params.routeId).then(data => {
      this.props.fetchUser(data.route.user_id).then(() => {
        this.props.fetchRouteMarkers(this.props.match.params.routeId);
      })
    });
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
    let sorted = coordinates.sort(function(a,b){
      return b.order > a.order;
    });
    this.calcRoute(sorted);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.markers.length !== this.props.markers.length) {
      this.elevationChart(this.props.markers);
    }
  }

  componentWillUnmount() {
    $(window).off('resizeEnd');
    $(window).off('resize');
  }

  calcRoute(markers) {

    if (markers.length === 0) return;

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
      pos = new google.maps.LatLng(markers[i].lat, markers[i].lng);
      marker = new google.maps.Marker({
        position: pos,
        draggable: true
      });

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

  elevationChart(markers) {
    if (markers.length === 0) return;
    let elevator = new google.maps.ElevationService;
    let path = [];

    markers.forEach(marker => {
      let lat = marker.lat;
      let lng = marker.lng;
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

    let chartDiv = this.refs.echart;
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

    google.maps.event.addDomListener(window, "load", this.draw(chart, data));

    $(window).resize(function() {
      if(this.resizeTO) clearTimeout(this.resizeTO);
      this.resizeTO = setTimeout(function() {
          $(this).trigger('resizeEnd');
      }, 500);
    });

    let that = this;
    let points = this.props.markers;

    //redraw graph when window resize is completed
    $(window).on('resizeEnd', function() {
      that.elevationChart(points);
    });
  }

  render () {

    const createBox = () => {
      if (this.props.creator.length !== 0) {
        return (<RouteCreateBox route={this.props.route} user={this.props.creator}/>);
      } else {
        return ("");
      }
    }

    return (
      <section className="route-show-show">
        <div className="map-show-page">
          <div className="show-map-container">
            <div className='show-route-map' ref={ map => this.mapNode = map }/>
          </div>
          <div className="user-info-stats">
            {createBox()}
          </div>
        </div>
        <div className="elevation-chart" ref="echart"></div>
      </section>
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
    fetchRoute: (routeId) => dispatch(fetchRoute(routeId)),
    fetchUser: (userId) => dispatch(fetchUser(userId))
  }
}

export default withRouter(connect(msp, mdp)(RouteShow));
