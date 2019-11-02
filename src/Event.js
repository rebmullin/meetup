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
    const { event } = this.props;
    const { hidden } = this.state;
    return (
      <li className="Event">
        <div className="EventDetails">
          <h3>{event.name}</h3>

          {!hidden && (
            <>
              <div className="EventDetails--full extra">
                <p>status: {event.status}</p>
                <span>
                  <strong>Date:</strong> {event.local_date}
                </span>
                &nbsp;
                <span>
                  <strong>Time:</strong> {event.local_time}
                </span>
                <p
                  className="EventDetails-Description"
                  dangerouslySetInnerHTML={{
                    __html: event.description
                  }}
                />
                <a href={event.link}>{event.link}</a>
              </div>
              <br />
            </>
          )}
          <button onClick={this.handleClick} className="details details-btn">
            {hidden ? "Show Details" : "Hide Details"}
          </button>
        </div>
      </li>
    );
  }
}

export default Event;
