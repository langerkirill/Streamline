import React from 'react';
import { NavLink } from 'react-router-dom';

class SplashPage extends React.Component {

  render() {
    return (
      <div>
        <nav className="session-nav-signup">
          <div className="icon" href="#home">StreamLine</div>
          <NavLink className="login" exact to="/login">Log In</NavLink>
        </nav>
        <section className="session-main">
          <div className="main-text"> The #1 app for runners and cyclists </div>
          <img src="https://d3nn82uaxijpm6.cloudfront.net/assets/website/experiments/akita/variant_c/devices-header-3349320fa849e6a297a3b0d64a6dfdef7307b0fe50f6329a459a0105b76ffff8.jpg"/>
          <NavLink className="splash-login" exact to="/login">
            <i className="mail material-icons">&#xe0e1;</i>
            <div className="splash-login-text"> Use my email </div>
          </NavLink>
        </section>
      </div>
    );
  }
}

export default SplashPage;
