/*
    Author - Prateek Deshmukh
    Created Date - 2024-03-06
    Modified Date - 2024-03-06,2024-03-11
    Description - This is a reusable Lightning Web Component (LWC) designed to be utilized as a child component wherever a header is required. 
    It allows flexibility by enabling users to specify icons and data to expose as needed.
*/

import { LightningElement, api, wire, track } from 'lwc'; // Importing LightningElement, api decorator, and wire adapter
import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality

import getProfileDocId from '@salesforce/apex/CBProfileUploadHandler.getProfileDocId'; // Importing Apex method for fetching profile image ID
import LOGOUT_CONFIRM_MESSAGE from '@salesforce/label/c.CB_Logout_Confirm_Message';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

import cBJsonDataHandler from 'c/cBJsonDataMapping';
import signOut from "@salesforce/apex/CBApiController.signOut";
// JS Scripts
import { getSessionStorage } from 'c/cBUtilities';

export default class CBHeader extends NavigationMixin(LightningElement) {

    // Exposed properties to be passed from parent components
    @api imageSrc = '';
    @api imageName = '';
    init = '';
    //flag to hide the logout modal
    modalOpen = false;

    CBAnnouncements = `${CBSVG}/CBSVGs/CBAnnouncements.svg#CBAnnouncements`;
    CBNotifications = `${CBSVG}/CBSVGs/CBNotifications.svg#CBNotifications`;
    CBScanCode = `${CBSVG}/CBSVGs/CBScanCode.svg#CBScanCode`;
    CBInbox = `${CBSVG}/CBSVGs/CBInbox.svg#CBInbox`;
    CBHeaderLogOut = `${CBSVG}/CBSVGs/CBHeaderLogOut.svg#CBHeaderLogOut`;
    CBSliderCompanyLogo = `${CBSVG}/CBSVGs/CBSliderCompanyLogo.svg#CBSliderCompanyLogo`;

    // Object to hold icon details with exposed and haveItems properties
    @api iconDetails = {
        announcements: {
            exposed: false,
            haveItems: false
        },
        notifications: {
            exposed: false,
            haveItems: false
        },
        scanCode: {
            exposed: false,
            haveItems: false
        },
        inbox: {
            exposed: false,
            haveItems: false
        },
    };


    username = ''
    password = ''

    /**
    * Lifecycle hook invoked when the component is inserted into the DOM
    * Loads the profile image when the component is connected to the DOM.
    * Loads the username, password from local session storage when the component is connected to the DOM.
    * @returns {void}
    */
    connectedCallback() {
        this.username = getSessionStorage('CBUserName');
        this.password = getSessionStorage('CBPassword');
        // Load profile image on component initialization
        this.loadProfileImage();
    }


    /**
     * Method to load initials from the image name
     * Splits the image name into words and generates initials from the first character of each word.
     * @returns {void}
     */
    loadNameInit() {
        let wrds = this.imageName.split(/\s+/);
        wrds.forEach(element => {
            this.init += element.charAt(0).toUpperCase();
        });
    }

    /**
     * Method to handle announcements
     * Logs a message indicating handling of announcements.
     * @returns {void}
     */
    handleAnnouncements() {
        console.log("Announcements");
    }

    // Event handler for handling notifications
    handleNotifications() {
        console.log("Notifications");
        this.navigateToAlerts();
    }

    // Event handler for handling inbox
    handleInbox() {
        console.log("Inbox");
    }

    // Event handler for handling logout
    handleExit() {
        console.log("ExitS");
        this.modalOpen = true;
    }

    // Event handler for handling QR code scanning
    handleScanCode() {
        console.log("QR handled!");
    }

