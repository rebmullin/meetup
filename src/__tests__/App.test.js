import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import EventList from "../EventList";
import CitySearch from "../CitySearch";
import EventCount from "../EventCount";
import { mockEvents } from "../mock-events";

describe("<App /> component", () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });
  test("render list of events", () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });
  test("render CitySearch", () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });
  test("render EventCount", () => {
    expect(AppWrapper.find(EventCount)).toHaveLength(1);
  });
});

describe("<App /> integration", () => {
  test("gets list of default events on initial load", async () => {
    const AppWrapper = mount(<App />);
    AppWrapper.instance().updateEvents = jest.fn();
    AppWrapper.instance().forceUpdate();
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    CitySearchWrapper.instance().handleItemClick("value");
    expect(AppWrapper.instance().updateEvents).toHaveBeenCalledTimes(1);
    expect(AppWrapper.instance().updateEvents).toHaveBeenCalledWith(
      5,
      undefined,
      undefined
    );
    AppWrapper.unmount();
  });

  test("get list of events after user selects a city", async () => {
    const AppWrapper = mount(<App />);
    AppWrapper.instance().updateEvents = jest.fn();
    AppWrapper.instance().forceUpdate();
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    CitySearchWrapper.instance().handleItemClick("value", 1.1, 1.2);
    expect(AppWrapper.instance().updateEvents).toHaveBeenCalledTimes(1);
    expect(AppWrapper.instance().updateEvents).toHaveBeenCalledWith(
      5,
      1.1,
      1.2
    );
    AppWrapper.unmount();
  });

  test("change state after get list of events", async () => {
    const AppWrapper = shallow(<App />);
    const page = 5;
    AppWrapper.instance().updateEvents(page, 1.1, 1.2);
    await AppWrapper.update();
    expect(AppWrapper.state("events")).toEqual(
      mockEvents.events.slice(0, page)
    );
  });

  test("render correct list of events", () => {
    const AppWrapper = mount(<App />);
    AppWrapper.setState({
      events: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
    });
    expect(AppWrapper.find(".Event")).toHaveLength(4);
    AppWrapper.unmount();
  });

  it("calls updateCount if the page count changes", () => {
    const AppWrapper = mount(<App />);
    const page = 3;
    AppWrapper.instance().updateCount = jest.fn();
    AppWrapper.setState({
      page: 1
    });

    AppWrapper.find(".count").simulate("change", {
      target: { value: page }
    });

    expect(AppWrapper.instance().updateCount).toHaveBeenCalledTimes(1);
    expect(AppWrapper.instance().updateCount).toHaveBeenCalledWith(page);
    AppWrapper.unmount();
  });

  it("calls updateEvents with the last lat, long values if the page count changes", () => {
    const AppWrapper = mount(<App />);
    const page = 3;
    AppWrapper.instance().updateEvents = jest.fn();
    AppWrapper.setState({
      page
    });

    AppWrapper.find(".count").simulate("change", {
      target: { value: page }
    });

    expect(AppWrapper.instance().updateEvents).toHaveBeenNthCalledWith(
      1,
      page,
      0,
      0
    );

    AppWrapper.setState({
      page: 4,
      lat: 3,
      lon: 2
    });

    expect(AppWrapper.instance().updateEvents).toHaveBeenNthCalledWith(
      2,
      4,
      3,
      2
    );

    AppWrapper.unmount();
  });
});
