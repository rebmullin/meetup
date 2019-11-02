import React, { Component } from "react";
import { getSuggestions } from "./api";

class CitySearch extends Component {
  state = {
    query: "",
    suggestions: []
  };

  handleChange = e => {
    const value = e.target.value;
    this.setState({ query: value });
    getSuggestions(value).then(suggestions =>
      this.setState({
        suggestions
      })
    );
  };

  handleItemClick = (value, lat, lon) => {
    this.setState({ query: value, suggestions: [] });
    this.props.updateEvents(this.props.page, lat, lon);
  };

  render() {
    return (
      <div className="CitySearch">
        <input
          className="city"
          type="text"
          value={this.state.query}
          onChange={this.handleChange}
          placeholder="City"
        />
        <ul className="suggestions">
          {this.state.suggestions.map(item => (
            <li
              onClick={() =>
                this.handleItemClick(item.name_string, item.lat, item.lon)
              }
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
