import React from 'react';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginContainer from './session/login_container';
import SignupContainer from './session/signup_container';
import SplashPage from './session/splash_page';
import Dashboard from './dashboard/dash_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { logout } from '../actions/session_actions';


function App({ loggedIn, user, logout }) {

  return (
    <HashRouter >
      <div>
        { !loggedIn ?
          <div>

          </div>
          :
          <div>
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
                  <img className="nav-image" src={user.photoUrl}/>
                </div>
                <div className="plus-icon">
                  <i className="fa fa-plus-circle"></i>
                </div>
              </div>
            </nav>
            <button onClick={logout}>Logout</button>
          </div>
        }

        <AuthRoute exact component={SignupContainer} path="/signup" />
        <AuthRoute exact component={SplashPage} path="/" />
        <AuthRoute component={LoginContainer} path="/login" />
        <ProtectedRoute user={user} component={Dashboard} path="/dashboard" />

      </div>
    </HashRouter>
  );
}

const mapStateToProps = state => {

  return {
    loggedIn: Boolean(state.session.id),
    user: state.entities.users[state.session.id]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
