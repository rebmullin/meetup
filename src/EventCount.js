import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class EventCount extends Component {
  state = {
    count: 32,
    infoText: ""
  };

  handleChange = e => {
    const value = e.target.value;

    if (value <= 0) {
      this.setState({
        infoText: "Number should be at least 1"
      });
    } else {
      this.setState({
        infoText: ""
      });
    }
    this.setState({ count: value });
    this.props.updateCount(Number(value));
  };

  render() {
    return (
      <div className="EventCount">
        <>
          Show
          <input
            className="count"
            type="number"
            onChange={this.handleChange}
            value={this.state.count}
            min={1}
          />
          Events
          <ErrorAlert text={this.state.infoText} />
        </>
      </div>
    );
  }
}

export default EventCount;
