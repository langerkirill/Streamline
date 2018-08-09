import React from 'react';
import {connect} from 'react-redux';
import {fetchChallenges} from '../../actions/challenge_actions'

class Challenges extends React.Component {

  componentDidMount(){
    this.props.fetchChallenges();
  }

  render(){

    let challengeIndex = this.props.challenges.map(challenge => {
      return (
        <div className="challenge-box">
          <div>{challenge.title}</div>
          <div>{challenge.workout_type}</div>
          <img src={challenge.img}/>
          <div>{challenge.text}</div>
        </div>
      )
    })

    return(
      <article className="challenge-wrapper">
        {challengeIndex}
      </article>
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
