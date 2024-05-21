import { LightningElement } from 'lwc';

import { NavigationMixin } from 'lightning/navigation';



export default class CBServiceRequest extends NavigationMixin(LightningElement) {
    // Labels for UI elements
    label = {
        SERVICE_REQUEST : 'Service Request'
    }

    // Initial Header Item Configuration
    header_icons = {
        // Announcements icon settings
        announcements: {
            exposed: false, // Whether to display the Announcements icon
            haveItems: false   // Whether the Announcements icon has items to display
        },
        // Notifications icon settings
        notifications: {
            exposed: false, // Whether to display the Notifications icon
            haveItems: false   // Whether the Notifications icon has items to display
        },
        // Inbox icon settings
        inbox: {
            exposed: false,  // Whether to display the Inbox icon
            haveItems: false // Whether the Inbox icon has items to display
        },
        // Scan Code icon settings
        scanCode: {
            exposed: false,  // Whether to display the Scan Code icon
            haveItems: false    // Whether the Scan Code icon has items to display
        },
    };

    // Initial Profile Item Configuration
    profileItems = {
        previousPageUrl: 'Home',    // URL for the previous page
        heading: this.label.SERVICE_REQUEST,   // Heading for the profile page (using label for security settings)
        headingShow: true,
        profileInfo: false, // Whether to display profile information
        profileSettings: {
            exposed: false   // Whether to display profile settings
        },
        profile: {
            exposed: false  // Whether to display profile details
        },
        serviceRequest: {
            exposed: true  // Whether to display service requests
        },
        securitySettings: {
            exposed: false// Whether to display security settings (exposed)
        },
        applyNow: {
            exposed: false
        },
        chequeBook: {
            exposed: false
        }
    };
}