import React, { Component } from "react";
import { PieChart, Pie, Tooltip } from "recharts";

class Event extends Component {
  state = {
    hidden: true
  };

  handleClick = e => {
    this.setState({
      hidden: !this.state.hidden
    });
  };

  renderCustomTooltip = ({ active, payload }) => {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
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
                <PieChart width={400} height={400}>
                  <Pie
                    dataKey="value"
                    data={[
                      { name: "Slots", value: event.rsvp_limit },
                      { name: "Reservations", value: event.yes_rsvp_count }
                    ]}
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  />
                  <Tooltip content={this.renderCustomTooltip} />
                </PieChart>
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
