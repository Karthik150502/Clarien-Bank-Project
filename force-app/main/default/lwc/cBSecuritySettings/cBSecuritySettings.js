/*
    Author - Aditya
    Created Date - 12/03/2024
    Modified Date - 15/03/2024, 21/03/2024
    Description -  The component displays a header with configurable icons for quick access to different sections.
                It utilizes a metadata object to define the structure and visibility of security settings items.
                The security settings section is exposed and configurable based on organizational requirements.
*/

import { LightningElement } from 'lwc';
import SECURITY_SETTINGS from '@salesforce/label/c.CB_SecuritySettings'; // Importing label for security settings

export default class CBSecuritySettings extends LightningElement {
    // Label for security settings
    label = {
        SECURITY_SETTINGS
    };

    // Metadata for header icons
    header_icons = {
        // Announcements icon settings
        announcements: {
            exposed: false,     // Whether to display the Announcements icon
            haveItems: false    // Whether the Announcements icon has items to display
        },
        // Notifications icon settings
        notifications: {
            exposed: false,     // Whether to display the Notifications icon
            haveItems: false    // Whether the Notifications icon has items to display
        },
        // Inbox icon settings
        inbox: {
            exposed: true,      // Whether to display the Inbox icon
            haveItems: true     // Whether the Inbox icon has items to display
        },
        // Scan Code icon settings
        scanCode: {
            exposed: true,      // Whether to display the Scan Code icon
            haveItems: false    // Whether the Scan Code icon has items to display
        }
    };

    // Profile items metadata
    profileItems = {
        previousPageUrl: 'Home',        // URL for the previous page
        heading: this.label.SECURITY_SETTINGS,  // Heading for the profile page (using label for security settings)
        headingShow: true,
        profileInfo: false,                     // Whether to display profile information
        profileSettings: {
            exposed: false                      // Whether to display profile settings
        },
        profile: {
            exposed: false                      // Whether to display profile details
        },
        serviceRequest: {
            exposed: false                      // Whether to display service requests
        },
        securitySettings: {
            exposed: true                       // Whether to display security settings (exposed)
        },
        applyNow: {
            exposed: false
        },
        chequeBook: {
            exposed: false
        }
    };
}