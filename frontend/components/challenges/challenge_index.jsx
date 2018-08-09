import React from 'react';
import {connect} from 'react-redux';
import {fetchChallenges, joinChallenge} from '../../actions/challenge_actions';
import ChallengeIndexItem from './challenge_index_item';

class Challenges extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      view: "View All"
    }
  }

  handleView(sport){
    return () => {
      this.setState({view: sport})
    }
  }

  componentDidMount(){
    this.props.fetchChallenges();
  }

  render(){

    let challengeIndex = this.props.challenges.map(challenge => {
      if (this.state.view === "View All") {
        return (
          <ChallengeIndexItem key={challenge.id} challenge={challenge}/>
        )
      } else if (this.state.view === "Ride") {
        if (challenge.workout_type === "biking"){
          return (
            <ChallengeIndexItem key={challenge.id} challenge={challenge}/>
          )
        }
      } else if (this.state.view === "Penguin Catching") {
        if (challenge.workout_type === "penguin catching"){
          return (
            <ChallengeIndexItem key={challenge.id} challenge={challenge}/>
          );
        }
      } else if (this.state.view === "Run") {
        if (challenge.workout_type === "running"){
          return (
            <ChallengeIndexItem key={challenge.id} challenge={challenge}/>
          )
        }
      }
    });

    return(
      <section>
        <article className="challenges-top">
          <img className="challenge-icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl2zWSljqPFQMCAvlpIGGlh_6aRPSbQD-ilP7zBKsf33_8EHP1"></img>
          <div className="challenge-main-title">Streamline Challenges</div>
          <div className="top-challenge">Join a run or cycling Challenge to stay on top of your game, earn new achievements and see how you stack up.
          </div>
        </article>
        <div className="challenge-main">
          <div className="challenge-buttons">
            <button className="vall" onClick={this.handleView('View All')}>View All</button>
            <button className="ride-c" onClick={this.handleView('Ride')}>Ride</button>
            <button className="run-c" onClick={this.handleView('Run')}>Run</button>
            <button className="peng-c" onClick={this.handleView('Penguin Catching')}>Penguin Catching</button>
          </div>
          <article className="challenge-wrapper">
            {challengeIndex}
          </article>
        </div>
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
