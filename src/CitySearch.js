import React, { Component } from "react";

class CitySearch extends Component {
  state = {
    query: "Munich",
    suggestions: []
  };

  handleChange = e => {
    const value = e.target.value;
    this.setState({ query: value });
  };

  handleItemClick = value => {
    this.setState({ query: value });
  };

  render() {
    return (
      <div className="CitySearch">
        <input
          className="city"
          type="text"
          value={this.state.query}
          onChange={this.handleChange}
        />
        <ul className="suggestions">
          {this.state.suggestions.map(item => (
            <li
              onClick={() => this.handleItemClick(item.name_string)}
              key={item.name_string}
            >
              {item.name_string}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CitySearch;
