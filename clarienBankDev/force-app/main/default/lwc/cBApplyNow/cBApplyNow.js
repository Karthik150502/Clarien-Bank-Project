import { LightningElement } from 'lwc';

export default class CBApplyNow extends LightningElement {
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
            exposed: true,  // Whether to display the Inbox icon
            haveItems: true // Whether the Inbox icon has items to display
        },
        // Scan Code icon settings
        scanCode: {
            exposed: true,  // Whether to display the Scan Code icon
            haveItems: false    // Whether the Scan Code icon has items to display
        },
    };

    // Initial Profile Item Configuration
    profileItems = {
        previousPageUrl: 'Home',    // URL for the previous page
        heading: 'Apply Now',   // Heading for the profile page (using label for security settings)
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
            exposed: true
        },
        chequeBook: {
            exposed: false
        }
    };
}