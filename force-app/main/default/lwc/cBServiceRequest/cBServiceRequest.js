import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import OPEN_AN_Account from '@salesforce/label/c.OPEN_AN_Account';
import TIME_DEPOSIT_ACCOUNT_OPENING from '@salesforce/label/c.CB_TimeDepositAccountOpening';
import TOP_UP_ACCOUNT_OPENING from '@salesforce/label/c.CB_Top_UpAccountOpening';
import SAVINGS_ACCOUNT_OPENING from '@salesforce/label/c.CB_SavingsAccountOpening';
import CHEQUING_ACCOUNT_OPENING from '@salesforce/label/c.CB_ChequingAccountOpening';
import TIMEDEPOSITACCOUNTOPENING_PAGE from '@salesforce/label/c.CB_Page_Timedepositaccountopening';
import TOPUPACCOUNTOPENING_PAGE from '@salesforce/label/c.CB_Page_Topupaccountopening';

import QUICKLINKS_PAGE from '@salesforce/label/c.CB_Page_Quicklinks';
import SERVICEREQUEST_PAGE from '@salesforce/label/c.CB_Page_Servicerequest';

import CBSVG from "@salesforce/resourceUrl/CBSVG";

import { setPagePath } from 'c/cBUtilities';

export default class CBServiceRequest extends NavigationMixin(LightningElement) {

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

    label = {
        TIME_DEPOSIT_ACCOUNT_OPENING,
        TOP_UP_ACCOUNT_OPENING,
        SAVINGS_ACCOUNT_OPENING,
        CHEQUING_ACCOUNT_OPENING
    }

    CBChequingAccountOpening = `${CBSVG}/CBSVGs/CBChequingAccountOpening.svg#CBChequingAccountOpening`;
    CBSavingsAccountOpening = `${CBSVG}/CBSVGs/CBSavingsAccountOpening.svg#CBSavingsAccountOpening`;
    CBTopUpAccountOpening = `${CBSVG}/CBSVGs/CBTopUpAccountOpening.svg#CBTopUpAccountOpening`;
    CBTimeDepositAccountOpening = `${CBSVG}/CBSVGs/CBTimeDepositAccountOpening.svg#CBTimeDepositAccountOpening`;

    configuration = {
        previousPageUrl: 'Home',
        heading: OPEN_AN_Account,
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    connectedCallback() {
        this.configuration.previousPageUrl = setPagePath(SERVICEREQUEST_PAGE) == QUICKLINKS_PAGE ? QUICKLINKS_PAGE : 'Home';
    }

    // Navigation method to navigate to Time Deposit Account Opening page
    navigateToTimeDepositAccountOpening() {
        this.navigateToPage(TIMEDEPOSITACCOUNTOPENING_PAGE)
    }

    // Navigation method to navigate to TopUp Account Opening page
    navigateToTopUpAccountOpening() {
        this.navigateToPage(TOPUPACCOUNTOPENING_PAGE);
    }

    // Navigation method to navigate to TopUp Account Opening page
    navigateToSavingAccountOpening() {
        this.navigateToPage('CBSavingsAccountOpening__c');
    }

    // Navigation method to navigate to TopUp Account Opening page
    navigateToChequingAccountOpening() {
        this.navigateToPage('CBChequingAccountOpening__c');
    }

    // Method to navigate to a named page
    // @param {string} pageName - The name of the page to navigate to
    navigateToPage(pageName, data = {}) {
        console.log('navigate called', data);
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageName
            },
            state: data
        });
    }
}