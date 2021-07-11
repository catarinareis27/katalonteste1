import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject

import com.kms.katalon.core.annotation.Keyword
import com.kms.katalon.core.checkpoint.Checkpoint
import com.kms.katalon.core.checkpoint.CheckpointFactory
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.model.FailureHandling
import com.kms.katalon.core.testcase.TestCase
import com.kms.katalon.core.testcase.TestCaseFactory
import com.kms.katalon.core.testdata.TestData
import com.kms.katalon.core.testdata.TestDataFactory
import com.kms.katalon.core.testobject.ObjectRepository
import com.kms.katalon.core.testobject.TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI

import internal.GlobalVariable

import org.openqa.selenium.WebElement
import org.openqa.selenium.WebDriver
import org.openqa.selenium.By

import com.kms.katalon.core.mobile.keyword.internal.MobileDriverFactory
import com.kms.katalon.core.webui.driver.DriverFactory

import com.kms.katalon.core.testobject.RequestObject
import com.kms.katalon.core.testobject.ResponseObject
import com.kms.katalon.core.testobject.ConditionType
import com.kms.katalon.core.testobject.TestObjectProperty

import com.kms.katalon.core.mobile.helper.MobileElementCommonHelper
import com.kms.katalon.core.util.KeywordUtil

import com.kms.katalon.core.webui.exception.WebElementNotFoundException

import cucumber.api.java.en.And
import cucumber.api.java.en.Given
import cucumber.api.java.en.Then
import cucumber.api.java.en.When



class MakeAppointmentStepDefs {
	
	@When("I click on the {string} button")
	public void i_click_on_the_button(String btnName) {
		WebUI.click(findTestObject('Object Repository/Page_CURA Healthcare Service/btn_' + btnName))		
	}
	
	@When("I insert {string} in the username field")
	public void i_insert_in_the_username_field(String string) {
		WebUI.setText(findTestObject('Object Repository/Page_CURA Healthcare Service/input_Username_username'), 'John Doe')
	}
	
	@When("I insert {string} in the password field")
	public void i_insert_in_the_password_field(String string) {
		WebUI.setEncryptedText(findTestObject('Object Repository/Page_CURA Healthcare Service/input_Password_password'), 'g3/DOGG74jC3Flrr3yH+3D/yKbOqqUNM')
	}
	
	@When("I set the location to the {string} Healthcare Center")
	public void i_set_the_location_to_the_Healthcare_Center(String string) {
		WebUI.selectOptionByValue(findTestObject('Object Repository/Page_CURA Healthcare Service/select_Tokyo CURA Healthcare Center        _5b4107'),
			'Hongkong CURA Healthcare Center', true)
	}
	
	@When("I apply for readmission")
	public void i_apply_for_readmission() {
		WebUI.click(findTestObject('Object Repository/Page_CURA Healthcare Service/label_Apply for hospital readmission'))
	}
	
	@When("I choose Medicaid")
	public void i_choose_Medicaid() {
		WebUI.click(findTestObject('Object Repository/Page_CURA Healthcare Service/input_Medicaid_programs'))
	}
	
	@When("I select the date to {int}\\/{int}\\/{int}")
	public void i_select_the_date_to(Integer int1, Integer int2, Integer int3) {
		WebUI.click(findTestObject('Object Repository/Page_CURA Healthcare Service/input_Visit Date (Required)_visit_date'))
		
		WebUI.click(findTestObject('Object Repository/Page_CURA Healthcare Service/td_28'))
	}
	
	@When("I add {string} in the comments field")
	public void i_add_in_the_comments_field(String string) {
		WebUI.setText(findTestObject('Object Repository/Page_CURA Healthcare Service/textarea_Comment_comment'), 'xpto')
	}
	
	@Then("I see the text {string}")
	public void i_see_the_text(String message) {
		//WebUI.click(findTestObject('Object Repository/Page_CURA Healthcare Service/h2_Appointment Confirmation'))
		WebUI.verifyTextPresent(message, false)
		
		WebUI.closeBrowser()

	}
	
}