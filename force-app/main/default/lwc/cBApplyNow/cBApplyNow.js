import { LightningElement } from 'lwc';

// Importing labels from Salesforce
import HOME_PAGE from "@salesforce/label/c.CB_Page_Home"
import QUICKLINKS_PAGE from '@salesforce/label/c.CB_Page_Quicklinks';
import APPLYNOW_PAGE from '@salesforce/label/c.CB_Page_Applynow';
import HEADER_MAKE_A_REQUEST from '@salesforce/label/c.CB_MakeARequest';

// Importing utility function for setting page path
import { setPagePath } from 'c/cBUtilities';

export default class CBApplyNow extends LightningElement {
    
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

    // Initial Profile Item Configuration
    profileItems = {
        previousPageUrl: HOME_PAGE,    // URL for the previous page
        heading: HEADER_MAKE_A_REQUEST,   // Heading for the profile page (using label for security settings)
        headingShow: true, // Flag to control heading visibility
        profileInfo: false, // Whether to display profile information
        profileSettings: {
            exposed: false   // Whether to display profile settings
        },
        profile: {
            exposed: false  // Whether to display profile details
        },
        serviceRequest: {
            exposed: false  // Whether to display service requests
        },
        securitySettings: {
            exposed: false  // Whether to display security settings (exposed)
        },
        applyNow: {
            exposed: true  // Whether to display the Apply Now section
        },
        chequeBook: {
            exposed: false  // Whether to display the Cheque Book section
        }
    };

    // Lifecycle hook that runs when the component is connected to the DOM
    connectedCallback(){
        // Set the previous page URL dynamically based on the imported labels
        // setPagePath(APPLYNOW_PAGE) returns the URL associated with the Apply Now page label
        // If the returned URL matches QUICKLINKS_PAGE, set previousPageUrl to QUICKLINKS_PAGE
        // Otherwise, set it to HOME_PAGE
        this.profileItems.previousPageUrl = setPagePath(APPLYNOW_PAGE) == QUICKLINKS_PAGE ? QUICKLINKS_PAGE : HOME_PAGE ;
    }
}