/*
    Author - Aditya
    Created Date - 	2024-03-15
    Modified Date - 	2024-03-15, 2024-03-17,	2024-03-19
    Description - This component is tasked with updating the Phone number .
*/

import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';

import SUBMIT from '@salesforce/label/c.CB_Submit';
import PHONE from '@salesforce/label/c.CB_Phone';

//resources for Ad-hauthentication process
import CB_AUTHENTICATION_SUCCESS from '@salesforce/resourceUrl/CBAutenticationSuccess';
import CB_AUTHENTICATION_FAILED from '@salesforce/resourceUrl/CBAutenticationFailed';
import AUTHENTICATION_SUCCESSFUL_MESSAGE from '@salesforce/label/c.CB_Authentication_Successful';
import AUTHENTICATION_FAILURE_MESSAGE from '@salesforce/label/c.CB_Authentication_Failed';
import AUTHENTICATION_INPROGRESS_MESSAGE from '@salesforce/label/c.CB_Authentication_InProgress';
import CBSVG from "@salesforce/resourceUrl/CBSVG"
//page
import PROFILESETTINGS_PAGE from '@salesforce/label/c.CB_Page_Profilesettings';


//apex class to handle the api callout
import profileUpdate from "@salesforce/apex/CBApiController.profileUpdate";

import { getJsonData, dateToTimestamp, getUserCreds } from 'c/cBUtilities';

export default class CBUpdatePhone extends NavigationMixin(LightningElement) {

    CBBackIcon = `${CBSVG}/CBSVGs/CBBackIcon.svg#CBBackIcon`;
    CBEditIcon = `${CBSVG}/CBSVGs/CBEditIcon.svg#CBEditIcon`;

    // Object to hold custom labels
    label = {
        SUBMIT: SUBMIT.toUpperCase(),
        PHONE
    };


    successGif = CB_AUTHENTICATION_SUCCESS
    failureGif = CB_AUTHENTICATION_FAILED



    //flag to hide the update phone modal
    modalOpen = false;
    initialPhone = ''
    phone = '';
    hasRendered = false;
    showOtphandler = false
    otpDisclaimer = 'The OTP has been sent to your updated Email Address.'

    otpconf = {
        title: '',
        companyLogoExposed: false,
        implementation: () => {

            console.log("Updated the Phone....!")
            this.updatePhoneHandler();
        },
        tokenValue: '123456',

    }


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

    apiName = 'CB_Post_Profile_Update';
    jsonPathData = []
    reqBody = ''
    email = ''

    username = 'USERRET2'
    password = ''
    // Hardcoded fields for testing


    requestUUID = ''


    connectedCallback() {
        this.getUsernamePasswordHandler();
        this.requestUUID = dateToTimestamp();
        console.log(this.requestUUID);
        this.fetchJsonData();
    }

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


    renderedCallback() {
        if (!this.hasRendered) {
            this.hasRendered = true;
            this.editToggle();
        }
    }

    @wire(CurrentPageReference)
    urlDataHandler({ state }) {
        if (state) {
            this.email = state.email ? state.email : ''
            this.phone = state.phone ? state.phone : ''
            this.initialPhone = state.phone ? state.phone : ''
        }
    };

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
    @track modal = {
        // Title of the modal (empty for now)
        title: '',
        // Message displayed in the modal indicating phone update
        message: '',
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
                this.navigateToMyProfileAfterUpdate();
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


    /**
     * Method to navigate to My Profile page
     * Navigates to the My Profile page using NavigationMixin.
     * @returns {void}
     */
    navigateToMyProfileAfterUpdate() {
        this[NavigationMixin.GenerateUrl]({
            type: 'comm__namedPage',
            attributes: {
                name: PROFILESETTINGS_PAGE
            },
        }).then((url) => {
            window.location.href = url;
            console.log('Back url = ' + url)
        });
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
                name: PROFILESETTINGS_PAGE
            }
        })
    }

/**
 * Method to enable phone input for editing and change button label
 * Enables the phone input field for editing.
 * @returns {void}
 */ editToggle() {
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

        console.log("Updated with OTP authentication...!")
        this.showOtphandler = true
        // this.updatePhoneHandler();

    }
    /**
     * Getter method to determine if the button should be disabled
     * Logs the negation of the value of 'phone' property.
     * Returns true if 'actualPhone' is equal to 'phone', indicating the button should be disabled.
     * @returns {boolean} - Indicates whether the button should be disabled
     */
    get buttonDisabled() {
        return this.phone === '' || this.phone === this.initialPhone;
    }




    /**
    * Authenticate Status Modal helper function
    *
    * @param {String} icon - The static recource url for GIF
    * @param {String} message - The Authentication status message
    * @param {Boolean} failure - The failure parameter, defualt value set to false
    * @return {void} 
   */
    authenticate(icon, message, openModal = false) {
        this.authenticationPopup.showLoadingAnimation = false
        this.authenticationPopup.openModal = true
        this.authenticationPopup.authenticationSpinnergif = icon;
        this.authenticationPopup.authenticationStatus = message;
        setTimeout(() => {
            this.authenticationPopup.openModal = false;
            this.modalOpen = openModal
        }, 1000)

    }


    authenticationInProgress() {
        this.authenticationPopup.openModal = true
        this.authenticationPopup.authenticationStatus = '' //AUTHENTICATION_INPROGRESS_MESSAGE
        this.authenticationPopup.showLoadingAnimation = true
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
        let evalStr = ''
        JsonPath.forEach((record) => {
            evalStr += `jsonReq${record.JSON_Path__c}=this.${record.Field_Name__c};`
            console.log(`jsonReq${record.JSON_Path__c}=this.${record.Field_Name__c}`);
        });
        eval(evalStr)
        return jsonReq
    }

    updatePhoneHandler() {
        console.log('entered update phone');
        this.authenticationInProgress()
        this.reqBody = this.dataMap(this.reqBody, this.jsonPathData);
        console.log('reqbody ', JSON.stringify(this.reqBody));
        let reqWrapper = {
            payload: JSON.stringify(this.reqBody),
            metadataName: this.apiName,
            headers: null
        }
        profileUpdate({ reqWrapper: reqWrapper })
            .then((result) => {
                console.log('response message details: ', result);
                this.modal.message = 'The Phone number has been succesfully updated';
                this.modal.implementation = () => {
                    this.modalOpen = false;
                    this.navigateToMyProfileAfterUpdate();
                }
                this.modal.yesButton.label = "OK"
               // this.authenticate(this.successGif, AUTHENTICATION_SUCCESSFUL_MESSAGE, true);
                setTimeout(() => {
                    this.authenticationPopup.openModal = false;
                    this.modalOpen = true
                }, 1000)
            })
            .catch((error) => {
                console.log(error);
                console.log(error?.body?.message);
                this.modal.message = error?.body?.message;
                this.modal.implementation = () => {
                    this.modalOpen = false;
                    this.navigateToMyProfileAfterUpdate();
                }
                this.modal.yesButton.label = "OK"
                setTimeout(() => {
                    this.authenticationPopup.openModal = false;
                    this.modalOpen = true
                }, 1000)
               // this.authenticate(this.failureGif, AUTHENTICATION_FAILURE_MESSAGE, true)
            })
    }
}