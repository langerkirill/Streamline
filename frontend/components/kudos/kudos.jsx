import React from 'react';
import { connect } from 'react-redux';

class Kudos extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      kudosGivers: []
    }
  }

  componentDidMount() {
    let kg = this.props.kudosGivers;
    this.setState({kudosGivers: kg});
  }

  componentWillReceiveProps(nextProps, ownProps) {
    let kg = nextProps.kudosGivers;
    this.setState({kudosGivers: kg}, this.render);
  }


  render(){

    let images;
      if (this.state.kudosGivers){
        let i = 0;
        images = this.state.kudosGivers.map((kudoer) => {
          i += 1;
          return (<img className={`kudos-image${i}`} key={kudoer.id} src={kudoer.photoUrl}></img>);
        });
      } else {
        images = "";
      }

    return (
      <div className="kudos-container">
        {images}
        <div className="kudos-count">{this.state.kudosGivers.length} kudos</div>
      </div>
    );
  }

}

const msp = (state, ownProps) => {
  let kudosIds = Object.values(state.entities.kudos).map((kudos) => {
    if (ownProps.workout.id === kudos.workout_id){
      return kudos.user_id;
    }
  });

  let kudosGivers = [];
  Object.values(state.entities.users).forEach((person) => {
    if (kudosIds.includes(person.id)){
      kudosGivers.push(person);
    }
  });

  return {
    kudosIds,
    kudosGivers
  }
}

export default connect(msp)(Kudos);
