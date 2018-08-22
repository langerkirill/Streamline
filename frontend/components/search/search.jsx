import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onSearchChange();
  }

  render(){
    let search = this.props.search;

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
          <input type="text" className="search-input"></input>
          <button className="search-exit" onClick={this.handleChange}>X</button>
        </div>
      )
    }
  }
}

export default Search;
