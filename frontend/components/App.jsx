import React from 'react';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginContainer from './session/login_container';
import SignupContainer from './session/signup_container';
import SplashPage from './session/splash_page';
import Dashboard from './dashboard/dashboard';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { logout } from '../actions/session_actions';
import NavBar from './navbar';
import CreateRoute from './routes/create_route';


function App({ loggedIn, user, logout }) {

  return (
    <HashRouter >
      <div>
        { !loggedIn ?
          <div>

          </div>
          :
          <div>
            <NavBar user={user}/>
          </div>
        }

        <AuthRoute exact component={SignupContainer} path="/signup" />
        <AuthRoute exact component={SplashPage} path="/" />
        <AuthRoute component={LoginContainer} path="/login" />
        <ProtectedRoute user={user} component={Dashboard} path="/dashboard" />
        <ProtectedRoute component={CreateRoute} path="/route/create" />

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
