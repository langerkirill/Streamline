import React from 'react';
import WorkoutBall from './workout_ball';

class TrainingLogItem extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      miles: 0,
      duration: 0,
      elevation: 0,
      workouts: []
    }
    this.showWorkout = this.showWorkout.bind(this);
  }

  componentWillMount () {
    this.shouldDisplay(this.props.workouts);
  }

  parseData(workouts){
    if (workouts !== undefined) {
      let totals = {miles: 0, duration:0, elevation:0};
        for (let i=0; i<workouts.length; i++){
          totals.miles = totals.miles + workouts[i].miles;
          totals.duration = totals.duration + workouts[i].duration;
          totals.elevation = totals.elevation + workouts[i].elevation;
        }
        this.setState({miles:totals.miles, duration:totals.duration, elevation:totals.elevation});
      }
    }

  shouldDisplay (workouts) {
    let allWorkouts = Object.values(workouts);
    let showDate = [];
    for (let i=0; i<allWorkouts.length; i++){
      let dates = Object.values(workouts)[i].date.split("-");
      let wDate = new Date(parseInt(dates[0]), parseInt(dates[1])-1, parseInt(dates[2]));
      if (wDate > this.props.older && wDate < this.props.newer){
        showDate.push(allWorkouts[i]);
      }
    }
    if (showDate.length > 0) {
      this.parseData(showDate);
      this.showWorkout(showDate);
    }
  }

  showWorkout(workouts){
    this.setState({workouts: workouts});
  }

  render() {

    const displayWorkout = () => {
      if (this.state.workouts.length > 0) {
        this.state.workouts.map((workout) => {
          return (<WorkoutBall key={workout.id} workout={workout}/>);
        });
      } else {
        return ("");
      }
    }

    return (
      <section className="log-container">
        <div className="training-week">
          <h3 className="the-date">{this.props.week}</h3>
          <div className="time-training">{this.state.duration} minutes</div>
          <div className="distance-traveled"> {this.state.elevation} ft </div>
          <div className="training-miles"> {this.state.miles} mi</div>
          <div className="dotted-flex">
            <div className="dotted"></div>
            <div className="dotted"></div>
            <div className="dotted"></div>
            <div className="dotted"></div>
            <div className="dotted"></div>
            <div className="dotted"></div>
            <div className="dotted"></div>
          </div>
          {displayWorkout()}
        </div>
      </section>
    );
  }
}

export default TrainingLogItem;
