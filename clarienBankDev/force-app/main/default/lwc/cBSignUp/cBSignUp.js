/*
    Author - Mahalakshmi
    Created Date - 06/03/2024
    Modified Date - 21/03/2024, 19/03/2024, 18/03/2024
    Description - "User SignUp, Showing Authentication status"
*/

import { LightningElement, track } from 'lwc'; // Importing LightningElement and track decorator for Lightning Web Components
import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality

// Importing labels and resources
import ACTIVATE_ACC_FOR_SERVICE from '@salesforce/label/c.CB_ActivateAccForService';
import CIF_ID from '@salesforce/label/c.CB_CifId';
import FIRST_NAME from '@salesforce/label/c.CB_FirstName';
import LAST_NAME from '@salesforce/label/c.CB_LastName';
import DOB from '@salesforce/label/c.CB_Dob';
import NEXT from '@salesforce/label/c.CB_Next';
import SUBMIT from '@salesforce/label/c.CB_Submit';
import CANCEL from '@salesforce/label/c.CB_Cancel';
import ENTER_VALID_CIF_ID from '@salesforce/label/c.CB_EnterValidCifId';
import AUTHENTICATION_FAILED_MESSAGE from '@salesforce/label/c.CB_Authentication_Failed';
import AUTHENTICATION_SUCCESSFUL_MESSAGE from '@salesforce/label/c.CB_Authentication_Successful';
import AUTHENTICATION_INPROGRESS_MESSAGE from '@salesforce/label/c.CB_Authentication_InProgress';

import CBAuthenticationResult from 'c/cBAuthenticationResult';

import CB_AUTHENTICATION_SUCCESS from '@salesforce/resourceUrl/CBAutenticationSuccess';
import CB_AUTHENTICATION_FAILED from '@salesforce/resourceUrl/CBAutenticationFailed';

export default class CBSignUp extends NavigationMixin(LightningElement) {
    // Labels for UI elements
    label = {
        ACTIVATE_ACC_FOR_SERVICE,
        CIF_ID,
        FIRST_NAME,
        LAST_NAME,
        DOB,
        NEXT: NEXT.toUpperCase(),
        SUBMIT: SUBMIT.toUpperCase(), // Converting "Next" label to uppercase
        CANCEL: CANCEL.toUpperCase(),
        ENTER_VALID_CIF_ID,
    };


    // Properties for handling form inputs
    submitted = false
    date = '';
    cifid = '';
    fname = '';
    lname = '';
    @track currDate = ''
    @track errors = [''];

    // Static Resources
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


    connectedCallback() {
        this.setCurrentDate()
    }


    setCurrentDate() {
        let today = new Date()
        this.currDate = `${today.getFullYear()}-${String(today.getMonth() + 1) < 10 ? "0" : ""}${today.getMonth() + 1}-${today.getDate() < 10 ? '0' : ''}${today.getDate()}`
    }




    /**
     * Input Handler - CIF Id
     *
     * @param {Object} event - The event received from HTML element 
     * @return {void} 
    */
    cifidHandler(event) {
        this.cifid = event.target.value;
    }


    /**
     * Input Handler - First Name
     *
     * @param {Object} event - The event received from HTML element 
     * @return {void} 
    */
    fnameHandler(event) {
        this.fname = event.target.value;
    }


    /**
     * Input Handler - lastname Name
     *
     * @param {Object} event - The event received from HTML element 
     * @return {void} 
    */
    lnameHandler(event) {
        this.lname = event.target.value;
    }


    /**
     * Input Handler - Date
     *
     * @param {Object} event - The event received from HTML element 
     * @return {void} 
    */
    dateHandler(event) {
        this.date = event.target.value;
    }


    /**
     * Register Apex Method
     *
     * @param {Object} event - The event received from HTML element 
     * @return {void} 
    */
    registerUser(event) {

        event.preventDefault();

        // Check for this.errors, if there return 
        if (this.checkErrors) {
            this.authenticate(this.failureGif,
                AUTHENTICATION_FAILED_MESSAGE, true);
            return;
        } else {
            // Start loading animation and initiate authentication
            this.authenticate(this.successGif,
                AUTHENTICATION_SUCCESSFUL_MESSAGE);
            this.navigateToCreateUserCredential();
        }
    }

    /**
     * Using a single Navigate function is more efficient, accepts source name as parameter
     *
     * @param {String} pageApiName - Source name as parameter
     * @return {void}
    */
    navigateTo(pageApiName) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            }
        });
    }
    navigateTo(pageApiName, data) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            },
            state: data
        });
    }


    /**
     * Navigating to Login Page
     *
     * @return {void}
    */
    navigateBack() {
        this.navigateTo('Login');
    }
    /**
     * Navigating to create User credential Page
     *
     * @return {void}
    */
    navigateToCreateUserCredential() {
        // this.navigateTo('Register');
        this.navigateTo('Register', { firstname: this.fname, lastname: this.lname });
    }





    /**
     * Getter Method - checking the Errors
     *
     * @return {Boolean}
    */
    get checkErrors() {
        if (this.cifid === '5678910') {
            this.errors[0] = this.label.ENTER_VALID_CIF_ID;
            return true
        } else {
            this.errors[0] = '';
            return false
        }
    }




    /**
     * Getter Method - To fetch the Date's placeholder according to out format
     *
     * @return {String}
    */
    get datePlaceHolder() {
        return "DD/MM/YYYY";
    }

    /**
     * Getter Method - Getter for error message
     *
     * @return {String}
    */
    get cifIdErrorMsg() {
        return this.errors[0]
    }


    /**
     * Getter Method - Getter for CSS class based on error presence
     *
     * @return {String}
    */
    get cifidPass() {
        return this.errors[0] ? 'error-input-field' : '';
    }

    /**
     * Getter Method - Getter for CSS class based on error presence
     *
     * @return {String}
    */
    get cifidPassLabel() {
        return this.errors[0] ? 'error-input-label' : '';
    }



    /**
     * Getter Method - Getter for button disabled status
     *
     * @return {String}
    */
    get buttonDisabled() {
        return this.cifid === '' || this.fname === '' || this.lname === '' || this.date === '' || this.submitted;
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
        }, 500);
    }


}