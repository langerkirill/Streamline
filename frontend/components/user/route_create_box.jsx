import React from 'react';
import {NavLink} from 'react-router-dom';
import {fetchUser} from '../../actions/user_actions';

class RouteCreateBox extends React.Component {
  constructor(props){
    super(props);
  }

  render () {
    const img = () => {
      if(this.props.user.photoUrl === undefined){
        return("");
      } else {
        return(this.props.user.photoUrl);
      }
    }

    return(
      <section className="route-box">
        <div className="route-icon-container">
          <img className="route-icon" src={img()} ></img>
        </div>
        <h5 className="route-username">{this.props.route.name} <br/> By {this.props.user.username}</h5>
        <div className="route-info"></div>
        <div className="route-activity">
          <div className="route-details">
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
        <NavLink className="route-share-link" to="/training"> Share this Route with Friends </NavLink>
      </section>
    )
  }
}

export default RouteCreateBox;
