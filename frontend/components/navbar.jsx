import React from 'react';
import {connect} from 'react-redux';
import { Route, NavLink, withRouter, Redirect, Link } from 'react-router-dom';
import PlusBox from './boxes/plus_box';
import IconBox from './boxes/icon_box';
import DashBox from './boxes/dash_box';
import {logout} from '../actions/session_actions';
import {fetchUser} from '../actions/user_actions';


class NavBar extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      plusHover: false,
      imageHover: false,
      dashHover: false
    }

    this.handlePlusHover = this.handlePlusHover.bind(this);
    this.handleImageHover = this.handleImageHover.bind(this);
    this.handleDashHover = this.handleDashHover.bind(this);

  }

  handlePlusHover() {
    let bool = !this.state.plusHover;
    this.setState({plusHover: bool});
  }

  handleImageHover() {
    let boo = !this.state.imageHover;
    this.setState({imageHover: boo});
  }

  handleDashHover() {
    let boole = !this.state.dashHover;
    this.setState({dashHover: boole});
  }

  // componentWillReceiveProps () {
  //   debugger
  //   this.setState({imageHover: false, plusHover:false, dashHover:false});
  //   if (this.props.user.photoUrl === undefined) {
  //     this.props.fetchUser(this.props.user.id);
  //   }
  // }


  render () {
    if (this.props.location.pathname === "/route/create"){
      return "";
    }

    const plusHover = () => {
      if (this.state.plusHover) {
        return (<PlusBox />);
      } else {
        return "";
      }
    }

    const dashHover = () => {
      if (this.state.dashHover) {
        return (<DashBox />);
      } else {
        return "";
      }
    }

    const imageHover = () => {
      if (this.state.imageHover) {
        return (<IconBox logout={this.props.logout} />);
      } else {
        return "";
      }
    }

    return (
    <nav className="top-nav">
      <div className="nav-left">
        <Link className="nav-icon" to="/dashboard"> Streamline </Link>
        <i className="material-icons">&#xe8b6;</i>
        <div onMouseEnter={this.handleDashHover} onMouseLeave={this.handleDashHover} className="dash-hover-helper">
          <NavLink className="dash-link nav-left-links" to="/dashboard"> Dashboard
          </NavLink>
          {dashHover()}
        </div>
        <NavLink className="nav-left-links" to="/training/log"> Training </NavLink>
        <NavLink className="nav-left-links" to="/explore"> Explore </NavLink>
        <NavLink className="nav-left-links" to="/challenges"> Challenges </NavLink>
      </div>
      <div className="nav-right">
        <div>
          <i className="fa fa-bell-o"></i>
        </div>
        <div className="bell-icon">
          <div onMouseEnter={this.handleImageHover} onMouseLeave={this.handleImageHover} className="hover-helper">
            <img className="nav-image" src={this.props.user.photoUrl}/>
            {imageHover()}
          </div>
        </div>
        <div onMouseEnter={this.handlePlusHover} onMouseLeave={this.handlePlusHover} className="plus-icon">
          <div className="nav-plus" to="/challenges">
             <i className="fa fa-plus-circle">
               {plusHover()}
             </i>
           </div>
        </div>
      </div>
    </nav>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  debugger
  const user = state.users[state.session.id];
  return {
    user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    fetchUser: (userId) => dispatch(fetchUser(userId))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(NavBar));
