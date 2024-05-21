/*
    Author - Aditya
    Created Date - 	2024-03-20
    Modified Date - 2024-03-20
    Description - This child component is responsible for monitoring user inactivity.
*/

import { LightningElement, track } from 'lwc';

import SESSION_EXPIRY_MESSAGE from '@salesforce/label/c.CB_Session_Expiry_Message';

import { getSessionStorage, getJsonData } from 'c/cBUtilities';

import signOut from "@salesforce/apex/CBApiController.signOut";
// JS Scripts

export default class CBSessionEnd extends LightningElement {





    modalOpen = false;
    sessionTimer
    idleTimer
    /**
  * Modal metadata for session expiration
  */
    modal = {
        // Title of the modal indicating session end
        title: SESSION_EXPIRY_MESSAGE,
        // Message in the modal (empty for now)
        message: '',
        // Metadata for the "Ok" button in the modal
        yesButton: {
            // Exposed property indicating visibility of the button
            exposed: true,
            // Label for the "Ok" button
            label: "Ok",
            // Implementation of the action performed when the "Ok" button is clicked
            implementation: () => {
                // Close the modal
                this.modalOpen = false;
                // Perform logout action
                this.logout();
            }
        },
        // Metadata for the "Cancel" button in the modal
        noButton: {
            // Exposed property indicating visibility of the button
            exposed: false,
            // Label for the "Cancel" button
            label: "Cancel",
            // Empty implementation for the "Cancel" button
            implementation: () => { }
        }
    };

    errorCallback() {
        console.log("Error in Child component/s")
    }

    username = ''
    password = ''
    /**
     * Lifecycle hook invoked when the component is inserted into the DOM
     * Initiates the idle logout process on component initialization.
     * @returns {void}
     */
    connectedCallback() {
        this.username = getSessionStorage('CBUserName');
        this.password = getSessionStorage('CBPassword');
        this.idleLogout();
    }


    /**
     * Method to logout the user due to inactivity
     * Starts a timer to monitor user activity and triggers logout after a period of inactivity.
     * @returns {void}
     */
    idleLogout() {
        const yourFunction = () => {
            this.modalOpen = true;
            this.idleTimer = setTimeout(() => {
                this.logout()
            }, 150000)
        }

        const resetTimer = () => {
            clearTimeout(this.sessionTimer);
            clearTimeout(this.idleTimer);
            this.sessionTimer = setTimeout(yourFunction, 600000);  // Time is in milliseconds (10 min)
        }


        document.addEventListener('load', resetTimer, true);
        document.addEventListener('mousemove', resetTimer, true);
        document.addEventListener('mousedown', resetTimer, true);
        document.addEventListener('touchstart', resetTimer, true);
        document.addEventListener('touchmove', resetTimer, true);
        document.addEventListener('click', resetTimer, true);
        document.addEventListener('keydown', resetTimer, true);
        document.addEventListener('scroll', resetTimer, true);
    }
    /**
 * Method to logout the user
 * Logs the end of the session and redirects to the logout page.
 * @returns {void}
 */
    logout() {
        // your function for too long inactivity goes here
        // e.g. window.location.href = 'logout.php';
        console.log('session ended');
        // Get the current domain
        let domain = window.location.href;
        // Find the index of "/s"
        let index = domain.indexOf("/s");
        if (index !== -1) {
            // Remove everything till "/s"
            domain = domain.substring(0, index);
        }
        console.log('Logout link:', `${domain}/secur/logout.jsp`);
        this.apiLogout(domain)
        //window.location.href = `${domain}/secur/logout.jsp`;
    }

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
    /**
     * Authenticate Status Modal helper function
     * @param {String} icon - The static recource url for GIF
     * @param {String} message - The Authentication status message
     * @return {void} 
    */
    authenticationInProgress(isInprogress) {
        // Open the Authentication Modal
        this.authenticationPopup.openModal = isInprogress;

        // Showing Loading animtaion initially
        this.authenticationPopup.showLoadingAnimation = isInprogress

        // Setting Initial Authentication message
        this.authenticationPopup.authenticationStatus = '';
    }

    logoutApiName = 'CB_logout_API'
    /**
    * This function uses a method from the cBJsonDataHandler package that calls an Apex method that returns the API's request body and JSON paths for substitution.
    * @param {String} logoutApiName - The API details's metadata name.
    * @returns {void}
    */
    apiLogout(domain) {
        console.log('Entered ApiLogout')
        this.authenticationInProgress(true);
        getJsonData(this.logoutApiName)
            .then(result => {
                // Map JSON data and prepare sign in payload
                const signOutJsonBody = this.dataMap(JSON.parse(result[0]), result[1]);
                console.log('signOutJsonBody : ', JSON.stringify(signOutJsonBody));
                console.log('logoutApiName : ', this.logoutApiName);
                let requestWrapper = {
                    payload: JSON.stringify(signOutJsonBody),    // Ensure payload is a string
                    metadataName: this.logoutApiName,           // Provide metadata name
                    headers: null                              // Provide an empty map for headers
                };
                return signOut({ reqWrapper: requestWrapper });
            })
            .then((result) => {
                try {
                    console.log('Response:', result)
                    if (result == '0000') {
                        // Redirect to the logout page
                        this.authenticationInProgress(false);
                        window.location.href = `${domain}/secur/logout.jsp`;
                    }
                } catch (error) {
                    console.log('Error in clearing Session Storage ', error);
                }
            })
            .catch(error => {
                console.error('api error', error)
            })
            .finally(() => {

            });
    }

    /**
     * Method to map JSON data with specified paths
     * @param {Object} jsonReq - The JSON request object
     * @param {Array} JsonPath - The array of JSON paths to map
     * @returns {Object} - The mapped JSON request object
     */
    dataMap(jsonReq, JsonPath) {
        JsonPath.forEach((record) => {
            // Dynamically set values in JSON request object
            eval(`jsonReq${record.JSON_Path__c}=this.${record.Field_Name__c}`);
            console.log('OUTPUT : ', record.JSON_Path__c);
            console.log('OUTPUT : ', record.JSON_Path__c);
        });
        console.log('jsonReq : ', JSON.stringify(jsonReq));
        return jsonReq;
    }

}