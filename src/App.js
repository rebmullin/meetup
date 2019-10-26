import React from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import EventCount from "./EventCount";

function App() {
  return (
    <div className="App">
      <EventCount />
      <CitySearch />
      <EventList />
    </div>
  );
}

export default App;
