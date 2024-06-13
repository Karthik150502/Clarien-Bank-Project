/*
    Author - Aditya
    Created Date - 06/03/2024
    Modified Date - 14/03/2024, 21/03/2024
    Description - This component allows users to change their password with authentication. It includes custom labels
                for UI elements such as submit button, old password, new password, and confirm password inputs. The component
                integrates with NavigationMixin for navigation functionality and uses resources for loading spinner and
                authentication success image.
*/

import { LightningElement, track, wire } from 'lwc';
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
import PASSWORD_CHANGED_MESSAGE from '@salesforce/label/c.CB_Password_Changed_Message';
import CHANGEPASSWORD_PAGE from '@salesforce/label/c.CB_Page_Changepassword';

import AUTHENTICATION_FAILED_MESSAGE from '@salesforce/label/c.CB_Authentication_Failed';
import AUTHENTICATION_INPROGRESS_MESSAGE from '@salesforce/label/c.CB_Authentication_InProgress';
import AUTHENTICATION_SUCCESSFUL_MESSAGE from '@salesforce/label/c.CB_Authentication_Successful';
import CB_AUTHENTICATION_FAILED from '@salesforce/resourceUrl/CBAutenticationFailed';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

//resources for Ad-hauthentication process
import CB_AUTHENTICATION_SUCCESS from '@salesforce/resourceUrl/CBAutenticationSuccess';
import changePassword from '@salesforce/apex/CBApiController.changePassword';
import { getJsonData, getSessData, dateToTimestamp, logout,getUserCreds, setPagePath } from 'c/cBUtilities';
export default class CBChangePassword extends NavigationMixin(LightningElement) {

    CBBackIcon = `${CBSVG}/CBSVGs/CBBackIcon.svg#CBBackIcon`;
    CBShowPassword = `${CBSVG}/CBSVGs/CBShowPassword.svg#CBShowPassword`;
    CBHidePassword = `${CBSVG}/CBSVGs/CBHidePassword.svg#CBHidePassword`;


    // Object to manage header icons
    header_icons = {
        // Announcements icon settings
        announcements: {
            exposed: true,  // Whether to display the Announcements icon
            haveItems: true // Whether the Announcements icon has items to display
        },
        // Whether to display the Announcements icon
        notifications: {
            exposed: true,  // Whether to display the Notifications icon
            haveItems: true // Whether the Notifications icon has items to display
        },
        // Inbox icon settings
        inbox: {
            exposed: true,  // Whether to display the Inbox icon
            haveItems: true // Whether the Inbox icon has items to display
        },
        // Scan Code icon settings
        scanCode: {
            exposed: false, // Whether to display the Scan Code icon
            haveItems: false    // Whether the Scan Code icon has items to display
        }
    };

    // Method to navigate to Profile Settings page
    navigateToProfileSettings() {
        this.navigateTo('comm__namedPage', 'CBProfileSettings__c');

    }
    navigateTo(type, url_name) {
        const pageReference = {
            type,
            attributes: {
                name: url_name
            }
        };
        this[NavigationMixin.Navigate](pageReference);
    }
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
    reqBody = ''
    jsonPathData = []
    CB_POST_CHANGE_PASSWORD = 'CB_POST_Change_Password'
    username = ''
    accessCode = ''
    requestUUID = ''

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
    failureGif = CB_AUTHENTICATION_FAILED

    getUsernamePasswordHandler() {
        getUserCreds().then(result => {
            console.log('Result: ' + JSON.stringify(result))
            if (result.CBUsername && result.CBPassword) {
                this.username = result.CBUsername
                this.password = result.CBPassword
            }
        }).catch(error => {
            console.log("Was not able to get Username and password from the Salesforce session.!")
            console.error(error)
        });
    }

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



    connectedCallback() {
        this.requestUUID = dateToTimestamp();
        // Getting the JSON request body and JSON paths
        this.fetchJsonData(this.CB_POST_CHANGE_PASSWORD)
        this.getUsernamePasswordHandler();
        setPagePath(CHANGEPASSWORD_PAGE)
    }

