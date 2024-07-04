import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality

import { formatDate } from 'c/cBUtilities';

import QUERY_ON_CHEQUE_BOOK from '@salesforce/label/c.CB_QueryOnChequeBook';
import FROM_DATE from '@salesforce/label/c.CB_FromDate';
import TO_DATE from '@salesforce/label/c.CB_ToDate';
import QUERY_ON_ISSUED_CHEQUES from '@salesforce/label/c.CB_QueryOnIssuedCheques';
import CHEQUE_NUMBER_FROM from '@salesforce/label/c.CB_ChequeNumberFrom';
import CHEQUE_NUMBER_TO from '@salesforce/label/c.CB_ChequeNumberTo';
import CHEQUE_STATUS from '@salesforce/label/c.CB_ChequeStatus';
import ALL from '@salesforce/label/c.CB_All';
import DEPOSITED from '@salesforce/label/c.CB_Deposited';
import IN_TRANSIT from '@salesforce/label/c.CB_InTransit';
import SUBMIT from '@salesforce/label/c.CB_Submit';
import CB_ThankYou from '@salesforce/label/c.CB_ThankYou';
import CB_Ok from '@salesforce/label/c.CB_Ok';
import CB_CardHasBeenApplied from '@salesforce/label/c.CB_CardHasBeenApplied';
import CB_ViewIssuedCheques from '@salesforce/label/c.CB_ViewIssuedCheques';
import CB_Page_Applynowchequebook from '@salesforce/label/c.CB_Page_Applynowchequebook';

export default class CBViewStopIssuedCheques extends NavigationMixin(LightningElement) {

    label = {
        QUERY_ON_CHEQUE_BOOK,
        FROM_DATE,
        TO_DATE,
        QUERY_ON_ISSUED_CHEQUES,
        CHEQUE_NUMBER_FROM,
        CHEQUE_NUMBER_TO,
        CHEQUE_STATUS,
        ALL,
        DEPOSITED,
        IN_TRANSIT,
        SUBMIT
    }

    successModal = false
    queryOnCBook = false
    queryOnIssuedC = false

    fromDate = 'DD/MM/YYYY'
    toDate = 'DD/MM/YYYY'

    chequeNoFrom = ''
    chequeNoTo = ''
    chequeStatus = 'All'
    currDate = ''

    /**
    * Lifecycle method called when the component is connected to the DOM.
    * Sets the current date in DD/MM/YYYY format and logs it to the console.
    */
    connectedCallback() {
        let today = new Date()
        let d = `${today.getFullYear()}-${String(today.getMonth() + 1) < 10 ? "0" : ""}${today.getMonth() + 1}-${today.getDate() < 10 ? '0' : ''}${today.getDate()}`
        this.currDate = formatDate(d);
        console.log(this.currDate)
    }

    /**
     * Getter method to determine the maximum allowable fromDate for filtering transactions.
     * Returns the current date if toDate is set to 'DD/MM/YYYY'; otherwise, returns toDate.
     * If toDate is not set, returns undefined.
     */
    get fromDateMax() {
        if (this.currDate && this.toDate === 'DD/MM/YYYY') {
            return this.currDate
        } else if (this.toDate) {
            return this.toDate
        }
    }

    /**
     * Getter method to determine the maximum allowable toDate for filtering transactions.
     * Returns the current date if it is set; otherwise, returns undefined.
     */
    get toDateMax() {
        if (this.currDate) {
            return this.currDate
        }
    }

    /**
     * Configuration object for the success modal.
     */
    configuration = {
        title: CB_ThankYou,
        message: CB_CardHasBeenApplied,
        okButton: {
            exposed: true,
            label: CB_Ok,
            function: () => {
                this.successModal = false
                this.navigateToApplyNowPage()
            }
        },
        noButton: {
            exposed: false,
            label: '',
            function: () => {
            }
        },
        alertMsg: ''
    }



    // Object to manage header icons
    header_icons = {
        // Announcements icon settings
        announcements: {
            exposed: false,  // Whether to display the Announcements icon
            haveItems: true // Whether the Announcements icon has items to display
        },
        // Whether to display the Announcements icon
        notifications: {
            exposed: false,  // Whether to display the Notifications icon
            haveItems: true // Whether the Notifications icon has items to display
        },
        // Inbox icon settings
        inbox: {
            exposed: true,  // Whether to display the Inbox icon
            haveItems: true // Whether the Inbox icon has items to display
        },
        // Scan Code icon settings
        scanCode: {
            exposed: true, // Whether to display the Scan Code icon
            haveItems: false    // Whether the Scan Code icon has items to display
        }
    };

    /**
    * Configuration object for the secondary header
    */
    headerConfguration = {
        previousPageUrl: CB_Page_Applynowchequebook,
        heading: CB_ViewIssuedCheques,
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }


