import React from 'react';
import {NavLink} from 'react-router-dom';
import { bpicker } from './background_picker';


class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: '',
      username: '',
      password: ''
    };
    this.errors = 0;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let back = bpicker();
    this.setState({image: back});
  }

  updateField(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  handleSubmit(e) {

    e.preventDefault();
    this.props.signup(Object.assign({}, this.state));
  }

  componentDidUpdate() {
    debugger
    if ((this.props.errors).length > 0) {
      this.errors += 1;
      if (this.errors > 1) {
        this.props.clearErrors();
        this.errors = 0;
      }
    }
  }

  render() {

    let errors;
    const errorDisplay = () => {
      if (Object.keys(this.props.errors).length > 0) {
        this.errors+1;
        errors = this.props.errors.join();
        return (
          <h3 className="errors">{`${errors}`}</h3>
        );
        } else {
          errors = "";
          return ("");
        }
      }

    let photo = this.state.image;

    return (
      <div>
        <nav className="session-nav-signup">
          <NavLink className="icon" exact to="/" href="#home">StreamLine</NavLink>
          <div className="signup-buttons">
            <NavLink className="login-signup" exact to="/login">Log In</NavLink>
            <NavLink className="signup" exact to="/signup">Sign up</NavLink>
          </div>
        </nav>
        <section>
          <div >
            <img className="background" src={this.state.image}/>
              <div className="signup-container">
                <div className="signup-top"> Join Streamline today, it's Free </div>
                {errorDisplay()}
                  <div className="form-container">
                    <form className="signup-form" onSubmit={this.handleSubmit}>
                      <div></div>
                      <input type="text" placeholder="First Name"/>
                      <input type="text" placeholder="Last Name"/>
                      <input type="text" placeholder="Your Email"
                        value={this.state.username}
                        onChange={this.updateField('username')}/>
                      <input type="password" placeholder="Password"
                        value={this.state.password}
                        onChange={this.updateField('password')}/>
                      <div></div>
                      <button className="signup-signup">{this.props.buttonText}</button>
                    </form>
                    <p className="signup-text">By signing up for Streamline, you agree to the <strong>Terms of Service</strong>.<br/>
                      View our <strong>Privacy Policy</strong>.</p>
                  </div>
              </div>
          </div>
        </section>
      </div>

    );
  }
}

export default SignUp;
