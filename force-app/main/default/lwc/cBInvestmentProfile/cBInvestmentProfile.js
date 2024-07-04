import { LightningElement } from 'lwc';

import CLARIEN_ITRADE from '@salesforce/label/c.CB_Clarien_ITrade';
import CLARIEN_IINVEST from '@salesforce/label/c.CB_Clarien_IInvest';
import CLARIEN_IPORTFOLIO from '@salesforce/label/c.CB_Clarien_IPortfolio';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBInvestmentProfile extends LightningElement {

    CBITrade = `${CBSVG}/CBSVGs/CBITrade.svg#CBITrade`;
CBIInvest = `${CBSVG}/CBSVGs/CBIInvest.svg#CBIInvest`;
CBIPortfolio = `${CBSVG}/CBSVGs/CBIPortfolio.svg#CBIPortfolio`;

    configuration = {
        previousPageUrl: 'Home',
        heading: 'Investments',
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    label = {
        CLARIEN_ITRADE,
        CLARIEN_IINVEST,
        CLARIEN_IPORTFOLIO,
    }

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
}