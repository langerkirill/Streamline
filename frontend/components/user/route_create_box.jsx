import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {fetchUser} from '../../actions/user_actions';

class RouteCreateBox extends React.Component {
  constructor(props){
    super(props);
    this.share = this.share.bind(this);
  }

  share (event) {
    event.preventDefault();
    let tweetedLink = window.location.href;
    let route = this.props.route.name;
    let miles = this.props.route.miles;
    let url = this.props.history.location.pathname;

    window.open("http://twitter.com/intent/tweet?text=" + route + " - " + miles + " miles" + " " + url + "&text=", "twitterwindow", "height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0");
  };

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
        <h5 className="route-username">{this.props.route.name}{this.props.route.title} <br/> By {this.props.user.username}</h5>
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
              <h4> {this.props.route.route_type}{this.props.route.workout_type}
              </h4>
              <div> Workout Type
              </div>
            </div>
          </div>
          <div className="duration">Est. Moving Time: {this.props.route.duration} minutes</div>
        </div>
        <button className="tweet-route" onClick={this.share}> Tweet This Route! <i className="fa">&#xf099;</i> </button>
      </section>
    )
  }
}

export default withRouter(RouteCreateBox);
