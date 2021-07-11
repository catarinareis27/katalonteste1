Feature: Login
  As a user
  I want to login in the AUT
  So that I can have access to additional AUT features

  Scenario: Valid Login through Make Appointment
    Given I have the browser open
    When I navigate to the URL
    And I click on the "Make Appointment" button
    And I insert "John Doe" in the username field
    And I insert "ThisIsNotAPassword" in the password field
    And I click on the "Login" button
    Then I see the text "Make Appointment"
