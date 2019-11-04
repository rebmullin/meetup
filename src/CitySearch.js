import React, { Component } from "react";
import { getSuggestions } from "./api";
import { InfoAlert } from "./Alert";

class CitySearch extends Component {
  state = {
    query: "",
    suggestions: [],
    infoText: ""
  };

  handleChange = e => {
    const value = e.target.value;
    this.setState({ query: value });
    getSuggestions(value).then(suggestions => {
      this.setState({ suggestions });

      if (value && suggestions.length === 0) {
        this.setState({
          infoText:
            "We can not find the city you are looking for. Please try another city"
        });
      } else {
        this.setState({
          infoText: ""
        });
      }
    });
  };

  handleItemClick = (value, lat, lon) => {
    this.setState({ query: value, suggestions: [] });
    this.props.updateEvents(this.props.page, lat, lon);
  };

  render() {
    return (
      <div className="CitySearch">
        <InfoAlert text={this.state.infoText} />
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
