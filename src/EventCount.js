import React, { Component } from "react";

class EventCount extends Component {
  state = {
    count: 0
  };

  handleChange = e => {
    const value = e.target.value;
    this.setState({ count: value });
  };

  render() {
    return (
      <div className="EventCount">
        <input
          className="count"
          type="number"
          onChange={this.handleChange}
          value={this.state.count}
        />
      </div>
    );
  }
}

export default EventCount;
