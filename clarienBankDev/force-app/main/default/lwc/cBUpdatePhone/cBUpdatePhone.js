/*
    Author - Aditya
    Created Date - 	2024-03-15
    Modified Date - 	2024-03-15, 2024-03-17,	2024-03-19
    Description - This component is tasked with updating the Phone number .
*/

import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import SUBMIT from '@salesforce/label/c.CB_Submit';
import PHONE from '@salesforce/label/c.CB_Phone';

//resources for Ad-hauthentication process
import CB_AUTHENTICATION_SUCCESS from '@salesforce/resourceUrl/CBAutenticationSuccess';
import CB_AUTHENTICATION_FAILED from '@salesforce/resourceUrl/CBAutenticationFailed';
import CBSVG from "@salesforce/resourceUrl/CBSVG"

//apex class to handle the api callout
import profileUpdate from "@salesforce/apex/CBApiController.profileUpdate";

import { getJsonData, getSessionStorage, dateToTimestamp } from 'c/cBUtilities';

export default class CBUpdatePhone extends NavigationMixin(LightningElement) {

    CBBackIcon = `${CBSVG}/CBSVGs/CBBackIcon.svg#CBBackIcon`;
    CBEditIcon = `${CBSVG}/CBSVGs/CBEditIcon.svg#CBEditIcon`;

    // Object to hold custom labels
    label = {
        SUBMIT,
        PHONE
    };


    successGif = CB_AUTHENTICATION_SUCCESS
    failureGif = CB_AUTHENTICATION_FAILED



    //flag to hide the update phone modal
    modalOpen = false;
    // Initial phone value
    initPhone = '9876543210';
    phone = '9876543210';

    // To store rendered status
    hasRendered = false

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

    apiName = 'Profile_Update';
    jsonPathData = []
    reqBody = ''
    headerObj = ''
    email = ''

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
        this.fetchJsonData();
    }

    // Event handler for phone input changes
    phoneHandler(event) {
        if (event.target.value.length > 16) {
            event.target.value = event.target.value.slice(0, 16);
            this.phone = event.target.value
        } else {
            this.phone = event.target.value
        }
    }

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
     * Modal metadata for phone update notification
     */
    modal = {
        // Title of the modal (empty for now)
        title: '',
        // Message displayed in the modal indicating phone update
        message: 'Your Phone Number has been successfully updated.',
        // Metadata for the "ok" button in the modal
        yesButton: {
            // Exposed property indicating visibility of the button
            exposed: true,
            // Label for the "ok" button
            label: "ok",
            // Implementation of the action performed when the "ok" button is clicked
            implementation: () => {
                // Close the modal
                this.modalOpen = false;
                // Navigate to my profile page
                this.navigateToMyProfile();
            }
        },
        // Metadata for the "Not" button in the modal
        noButton: {
            // Exposed property indicating visibility of the button
            exposed: false,
            // Label for the "Not" button
            label: "Not",
            // Implementation of the action performed when the "Not" button is clicked
            implementation: () => {
                // Log 'no'
                console.log('no');
                // Close the modal
                this.modalOpen = false;
            }
        },
    };



    renderedCallback() {
        if (!this.hasRendered) {
            this.editToggle()
            this.hasRendered = true
        }
    }

    /**
     * Method to navigate to My Profile page
     * Navigates to the My Profile page using NavigationMixin.
     * @returns {void}
     */
    navigateToMyProfile() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'CBProfileSettings__c'
            }
        });
    }

/**
 * Method to enable phone input for editing and change button label
 * Enables the phone input field for editing.
 * @returns {void}
 */    editToggle() {
        this.template.querySelector('.update-phone').disabled = false;
        this.template.querySelector('.update-phone').focus();
    }

/**
 * Method to handle form submission for updating phone
 * Prevents the default form submission behavior, sets isLoading to true, and initiates a delay for simulation.
 * @param {Event} event - The event object representing the form submission event
 * @returns {void}
 */    updatePhone(event) {
        event.preventDefault();
        this.updatePhoneHandler();

    }
    /**
     * Getter method to determine if the button should be disabled
     * Logs the negation of the value of 'phone' property.
     * Returns true if 'actualPhone' is equal to 'phone', indicating the button should be disabled.
     * @returns {boolean} - Indicates whether the button should be disabled
     */
    get buttonDisabled() {
        return this.phone === '' || this.phone === this.initPhone;
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
        this.authenticationPopup.authenticationStatus = 'Processing the request, kindly wait!';


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

    updatePhoneHandler() {
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
                this.authenticate(this.successGif, 'Phone number updated successfully.');
            })
            .catch((error) => {
                this.authenticate(this.failureGif, error?.body?.message);
                console.log(error);
            })
    }
}