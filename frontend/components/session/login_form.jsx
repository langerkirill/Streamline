import React from 'react';
import { NavLink } from 'react-router-dom';
import { bpicker } from './background_picker';

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

  componentDidMount() {
    let back = bpicker();
    this.setState({image: back});
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
    if (this.state.black) {
      let newState = Object.assign({}, this.state);
      delete newState['black'];
      this.props.signup(newState);

    } else {
      this.props.login(Object.assign({}, this.state));
    }
  }

  render() {
    let errors;
    const errorDisplay = () => {
      if (Object.keys(this.props.errors).length > 0) {
        errors = this.props.errors.join();
        return (
          <h3 className="errors">{`${errors}`}</h3>
        );
      } else {
        errors = "";
        return (
          <div className="errors">{`${errors}`}</div>
        );
      }
    }

    let btn_class = this.state.black ? "blackButton" : "whiteButton";
    let signUpModal;

    if (this.state.black) {
      signUpModal = () => {
        return (
          <div className="modal">
            <button className="modal-exit" onClick={this.changeColor.bind(this)}>X</button>
            <div></div>
            <div className="modal-title"> Sign up for free</div>
            <div className="modal-text"> Join for the tracking. Stay for the community.</div>
            <form className="modal-form" onSubmit={this.handleSubmit}>
              <div>
                <label>Email</label><br/>
                <input type="text" className="modal-email" value={this.state.username}
                onChange={this.updateField('username')}></input>
              </div>
              <div>
                <label>New password</label><br/>
                <input type="password" className="modal-password" value={this.state.password}
                onChange={this.updateField('password')}></input>
              </div>
              <button className="signup-modal">Sign Up</button>
            </form>
          </div>
        );
      };
    } else {
      signUpModal = () => {
        return ("");
      }
    }

    return (
      <div >
        <nav className={`${btn_class} session-nav-login`}>
          <NavLink className="icon" exact to="/" href="#home">StreamLine</NavLink>
          <button id="login-signup" onClick={this.changeColor.bind(this)}>Sign Up</button>
        </nav>
        <section >
          <div >
            <img className={`background ${btn_class}`} src={`${this.state.image}`}/>
              <div>
                <div className="login-container">
                  {signUpModal()}
                  <div className="login-top"> Log In </div>
                  {errorDisplay()}
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
