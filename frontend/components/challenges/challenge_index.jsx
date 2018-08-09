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
          <img className="challenge-image" src={challenge.img}/>
          <div className="challenge-type">
            <div className="challenge-line-left"></div>
            <div>{challenge.workout_type}</div>
            <div className="challenge-line-right"></div>
          </div>
          <div>{challenge.title}</div>
          <div>{challenge.text}</div>
          <button>Join Now</button>
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
