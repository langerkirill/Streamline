import React from 'react';
import {Link, Redirect} from 'react-router-dom';
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
      title: "",
      photoFile:null,
      submitted: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  updateField(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  handleFile(e){
    this.setState({photoFile: e.currentTarget.files[0]})
  }

  handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append('workout[miles]', this.state.miles);
    formData.append('workout[duration]', this.state.duration);
    formData.append('workout[elevation]', this.state.elevation);
    formData.append('workout[workout_type]', this.state.workout_type);
    formData.append('workout[date]', this.state.date);
    formData.append('workout[image]', this.state.photoFile);
    formData.append('workout[title]', this.state.title);
    this.props.createWorkout(formData);
    this.setState({submitted: true})
  }

  render () {

    if (this.state.submitted) {
      return <Redirect to='/'/>;
    } else {
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
              <label> Photos <br/>
                <input className="workout-upload-input" type="file"
                  onChange={this.handleFile}/>
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
}

const mdp = (dispatch) => {
  return {
    createWorkout: (workout) => dispatch(createWorkout(workout))
  }
}

export default connect(null, mdp)(CreateWorkout);
