import React from 'react';

class SessionForm extends React.Component {
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
    debugger
    e.preventDefault();
    this.props.formAction(Object.assign({}, this.state));
  }

  render() {
    return (
      <div>
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

export default SessionForm;
