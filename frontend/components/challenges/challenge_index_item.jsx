import React from 'react';
import {connect} from 'react-redux';
import {joinChallenge} from '../../actions/challenge_actions';


class ChallengeIndexItem extends React.Component{
  constructor(props){
    super(props);
    this.joinChallenge = this.joinChallenge.bind(this);
    this.state = {
      challenge: {id:0, img:"", workout_type:"", title:"", text:""}
    }
  }

  componentDidMount(){
    let challenge = this.props.challenge;
    this.setState({challenge: challenge});
  }

  componentWillReceiveProps(nextProps, ownProps){
    let challenge = nextProps.challenge;
    this.setState({challenge: challenge});
  }

  joinChallenge(challengeId){
    let that = this;
    return () => {
      that.props.joinChallenge(challengeId);
    }
  }

  render(){
    let challenge = this.state.challenge;
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
          <button onClick={this.joinChallenge(challenge.id)} className="challenge-join">Join Now</button>
        </div>
      )
  };
}

const mdp = (dispatch) => {
  return {
    joinChallenge: (challengeId) => dispatch(joinChallenge(challengeId))
  }
}

export default connect(null, mdp)(ChallengeIndexItem);
