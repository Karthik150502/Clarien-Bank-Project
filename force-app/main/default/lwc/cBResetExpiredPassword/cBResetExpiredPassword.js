/*
    Author - Aditya
    Created Date - 06/03/2024
    Modified Date - 14/03/2024, 21/03/2024
    Description - This component allows users to change their password with authentication. It includes custom labels
                for UI elements such as submit button, old password, new password, and confirm password inputs. The component
                integrates with NavigationMixin for navigation functionality and uses resources for loading spinner and
                authentication success image.
*/

import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import CHANGE_PASSWORD from '@salesforce/label/c.CB_ChangePassword';
import OLD_PASSWORD from '@salesforce/label/c.CB_OldPassword';
import NEW_PASSWORD from '@salesforce/label/c.CB_NewPassword';
import CONFIRM_PASSWORD from '@salesforce/label/c.CB_ConfirmPassword';
import SUBMIT from '@salesforce/label/c.CB_Submit';
import PASSWORD_MUST_CONTAIN from '@salesforce/label/c.CB_PasswordMustContain10';
import MIN_10_CHARS from '@salesforce/label/c.CB_Min10Chars';
import ATLEAST_ONE_UPPER from '@salesforce/label/c.CB_AtLeastOneUpperCase';
import ATLEAST_SPEC_CHAR from '@salesforce/label/c.CB_AtLeastOneSpecChar';
import ERROR_CRITERIA_NOT_MATCH from '@salesforce/label/c.CB_ErrorCriteriaNotMatch';
import ERROR_PASS_MISMATCH from '@salesforce/label/c.CB_ErrorPassMismatch';
import ERROR_ENTER_THE_PASS from '@salesforce/label/c.CB_ErrorEnterThePass';
import ENTER_A_VALID_OLD from '@salesforce/label/c.CB_EnterValidOldPass';
import AUTHENTICATION_INPROGRESS_MESSAGE from '@salesforce/label/c.CB_Authentication_InProgress';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

//resources for Ad-hauthentication process
import CB_AUTHENTICATION_SUCCESS from '@salesforce/resourceUrl/CBAutenticationSuccess';

import forceChangePassword from '@salesforce/apex/CBApiController.forceChangePassword';

import { getJsonData, dateToTimestamp } from 'c/cBUtilities';

export default class CBResetExpiredPassword extends NavigationMixin(LightningElement) {
    CBBackIcon = `${CBSVG}/CBSVGs/CBBackIcon.svg#CBBackIcon`;
    CBShowPassword = `${CBSVG}/CBSVGs/CBShowPassword.svg#CBShowPassword`;
    CBHidePassword = `${CBSVG}/CBSVGs/CBHidePassword.svg#CBHidePassword`;


    // Custom labels
    label = {
        CHANGE_PASSWORD,
        OLD_PASSWORD,
        NEW_PASSWORD,
        CONFIRM_PASSWORD,
        SUBMIT: SUBMIT.toUpperCase(),
        PASSWORD_MUST_CONTAIN,
        MIN_10_CHARS,
        ATLEAST_ONE_UPPER,
        ATLEAST_SPEC_CHAR,
        ERROR_CRITERIA_NOT_MATCH,
        ERROR_PASS_MISMATCH,
        ERROR_ENTER_THE_PASS,
        ENTER_A_VALID_OLD
    };

    // Initial values for password fields
    actualOldPassword = 'ABCD1234!@';
    newPassword = '';
    confirmPassword = '';
    oldPassword = '';
    username = '';
    requestUUID = ''

    /**
    * Lifecycle hook invoked when the component is inserted into the DOM
    * Loads the username, password from local session storage when the component is connected to the DOM.
    * @returns {void}
    */
    connectedCallback() {
        this.requestUUID = dateToTimestamp();
        console.log(this.requestUUID);
        this.fetchJsonData();
    }

    apiName = 'CB_POST_Force_Change_Password';
    reqBody = '';
    jsonPathData = [];
    headerObj = '';

