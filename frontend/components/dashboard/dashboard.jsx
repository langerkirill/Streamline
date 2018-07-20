import React from 'react';
import WorkoutIndex from '../workouts/workouts_index';
import UserBox from '../user/user_box';
import BikingRunningBox from '../boxes/biking_running_box';
import { connect } from 'react-redux';

class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      top:false
    }
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

  render () {

    let scroll_class = this.state.top ? "scroll-dash" : "stay";
    let stay_class = this.state.top ? "dont" : "appear";


    return (
      <div className="dash-bored">
        <div className="f-wrapper"></div>
        <div className={`${stay_class} invisipad`}></div>
        <div className={`${scroll_class}`}>
          <UserBox />
          <BikingRunningBox user={this.props.user} workouts={this.props.workouts}/>
        </div>
        <WorkoutIndex className="workout-index" workouts={this.props.workouts}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const workouts = Object.values(state.entities.workouts);
  const users = state.entities.users;
  const user = state.entities.users[state.session.id];
  return {
    workouts,
    users,
    user
  };
};

const mapDispatchToProps = (dispatch) => {
  // here we want to dispatch an action to signup a user and call it formAction
  return {
    fetchWorkouts: () => dispatch(fetchWorkouts())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
