import { LightningElement } from 'lwc';

import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality

// Importing labels for easy manipulation of the data in labels
import TOP_UP_ACCOUNT_OPENING from '@salesforce/label/c.CB_Top_UpAccountOpening';
import PAGE_SERVICEREQUEST from '@salesforce/label/c.CB_Page_Servicerequest';
import YOUR_ACCOUNT_OPEN_SUCCESS from '@salesforce/label/c.CB_YourAccOpenSuccess';
import OK_BUTTON from '@salesforce/label/c.CB_Ok';
import CANCEL_BUTTON from '@salesforce/label/c.CB_Cancel';

import { getJsonData, dateToTimestamp, getUserCreds, setPagePath } from 'c/cBUtilities'; // Importing utility methods

export default class CBTopUpAccountOpening extends NavigationMixin(LightningElement) {

    accountOpenType = 'topUpAccount'
    accountType = 'TOP UP'
    accType = TOP_UP_ACCOUNT_OPENING
    apiName = 'CB_TUAcctAdd'
    reqBody = {}
    jsonPathData = []
    currency = '';
    amount = '';
    /**
 * The list of available top-up products.
 * @type {Array}
 */
    topUpProduct = [
        "PERSONAL 5 YR SAVER",
        "COMMERCIAL 5 YR SAVER",
        "PERSONAL ACCUMULATOR",
        "COMMERCIAL ACCUMULATOR",
        "EMPLOYEE SAVER"
    ]
    /**
     * The configuration object for the secondary header.
     * @type {Object}
     */
    configuration = {
        previousPageUrl: PAGE_SERVICEREQUEST,
        heading: TOP_UP_ACCOUNT_OPENING,
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    successModalOpen = false;

    /**
     * Configuration object for the success modal.
     * @type {Object}
     */
    successModalconfig = {
        title: YOUR_ACCOUNT_OPEN_SUCCESS,
        message: '',
        okButton: {
            exposed: true,
            label: OK_BUTTON,
            function: () => {
                this.navigateBack();
            }
        },
        noButton: {
            exposed: false,
            label: CANCEL_BUTTON,
            function: () => {
            }
        },
        alertMsg: ''
    }

    /**
     * Lifecycle hook called when the component is inserted into the DOM.
     * Fetches the JSON data for the API request.
     */
    connectedCallback() {
        this.fetchJsonData();
    }
    /**
     * Navigates back to the service request page.
     */
    navigateBack() {
        console.log('navigate called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: PAGE_SERVICEREQUEST
            }
        });
    }
    /**
     * Handles the event when a case is created.
     * Extracts the currency and amount details from the event and opens the success modal.
     * 
     * @param {Event} event - The event containing the case creation details.
     */
    createCase(event) {
        if (event.detail) {
            this.currency = event.detail.currency ? event.detail.currency : '';
            this.amount = event.detail.depitAmount ? event.detail.depitAmount : '';
            console.log(this.currency)
            console.log(this.amount)
        }
        this.successModalOpen = true;
    }


    // depositAmount: this.depositAmount,
    // duration: this.duration,
    // currency: this.currency,
    // depitAmount: this.depitAmount,
    // product: this.product,
    // interestPayment: this.interestPayment,
    // principalMaturity: this.principalMaturity,


    /**
    * This function uses a method from the cBJsonDataHandler package that calls an Apex method that returns the API's request body and JSON paths for substitution.
    * @param {String} apiName - The API details's metadata name.
    * @returns {void}
    */
    fetchJsonData() {
        getJsonData(this.apiName)
            .then(result => {
                this.reqBody = JSON.parse(result[0]);
                this.jsonPathData = result[1];
                console.log(JSON.stringify(this.reqBody))
                console.log(this.jsonPathData)
            }).catch((error) => {
                console.log('Some error occured: ' + error)
            })
    }

}