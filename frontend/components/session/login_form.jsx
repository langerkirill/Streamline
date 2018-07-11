import React from 'react';
import {NavLink} from 'react-router-dom';


class LogIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      black: false,
      username: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeColor(){
    this.setState({black: !this.state.black})
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

    let btn_class = this.state.black ? "blackButton" : "whiteButton";

    return (
      <div >
        <nav className={`${btn_class} session-nav-login`}>
          <NavLink className="icon" exact to="/" href="#home">StreamLine</NavLink>
          <button className={btn_class} id="login-signup" onClick={this.changeColor.bind(this)}>Sign Up</button>
        </nav>
        <section >
          <div className="background">
            <div className={btn_class}>
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
                      <button className="login-button">{this.props.buttonText}</button>
                      <div className="line"></div>
                    </form>
                  </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    );
  }
}

export default LogIn;
