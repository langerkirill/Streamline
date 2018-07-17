import React from 'react';
import {connect} from 'react-redux';
import { Route, NavLink, withRouter, Redirect } from 'react-router-dom';
import PlusBox from './plus_box';
import IconBox from './icon_box';
import {logout} from '../actions/session_actions'

class NavBar extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      plusHover: false,
      imageHover: false
    }

    this.handlePlusHover = this.handlePlusHover.bind(this);
    this.handleImageHover = this.handleImageHover.bind(this);

  }

  handlePlusHover() {
    let bool = !this.state.plusHover;
    this.setState({plusHover: bool});
  }

  handleImageHover() {
    let boo = !this.state.imageHover;
    this.setState({imageHover: boo});
  }

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
        <NavLink className="nav-icon" to="/dashboard"> Streamline </NavLink>
        <i className="material-icons">&#xe8b6;</i>
        <NavLink className="nav-left-links" to="/dashboard"> Dashboard </NavLink>
        <NavLink className="nav-left-links" to="/training"> Training </NavLink>
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
  const user = state.users[ownProps.match.params.userId];
  return {
    user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(NavBar));
