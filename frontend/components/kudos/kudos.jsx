import React from 'react';
import { connect } from 'react-redux';
import { createKudo } from '../../actions/kudo_actions';

class Kudos extends React.Component{
  constructor(props){
    super(props);
    this.giveKudo = this.giveKudo.bind(this);
  }

  giveKudo(){

  }

  render(){

    let images;

      if (this.props.kudosGivers){
        let i = 0;
        images = this.props.kudosGivers.map((kudoer) => {
          i += 1;
          return (<img className={`kudos-image${i}`} key={kudoer.id} src={kudoer.photoUrl}></img>);
        });
      } else {
        images = "";
      }

    return (
      <div className="kudos-container">
        {images}
        <div className="kudos-count">{this.props.kudosGivers.length} kudos</div>
      </div>
    );
  }

}

const msp = (state, ownProps) => {
  let kudosIds = Object.values(state.entities.kudos).map((kudos) => {
    if (ownProps.workout.kudosIds.includes(kudos.id)){
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

const mdp = (dispatch) => {
  return {
    createKudo: (kudos) => dispatch(createKudo(kudos))
  }
}

export default connect(msp, mdp)(Kudos);
