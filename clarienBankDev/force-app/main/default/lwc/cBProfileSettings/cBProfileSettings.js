/*
    Author - Aditya
    Created Date - 08/03/2024
    Modified Date - 12/03/2024, 21/03/2024
    Description - The component displays a header with configurable icons for quick access to different sections.
                It utilizes a metadata object to define the structure and visibility of profile settings items.
                The security settings section is exposed and configurable based on organizational requirements.
*/

import { LightningElement } from 'lwc';
// Importing custom labels from Salesforce
import PROFILE_SETTINGS from '@salesforce/label/c.CB_ProfileSettings';
import CHANGE_PASSWORD from '@salesforce/label/c.CB_ChangePassword';
import FAVORITE_ACCOUNTS from '@salesforce/label/c.CB_FavoriteAccounts';
import ONLINE_ACTIVITES from '@salesforce/label/c.CB_OnlineActivites';

export default class CBProfileSettings extends LightningElement {
    // Labels for various UI elements
    label = {
        PROFILE_SETTINGS,
        CHANGE_PASSWORD,
        FAVORITE_ACCOUNTS,
        ONLINE_ACTIVITES,
    };

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
        heading: this.label.PROFILE_SETTINGS,   // Heading for the profile page (using label for security settings)
        headingShow: true,
        profileInfo: false, // Whether to display profile information
        profileSettings: {
            exposed: true   // Whether to display profile settings
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
            exposed: false
        }
    };
}