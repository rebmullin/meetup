import React, { Component } from "react";
import Event from "./Event";

class EventList extends Component {
  state = {
    events: []
  };

  render() {
    return (
      <ul className="EventList">
        {this.state.events.map((event, i) => (
          <Event key={event.id} event={event} />
        ))}
      </ul>
    );
  }
}

export default EventList;
