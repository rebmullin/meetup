import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";

describe("<Event /> component", () => {
  let EventWrapper;
  let eventDescription = "Dont miss this great event!";

  beforeAll(() => {
    EventWrapper = shallow(
      <Event event={{ id: 1, description: eventDescription }} />
    );
  });

  beforeEach(() => {
    EventWrapper.setState({ hidden: true });
  });

  test("does not render event details in default view", () => {
    expect(EventWrapper.state("hidden")).toBe(true);
  });
  test("if the user clicks on 'Show More', event details are displayed", () => {
    EventWrapper.find(".details").simulate("click");
    expect(EventWrapper.state("hidden")).toBe(false);
    expect(EventWrapper.find(".EventDetails").text("something")).toBe(
      eventDescription
    );
    expect(EventWrapper.find(".EventDetails")).toHaveLength(1);
  });
  test("if the user clicks on 'Show Less', event details will not be displayed", () => {
    EventWrapper.find(".details").simulate("click");
    expect(EventWrapper.state("hidden")).toBe(false);
    expect(EventWrapper.find(".EventDetails")).toHaveLength(1);
    EventWrapper.find(".details").simulate("click");
    expect(EventWrapper.state("hidden")).toBe(true);
    expect(EventWrapper.find(".EventDetails")).toHaveLength(0);
  });
});
