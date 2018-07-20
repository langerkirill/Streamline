import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createWorkout} from '../../actions/workout_actions'

class CreateWorkout extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      miles: 0,
      duration: 0,
      elevation: 0,
      workout_type: "biking",
      date: "",
      title: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateField(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();



    this.props.createWorkout(Object.assign({}, this.state));
  }

  render () {
    return (
      <div className="workout-upload">
        <section className="upload-top">
          <div className="top-upload-box">
            <h1 className="entry-text">Manual Entry</h1>
            <div className="workout-entry">
              <label> Distance (mi) <br/>
                <input className="workout-upload-input" type="text"
                  onChange={this.updateField('miles')}/>
              </label>
              <label> Duration (minutes) <br/>
                <input className="workout-upload-input" type="text"
                  onChange={this.updateField('duration')}/>
              </label>
              <label> Elevation (feet) <br/>
                <input className="workout-upload-input" type="text"
                  onChange={this.updateField('elevation')}/>
              </label>
            </div>
          </div>
        </section>
        <div className="middle-upload-box">
          <div className="sport-date">
            <label> Sport <br/>
              <select className="workout-upload-input" value={this.state.value} onChange={this.updateField('workout_type')}>
                <option value="biking">Biking</option>
                <option value="running">Running</option>
                <option value="swimming">Swimming</option>
                <option value="coding">Coding</option>
                <option value="deep frying">Deep Frying</option>
                <option value="penguin catching">Penguin Catching</option>
                <option value="appreciating">Appreciating</option>
                <option value="skipping">Skipping</option>
              </select>
            </label>
            <label> Date <br/>
              <input className="workout-upload-input" type="date"
                onChange={this.updateField('date')}/>
            </label>
          </div>
          <div className="title-box">
            <label> Title <br/>
              <input className="title-input workout-upload-input" type="text"
                onChange={this.updateField('title')}/>
            </label>
            <br/>
          </div>
        </div>
        <div className="workout-create-buttons">
          <button onClick={this.handleSubmit} className="workout-create">Create</button>
          <Link style={{textDecoration: 'none'}} className="workout-cancel" to="/dashboard">Cancel</Link>
        </div>
      </div>
    );
  }
}
//
// const msp = (state) => {
//   const user = state.users[state.session.id];
//   return {
//     user
//   }
// }

const mdp = (dispatch) => {
  return {
    createWorkout: (workout) => dispatch(createWorkout(workout))
  }
}

export default connect(null, mdp)(CreateWorkout);
