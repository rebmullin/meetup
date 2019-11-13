import React, { Component } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend
} from "recharts";

const COLORS = ["#0088FE", "#00C49F"];

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

  getData = () => {
    const { event } = this.props;
    return [
      { name: "Slots", value: event.rsvp_limit },
      { name: "Reservations", value: event.yes_rsvp_count }
    ];
  };

  render() {
    const { event } = this.props;
    const { hidden } = this.state;
    const showChart = event.rsvp_limit && event.yes_rsvp_count;
    const data = this.getData();
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
                {showChart && (
                  <ResponsiveContainer height={400}>
                    <PieChart>
                      <Pie
                        dataKey="value"
                        data={data}
                        labelLine={false}
                        outerRadius={80}
                        label
                      >
                        {data.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={this.renderCustomTooltip} />
                      <Legend verticalAlign="middle" align="left" />
                    </PieChart>
                  </ResponsiveContainer>
                )}
                <p>
                  <a href={event.link}>{event.link}</a>
                </p>
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
