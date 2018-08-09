import React from 'react';
import {connect} from 'react-redux';
import {joinChallenge} from '../../actions/challenge_actions';


class ChallengeIndexItem extends React.Component{
  constructor(props){
    super(props);
    this.joinChallenge = this.joinChallenge.bind(this);
    this.state = {
      challenge: {id:0, img:"", workout_type:"", title:"", text:"", userIds: []}
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
    let that = this;

    const button = () => {
      if  ((that.state.challenge.userIds === undefined) || (that.state.challenge.userIds.includes(that.props.currentUserId))) {
        return ""
      } else {
        return (<button onClick={that.joinChallenge(challenge.id)} className="challenge-join">Join Now</button>);
      }
    }

    let ribbon = ((that.state.challenge.userIds === undefined) || (that.state.challenge.userIds.includes(that.props.currentUserId))) ? "corner-ribbon top-left sticky red shadow" : "";

    const bow = () => {
      if (ribbon.length > 0) {
        return (<div className={`${ribbon}`}>Joined</div>);
      } else {
        return ""
      }
    }

    let s = challenge.userIds.length > 1 || challenge.userIds.length === 0 ? "s" : ""

      return (
        <div key={challenge.id} className={`challenge-box`}>
          <img className="challenge-image" src={challenge.img}/>
          <div className="challenge-type">
            <div className="challenge-line-left"></div>
            <div>{challenge.workout_type}</div>
            <div className="challenge-line-right"></div>
          </div>
          <div className="challenge-title">{challenge.title}</div>
          <div className="challenge-text">{challenge.text}</div>
          {button()}
          {bow()}
          <div className="participants">{challenge.userIds.length} participant{s}</div>
        </div>
      )
  };
}

const msp = (state, ownProps) => {
  let currentUserId = state.session.id;
  return {
    currentUserId
  }
}

const mdp = (dispatch) => {
  return {
    joinChallenge: (challengeId) => dispatch(joinChallenge(challengeId))
  }
}

export default connect(msp, mdp)(ChallengeIndexItem);
