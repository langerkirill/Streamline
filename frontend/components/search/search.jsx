import React from 'react';
import {searchUsers} from '../../actions/user_actions';
import {connect} from 'react-redux'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    this.props.searchUsers(e.target.value);
  }

  handleChange(e) {
    this.props.onSearchChange();
  }

  render(){
    let search = this.props.search;

    let that = this;

    let searchBox = () => {
      if (that.props.searchItems.length > 0){
        let items = this.props.searchItems.map(user => {
          return (
            <div className="search-box-item">
              <img className="search-img" src={user.photoUrl}/>
              <div>{user.username}</div>
            </div>
          )

        })
        return(
          <div className="search-box">
            {items}
          </div>
        )
      }
    }

    if (!search) {
      return(
        <div onClick={this.handleChange} className="searcharino">
          <i className="search-icon material-icons">&#xe8b6;</i>
        </div>
      )
    } else {
      return(
        <div className="search-boxes">
          <select className="search-item">
            <option value="biking">Activites</option>
            <option value="running">Athletes</option>
            <option value="swimming">Clubs</option>
            <option value="coding">Segments</option>
          </select>
          <input onChange={this.handleSearch} type="text" className="search-input"></input>
          <button className="search-exit" onClick={this.handleChange}>X</button>
          {searchBox()}
        </div>
      )
    }
  }
}

const msp = (state) => {
  debugger
  const searchItems = Object.values(state.entities.search);
  return {
    searchItems
  }
}

const mdp = (dispatch) => {
  return {
    searchUsers: (query) => dispatch(searchUsers(query))
  }
}


export default connect(msp, mdp)(Search);
