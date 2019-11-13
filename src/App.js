import React from "react";
import moment from "moment";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import EventCount from "./EventCount";
import { getEvents } from "./api";
import { InfoAlert } from "./Alert";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

class App extends React.Component {
  state = {
    events: [],
    page: 32,
    lat: 0,
    lon: 0,
    infoText: ""
  };

  componentDidMount() {
    getEvents().then(results => {
      this.setState({ events: results.events, infoText: results.alertMessage });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // We need to refetch if the page params have changed.
    if (this.state.page !== prevState.page) {
      this.updateEvents(this.state.page, this.state.lat, this.state.lon);
    }
  }

  getData = () => {
    const next7Days = [];
    const currentDate = moment(); // Today

    for (let i = 0; i < 7; i += 1) {
      currentDate.add(1, "days"); // Add 1 day to current date, currentDate changes
      const dateString = currentDate.format("YYYY-MM-DD");
      const count = this.countEventsOnADate(dateString);
      next7Days.push({ date: dateString, number: count });
    }

    return next7Days;
  };

  countEventsOnADate = date => {
    let count = 0;
    for (let i = 0; i < this.state.events.length; i += 1) {
      if (this.state.events[i].local_date === date) {
        count += 1;
      }
      return count;
    }
  };

  updateEvents = (page, lat, lon) => {
    getEvents(page, lat, lon).then(results =>
      this.setState({
        events: results.events,
        infoText: results.alertMessage,
        lat,
        lon
      })
    );
  };

  updateCount = page => {
    this.setState({ page });
  };

  render() {
    return (
      <div className="App">
        <InfoAlert text={this.state.infoText} />
        <CitySearch updateEvents={this.updateEvents} page={this.state.page} />
        <EventCount updateCount={this.updateCount} />

        <ResponsiveContainer height={400}>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20
            }}
          >
            <CartesianGrid />
            <XAxis type="category" dataKey="date" name="date" />
            <YAxis
              type="number"
              dataKey="number"
              name="number of events"
              allowDecimals={false}
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={this.getData()} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>

        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
