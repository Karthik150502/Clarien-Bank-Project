import { LightningElement } from 'lwc';

// Importing labels for easy manipulation of the data in labels
import APPLYNOWCHEQUEBOOK_PAGE from '@salesforce/label/c.CB_Page_Applynowchequebook';
import APPLYNOW_PAGE from '@salesforce/label/c.CB_Page_Applynow';
import CHEQUE_BOOK_SERVICES from '@salesforce/label/c.CB_Header_ChequeBookServices';

import { setPagePath } from 'c/cBUtilities'; // Importing utility methods

export default class CBApplyNowChequebook extends LightningElement {
    
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

    connectedCallback(){
        setPagePath(APPLYNOWCHEQUEBOOK_PAGE)
    }

    // Initial Profile Item Configuration
    profileItems = {
        previousPageUrl: APPLYNOW_PAGE,    // URL for the previous page
        heading: CHEQUE_BOOK_SERVICES,   // Heading for the profile page (using label for security settings)
        headingShow: true,
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
            exposed: false// Whether to display security settings (exposed)
        },
        applyNow: {
            exposed: false
        },
        chequeBook: {
            exposed: true
        }
    };
}