import React from 'react';

class TrainingLogItem extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      show: []
    }
  }

  componentWillMount () {
    this.shouldDisplay(this.props.workouts)
  }

  shouldDisplay (workouts) {
    let allWorkouts = Object.values(workouts);
    let showDate = [];
    for (let i=0; i<allWorkouts.length; i++){
      let dates = Object.values(workouts)[i].date.split("-");
      let wDate = new Date(parseInt(dates[0]), parseInt(dates[1])-1, parseInt(dates[2]));
      debugger
      if (wDate > this.props.older && wDate < this.props.newer){
        debugger
        showDate.push(allWorkouts[i]);
      }
    }
    this.setState({show: showDate});
  }

  render() {
    debugger

    return (
      <section className="log-container">
        <div className="training-week">
          <h3 className="the-date">{this.props.week}</h3>
          <div className="time-training">--:--</div>
          <div className="distance-traveled"> 0ft </div>
          <div className="training-miles"> 0 mi</div>
          <div className="dotted-flex">
            <div className="dotted"></div>
            <div className="dotted"></div>
            <div className="dotted"></div>
            <div className="dotted"></div>
            <div className="dotted"></div>
            <div className="dotted"></div>
            <div className="dotted"></div>
          </div>
        </div>
      </section>
    );
  }
}

export default TrainingLogItem;
