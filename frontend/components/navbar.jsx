import React from 'react';
import {connect} from 'react-redux';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import PlusBox from './plus_box';

class NavBar extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      plusHover: true
    }

    this.handleMouseHover = this.handleMouseHover.bind(this);

  }

  handleMouseHover() {
    debugger
    let bool = !this.state.plusHover;
    this.setState({plusHover: bool});
  }

  render () {
    debugger
    const plusHover = () => {
      if (this.state.plusHover) {
        return (<PlusBox />);
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
          <img className="nav-image" src={this.props.user.photoUrl}/>
        </div>
        <div onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover} className="plus-icon">
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

export default NavBar;
