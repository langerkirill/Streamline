import React from 'react';

class BikingRunningBox extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      bike: true,
      run: false,
      penguin: false
    }
    this.handleBike = this.handleBike.bind(this);
    this.handleRun = this.handleRun.bind(this);
    this.handlePenguin = this.handlePenguin.bind(this);
  }

  handleBike() {
    this.setState({
      bike: true,
      run: false,
      penguin: false
    });
  }

  handleRun() {
    this.setState({
      bike: false,
      run: true,
      penguin: false
    });
  }

  handlePenguin() {
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
      </div>
    );
  }
}

export default BikingRunningBox;
