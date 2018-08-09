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
        <div key={challenge.id} className="challenge-box">
          <img className="challenge-image" src={challenge.img}/>
          <div className="challenge-type">
            <div className="challenge-line-left"></div>
            <div>{challenge.workout_type}</div>
            <div className="challenge-line-right"></div>
          </div>
          <div className="challenge-title">{challenge.title}</div>
          <div className="challenge-text">{challenge.text}</div>
          <button className="challenge-join">Join Now</button>
        </div>
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
