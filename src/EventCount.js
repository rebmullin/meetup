import React, { Component } from "react";

class EventCount extends Component {
  state = {
    count: 32
  };

  handleChange = e => {
    const value = e.target.value;
    this.setState({ count: value });
    this.props.updateCount(Number(value));
  };

  render() {
    return (
      <div className="EventCount">
        Show
        <input
          className="count"
          type="number"
          onChange={this.handleChange}
          value={this.state.count}
          min={1}
        />
        Events
      </div>
    );
  }
}

export default EventCount;
