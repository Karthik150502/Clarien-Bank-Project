/*
Author - Aditya Singh
Created Date - 06/03/2024
Modified Date - 07/03/2024, 13/03/2024, 21/03/2024
Description - This component provides a user interface for users to input their username and registered email address
            for password recovery. It integrates with Salesforce custom labels and utilizes the NavigationMixin for
            navigation functionality.
*/

import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import USERNAME from '@salesforce/label/c.CB_Username';
import REG_EMAIL_ADDR from '@salesforce/label/c.CB_RegisteredEmailAddr';
import FORGOT_PASSWORD from '@salesforce/label/c.CB_ForgotPassword';
import NOTE from '@salesforce/label/c.CB_Note';
import RETAIL_USER from '@salesforce/label/c.CB_Retail_User';
import PLS_PROVIDE_INTERNET_BANK from '@salesforce/label/c.CB_PleaseProvideInternetBanking';
import REG_EMAIL_ID from '@salesforce/label/c.CB_RegisteredEmailId';
import ERROR_INVALID_EMAIL from '@salesforce/label/c.CB_ErrorInvalidEmail';
import NEXT from '@salesforce/label/c.CB_Next';
import SUBMIT from '@salesforce/label/c.CB_Submit';
import CANCEL from '@salesforce/label/c.CB_Cancel';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

import virtualUserSignin from '@salesforce/apex/CBApiController.virtualUserSignIn';
import validateUser from '@salesforce/apex/CBApiController.validateUser';

// import cBJsonDataHandler from 'c/cBJsonDataMapping';
// import cBLocalStorageHandler from 'c/cBLocalStorageHandler';
import { getJsonData, setLocalStorage, dateToTimestamp } from 'c/cBUtilities';



export default class CBForgotPassword extends NavigationMixin(LightningElement) {
    // Labels for UI elements
    label = {
        USERNAME,
        REG_EMAIL_ADDR,
        FORGOT_PASSWORD,
        NOTE: NOTE.toUpperCase(), // Converting note label to uppercase
        RETAIL_USER,
        PLS_PROVIDE_INTERNET_BANK,
        ERROR_INVALID_EMAIL,
        REG_EMAIL_ID,
        NEXT: NEXT.toUpperCase(), // Converting "Next" label to uppercase
        SUBMIT: SUBMIT.toUpperCase(), // Converting "Submit" label to uppercase
        CANCEL: CANCEL.toUpperCase(), // Converting "Cancel" label to uppercase
    };

    confirmModal = false;

    // Confirmation modal configuration for displaying a success message when the password is changed, with an 'OK' button to close the modal.
    comfirmModalConf = {
        title: 'Invalid Username', // Title of the confirmation modal
        message: '',    // Message content of the modal (empty in this case)
        yesButton: {
            exposed: true,  // Whether the button is exposed (visible)
            label: "OK",    // Label text for the button
            implementation: () => { // Function to execute when the button is clicked
                this.navigateBack();    // Navigate to the 'Login' page
                this.confirmModal = false      // Close the modal
            }
        },
    }

    CBBackIcon = `${CBSVG}/CBSVGs/CBBackIcon.svg#CBBackIcon`;

    // Variables to store username and registered email address
    username = '';
    regEmailAddr = '';
    emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;




    //custom metadata api name
    CB_POST_VIRTUAL_SIGN = 'CB_POST_Virtual_Sign';
    CB_POST_VALIDATE_USER = 'CB_POST_Validate_User';

    // variable to store the json path and request body for virtualSignIn Api
    jsonPathData = []
    reqBody = ''
    // variable to store the json path and request body for validateUser Api
    validatesJonPathData = []
    validateReqBody = ''

    // temporary varaible to store the session in json object and formId
    headerObj = ''
    formId = ''
    requestUUID = ''

    @track errors = ['']

    //flag variable to disable button
    submitted = false





    connectedCallback() {
        this.requestUUID = dateToTimestamp();
        console.log(this.requestUUID);
        this.fetchJsonData(this.CB_POST_VIRTUAL_SIGN)
        this.fetchValidateJsonData(this.CB_POST_VALIDATE_USER)
    }





