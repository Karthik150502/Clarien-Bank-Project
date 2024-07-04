import { LightningElement } from 'lwc';

// Importing labels for easy manipulation of the data in labels
import HOME_PAGE from "@salesforce/label/c.CB_Page_Home"
import HEADER_ALERTS from "@salesforce/label/c.CB_Header_Alerts"

import CBSVG from "@salesforce/resourceUrl/CBSVG" // Importing static resource URL for SVG icons

export default class CBAlert extends LightningElement {

    // SVG's from static resource with specific fragment identifiers
    CBBackIcon = `${CBSVG}/CBSVGs/CBBackIcon.svg#CBBackIcon`;
    CBNotification = `${CBSVG}/CBSVGs/CBNotification.svg#CBNotification`;
    CBLogOut = `${CBSVG}/CBSVGs/CBLogOut.svg#CBLogOut`;

    // Header configuration object for navigation and display
    headerConfguration = {
        previousPageUrl: HOME_PAGE, // URL for the previous page navigation
        heading: HEADER_ALERTS, // Header title
        iconsExposed: true, // Flag to control icon visibility
        logout: {
            exposed: true // Flag to expose logout icon
        },
        search: {
            exposed: false // Flag to expose search functionality (not used in this component)
        }
    };

    // Array of alerts with messages and timestamps
    alerts = [
        {
            id: 1,
            message: '0% interest for 12 months on credit card balance transfers. Save now!',
            time: '15 mins ago'
        },
        {
            id: 2,
            message: 'Open a new checking account, get a $200 bonus with direct deposit',
            time: '24 mins ago'
        },
        {
            id: 3,
            message: 'Auto loans at 2.99% APR. Quick approval. Apply now!',
            time: '5 days ago'
        },
        {
            id: 4,
            message: 'Home Equity Line of Credit at 1.99% APR for 6 months. Apply today!',
            time: '6 days ago'
        },
        {
            id: 5,
            message: 'New Online Banking! Enhanced features and security. Log in to explore.',
            time: '12 days ago'
        }
    ];

}