import { LightningElement } from 'lwc'; // Import necessary decorators and modules from LWC framework
import { NavigationMixin } from 'lightning/navigation'; // Import navigation module

// Import labels for easy manipulation in the UI
import FILTERBYTRANSACTIONDATE from '@salesforce/label/c.CB_FilterByTransactionDate';
import FILTERBYTRANSACTIONDETAIL from '@salesforce/label/c.CB_FilterByTransactionDetail';
import TRANSACTIONTYPE from '@salesforce/label/c.CB_TransactionType';
import FROMAMOUNT from '@salesforce/label/c.CB_FromAmount';
import TOAMOUNT from '@salesforce/label/c.CB_ToAmount';
import FROMDATE from '@salesforce/label/c.CB_FromDate';
import TODATE from '@salesforce/label/c.CB_ToDate';
import DONE from '@salesforce/label/c.CB_Done';

import CBSVG from "@salesforce/resourceUrl/CBSVG"; // Importing SVG file from Static Resource
import { formatDate } from 'c/cBUtilities'; // Import utility functions

// Extend LightningElement class and apply NavigationMixin for navigation capabilities
export default class CBFilterSavingsAccount extends NavigationMixin(LightningElement) {
    // Labels for UI elements
    label = {
        FILTERBYTRANSACTIONDATE,
        FILTERBYTRANSACTIONDETAIL,
        TRANSACTIONTYPE,
        FROMAMOUNT,
        TOAMOUNT,
        FROMDATE,
        TODATE,
        DONE
    }

    // SVG icons from static resource
    CBBackIcon = `${CBSVG}/CBSVGs/CBBackIcon.svg#CBBackIcon`;

    // Initial state variables
    fromDate = 'DD/MM/YYYY';
    toDate = 'DD/MM/YYYY';
    selectedTransactionType = '';
    transactionTypes = ["Credit", "Debit"];
    fromAmount = '';
    toAmount = '';

    filterDate = false;
    filterType = false;

    header = 'Filter Transaction';

    // Lifecycle hook to set current date when the component is inserted into the DOM
    connectedCallback() {
        this.setCurrentDate();
    }

    // Event handler for setting from date
    fromDateHandler(event) {
        this.fromDate = formatDate(event.target.value);
    }

    // Event handler for setting to date
    toDateHandler(event) {
        this.toDate = formatDate(event.target.value);
    }

    // Event handler for setting from amount
    handleFromAmount(event) {
        this.fromAmount = event.target.value;
    }

    // Event handler for setting to amount
    handleToAmount(event) {
        this.toAmount = event.target.value;
    }

    // Toggle filter by date
    handleFilterDate() {
        this.filterDate = !this.filterDate;
        this.filterType = false;
        this.fromAmount = '';
        this.toAmount = '';
        this.selectedTransactionType = '';
    }

    // Toggle filter by transaction type
    handleFilterType() {
        this.filterType = !this.filterType;
        this.filterDate = false;
        this.fromDate = 'DD/MM/YYYY';
        this.toDate = 'DD/MM/YYYY';
    }

    get disableDates(){
        return !this.filterDate
    }
    // Close modal and dispatch event
    closeModal() {
        this.dispatchEvent(new CustomEvent('filtered'));
    }

    // Handle submit action and dispatch event with filter details
    handleSubmit() {
        console.log('Called Filter Submit')
        if (this.filterDate) {
            this.dispatchEvent(new CustomEvent('filtered', {
                detail: {
                    fromDate: this.fromDate,
                    toDate: this.toDate
                }
            }));
        } else if (this.filterType) {
            this.dispatchEvent(new CustomEvent('filtered', {
                detail: {
                    fromAmount: this.fromAmount,
                    toAmount: this.toAmount
                }
            }));
        }
    }

    // Helper function for navigation
    navigateTo(pageApiName, data) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            },
            state: data
        });
    }

    // Disable Done button based on input validation
    get disableDoneButton() {
        if (this.filterDate) {
            return this.fromDate === 'DD/MM/YYYY' || this.toDate === 'DD/MM/YYYY';
        }
        if (this.filterType) {
            return this.selectedTransactionType === '' || this.fromAmount === '' || this.toAmount === '';
        }
        return false;
    }

    // Set current date for validation
    setCurrentDate() {
        let today = new Date();
        this.currDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    }

    // Get maximum date for from date input
    get fromDateMax() {
        if (this.currDate && this.toDate === 'DD/MM/YYYY') {
            return this.currDate;
        } else if (this.toDate) {
            return this.toDate;
        }
        return ''
    }

    // Get maximum date for to date input
    get toDateMax() {
        if (this.currDate) {
            return this.currDate;
        }
        return ''
    }

    // Handle transaction type selection
    handleTransactionType(event) {
        this.selectedTransactionType = event.target.value;
    }
}