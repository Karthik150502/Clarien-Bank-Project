/*
    Author - Prateek Deshmukh
    Created Date - 2024-03-06
    Modified Date - 2024-03-06,2024-03-11
    Description - This is a reusable Lightning Web Component (LWC) designed to be utilized as a child component wherever a header is required. 
    It allows flexibility by enabling users to specify icons and data to expose as needed.
*/

import { LightningElement, api, track } from 'lwc'; // Importing LightningElement, api decorator, and wire adapter
import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality

// import getProfileDocId from '@salesforce/apex/CBProfileUploadHandler.getProfileDocId'; // Importing Apex method for fetching profile image ID
import LOGOUT_CONFIRM_MESSAGE from '@salesforce/label/c.CB_Logout_Confirm_Message';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

// JS Scripts
import { logout } from 'c/cBUtilities';


import ALERT_PAGE from '@salesforce/label/c.CB_Page_Alert';

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



    /**
    * Lifecycle hook invoked when the component is inserted into the DOM
    * Loads the profile image when the component is connected to the DOM.
    * Loads the username, password from local session storage when the component is connected to the DOM.
    * @returns {void}
    */
    connectedCallback() {

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
        this.navigateToOffers();
    }

    // Event handler for handling notifications
    handleNotifications() {
        console.log("Notifications");
        this.navigateToAlerts();
    }

    // Event handler for handling inbox
    handleInbox() {
        console.log("Inbox");
        this.navigateToInbox();
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
                name: ALERT_PAGE
            }
        });
    }

    navigateToOffers() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'CBOffers__c'
            }
        });
    }

    navigateToInbox() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'CBInbox__c'
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
 */    
// loadProfileImage() {
//         getProfileDocId()
//             .then(result => {
//                 if (result.startsWith('Error:')) {
//                     console.error('Error occurred while fetching profile image:', result);
//                 } else {
//                     this.imageSrc = '/sfc/servlet.shepherd/version/download/' + result;
//                 }
//             })
//             .catch(error => {
//                 console.error('Error occurred while fetching profile image:', error);
//             });
//     }

    /**
     * Method to open the logout confirmation modal
     * Sets the modalOpen property to true to open the logout confirmation modal.
     * @returns {void}
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
                logout();
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

}