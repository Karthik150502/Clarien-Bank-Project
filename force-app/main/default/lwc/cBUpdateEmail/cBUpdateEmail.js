/*
    Author - Aditya
    Created Date - 15/03/2024
    Modified Date - 18/03/2024
    Description - This component is tasked with updating the Email address
*/

import { LightningElement, track, wire, api } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';

import SUBMIT from '@salesforce/label/c.CB_Submit';
import EMAIL from '@salesforce/label/c.CB_Email';

//resources for Ad-hauthentication process
import CB_AUTHENTICATION_SUCCESS from '@salesforce/resourceUrl/CBAutenticationSuccess';
import CB_AUTHENTICATION_FAILED from '@salesforce/resourceUrl/CBAutenticationFailed';
import AUTHENTICATION_SUCCESSFUL_MESSAGE from '@salesforce/label/c.CB_Authentication_Successful';
import AUTHENTICATION_FAILURE_MESSAGE from '@salesforce/label/c.CB_Authentication_Failed';
import AUTHENTICATION_INPROGRESS_MESSAGE from '@salesforce/label/c.CB_Authentication_InProgress';
import CBSVG from "@salesforce/resourceUrl/CBSVG"
//page
import PROFILESETTINGS_PAGE from '@salesforce/label/c.CB_Page_Profilesettings';
import UPDATEEMAIL_PAGE from '@salesforce/label/c.CB_Page_Updateemail';


import ERROR_INVALID_EMAIL from '@salesforce/label/c.CB_ErrorInvalidEmail';


//apex class to handle the api callout
import profileUpdate from "@salesforce/apex/CBApiController.profileUpdate";


import { getJsonData, dateToTimestamp, getUserCreds, setPagePath } from 'c/cBUtilities';

export default class CBUpdateEmail extends NavigationMixin(LightningElement) {

    CBBackIcon = `${CBSVG}/CBSVGs/CBBackIcon.svg#CBBackIcon`;
    CBEditIcon = `${CBSVG}/CBSVGs/CBEditIcon.svg#CBEditIcon`;
    z
    // Object to hold custom labels
    label = {
        SUBMIT: SUBMIT.toUpperCase(),
        EMAIL,
        ERROR_INVALID_EMAIL
    };

    apiName = 'CB_Post_Profile_Update';
    jsonPathData = []
    reqBody = ''
    requestUUID = ''


    //flag to hide the update phone modal
    modalOpen = false;
    // Initial email value
    initialEmail = ''
    email = '';
    phone = ''
    successGif = CB_AUTHENTICATION_SUCCESS
    failureGif = CB_AUTHENTICATION_FAILED
    emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    @track errors = ['']
    hasRendered = false;
    showOtphandler = false
    username = ''
    password = ''
    otpDisclaimer = 'The OTP has been sent to your updated Email Address.'
    //Hardcoded fields for testing 




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

    otpconf = {
        title: '',
        companyLogoExposed: false,
        implementation: () => {

            console.log("Updated the Email....!")
            this.updateEmailHandler();
        },
        tokenValue: '123456',

    }


    /**
    * Metadata for the Phone Update modal.
    */
    @track modal = {
        title: '',
        message: 'Your Email has been updated',
        yesButton: {
            exposed: true,
            label: "OK",
            // Implementation for the "OK" button click action.
            implementation: () => {
                this.modalOpen = false;
                this.navigateToMyProfileAfterUpdate();
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




    //Authentication Status Modal initial configuration
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
        this.getUsernamePasswordHandler();
        this.requestUUID = dateToTimestamp();
        console.log(this.requestUUID);
        this.fetchJsonData();
        setPagePath(UPDATEEMAIL_PAGE)
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
            this.initialEmail = state.email ? state.email : ''
            this.email = state.email ? state.email : ''
            this.phone = state.phone ? state.phone : ''
        }
    };

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
        console.log("Updated with OTP authentication...!")
        // this.updateEmailHandler();
        this.showOtphandler = true
        this.reqBody = this.dataMap(this.reqBody, this.jsonPathData);
        console.log('reqbody ', JSON.stringify(this.reqBody));
        // this.authenticate(this.successGif, 'Authentication Successful');
    }


    /**
    * Computes the disabled state for the button based on email input.
     * @returns {Boolean} - True if the button should be disabled, otherwise false.
    */
    get buttonDisabled() {
        return !this.emailRegex.test(this.email) || this.email === this.initialEmail || this.email === '';
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
        console.log('Before DataMap - JsonReq', JSON.stringify(jsonReq));
        let evalStr = ''
        JsonPath.forEach((record) => {
            evalStr += `jsonReq${record.JSON_Path__c}=this.${record.Field_Name__c};`
            console.log(`jsonReq${record.JSON_Path__c}=this.${record.Field_Name__c}`);
        });
        eval(evalStr)
        console.log('After DataMap - JsonReq', JSON.stringify(jsonReq));
        return jsonReq
    }

    updateEmailHandler() {
        this.authenticationInProgress()
        // this.reqBody = this.dataMap(this.reqBody, this.jsonPathData);
        // console.log('reqbody ', JSON.stringify(this.reqBody));
        let reqWrapper = {
            payload: JSON.stringify(this.reqBody),
            metadataName: this.apiName,
            headers: null
        }
        profileUpdate({ reqWrapper: reqWrapper })
            .then((result) => {
                console.log('response message details', result);
                this.modal.message = JSON.parse(result)?.messageDescription;
                this.modal.message = 'The Email has been succesfully updated'
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