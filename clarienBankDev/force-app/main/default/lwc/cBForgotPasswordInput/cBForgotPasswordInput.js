/*
    Author - Aditya
    Created Date - 06/03/2024
    Modified Date - 08/03/2024, 14/03/2024, 21/03/2024
    Description - This component provides a user interface for users to input and confirm their new password, along with validation
                checks for password criteria and matching. It integrates with Salesforce custom labels for UI elements and utilizes
                the NavigationMixin for navigation functionality. The component also includes an authentication process with loading
                indicators and a confirmation modal upon successful authentication.
*/

import { LightningElement, track, api, wire } from 'lwc'; // Importing LightningElement and track decorator
import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality

// Importing custom labels from Salesforce
import NEW_PASSWORD from '@salesforce/label/c.CB_NewPassword';
import CONFIRM_PASSWORD from '@salesforce/label/c.CB_ConfirmPassword';
import PASSWORD_MUST_CONTAIN from '@salesforce/label/c.CB_PasswordMustContain10';
import MIN_10_CHARS from '@salesforce/label/c.CB_Min10Chars';
import ATLEAST_ONE_UPPER from '@salesforce/label/c.CB_AtLeastOneUpperCase';
import ATLEAST_SPEC_CHAR from '@salesforce/label/c.CB_AtLeastOneSpecChar';
import NEXT from '@salesforce/label/c.CB_Next';
import SUBMIT from '@salesforce/label/c.CB_Submit';
import CANCEL from '@salesforce/label/c.CB_Cancel';
import ENTER_PASSWORD from '@salesforce/label/c.CB_EnterYourPassword';
import ERROR_CRITERIA_NOT_MATCH from '@salesforce/label/c.CB_ErrorCriteriaNotMatch';
import ERROR_PASS_MISMATCH from '@salesforce/label/c.CB_ErrorPassMismatch';
import ERROR_ENTER_THE_PASS from '@salesforce/label/c.CB_ErrorEnterThePass';
import PASSWORD_RESET_MESSAGE from '@salesforce/label/c.CB_Password_Reset';
import AUTHENTICATION_SUCCESSFUL_MESSAGE from '@salesforce/label/c.CB_Authentication_Successful';
import AUTHENTICATION_INPROGRESS_MESSAGE from '@salesforce/label/c.CB_Authentication_InProgress';
import AUTHENTICATION_FAILURE_MESSAGE from '@salesforce/label/c.CB_Authentication_Failed';


//resources for Ad-hauthentication process
import CB_LOADING_GIF from '@salesforce/resourceUrl/CBLoadingSpinner';
import CB_AUTHENTICATION_SUCCESS from '@salesforce/resourceUrl/CBAutenticationSuccess';
import CB_AUTHENTICATION_FAILED from '@salesforce/resourceUrl/CBAutenticationFailed';
import CBSVG from "@salesforce/resourceUrl/CBSVG"

//apex class to handle the api callout
import forgetPassword from "@salesforce/apex/CBApiController.forgetPassword";

import { getJsonData, getLocalStorage, dateToTimestamp } from 'c/cBUtilities';

export default class CBForgotPasswordInput extends NavigationMixin(LightningElement) {

    // Object to hold imported labels
    label = {
        NEW_PASSWORD,
        CONFIRM_PASSWORD,
        PASSWORD_MUST_CONTAIN,
        MIN_10_CHARS,
        ATLEAST_ONE_UPPER,
        ATLEAST_SPEC_CHAR,
        NEXT: NEXT.toUpperCase(), // Converting "Next" label to uppercase
        SUBMIT: SUBMIT.toUpperCase(), // Converting "Submit" label to uppercase
        CANCEL: CANCEL.toUpperCase(), // Converting "Cancel" label to uppercase
        ENTER_PASSWORD,
        ERROR_CRITERIA_NOT_MATCH,
        ERROR_PASS_MISMATCH,
        ERROR_ENTER_THE_PASS,
    };

    CBBackIcon = `${CBSVG}/CBSVGs/CBBackIcon.svg#CBBackIcon`;
    CBShowPassword = `${CBSVG}/CBSVGs/CBShowPassword.svg#CBShowPassword`;
    CBHidePassword = `${CBSVG}/CBSVGs/CBHidePassword.svg#CBHidePassword`;

    // Properties to store password values and visibility flags
    newPassword = '';
    confirmPassword = '';
    newPasswordShow = false;
    confirmPasswordShow = false;

    apiName = 'CB_POST_Forgot_Password';
    jsonPathData = []
    reqBody = ''
    formId = ''
    headerObj = ''
    requestUUID = ''

    //flag variable to enable/disable submit button
    submitted = false;

