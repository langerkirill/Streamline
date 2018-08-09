import React from 'react';
import {connect} from 'react-redux';
import {fetchChallenges, joinChallenge} from '../../actions/challenge_actions';
import ChallengeIndexItem from './challenge_index_item';

class Challenges extends React.Component {

  componentDidMount(){
    this.props.fetchChallenges();
  }

  render(){
    let challengeIndex = this.props.challenges.map(challenge => {
      return (
        <ChallengeIndexItem key={challenge.id} challenge={challenge}/>
      )
    })

    return(
      <section>
        <article className="challenges-top">
          <img className="challenge-icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl2zWSljqPFQMCAvlpIGGlh_6aRPSbQD-ilP7zBKsf33_8EHP1"></img>
          <div className="challenge-main-title">Streamline Challenges</div>
          <div className="top-challenge">Join a run or cycling Challenge to stay on top of your game, earn new achievements and see how you stack up.
          </div>
        </article>
      <article className="challenge-wrapper">
        {challengeIndex}
      </article>
    </section>
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
