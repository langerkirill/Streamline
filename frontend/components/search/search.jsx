import React from 'react';

class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      search:false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    let bool = !this.state.search;
    this.setState({search:bool})
  }

  render(){
    if (!this.state.search) {
      return(
        <div onClick={this.handleClick} className="searcharino">
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
          <input type="text" className="search-input"></input>
          <button onClick={this.handleClick}>X</button>
        </div>
      )
    }
  }
}

export default Search;