    /**
    * Method to navigate to profile page
    * Navigates to the profile page using NavigationMixin.
    * @returns {void}
    */
    navigateToProfile() {
        // this[NavigationMixin.Navigate]({
        //     type: 'comm__namedPage',
        //     attributes: {
        //         name: 'CBProfile__c'
        //     }
        // });


        this.openSliderMenu()
    }
    /**
    * Method to navigate to profile page
    * Navigates to the alert page using NavigationMixin.
    * @returns {void}
    */
    navigateToAlerts() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'CBAlert__c'
            }
        });
    }


    sliderClass = ''
    openSlider = false
    wrapperClass = 'wrapper'
    openSliderMenu() {
        console.log("Opened called!")
        this.openSlider = true
        this.sliderClass = 'slds-modal slds-fade-in-open slds-modal_full slider-menu-container slider-menu-show'
    }
    closeSlider() {
        console.log("Closed called!")
        this.sliderClass = 'slds-modal slds-fade-in-open slds-modal_full slider-menu-container slider-menu-hide'
        setTimeout(() => {
            this.openSlider = false
        }, 300)
    }
    profileItems = {
        previousPageUrl: 'Home',    // URL of the previous page
        heading: '',    // Heading for the profile section
        headingShow: false, // Heading show flag for the profile section
        profileInfo: true,  // Flag to show profile information
        profileSettings: {
            exposed: false  // Flag to indicate if profile settings are exposed
        },
        profile: {
            exposed: true   // Flag to indicate if profile is exposed
        },
        serviceRequest: {
            exposed: false  // Flag to indicate if service request is exposed
        },
        securitySettings: {
            exposed: false  // Flag to indicate if security settings are exposed
        },
        applyNow: {
            exposed: false
        },
        chequeBook: {
            exposed: false
        }
    };
    logoutUser() {
        this.closeSlider()
        setTimeout(() => {
            this.modalOpen = true
        }, 500)
    }



/**
 * Method to load profile image asynchronously
 * Fetches the profile image document ID from the server and updates the image source accordingly.
 * @returns {void}
 */    loadProfileImage() {
        getProfileDocId()
            .then(result => {
                if (result.startsWith('Error:')) {
                    console.error('Error occurred while fetching profile image:', result);
                } else {
                    this.imageSrc = '/sfc/servlet.shepherd/version/download/' + result;
                }
            })
            .catch(error => {
                console.error('Error occurred while fetching profile image:', error);
            });
    }

    /**
     * Method to open the logout confirmation modal
     * Sets the modalOpen property to true to open the logout confirmation modal.
     * @returns {void}
     */

    /**
  * Logout modal items metadata
  */
    modal = {
        // Title of the logout confirmation modal
        title: LOGOUT_CONFIRM_MESSAGE,
        // Message in the logout confirmation modal (empty for now)
        message: '',
        // Metadata for the "Yes" button in the logout confirmation modal
        yesButton: {
            // Exposed property indicating visibility of the button
            exposed: true,
            // Label for the "Yes" button
            label: "Yes",
            // Implementation of the action performed when the "Yes" button is clicked
            implementation: () => {
                // Get the current domain
                let domain = window.location.href;
                // Find the index of "/s"
                let index = domain.indexOf("/s");
                if (index !== -1) {
                    // Remove everything till "/s"
                    domain = domain.substring(0, index);
                }
                // Log the logout link
                console.log('Logout link:', `${domain}/secur/logout.jsp`);
                this.apiLogout(domain)
            }
        },
        // Metadata for the "Cancel" button in the logout confirmation modal
        noButton: {
            // Exposed property indicating visibility of the button
            exposed: true,
            // Label for the "Cancel" button
            label: "Cancel",
            // Implementation of the action performed when the "Cancel" button is clicked
            implementation: () => {
                // Close the modal by setting modalOpen property to false
                this.modalOpen = false;
            }
        },
    };

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
     * @description Initiates the logout process by sending a request to the logout API endpoint and handling the response.
     * @param {String} domain - The domain of the application where the logout process will be initiated.
     * @returns {void}
     */
    apiLogout(domain) {
        this.authenticationInProgress(true);
        cBJsonDataHandler.getJsonData(this.logoutApiName)
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
                this.authenticationInProgress(false);
                window.location.href = `${domain}/secur/logout.jsp`;
            })
            .catch(error => {
                console.error('api error', error)
            })
            .finally(() => {

            });
    }

    /**
     * Method to map JSON data with specified paths
     * 
     * @param {Object} jsonReq - The JSON request object
     * @param {Array} JsonPath - The array of JSON paths to map
     * @returns {Object} - The mapped JSON request object
     */
    dataMap(jsonReq, JsonPath) {
        JsonPath.forEach((record) => {
            // Dynamically set values in JSON request object
            eval(`jsonReq${record.JSON_Path__c}=this.${record.Field_Name__c}`);
        });
        console.log('jsonReq : ', JSON.stringify(jsonReq));
        return jsonReq;
    }
}