import React from 'react';
import {NavLink} from 'react-router-dom';
import {fetchUser} from '../../actions/user_actions';

class RouteShowBox extends React.Component {
  constructor(props){
    super(props);
  }

  render () {
    debugger
    const img = () => {
      if(this.props.user.photoUrl === undefined){
        return("");
      } else {
        return(this.props.user.photoUrl);
      }
    }

    let name;
      if (this.props.route.name) {
        name = this.props.route.name;
      } else {
        name = "Escapade";
      }

    return(
      <section className="route-show-box">
        <div className="route-show-activity">
          <div className="route-details">
            <div className="route-name"> {name} </div>
            <div className="ride-deets">
              <h4 > {this.props.route.miles} mi
              </h4>
              <div> Distance
              </div>
            </div>
            <div className="ride-deets">
              <h4> {this.props.route.elevation} ft
              </h4>
              <div> Elevation <br/> Difference
              </div>
            </div>
            <div className="ride-deets">
              <h4> {this.props.route.route_type}
              </h4>
              <div> Ride Type
              </div>
            </div>
          </div>
          <div className="duration">Est. Moving Time: {this.props.route.duration} minutes</div>
        </div>
      </section>
    )
  }
}

export default RouteShowBox;