    // Method to navigate to password reset page
    navigateToPasswordReset(event) {
        //this.submitted = true  //Setting the submitted value to true, in order to make the button active
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Forgot_Password'
            }
        });
    }

    // Method to navigate back to login page
    navigateBack(apiName) {
        // event.preventDefault(); // Prevents the default action of the event, such as submitting a form or following a link, allowing us to control the behavior manually.
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: apiName
            }
        });
    }

    // Event handler for username input
    handleUsername(event) {
        this.username = event.target.value;
    }

    // Event handler for registered email address input
    handleRegEmailAddr(event) {
        this.regEmailAddr = event.target.value;
        this.checkEmailAddress(event.target.value)
    }

    // Method to determine if the button should be disabled or not
    get buttonDisabled() {
        return !this.username || !this.regEmailAddr || this.submitted || !this.emailRegex.test(this.regEmailAddr) // Disable button if either username or registered email address is empty
    }


    // Method to check the email validity and return a boolean 
    checkEmailAddress(email) {
        this.errors[0] = !this.emailRegex.test(email) ? this.label.ERROR_INVALID_EMAIL : ''
    }


    get checkEmailAddressError() {
        return this.errors[0] ? this.errors[0] : ''
    }


    // Getter for dynamic styling of confirm password input field
    get regEmailAddrClass() {
        return this.errors[0] ? 'error-input-field' : 'reg-email-addr';
    }

    // Getter for dynamic styling of new password label
    get regEmailAddrLabelClass() {
        return this.errors[0] ? 'error-input-label' : '';
    }




    /**
    * This function calls out the this.virtualSignInHandler() and this.navigateToPasswordReset() methods.
    * @param {HTMLEvent} event - HTML event passed from the HTML.
    * @returns {void}
    */
    handleSubmit(event) {
        event.preventDefault();
        this.virtualSignInHandler();
    }


    /**
    * This function does 2 things, it passes the request body, metadataname  declared in this component, and calls an Apex method that does an API callout for virtual user signing in. 
    * @returns {void}
    */
    virtualSignInHandler() {
        try {
            this.reqBody = this.dataMap(this.reqBody, this.jsonPathData);
        } catch (error) {
            console.error('Error in mapping: ' + error)
        }
        let reqWrapper = {
            payload: JSON.stringify(this.reqBody),
            metadataName: this.CB_POST_VIRTUAL_SIGN
        }
        virtualUserSignin({ reqWrapper: reqWrapper })
            .then((result) => {
                console.log("Virtual Sign in Result = " + result);
                let sessId = JSON.parse(result)?.header?.session?.sessionId
                this.formId = JSON.parse(result)?.header?.session?.fromId
                console.log(JSON.parse(result)?.header?.session?.fromId)
                if (sessId && this.formId) {
                    try {
                        setLocalStorage('CBUserSessionId', 'jsessionid=' + sessId.substring(0, sessId.indexOf(".")))
                        this.headerObj = {
                            "Cookie": 'jsessionid=' + sessId.substring(0, sessId.indexOf("."))
                        }
                        setLocalStorage('CBUserFormId', this.formId)
                        this.validateUserHandler();
                    } catch (error) {
                        console.log('Error in storing at local storage : ', JSON.stringify(error));
                        this.confirmModal = true;
                    }
                }
            })
            .catch((error) => {
                console.error(error);
                this.confirmModal = true;
            });
    }

    /**
    * This function does 2 things, it substitues the request body with the variables that are declared in this component, and calls an Apex method that does an API callout for validating the user. 
    * @returns {void}
    */
    validateUserHandler() {
        try {
            this.validateReqBody = this.dataMap(this.validateReqBody, this.validatesJonPathData);
        } catch (error) {
            console.error('Error in mapping: ' + error)
        }
        let reqWrapper = {
            payload: JSON.stringify(this.validateReqBody),
            metadataName: this.CB_POST_VALIDATE_USER,
            headers: JSON.stringify(this.headerObj)
        }
        console.log(JSON.stringify(this.validateReqBody));
        validateUser({ reqWrapper: reqWrapper })
            .then((result) => {
                console.log("Validate User in Result = " + result);
                let sessId = JSON.parse(result)?.header?.session?.sessionId
                this.formId = JSON.parse(result)?.header?.session?.fromId
                console.log(JSON.parse(result)?.header?.session?.fromId)
                if (sessId && this.formId) {
                    try {
                        setLocalStorage('CBUserSessionId', 'jsessionid=' + sessId.substring(0, sessId.indexOf(".")))
                        setLocalStorage('CBUserFormId', this.formId)
                        if (JSON.parse(result)?.header?.status?.message[0]?.messageCode === "106803") {
                            this.confirmModal = true;
                        } else {
                            this.navigateToPasswordReset();
                        }
                    } catch (error) {
                        console.log('Error in storing at local storage : ', JSON.stringify(error));
                        this.confirmModal = true;
                    }
                }
            })
            .catch((error) => {
                console.error(error);
                this.confirmModal = true;
            });
    }


    /**
    * This function uses a method from the cBJsonDataHandler package that calls an Apex method that returns the API's request body and JSON paths for substitution.
    * @param {String} apiName - The API details's metadata name.
    * @returns {void}
    */
    fetchJsonData(apiName) {
        getJsonData(apiName)
            .then(result => {
                console.log('VirtualJsonData : ', result);
                this.reqBody = JSON.parse(result[0]);
                this.jsonPathData = result[1];
                console.log('reqBody: ', this.reqBody);
                console.log('jsonPathData: ', this.jsonPathData);
            }).catch((error) => {
                console.log('Some error occured: ' + error)
            })
    }
    /**
    * This function uses a method from the cBJsonDataHandler package that calls an Apex method that returns the API's request body and JSON paths for substitution.
    * @param {String} apiName - The API details's metadata name.
    * @returns {void}
    */
    fetchValidateJsonData(apiName) {
        getJsonData(apiName)
            .then(result => {
                console.log('VirtualJsonData : ', result);
                this.validateReqBody = JSON.parse(result[0]);
                this.validatesJonPathData = result[1];
                console.log('reqBody: ', this.validateReqBody);
                console.log('jsonPathData: ', this.validatesJonPathData);
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
                console.log(`jsonReq${record.JSON_Path__c}=this.${record.Field_Name__c}`);
                eval(`jsonReq${record.JSON_Path__c}=this.${record.Field_Name__c}`);
            }


        });
        return jsonReq
    }




}