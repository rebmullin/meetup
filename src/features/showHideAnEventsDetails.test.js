import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";
import App from "../App";
import Event from "../Event";
import { mockEvents } from "../mock-events";

let events = mockEvents.events.slice(0, 32); // default is to display 5

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, test => {
  let AppWrapper;
  let EventWrapper;
  test("An event element is collapsed by default.", ({ given, when, then }) => {
    given("the user opens the app", () => {
      AppWrapper = mount(<App />);
    });

    when("the events list has loaded", () => {
      expect(events).toHaveLength(32);
    });

    then(
      "the user should not see the event details when the page is first loaded",
      () => {
        expect(AppWrapper.find(".EventDetails--full extra")).toHaveLength(0);
        AppWrapper.unmount();
      }
    );
  });

  test("User can expand an event to see its details.", ({
    given,
    when,
    then
  }) => {
    given("the page is showing an event list", () => {
      AppWrapper = mount(<App />);
    });

    when("the user clicks on the Show Detail button", () => {
      expect(events).toHaveLength(32);

      AppWrapper.update();

      EventWrapper = AppWrapper.find(Event).at(0);
      EventWrapper.find(".details-btn").simulate("click");
    });

    then("the user should see additional information about the event", () => {
      EventWrapper = AppWrapper.find(Event).at(0);
      expect(EventWrapper.find(".EventDetails--full")).toHaveLength(1);

      //  AppWrapper.unmount();
    });
  });

  test("User can collapse an event to hide its details.", ({
    given,
    when,
    then
  }) => {
    given("the has expanded an event item", () => {
      expect(EventWrapper.find(".EventDetails--full")).toHaveLength(1);
    });

    when("the user clicks on Hide Details button", () => {
      EventWrapper.find(".details-btn").simulate("click");
    });

    then("the user should see it hide the additional details", () => {
      EventWrapper = AppWrapper.find(Event).at(0);
      expect(EventWrapper.find(".EventDetails--full")).toHaveLength(0);
    });
  });
});
