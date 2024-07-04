import { LightningElement } from 'lwc';

import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality

// Importing labels for easy manipulation of the data in labels
import SUBMIT from '@salesforce/label/c.CB_Submit';
import ADHOCPAYMENTS_PAGE from '@salesforce/label/c.CB_Page_AdHocPayments';
import FROMACCOUNT from '@salesforce/label/c.CB_FromAccount';
import TO_ACCOUNT from '@salesforce/label/c.CB_TO_ACCOUNT';
import PAYMENTS_NAME from '@salesforce/label/c.CB_Payments_Name';
import PAYMENTS_AMOUNT from '@salesforce/label/c.CB_Payments_Amount';
import DATE from '@salesforce/label/c.CB_Date';
import RECURRING_TRANSFER from '@salesforce/label/c.CB_RecurringTransfer';
import OCCURANCE from '@salesforce/label/c.CB_Occurance';
import UNTIL from '@salesforce/label/c.CB_Until';
import REMARKS from '@salesforce/label/c.CB_Remarks';
import HEADER_ADHOCPAYMENT from '@salesforce/label/c.CB_Header_AdHocPayment';

import CBSVG from "@salesforce/resourceUrl/CBSVG" // Importing SVG file from Static Resource

import { formatDate, setPagePath } from 'c/cBUtilities';// Importing utility methods

// Extending the LightningElement class and applying the NavigationMixin for navigation capabilities
export default class CBAdHocPayment extends NavigationMixin(LightningElement) {

    // Label definitions using imported labels
    label = {
        FROMACCOUNT,
        TO_ACCOUNT,
        PAYMENTS_NAME,
        PAYMENTS_AMOUNT,
        DATE,
        RECURRING_TRANSFER,
        OCCURANCE,
        UNTIL,
        SUBMIT,
        REMARKS
    };
    
    //SVG's from static resource
    CBCalendar = `${CBSVG}/CBSVGs/CBCalendar.svg#CBCalendar`;

    // Initialize component properties
    date = 'DD/MM/YYYY'; // Default date placeholder
    showDateModal = false; // Flag to control date modal visibility
    amount = ''; // Amount input field value
    name = ''; // Name input field value
    fromAccount = ''; // From Account input field value
    toAccount = ''; // To Account input field value
    remarks = ''; // Remarks input field value

    // Configuration object for header and navigation
    configuration = {
        previousPageUrl: '', // Default previous page URL
        heading: HEADER_ADHOCPAYMENT, // Header title
        iconsExposed: false, // Flag to show/hide icons in header
        logout: {
            exposed: false // Flag to show/hide logout button
        },
        search: {
            exposed: false // Flag to show/hide search button
        }
    };


    // Sample accounts data (mocked for demonstration)
    accounts = [
        { accountNo: '659855541254', accountType: 'Savings Account', accBal: 'BMD 1,5601.55', name: 'John' },
        { accountNo: '659855541254', accountType: 'Savings Account', accBal: 'BMD 1,5601.55', name: 'watson' },
        { accountNo: '659855541254', accountType: 'Savings Account', accBal: 'BMD 1,5601.55', name: 'maxwell' },
        { accountNo: '659855541254', accountType: 'Savings Account', accBal: 'BMD 1,5601.55', name: 'rock' },
        { accountNo: '659855541254', accountType: 'Savings Account', accBal: 'BMD 1,5601.55', name: 'walter' },
        { accountNo: '659855541254', accountType: 'Savings Account', accBal: 'BMD 1,5601.55', name: 'merry' },
    ];

    // Sample accounts data for 'To Accounts' (mocked for demonstration)
    toAccountsList = [
        { accountNum: 604567894, name: 'John', accountType: 'Saving', status: true },
        { accountNum: 604567885, name: 'Trevon', accountType: 'Saving', status: false },
        { accountNum: 604567796, name: 'David', accountType: 'Current', status: true },
        { accountNum: 604567899, name: 'Robin', accountType: 'Saving', status: false },
        { accountNum: 604567810, name: 'Steve', accountType: 'Saving', status: false },
        { accountNum: 604567711, name: 'Walter', accountType: 'Current', status: true },
    ];