    //flag variable to enable/disable submit button
    @api isBackNotAvailable;
    //flag variable to show/hide confirmation modal
    confirmModal = false
    // Tracking errors for newPassword and confirmPassword fields
    @track errors = ['', ''];  // Array to store error messages for newPassword and confirmPassword

    successGif = CB_AUTHENTICATION_SUCCESS
    failureGif = CB_AUTHENTICATION_FAILED


    // Authentication Status Modal initial configuration
    @track authenticationPopup = {

        // Initial Authentication Status message
        authenticationStatus: '',
        // Authentication Status GIF
        authenticationSpinnergif: null,
        // Authentication Status open or close status
        openModal: false,
        // Authentication loading animation visibility
        showLoadingAnimation: true
    }

    // Confirmation modal configuration for displaying a success message when the password is changed, with an 'OK' button to close the modal.
    @track comfirmModalConf = {
        title: '', // Title of the confirmation modal
        message: '',    // Message content of the modal (empty in this case)
        yesButton: {
            exposed: true,  // Whether the button is exposed (visible)
            label: "OK",    // Label text for the button
            implementation: () => { // Function to execute when the button is clicked
                this.navigateTo('Login')    // Navigate to the 'Login' page
                this.modalOpen = false      // Close the modal
            }
        },
    }

    connectedCallback() {
        console.log(getLocalStorage('CBUserSessionId'));
        console.log(getLocalStorage('CBUserFormId'));
        this.formId = getLocalStorage('CBUserFormId');
        console.log(this.requestUUID);
        this.requestUUID = dateToTimestamp();
        console.log('calling getJsonData');
        this.headerObj = {
            "Cookie": getLocalStorage('CBUserSessionId')
        }
        this.fetchJsonData()
    }

    // Event handler for new password input
    newPasswordHandler(event) {
        this.newPassword = event.target.value;
        this.checkPasswordRegex(event.target.value); // Validate password criteria using regex
    }

    // Event handler for confirm password input
    confirmPasswordHandler(event) {
        this.confirmPassword = event.target.value;
        this.checkPasswordMismatch(); // Check if passwords match
    }

    // Method to validate password criteria using regex
    checkPasswordRegex(password) {
        if (this.newPassword !== '') {
            // Check if password meets criteria (minimum length, uppercase, special characters)
            this.errors[0] = !/^.{10,}$/.test(password) || !/[A-Z]/.test(password) || !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? this.label.ERROR_CRITERIA_NOT_MATCH : '';
        } else {
            // Display error if password is empty
            this.errors[0] = this.label.ERROR_ENTER_THE_PASS;
        }
        // Check password mismatch after validating criteria
        this.checkPasswordMismatch();
    }

    // Method to check if passwords match
    checkPasswordMismatch() {
        if (this.confirmPassword !== '') {
            // Compare newPassword and confirmPassword
            if (this.newPassword !== this.confirmPassword) {
                this.errors[1] = this.label.ERROR_PASS_MISMATCH;
            } else {
                this.errors[1] = '';
            }
        }
    }

    // Getter for displaying confirm password error message
    get confirmPasswordError() {
        return this.errors[1] ? this.errors[1] : '';
    }

    // Getter for displaying new password error message
    get newPasswordError() {
        return this.errors[0] ? this.errors[0] : '';
    }

    // Getter for dynamic styling of new password input field
    get newPasswordClass() {
        return this.errors[0] ? 'new-password error-input-field' : 'new-password';
    }

    // Getter for dynamic styling of confirm password input field
    get confirmPasswordClass() {
        return this.errors[1] ? 'confirm-password error-input-field' : 'confirm-password';
    }

    // Getter for dynamic styling of new password label
    get newPasswordLabelClass() {
        return this.errors[0] ? 'error-input-label' : '';
    }

    // Getter for dynamic styling of confirm password label
    get confirmPasswordLabelClass() {
        return this.errors[1] ? 'error-input-label' : '';
    }

    // Method to handle form submission
    submit(event) {
        event.preventDefault(); // Prevent default form submission behavior
        console.log('submit called');
        this.forgetPasswordHandler();
    }

