import React from 'react'
import MarkerManager from '../../util/marker_manager';

class WorkoutRoute extends React.Component {
  //...
  componentDidMount() {
    // set the map to show NY
    const mapOptions = {
      center: { lat: 40.7128, lng: -74.0060 }, // this is NY
      zoom: 11
    };

    // wrap the mapDOMNode in a Google Map
    this.map = new google.maps.Map(this.mapNode, mapOptions);
    this.MarkerManager = new MarkerManager(this.map);
  }

  // componentWillReceiveProps(nextProps) {
  //   for (let i=0; i < nextProps.benches.length; i++){
  //     this.createMarkerFromBench(nextProps.benches[i]);
  //   }
  // }

    // createMarkerFromBench(bench){
  // let myLatlng = new google.maps.LatLng(bench.lat, bench.lng);
  // let marker = new google.maps.Marker({
  //     position: myLatlng,
  //     title: "hello"
  //   });
  //   let map = this.map;
  //   marker.setMap(map);
  // }

  render() {
    
    return (
      // ...
      <div ref={ map => this.mapNode = map }/> // this ref gives us access to the map dom node
      // ...
    )
  }
  //...
}

export default WorkoutRoute;
