import React from 'react';

class WorkoutBall extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      day:null,
      weekday: ""
    }
    this.picked = "";
    this.daypick = this.daypick.bind(this);
  }

  componentDidMount() {
    let dates = this.props.workout.date.split("-");
    let place = new Date(parseInt(dates[0]), parseInt(dates[1])-1, parseInt(dates[2]));
    let day = place.getDay();
    this.setState({day: day}, this.daypick)
  }


  daypick(){
    let picked;
    switch (this.state.day) {
      case 0:
        picked = "sunday"
        this.setState({weekday: picked});
        break;
      case 1:
        picked = "monday"
        this.setState({weekday: picked});
        break;
      case 2:
        picked = "tuesday"
        this.setState({weekday: picked});
        break;
      case 3:
        picked = "wednesday"
        this.setState({weekday: picked});
        break;
      case 4:
        picked = "thursday"
        this.setState({weekday: picked});
        break;
      case 5:
        picked = "friday"
        this.setState({weekday: picked});
        break;
      case 6:
        picked = "saturday"
        this.setState({weekday: picked});
        break;
      default:
        picked = ""
        this.setState({weekday: picked});
    }
  }

  render() {
    let height = this.props.workout.miles;
    let width = this.props.workout.miles;

    if (height > 60) {
      height = 60;
      width = 60;
    }

    return(
      <div className={`${this.state.weekday} workout-ball`} style={{height: height, width: width}}>{this.props.workout.miles}</div>
    );
  }
}

export default WorkoutBall;
