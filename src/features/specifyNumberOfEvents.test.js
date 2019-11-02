import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount, shallow } from "enzyme";
import App from "../App";
import EventCount from "../EventCount";
import Event from "../Event";
import { mockEvents } from "../mock-events";

let events = mockEvents.events.slice(0, 32);

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, test => {
  test("When user has not specified a number, 32 is the default number.", ({
    given,
    when,
    then
  }) => {
    let AppWrapper;

    given("the user opens the app", () => {
      AppWrapper = mount(<App />);
    });

    when(
      /^the user has not specified a number, (.*) is the default number$/,
      arg0 => {}
    );

    then(/^the user should see (.*) events$/, arg0 => {
      expect(events).toHaveLength(32);
    });
  });

  test("User can change the number of events they want to see.", ({
    given,
    when,
    then
  }) => {
    let AppWrapper;
    given("the page is open", () => {
      AppWrapper = mount(<App />);
    });

    when("the user changes the page value", () => {
      let EventCountWrapper = AppWrapper.find(EventCount);

      EventCountWrapper.find(".count").simulate("change", {
        target: { value: 1 }
      });
    });

    then("the user should see that many events returned", () => {
      AppWrapper.update();
      const EventWrapper = AppWrapper.find(Event);
      expect(EventWrapper).toHaveLength(1);
    });
  });
});
