Feature: Check Landing Page Content
  As a user
  I want to navigate to the AUT URL https://katalon-demo-cura.herokuapp.com/
  So that I can see the landing page of the AUT

  Scenario: Check Make Appointment button is present
    Given I have the browser open
    When I navigate to the URL
    Then I verify that the button "Make Appointment" is present
