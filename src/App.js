import React from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import EventCount from "./EventCount";
import { getEvents } from "./api";

class App extends React.Component {
  state = {
    events: [],
    page: 32,
    lat: 0,
    lon: 0
  };

  componentDidMount() {
    getEvents().then(events => this.setState({ events }));
  }

  componentDidUpdate(prevProps, prevState) {
    // We need to refetch if the page params have changed.
    if (this.state.page !== prevState.page) {
      this.updateEvents(this.state.page, this.state.lat, this.state.lon);
    }
  }

  updateEvents = (page, lat, lon) => {
    getEvents(page, lat, lon).then(events =>
      this.setState({ events, lat, lon })
    );
  };

  updateCount = page => {
    this.setState({ page });
  };

  render() {
    return (
      <div className="App">
        <CitySearch updateEvents={this.updateEvents} page={this.state.page} />
        <EventCount updateCount={this.updateCount} />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