    forceChangePasswordHandler(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        // Call the checkOldPassword method
        // this.checkOldPassword();
        this.reqBody = this.dataMap(this.reqBody, this.jsonPathData);
        let reqWrapper = {
            payload: JSON.stringify(this.reqBody),
            metadataName: this.apiName,
            headers: JSON.stringify(this.headerObj)
        }
        console.log('reqWrapper ', JSON.stringify(reqWrapper));
        forceChangePassword({ reqWrapper: reqWrapper })
            .then((result) => {
                console.log(result)
                if (JSON.parse(result)?.error?.status === 'Failure') {
                    this.comfirmModalConf.title = 'Technical issue, please try again';
                    this.authenticate(this.successGif, 'Technical issue, please try again', true);
                } else {
                    this.checkOldPassword();
                }
            })
            .catch((error) => {
                console.error("Error:", error)
            })
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

    //Boolean flag for enable and disable submit button
    submitted = false;
    //Boolean flag for showing and hiding confirm modal
    confirmModal = false

    // Boolean flags for showing/hiding password fields
    newPasswordShow = false;
    confirmPasswordShow = false;
    oldPasswordShow = false;

    //variable store the Authentication Gif
    successGif = CB_AUTHENTICATION_SUCCESS

    // Track errors for password fields
    @track errors = ['', '', ''];



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



    // Event handler for old password input changes
    oldPasswordHandler(event) {
        this.oldPassword = event.target.value;
    }

    // Event handler for new password input changes
    newPasswordHandler(event) {
        this.newPassword = event.target.value;
        // Call the method to check the new password against a regular expression
        this.checkPasswordRegex(event.target.value);
    }

    // Event handler for confirm password input changes
    confirmPasswordHandler(event) {
        this.confirmPassword = event.target.value;
        // Call the method to check if the confirm password matches the new password
        this.checkPasswordMismatch(event.target.value);
    }



    /**
     * Authenticate Statuc Modal helper function
     *
     * @param {String} icon - The static recource url for GIF
     * @param {String} message - The Authentication status message
     * @param {Boolean} failure - The failure parameter, defualt value set to false
     * @return {void} 
    */
    authenticate(icon, message, failure = false) {
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
            if (failure) {
                setTimeout(() => {
                    this.authenticationPopup.openModal = false;
                }, 3000)
            }
            this.authenticationPopup.openModal = false;
            this.confirmModal = true    // Set the confirmModal flag to true
        }, 500);
    }


    // Method to check if new password meets the password criteria
    checkPasswordRegex(password) {
        if (this.newPassword !== '') {
            this.errors[0] = !/^.{10,}$/.test(password) || !/[A-Z]/.test(password) || !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? this.label.ERROR_CRITERIA_NOT_MATCH : '';
        } else {
            this.errors[0] = this.label.ERROR_ENTER_THE_PASS;
        }
        this.checkPasswordMismatch();
    }

    // Method to check if confirm password matches new password
    checkPasswordMismatch() {
        if (this.confirmPassword !== '') {
            if (this.newPassword !== this.confirmPassword) {
                this.errors[1] = this.label.ERROR_PASS_MISMATCH;
            } else {
                this.errors[1] = '';
            }
        }
    }

    // Method to toggle visibility of old password
    toggleOldPassVisibility() {
        let oldPassField = this.template.querySelector('.old-password ');
        if (oldPassField.type == 'password') {
            oldPassField.type = 'text';
            this.oldPasswordShow = true;
        } else {
            oldPassField.type = 'password';
            this.oldPasswordShow = false;
        }
    }

    // Method to toggle visibility of new password
    toggleNewPassVisibility() {
        let newPassField = this.template.querySelector('.new-password ');
        if (newPassField.type == 'password') {
            newPassField.type = 'text';
            this.newPasswordShow = true;
        } else {
            newPassField.type = 'password';
            this.newPasswordShow = false;
        }
    }

    // Getters to conditionally display error messages and apply error styling
    get confirmPasswordError() {
        return this.errors[1] ? this.errors[1] : '';
    }
    get newPasswordError() {
        return this.errors[0] ? this.errors[0] : '';
    }
    get oldPasswordError() {
        return this.errors[2] ? this.errors[2] : '';
    }
    get oldPasswordClass() {
        return this.errors[2] ? 'old-password error-input-field' : 'old-password';
    }
    get newPasswordClass() {
        return this.errors[0] ? 'new-password error-input-field' : 'new-password';
    }
    get confirmPasswordClass() {
        return this.errors[1] ? 'confirm-password error-input-field' : 'confirm-password';
    }
    get oldPasswordLabelClass() {
        return this.errors[2] ? 'error-input-label' : '';
    }
    get newPasswordLabelClass() {
        return this.errors[0] ? 'error-input-label' : '';
    }
    get confirmPasswordLabelClass() {
        return this.errors[1] ? 'error-input-label' : '';
    }

    //Method to disable or enable Submit Button
    get disableButton() {
        return this.errors[0] || this.errors[1] || this.errors[2] || !this.oldPassword || !this.newPassword || !this.confirmPassword || this.submitted;
    }

    // Method to check if old password is valid
    checkOldPassword() {
        this.errors[2] = this.label.ENTER_A_VALID_OLD;
    }

    @track comfirmModalConf = {
        title: '',     // Title of the confirmation modal
        message: '',           // Message content of the modal (empty in this case)
        yesButton: {
            exposed: true,      // Whether the 'OK' button is exposed (visible)
            label: "OK",        // Label text for the 'OK' button
            implementation: () => {     // Function to execute when the 'OK' button is clicked
                try {
                    console.log('modal called');
                    let domain = window.location.href;
                    // Find the index of "/s"
                    let index = domain.indexOf("/s");
                    if (index !== -1) {
                        // Remove everything till "/s"
                        domain = domain.substring(0, index);
                    }
                    window.location.href = `${domain}/secur/logout.jsp`;
                    // this.navigateTo(LOGIN_PAGE);
                    this.modalOpen = false;          // Close the modal
                } catch (error) {
                    console.log('Error in navigation --> ', error);
                }
            }
        },
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
}