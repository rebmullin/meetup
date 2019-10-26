import React, { Component } from "react";

class Event extends Component {
  state = {
    hidden: true
  };

  handleClick = e => {
    this.setState({
      hidden: !this.state.hidden
    });
  };
  render() {
    return (
      <li className="Event">
        {!this.state.hidden && (
          <div className="EventDetails">{this.props.event.description}</div>
        )}
        <button onClick={this.handleClick} className="details"></button>
      </li>
    );
  }
}

export default Event;
