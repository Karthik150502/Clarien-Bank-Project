import { LightningElement } from 'lwc';

import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality

// Importing labels for easy manipulation of the data in labels
import CARD_SERVICES from '@salesforce/label/c.CB_CardServices';
import SUBMIT from '@salesforce/label/c.CBChangePassword_submit';
import MODIFY_DEBIT_CARD_LIMIT from '@salesforce/label/c.CB_ModifyDebitCardLimit';
import TRAVEL_NOTIFICATION from '@salesforce/label/c.CB_TravelNotification';
import ENTER_LIMIT_FOR_DEBIT_CARD_LIMIT from '@salesforce/label/c.CB_EnterLimitForDebitCardLimit';
import PAGE_TRAVELNOTIFICATION from '@salesforce/label/c.CB_Page_Travelnotification';
import SELECT from '@salesforce/label/c.CB_Select';
import Account_Number from '@salesforce/label/c.CB_Account_Number';

import CBSVG from "@salesforce/resourceUrl/CBSVG"; // Importing SVG file from Static Resource

import { getMobileSessionStorage } from 'c/cBUtilities';

export default class CBServiceRequestModal extends NavigationMixin(LightningElement) {

    // Labels for UI elements
    label = {
        CARD_SERVICES,
        SUBMIT,
        MODIFY_DEBIT_CARD_LIMIT,
        TRAVEL_NOTIFICATION,
        ENTER_LIMIT_FOR_DEBIT_CARD_LIMIT,
        SELECT,
        Account_Number
    }

    get modalType() {
        return this.modifyDebitCardLimit ? 'slds-modal slds-fade-in-open slds-modal_medium wrapper debitCard' : 'slds-modal slds-fade-in-open slds-modal_medium wrapper navigation';
    }
    /**
    * Icon URLs for various SVG icons used in the component
    * @type {string}
    */
    CBBackIcon = `${CBSVG}/CBSVGs/CBBackIcon.svg#CBBackIcon`;
    CBSecuritySettings = `${CBSVG}/CBSVGs/CBSecuritySettings.svg#CBSecuritySettings`;
    CBModifyDebitCardLimit = `${CBSVG}/CBSVGs/CBModifyDebitCardLimit.svg#CBModifyDebitCardLimit`;
    CBTravelNotification = `${CBSVG}/CBSVGs/CBTravelNotification.svg#CBTravelNotification`;

    /**
    * Method to handle closing navigation
    */
    closeNavigate() {
        if (this.modifyDebitCardLimit) {
            this.openModifyDebitCardLimit();
        }
        else {
            this.dispatchEvent(new CustomEvent('close'))
        }
    }

    modifyDebitCardLimit = false;
    /**
     * Method to open or close the modification of debit card limit section
     */
    openModifyDebitCardLimit() {
        console.log('issue with')
        this.modifyDebitCardLimit = !this.modifyDebitCardLimit
    }

    // Lifecycle hook to be called at comonent connect
    connectedCallback() {
        this.setAccountData()
    }

    setAccountData() {
        this.accounts = JSON.parse(getMobileSessionStorage('CB_All_Account_Details')) ? JSON.parse(getMobileSessionStorage('CB_All_Account_Details')) : [];
    }

    /**
    * Array containing debit card account list options
    * @type {Array}
    */
    accounts = [
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855541255',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855000054',
            accountType: 'Joint Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '651235641254',
            accountType: 'Time Deposit Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '709945651354',
            accountType: 'Current Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
    ]
    accountNumber = SELECT
    accountNumberHandler(event) {
        this.accountNumber = event.target.value;
    }
    /**
     * Array containing debit card limit options
     * @type {Array}
     */
    debitCardLimit = [
        {
            limit: 'BMD 1000.00'
        },
        {
            limit: 'BMD 2000.00'
        },
        {
            limit: 'BMD 3000.00'
        },
        {
            limit: 'BMD 4000.00'
        },
        {
            limit: 'BMD 5000.00'
        },
        {
            limit: 'BMD 6000.00'
        }
    ]

    cardLimit = SELECT
    /**
     * Method to handle changes in debit card limit selection
     * @param {Event} event - The event object containing the changed value
     */
    cardLimitHandler(event) {
        this.cardLimit = event.target.value;
        console.log(this.cardLimit)
    }
    get buttonDisable() {
        console.log(this.cardLimit, this.accountNumber === SELECT, this.cardLimit === SELECT, this.accountNumber === SELECT);
        return this.cardLimit === SELECT || this.accountNumber === SELECT
    }
    /**
     * Method to submit the form
     * @param {Event} event - The submit event object
     */
    submitForm(event) {
        event.preventDefault();
        console.log(this.cardLimit);
        this.closeNavigate()
    }
    /**
     * Method to navigate to the travel notification page
     */
    navigateToTravelNotification() {
        this.navigateBack(PAGE_TRAVELNOTIFICATION)
    }
    /**
     * Method to navigate back to a specified page
     * @param {string} pageName - The name of the page to navigate to
     */
    navigateBack(pageName) {
        console.log('navigate called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageName
            }
        });
    }

}