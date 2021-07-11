Feature: Make an appointment
  As a user
  I want to login in the system and fill in the appointment form data
  So that I can create an appointment

  Scenario: Make an appointment
    Given I have the browser open
    When I navigate to the URL
    And I click on the "Make Appointment" button
    And I insert "John Doe" in the username field
    And I insert "ThisIsNotAPassword" in the password field
    And I click on the "Login" button
    And I set the location to the "Tokyo" Healthcare Center
    And I apply for readmission
    And I choose Medicaid
    And I select the date to 06/11/2019
    And I add "xpto" in the comments field
    And I click on the "Book Appointment" button
    Then I see the text "Appointment Confirmation"
