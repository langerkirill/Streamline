import React from 'react';

class BikingRunningBox extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      bike: true,
      run: false,
      penguin: false,
      duration: 0,
      miles: 0,
      time: 0
    }
    this.handleBike = this.handleBike.bind(this);
    this.handleRun = this.handleRun.bind(this);
    this.handlePenguin = this.handlePenguin.bind(this);
    this.parseWorkouts = this.parseWorkouts.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let userWorkouts = nextProps.user.workoutIds;
    let workouts = nextProps.workouts;
    this.parseWorkouts("biking");
  }

  parseWorkouts (type) {
    const userWorkouts = this.props.user.workoutIds;
    const workouts = this.props.workouts;
    let duration = 0;
    let miles = 0;
    let elevation = 0;
    for (let i = 0; i<workouts.length; i++) {
      if (userWorkouts.includes(workouts[i].id)) {
        if (workouts[i].workout_type === type) {
          duration += workouts[i].duration;
          miles += workouts[i].miles;
          elevation += workouts[i].elevation;
        }
      }
    }
    this.setState({
      duration: duration,
      elevation: elevation,
      miles: miles
    });
  }

  handleBike() {
    this.parseWorkouts("biking");
    this.setState({
      bike: true,
      run: false,
      penguin: false
    });
  }

  handleRun() {
    this.parseWorkouts("running");
    this.setState({
      bike: false,
      run: true,
      penguin: false
    });
  }

  handlePenguin() {
    this.parseWorkouts ("penguin catching");
    this.setState({
      bike: false,
      run: false,
      penguin: true
    });
  }

  render () {

    let bikeback = this.state.bike ? "greyBack" : "whiteBack";
    let runback = this.state.run ? "greyBack" : "whiteBack";
    let penguinback = this.state.penguin ? "greyBack" : "whiteBack";

    let bike = <i className="material-icons">&#xe52f;</i>
    let run = <i className="material-icons">&#xe566;</i>
    let peng = <i className="fa">&#xf1d6;</i>

    const iconPick = () => {
      if (this.state.bike) {
        return (bike);
      } else if (this.state.run) {
        return (run);
      } else {
        return (peng);
      }
    }

    return(
      <div className="the-br-box">
        <div className="tabs-container">
          <div onClick={this.handleBike} className={`${bikeback} bike-icon tag`}>
            <i className="material-icons">&#xe52f;</i>
          </div>
          <div onClick={this.handleRun} className={`${runback} run-icon tag`}>
            <i className="material-icons">&#xe566;</i>
          </div>
          <div onClick={this.handlePenguin} className={`${penguinback} penguin-icon`}>
            <i className="fa">&#xf1d6;</i>
          </div>
        </div>
        <div className="week-miles">
          <div className="br-box-stats"> THIS WEEK
          </div>
          <div className="br-box-distance"> {this.state.miles} mi
          </div>
        </div>
        <div className="br-box-icon">
          {iconPick()}
        </div>
        <div className="br-time-elevation">
          <div className="time"> {this.state.duration} minutes
          </div>
          <div className="elevation"> {this.state.elevation} feet
          </div>
        </div>
      </div>
    );
  }
}

export default BikingRunningBox;
