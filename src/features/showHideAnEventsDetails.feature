Feature: Show/Hide An Event Details

Scenario: An event element is collapsed by default.
 Given the user opens the app
 When the events list has loaded
 Then the user should not see the event details when the page is first loaded

Scenario: User can expand an event to see its details.
  Given the page is showing an event list
  When the user clicks on the Show Detail button
  Then the user should see additional information about the event

Scenario: User can collapse an event to hide its details.
  Given the has expanded an event item
  When the user clicks on Hide Details button
  Then the user should see it hide the additional details