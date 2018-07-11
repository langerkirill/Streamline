import React from 'react';
import {NavLink} from 'react-router-dom';


class LogIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateField(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(Object.assign({}, this.state));
  }

  render() {
    return (
      <div>
        <nav className="session-nav-login">
          <div className="icon" href="#home">StreamLine</div>
          <NavLink className="signup" exact to="/signup">Sign Up</NavLink>
        </nav>
        <section>
          <div className="background">
            <div className="login-container">
              <div className="login-top"> Log In </div>
                <div className="form-container">
                  <form className="login-form" onSubmit={this.handleSubmit}>
                    <div></div>
                    <input type="text" placeholder="Your Email"
                      value={this.state.username}
                      onChange={this.updateField('username')}/>
                    <input type="password" placeholder="Password"
                      value={this.state.password}
                      onChange={this.updateField('password')}/>
                    <div></div>
                    <button>{this.props.buttonText}</button>
                  </form>
                </div>
            </div>
          </div>
        </section>
      </div>

    );
  }
}

export default LogIn;