    // Event handler for old password input changes
    oldPasswordHandler(event) {
        this.oldPassword = event.target.value;
        // Call the method to check the old password validity
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

    // Method to handle form submission
    submit(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        // this.checkOldPassword();
        this.changePasswordHandler();
    }


    changePasswordHandler() {
        this.authencationInProgress(AUTHENTICATION_INPROGRESS_MESSAGE)
        this.reqBody = this.dataMap(this.reqBody, this.jsonPathData)
        let reqWrapper = {
            payload: JSON.stringify(this.reqBody),
            metadataName: this.CB_POST_CHANGE_PASSWORD,
            headers: null
        }

        changePassword({ reqWrapper: reqWrapper })
            .then((result) => {
                console.log("Result = " + JSON.stringify(result))
                this.comfirmModalConf.message = JSON.parse(result)?.messageDescription;
                this.comfirmModalConf.yesButton.implementation = () => {
                    logout();
                    this.confirmModal = false;
                }
                this.comfirmModalConf.yesButton.label = "OK"
                this.submitted = true   // Set the submitted flag to true
                this.authenticate(this.successGif, AUTHENTICATION_SUCCESSFUL_MESSAGE, true);
            }).catch((error) => {
                console.log('Error: ' + JSON.stringify(error));

                this.submitted = true   // Set the submitted flag to true
                this.handleAuthenticationFailure(error);
            })
    }




    /**
     * Authenticate Statuc Modal helper function
     *
     * @param {String} icon - The static recource url for GIF
     * @param {String} message - The Authentication status message
     * @param {Boolean} failure - The failure parameter, defualt value set to false
     * @return {void} 
    */
    authenticate(icon, message, openConfirmModal = false) {
        // Setting timout for loading animation to stop.
        this.authenticationPopup.showLoadingAnimation = false
        this.authenticationPopup.authenticationSpinnergif = icon;
        this.authenticationPopup.authenticationStatus = message;

        setTimeout(() => {
            this.authenticationPopup.openModal = false;
            this.confirmModal = openConfirmModal    // Set the confirmModal flag to true
            this.submitted = false   // Set the submitted flag to true
        }, 1000)
    }


    authencationInProgress(message) {
        this.authenticationPopup.openModal = true;
        this.authenticationPopup.authenticationStatus = message;
        this.authenticationPopup.showLoadingAnimation = true
    }

    /**
   * Method to handle authentication failure
   * 
   * @param {Error} error - The error encountered during authentication
   * @returns {void}
   */
    handleAuthenticationFailure(error) {

        // Show authentication failure message
        if (Number(this.errorMsg) >= 300 || Number(this.errorMsg) < 200) {
            console.log("Error:", error?.body?.message)
            console.log(JSON.stringify(this.errorMsg))
            this.navigateTo('comm__namedPage', ERRORCOMPONENT_PAGE);
        } else {
            this.comfirmModalConf.message = error?.body?.message;
            this.comfirmModalConf.yesButton.implementation = () => {
                this.confirmModal = false;
            }
            this.comfirmModalConf.yesButton.label = "OK"
            this.authenticate(this.failureGif, AUTHENTICATION_FAILED_MESSAGE, true);
        }
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
        if (this.oldPassword !== this.actualOldPassword) {
            this.errors[2] = this.label.ENTER_A_VALID_OLD;
        } else {
            this.errors[2] = '';
        }
    }

    comfirmModalConf = {
        title: '',     // Title of the confirmation modal
        message: '',           // Message content of the modal (empty in this case)
        yesButton: {
            exposed: true,      // Whether the 'OK' button is exposed (visible)
            label: "OK",        // Label text for the 'OK' button
            implementation: () => {     // Function to execute when the 'OK' button is clicked
                // Navigate to profile settings page
                this.confirmModal = false          // Close the modal

            }
        },
    }


    /**
    * This function uses a method from the cBJsonDataHandler package that calls an Apex method that returns the API's request body and JSON paths for substitution.
    * @param {String} apiName - The API details's metadata name.
    * @returns {void}
    */
    fetchJsonData(apiName) {
        getJsonData(apiName)
            .then(result => {
                this.reqBody = JSON.parse(result[0]);
                this.jsonPathData = result[1];
                console.log('reqBody: ', JSON.stringify(this.reqBody));
                console.log('jsonPathData: ', this.jsonPathData);
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
            if (!record.Is_Active__c) {
                return
            }
            if (record.Is_Constant__c) {
                console.log(`jsonReq${record.JSON_Path__c}=${record.Value__c}`)
                eval(`jsonReq${record.JSON_Path__c}=${record.Value__c}`);
            } else {
                console.log(`jsonReq${record.JSON_Path__c}=this.${record.Field_Name__c}`)
                eval(`jsonReq${record.JSON_Path__c}=this.${record.Field_Name__c}`);
            }
        });
        return jsonReq
    }
}