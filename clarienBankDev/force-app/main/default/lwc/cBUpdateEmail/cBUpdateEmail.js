/*
    Author - Aditya
    Created Date - 15/03/2024
    Modified Date - 18/03/2024
    Description - This component is tasked with updating the Email address
*/

import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import SUBMIT from '@salesforce/label/c.CB_Submit';
import EMAIL from '@salesforce/label/c.CB_Email';

//resources for Ad-hauthentication process
import CB_LOADING_GIF from '@salesforce/resourceUrl/CBLoadingSpinner';
import CB_AUTHENTICATION_SUCCESS from '@salesforce/resourceUrl/CBAutenticationSuccess';
import CB_AUTHENTICATION_FAILED from '@salesforce/resourceUrl/CBAutenticationFailed';
import CBSVG from "@salesforce/resourceUrl/CBSVG"

import ERROR_INVALID_EMAIL from '@salesforce/label/c.CB_ErrorInvalidEmail';

//apex class to handle the api callout
import profileUpdate from "@salesforce/apex/CBApiController.profileUpdate";

import { getJsonData, getSessionStorage, getLocalStorage, dateToTimestamp } from 'c/cBUtilities';

export default class CBUpdateEmail extends NavigationMixin(LightningElement) {

    CBBackIcon = `${CBSVG}/CBSVGs/CBBackIcon.svg#CBBackIcon`;
    CBEditIcon = `${CBSVG}/CBSVGs/CBEditIcon.svg#CBEditIcon`;

    // Object to hold custom labels
    label = {
        SUBMIT: SUBMIT.toUpperCase(),
        EMAIL,
        ERROR_INVALID_EMAIL
    };

    apiName = 'Profile_Update';
    jsonPathData = []
    reqBody = ''
    headerObj = ''


    //flag to hide the update phone modal
    modalOpen = false;
    // Initial email value
    initEmail = 'sampleEmail@email.com'
    email = 'sampleEmail@email.com';
    phone = ''
    // To store rendered status
    hasRendered = false
    successGif = CB_AUTHENTICATION_SUCCESS
    failureGif = CB_AUTHENTICATION_FAILED
    emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    @track errors = ['']



    // Object to manage header icons
    header_icons = {
        announcements: {
            exposed: true,
            haveItems: true
        },
        notifications: {
            exposed: true,
            haveItems: true
        },
        inbox: {
            exposed: true,
            haveItems: true
        },
        scanCode: {
            exposed: false,
            haveItems: false
        }
    };

    /**
    * Metadata for the Phone Update modal.
    */
    modal = {
        title: '',
        message: 'Your Email has been updated.',
        yesButton: {
            exposed: true,
            label: "OK",
            // Implementation for the "OK" button click action.
            implementation: () => {
                console.log('yes');
                this.modalOpen = false;
                this.navigateToMyProfile();
            }
        },
        noButton: {
            exposed: false,
            label: "Not",
            //Implementation for the "Not" button click action.
            implementation: () => {
                console.log('no');
                this.modalOpen = false;
            }
        }
    };




    // Authentication Status Modal initial configuration
    @track authenticationPopup = {

        // Initial Authentication Status message
        authenticationStatus: 'Processing the request, kindly wait!',
        // Authentication Status GIF
        authenticationSpinnergif: null,
        // Authentication Status open or close status
        openModal: false,
        // Authentication loading animation visibility
        showLoadingAnimation: true
    }

    connectedCallback() {
        this.requestUUID = dateToTimestamp();
        console.log(this.requestUUID);
        if (getSessionStorage('CBSessionId')) {
            let sessionId = getSessionStorage('CBSessionId')
            this.headerObj = {
                "Cookie": 'jsessionid=' + sessionId.substring(0, sessId.indexOf("."))
            }
        }
        if (getSessionStorage('CBFormId')) {
            this.formId = getSessionStorage('CBFormId');
        }
        if (getLocalStorage('UserPhone')) {
            this.phone = getLocalStorage('UserPhone');
        }
        this.fetchJsonData();
    }

    renderedCallback() {
        if (!this.hasRendered) {
            this.editToggle()
            this.hasRendered = true
        }
    }

    /**
     * Handles changes in the email input field.
    * @param {Event} event - The event object containing the email input value.
    */
    emailHandler(event) {
        this.email = event.target.value;
        this.checkEmailAddress(event.target.value)
    }

    /**
    * Navigates to the user's profile setting page.
    * Uses NavigationMixin to navigate to a named page.
    * @param {string} pageName - The name of the profile page.
    */
    navigateToMyProfile() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'CBProfileSettings__c'
            }
        });
    }

    //Enables email input for editing and updates the button label accordingly.
    editToggle() {
        this.template.querySelector('.update-email').disabled = false;
        this.template.querySelector('.update-email').focus();
    }

    /**
     * Handles form submission for updating email.
    * @param {Event} event - The event object representing the form submission.
    */
    updateEmail(event) {
        // Implement form submission logic her
        event.preventDefault();
        this.updateEmailHandler();
    }


    /**
    * Computes the disabled state for the button based on email input.
     * @returns {Boolean} - True if the button should be disabled, otherwise false.
    */
    get buttonDisabled() {
        return this.email === '' || !this.emailRegex.test(this.email) || this.email === this.initEmail;
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
        return this.errors[0] ? 'update-email error-input-field' : 'update-email';
    }

    // Getter for dynamic styling of new password label
    get regEmailAddrLabelClass() {
        return this.errors[0] ? 'error-input-label' : '';
    }

    /**
    * Authenticate Status Modal helper function
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
        this.authenticationPopup.authenticationStatus = 'Authentication in progress';


        // Setting timout for loading animation to stop.
        setTimeout(() => {
            this.authenticationPopup.showLoadingAnimation = false
            this.authenticationPopup.authenticationSpinnergif = icon;
            this.authenticationPopup.authenticationStatus = message;

            // Closing the Modal after 3 seconds
            setTimeout(() => {
                this.authenticationPopup.openModal = false;
                this.modalOpen = true
            }, 3000)

        }, 500);
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

    updateEmailHandler() {
        this.reqBody = this.dataMap(this.reqBody, this.jsonPathData);
        console.log('reqbody ', JSON.stringify(this.reqBody));
        let reqWrapper = {
            payload: JSON.stringify(this.reqBody),
            metadataName: this.apiName,
            headers: JSON.stringify(this.headerObj)
        }
        profileUpdate({ reqWrapper: reqWrapper })
            .then((result) => {
                console.log(result);
                this.authenticate(this.successGif, 'Email updated sucessfully.');
            })
            .catch((error) => {
                console.log(error);
                this.authenticate(this.failureGif, error?.body?.message);
            })
    }
}