    /**
    * Using a single Navigate function is more efficient, accepts source name as parameter
    *
    * @param {String} pageApiName - Source name as parameter
    * @return {void}
    */
    navigateTo(pageApiName, dataToSend) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            },
            state: dataToSend
        });
    }


    /**
    * Handler function for updating the value of chequeNoFrom based on user input.
    * @param {Event} event - The event object containing the input value.
     */
    chequeNoFromHandler(event) {
        this.chequeNoFrom = event.target.value
    }

    /**
    * Handler function for updating the value of chequeNoTo based on user input.
    * @param {Event} event - The event object containing the input value.
     */
    chequeNoToHandler(event) {
        this.chequeNoTo = event.target.value
    }

    /**
    * Handler function for updating the value of chequeStatus based on user input.
    * @param {Event} event - The event object containing the input value.
     */
    chequeStatusHandler(event) {
        this.chequeStatus = event.target.value
    }

    /**
    * Sets queryOnIssuedC to true, queryOnCBook to false, and resets fromDate and toDate to 'DD/MM/YYYY'.
    * This function is typically used to initiate a query on issued cheques.
    */
    queryOnIssuedCHandler() {
        this.queryOnIssuedC = true
        this.queryOnCBook = false
        this.fromDate = 'DD/MM/YYYY'
        this.toDate = 'DD/MM/YYYY'
        // this.fromDate = this.fromDate === 'DD/MM/YYYY' ? 'DD/MM/YYYY' : ''
        // this.toDate = this.toDate === 'DD/MM/YYYY' ? 'DD/MM/YYYY' : ''
    }


    /**
     * Handler function for initiating a query on cheque books.
     * Sets queryOnCBook to true, queryOnIssuedC to false, and resets chequeNoFrom, chequeNoTo, and chequeStatus.
     * Typically used when querying cheque books.
     */
    queryOnCBookHandler() {
        this.queryOnCBook = true
        this.queryOnIssuedC = false
        this.chequeNoFrom = ''
        this.chequeNoTo = ''
        this.chequeStatus = ''
    }

    /**
     * Getter method to determine the class for styling the Query on Issued C button.
     * Returns different classes based on the state of queryOnIssuedC.
     * @returns {string} - The class for styling the Query on Issued C button.
     */
    get QICDisable() {
        return !this.queryOnIssuedC ? 'query-on-issued-c disable-con' : 'query-on-issued-c'
    }

    /**
    * Getter method to determine the class for styling the Query on C Book button.
     * Returns different classes based on the state of queryOnCBook.
     * @returns {string} - The class for styling the Query on C Book button.
     */
    get QCDisable() {
        return !this.queryOnCBook ? 'query-on-c-book disable-con' : 'query-on-c-book';
    }


    /**
     * Getter method to determine if the button should be disabled based on query states and input values.
     * @returns {boolean} - True if the button should be disabled; otherwise, false.
     */
    get disableButton() {
        if (this.queryOnCBook || this.queryOnIssuedC) {
            return this.queryOnCBook ? !this.fromDate || !this.toDate || this.fromDate === 'DD/MM/YYYY' || this.toDate === 'DD/MM/YYYY' : this.queryOnIssuedC ? !this.chequeNoFrom || !this.chequeNoTo : false
        } else {
            return true
        }
    }


    /**
     * Getter method to determine the maximum allowed value for the 'fromDate' input field.
     * Returns either the 'toDate' value or the current date ('currDate') based on conditions.
     * @returns {string} - The maximum allowed value for the 'fromDate' input field.
     */
    get getFromDateMax() {
        return this.toDate ? this.toDate : this.currDate
    }


    /**
     * Handles form submission based on the query state.
     * Navigates to the appropriate page with query parameters based on the queryOnCBook or queryOnIssuedC state.
     */
    handleSubmit() {
        if (this.queryOnCBook) {
            this.navigateTo('CBQueryOnChequeBook__c', { 'fromDate': this.fromDate, 'toDate': this.toDate })
        } else if (this.queryOnIssuedC) {
            this.navigateTo('CBQueryOnIssuedCheques__c', { 'chequeNoFrom': this.chequeNoFrom, 'chequeNoTo': this.chequeNoTo })
        }
    }

    /**
    * Opens the date picker for the 'fromDate' input field.
    */
    openFromDate() {
        let fromDate = this.template.querySelector('.from-date-invis')
        fromDate.showPicker();
    }
    /**
     * Opens the date picker for the 'toDate' input field.
     */
    openToDate() {
        let toDate = this.template.querySelector('.to-date-invis')
        toDate.showPicker()
    }

    /**
     * Handles the input change for the 'fromDate' field.
     * Updates the 'fromDate' value based on the input value or sets it to 'DD/MM/YYYY' if empty.
     * @param {Event} event - The input change event.
     */
    fromDateHandler(event) {
        this.fromDate = formatDate(event.target.value ? event.target.value : 'DD/MM/YYYY')
    }

    /**
     * Handles the input change for the 'toDate' field.
     * Updates the 'toDate' value based on the input value or sets it to 'DD/MM/YYYY' if empty.
     * @param {Event} event - The input change event.
     */
    toDateHandler(event) {
        this.toDate = formatDate(event.target.value ? event.target.value : 'DD/MM/YYYY')
    }

}