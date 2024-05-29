import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import TIME_DEPOSIT_ACCOUNT_OPENING from '@salesforce/label/c.CB_TimeDepositAccountOpening';
import TOP_UP_ACCOUNT_OPENING from '@salesforce/label/c.CB_Top_UpAccountOpening';
import SAVINGS_ACCOUNT_OPENING from '@salesforce/label/c.CB_SavingsAccountOpening';
import CHEQUING_ACCOUNT_OPENING from '@salesforce/label/c.CB_ChequingAccountOpening';
import TIMEDEPOSITACCOUNTOPENING_PAGE from '@salesforce/label/c.CB_Page_Timedepositaccountopening';
import TOPUPACCOUNTOPENING_PAGE from '@salesforce/label/c.CB_Page_Topupaccountopening';

import CBSVG from "@salesforce/resourceUrl/CBSVG";

export default class CBManageBeneficiaries extends NavigationMixin(LightningElement) {

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
        previousPageUrl: '',
        heading: 'Open an Account',
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
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