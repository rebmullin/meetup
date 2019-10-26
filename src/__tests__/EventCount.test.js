import React from "react";
import { shallow } from "enzyme";
import EventCount from "../EventCount";

describe("<CitySearch /> component", () => {
  let EventCountWrapper;
  beforeAll(() => {
    EventCountWrapper = shallow(<EventCount />);
  });

  it("render number input", () => {
    expect(EventCountWrapper.find(".count")).toHaveLength(1);
  });

  it("change state when user changes input", () => {
    const eventObject = { target: { value: 1 } };
    EventCountWrapper.find(".count").simulate("change", eventObject);
    expect(EventCountWrapper.state("count")).toBe(1);
  });
});
