Feature: Specify Number of Events

Scenario: When user has not specified a number, 32 is the default number.
 Given the user opens the app
 When the user has not specified a number, 32 is the default number
 Then the user should see 32 events

Scenario: User can change the number of events they want to see.
  Given the page is open
  When the user changes the page value
  Then the user should see that many events returned