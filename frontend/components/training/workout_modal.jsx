import React from 'react';

export default class WorkoutModal extends React.Component{

  render(){

    return(
      <section className="training-log-modal">
        <div className="modal-grid">
          <div className="training-date">{this.props.workout.date}</div>
          <div className="training-title">{this.props.workout.title}</div>
          <div className="bottom-line"></div>
          <div className="training-distance">
            <div>Distance</div>
            <div>{this.props.workout.miles} miles</div>
          </div>
          <div className="training-duration">
            <div>Moving Time</div>
            <div>{this.props.workout.duration} minutes</div>
          </div>
          <div className="training-elevation">
            <div>Elevation Gain</div>
            <div>{this.props.workout.elevation} meters</div>
          </div>
        </div>
      </section>
    );
  }
}
