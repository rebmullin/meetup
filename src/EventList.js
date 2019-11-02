import React, { Component } from "react";
import Event from "./Event";

class EventList extends Component {
  render() {
    return (
      <ul className="EventList">
        {this.props.events.map((event, i) => (
          <Event key={event.id} event={event} />
        ))}
      </ul>
    );
  }
}

export default EventList;
