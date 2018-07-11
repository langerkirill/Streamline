import React from 'react';
import {NavLink} from 'react-router-dom';

class SignUp extends React.Component {
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
    this.props.formAction(Object.assign({}, this.state));
  }

  render() {
    return (
      <div>
        <nav className="session-nav">
          <div className="icon" href="#home">StreamLine</div>
          <NavLink className="login" exact to="/login">Log In</NavLink>
        </nav>

        <form onSubmit={this.handleSubmit}>
          <input type="text"
            value={this.state.username}
            onChange={this.updateField('username')}/>
          <br />
          <input type="password"
            value={this.state.password}
            onChange={this.updateField('password')}/>
          <br/>
          <button>{this.props.buttonText}</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
