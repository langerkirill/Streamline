import React from 'react';
import {connect} from 'react-redux'

class Challenges extends React.Component {

  componentDidMount(){
    debugger
    this.props.fetchChallenges;
  }

  render(){
    return(
      <div>Challnge meh</div>
    )
  }

}

const msp = (state) => {
  const challenges = Object.values(state.entities.challenges);
  return {
    challenges
  }
}

const mdp = (dispatch) => {
  return {
    fetchChallenges: () => dispatch(fetchChallenges())
  }
}

export default connect(msp, mdp)(Challenges);