    /**
    * This function does 2 things, it substitues the request body with the variables that are declared in this component, and calls an Apex method that does an API callout for virtual user signing in. 
    * @returns {void}
    */
    forgetPasswordHandler() {
        try {
            console.log('forgetPasswordHandler called');
            console.log(this.reqBody);
            console.log(this.jsonPathData);
            // this.reqBody = cBJsonDataHandler.dataMap(this.reqBody, this.jsonPathData);
            this.reqBody = this.dataMap(this.reqBody, this.jsonPathData)
            console.log(JSON.stringify(this.reqBody))
            let reqWrapper = {
                payload: JSON.stringify(this.reqBody),
                metadataName: this.apiName,
                headers: JSON.stringify(this.headerObj)
            }
            forgetPassword({ reqWrapper: reqWrapper })
                .then((result) => {
                    console.log(result);
                    console.log(JSON.parse(result).header.status.message[0].messageCode);
                    if (JSON.parse(result).header.status.message[0].messageCode === "100") {
                        console.log(JSON.parse(result).header.status.message.messageCode);
                        this.submitted = true   // Set submitted flag to true
                        this.authenticate(this.successGif, AUTHENTICATION_SUCCESSFUL_MESSAGE);
                        this.comfirmModalConf.title = JSON.parse(result).header.status.message[0].messageDescription;
                    } else {
                        this.submitted = true   // Set submitted flag to true
                        this.authenticate(this.failureGif, AUTHENTICATION_FAILURE_MESSAGE)
                        this.comfirmModalConf.title = JSON.parse(result).header.status.message[0].messageDescription;
                    }

                })
                .catch((error) => {
                    console.log(error);
                    this.submitted = true   // Set submitted flag to true
                    this.authenticate(this.failureGif, AUTHENTICATION_FAILURE_MESSAGE)
                    this.comfirmModalConf.title = 'Server error';
                })
        } catch (error) {
            console.log('error in forgetPasswordHandler ', error);
        }
    }

    


    /**
    * This function uses a method from the cBJsonDataHandler package that calls an Apex method that returns the API's request body and JSON paths for substitution.
    * @param {String} apiName - The API details's metadata name.
    * @returns {void}
    */
    fetchJsonData() {
        getJsonData(this.apiName)
            .then(result => {
                console.log('result : ', result);
                this.reqBody = JSON.parse(result[0]);
                this.jsonPathData = result[1];
                console.log(this.reqBody)
                console.log(this.jsonPathData)
            }).catch((error) => {
                console.log('Some error occured: ' + error)
            })
    }

    /**
    * This function takes in the request body and ther path and uses eval() to substitute the  values in the request body.
    * @param {Object} jsonReq - The request body, as a JSON.
    * @param {Array} JsonPath - The Json path data to be used for substitution.
    * @returns {Object} The request body after the values have been substituted.
    */
    dataMap(jsonReq, JsonPath) {
        JsonPath.forEach((record) => {
            eval(`jsonReq${record.JSON_Path__c}=this.${record.Field_Name__c}`);
        });
        return jsonReq
    }




    /**
     * Authenticate Status Modal helper function
     *
     * @param {String} icon - The static recource url for GIF
     * @param {String} message - The Authentication status message
     * @return {void} 
    */
    authenticate(icon, message) {
        // Open the Authentication Modal
        this.authenticationPopup.openModal = true;

        // Showing Loading animtaion initially
        this.authenticationPopup.showLoadingAnimation = true

        // Setting Initial Authentication message
        this.authenticationPopup.authenticationStatus = AUTHENTICATION_INPROGRESS_MESSAGE;


        // Setting timout for loading animation to stop.
        setTimeout(() => {
            this.authenticationPopup.showLoadingAnimation = false
            this.authenticationPopup.authenticationSpinnergif = icon;
            this.authenticationPopup.authenticationStatus = message;

            // If failure is true, closing the modal and showing Error Message

            setTimeout(() => {
                this.authenticationPopup.openModal = false;
                this.confirmModal = true
            }, 3000)

        }, 500);
    }


    // Method to toggle visibility of new password field
    toggleNewPassVisibility() {
        // Get the new password input field using template.querySelector
        let newPassField = this.template.querySelector('.new-password');
        // Check the current type of the new password field
        if (newPassField.type == 'password') {
            // If the field is currently of type password, change it to type text (showing plain text)
            newPassField.type = 'text';
            this.newPasswordShow = true;    // Update visibility flag to indicate new password is shown
        } else {
            // If the field is currently of type text, change it back to type password (hiding plain text)
            newPassField.type = 'password';
            this.newPasswordShow = false;   // Update visibility flag to indicate new password is hidden
        }
    }

    // Method to navigate to check password page
    navigateToCheckPassword() {
        this.navigateTo('Check_Password')
    }

    // Method to navigate to error page
    navigateToErrorPage(dataToSend) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'CBErrorComponent__c'
            },
            state: dataToSend
        });
    }



    // Helper function for navigation
    navigateTo(pageApiName) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            }
        });
    }

    // Getter to disable submit button based on errors and password fields
    get disableButton() {
        // Disable button if either username or registered email address is empty
        return this.errors[0] || this.errors[1] || !this.newPassword || !this.confirmPassword || this.submitted;
    }
}