    connectedCallback() {
        this.configuration.previousPageUrl = setPagePath(ADHOCPAYMENTS_PAGE)
    }

    // Handler for Amount input field
    handleAmountInput(event) {
        this.amount = event.target.value;
    }

    // Handler for To Account input field
    handleToAccount(event) {
        this.toAccount = event.target.value;
        // Find corresponding name for selected To Account
        for (let i = 0; i < this.toAccountsList.length; i++) {
            if (this.toAccountsList[i].accountNum == this.toAccount) {
                this.name = this.toAccountsList[i].name;
                break;
            }
        }
    }

    // Handler for Name input field
    handleNameInput(event) {
        this.name = event.target.value;
    }

    // Handler for Date input field
    handleDate(event) {
        this.dateSelected = event.target.value ? formatDate(event.target.value) : 'DD/MM/YYYY'; // Update selected date
    }

    // Handler for From Account input field
    handleFromAccountInput(event) {
        this.fromAccount = event.target.value;
    }

    // Handler for To Account input field (alternative)
    handletoAccountInput(event) {
        this.toAccount = event.target.value;
        // Find corresponding name for selected To Account
        for (let i = 0; i < this.toAccountsList.length; i++) {
            if (this.toAccountsList[i].accountNum == this.toAccount) {
                this.name = this.toAccountsList[i].name;
                break;
            }
        }
    }

    // Handler for Remarks input field
    handleRemarks(event) {
        this.remarks = event.detail.remarks;
    }

    // Handler for form submission
    handleSubmit() {
        // Prepare data for navigation state
        let data = {
            name: this.name,
            fromAccount: this.fromAccount,
            toAccount: this.toAccount,
            amount: this.amount,
            date: this.date,
            fees: '0.01',
            fcpt: '0.02',
            fcc: '0.04'
        };

        // Navigate to confirmation page with data state
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'CBAdHocPaymentsConfirmTrans__c' // Confirmation page API name
            },
            state: data // Pass data as state to confirmation page
        });
    }

    // Getter to disable Submit button based on input validation
    get disableSubmit() {
        return this.verifyValues();
    }

    // Method to verify form input values for validation
    verifyValues() {
        console.log(this.amount === '', this.date === 'DD/MM/YYYY', this.toAccount === '', this.fromAccount === 'Select from Account', this.name === '');
        return this.amount === '' || this.date === 'DD/MM/YYYY' || this.toAccount === '' || this.fromAccount === 'Select from Account' || this.name === '';
    }

    // Method to navigate back to previous page
    navigateBack() {
        this.navigateTo(this.configuration.previousPageUrl);
    }

    // Method to navigate to a specified page
    navigateTo(pageApiName) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName // Page API name
            }
        });
    }

    // Methods to control date picker visibility
    showTransDatePicker = false;

    closeTransDatInput() {
        this.showTransDatePicker = false;
    }

    openTransDateSelect() {
        this.showTransDatePicker = true;
    }

    // Additional properties for recurring transfer handling
    untilDate = '';
    frequencySelected = '';
    recurringTransferView = false;

    // Handler for Transaction Date selection
    handleTransDate(event) {
        this.showTransDatePicker = false;
        this.date = formatDate(event.detail.transDate); // Update selected transaction date

        if (event.detail.recurring) {
            this.untilDate = formatDate(event.detail.untilDate); // Update recurring transfer end date
            this.frequencySelected = event.detail.frequencySelected != 'End of every month' ? `Every ${event.detail.repeat} ${event.detail.frequencySelected} ` : 'End of every month';
            this.recurringTransfer = event.detail.recurring;
            this.recurringTransferView = true; // Show recurring transfer details
        } else {
            this.recurringTransferView = false; // Hide recurring transfer details
        }
    }

    // Handler for recurring transfer toggle
    recurringTransfer = false;

    recurringTransferHandler() {
        this.recurringTransfer = !this.recurringTransfer; // Toggle recurring transfer flag
    }
}