import React from 'react';
import WorkoutIndex from '../workouts/workouts_index';
import UserBox from '../user/user_box';
import BikingRunningBox from '../boxes/biking_running_box';
import FriendSuggestionBox from '../boxes/friend_suggestion_box';
import { connect } from 'react-redux';

class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      top: false,
      display: "Following"
    }
    this.handleScroll = this.handleScroll.bind(this);
    this.handleDisplay = this.handleDisplay.bind(this);
  }

  componentDidMount() {
    this.props.fetchWorkouts();
  }

  componentWillMount () {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll () {
    let lastScrollY = window.scrollY;
    if (lastScrollY > 142){
      this.setState({top:true})
    } else {
      this.setState({top:false})
    }
  }

  handleDisplay () {
    let options = ['Your Activities', 'Following'];
    let current = this.state.display;
    let display = options.filter(function(item) {
      return item !== current
    });
    let newDisplay = display[0];
    this.setState({display: newDisplay});
  }

  render () {

    let scroll_class = this.state.top ? "scroll-dash" : "";
    let stay_class = this.state.top ? "dont" : "appear";
    let stay_friend = this.state.top ? "do" : "appear";

    return (
      <div className="dash-bored">
        <div className={`${scroll_class}`}>
          <UserBox workouts={this.props.workouts} follows={this.props.follows} key={3} />
          <BikingRunningBox key={2} user={this.props.user} workouts={this.props.workouts}/>
        </div>
        <div className="main-feed">
          <button className="toggle-workouts" onClick={this.handleDisplay}>{this.state.display}</button>
          <WorkoutIndex key={1} following={this.props.follows[0]} followers={this.props.follows[1]} kudos={this.props.kudos} comments={this.props.comments} className="workout-index" user={this.props.user} display={this.state.display} workouts={this.props.workouts}/>
        </div>
        <div className="right-dash">
          <FriendSuggestionBox user={this.props.user} follows={this.props.follows} users={this.props.users}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  const workouts = Object.values(state.entities.workouts);
  const users = Object.values(state.entities.users);
  const user = state.entities.users[state.session.id];
  const comments = Object.values(state.entities.comments);
  const kudos = Object.values(state.entities.kudos);
  const follows = Object.values(state.entities.follows);

  return {
    workouts,
    users,
    user,
    comments,
    kudos,
    follows
  };
};

const mapDispatchToProps = (dispatch) => {
  // here we want to dispatch an action to signup a user and call it formAction
  return {
    fetchWorkouts: () => dispatch(fetchWorkouts())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
