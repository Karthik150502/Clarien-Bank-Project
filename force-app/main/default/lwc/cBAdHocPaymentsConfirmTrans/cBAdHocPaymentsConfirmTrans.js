import { LightningElement, wire, track } from 'lwc';

import { NavigationMixin, CurrentPageReference } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality

// Importing labels for easy manipulation of the data in labels
import FROMACCOUNT from '@salesforce/label/c.CB_FromAccount';
import TO_ACCOUNT from '@salesforce/label/c.CB_TO_ACCOUNT';
import CONTINUE from '@salesforce/label/c.CB_Continue';
import Custome_Name from '@salesforce/label/c.CB_CustomerName';
import PAYMENTS_AMOUNT from '@salesforce/label/c.CB_Payments_Amount';
import DATE from '@salesforce/label/c.CB_Date';
import FEES from '@salesforce/label/c.CB_Fees';
import FCC from '@salesforce/label/c.CB_Fcc';
import FCPT from '@salesforce/label/c.CB_Fcpt';
import ADHOC_PAYMENTS_PAGE from '@salesforce/label/c.CB_Page_AdHocPayments';
import TRANSFERS_PAGE from '@salesforce/label/c.CB_Page_Transfers';
import CONFIRMTRANSACTION from '@salesforce/label/c.CB_ConfirmTransaction';
import DISCLAIMER from '@salesforce/label/c.CB_Payments_Disclaimer';

// Extending the LightningElement class and applying the NavigationMixin for navigation capabilities
export default class CBAdHocPaymentsConfirmTrans extends NavigationMixin(LightningElement) {
    @wire(CurrentPageReference) pageRef;

    // Labels imported from Salesforce
    label = {
        FROMACCOUNT,
        TO_ACCOUNT,
        Custome_Name,
        PAYMENTS_AMOUNT,
        DATE,
        FEES,
        FCC,
        FCPT,
        CONTINUE,
    };

    // Header configuration object
    headerConfguration = {
        previousPageUrl: ADHOC_PAYMENTS_PAGE, // Previous page URL
        heading: CONFIRMTRANSACTION, // Header title
        iconsExposed: false, // Flag to control icon visibility
    };

    // Default values for transaction details
    fcpt = 'N/A';
    date = 'N/A';
    fcc = 'N/A';
    amount = 'N/A';
    fees = 'N/A';
    customerName = 'N/A';
    accRefNo = 'N/A';
    fromAccount = 'N/A';
    toAccount = 'N/A';
    disclaimer = DISCLAIMER; // Disclaimer message

    connectedCallback() {
        this.populateValues(); // Populate transaction details on component initialization
    }

    // Method to populate transaction details from page state
    populateValues() {
        const state = this.pageRef?.state;
        if (state) {
            this.customerName = state.name || this.customerName;
            this.fromAccount = state.fromAccount || this.fromAccount;
            this.toAccount = state.toAccount || this.toAccount;
            this.amount = state.amount || this.amount;
            this.date = state.date || this.date;
            this.fees = state.fees || this.fees;
            this.fcpt = state.fcpt || this.fcpt;
            this.fcc = state.fcc || this.fcc;
        }
    }

    // Method invoked when the submit button is clicked
    handleSubmit() {
        this.apiCallout(); // Perform API callout or processing
    }

    // Getter to disable submit button (not implemented in the provided code)
    get disableSubmit() {
        // Logic to determine if submit button should be disabled
        return false; // Placeholder logic
    }

    // Method to handle saving transaction as template
    handleSaveAsTemplate() {
        console.log("handleSaveAsTemplate");
    }

    // Method to handle e-receipt generation
    handleEReceipt() {
        console.log("handleEReceipt");
    }

    // Wire method to reactively update values based on page reference changes
    @wire(CurrentPageReference)
    handlePageReferenceChange() {
        this.populateValues(); // Update transaction details on page reference change
    }

    // Method to navigate back to previous page
    navigateBack() {
        this.navigateTo(ADHOC_PAYMENTS_PAGE);
    }

    // Method to navigate to a specified page API name
    navigateTo(pageApiName) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName // Navigate to specified page API name
            }
        });
    }

    // Modal control properties and configuration
    @track showModal = false;
    @track showModal1 = false;
    @track showModal2 = false;

    // Modal configuration object for transaction completion message
    @track modalConf = {
        title: '',
        message: 'The transaction has been successfully completed',
        loadingStatusMsg: 'Processing, kindly wait....',
        isLoading: true,
        yesButton: {
            exposed: true,
            label: 'OK',
            implementation: () => {
                this.showModal = false;
                this.showModal1 = true; // Show next modal on OK button click
            }
        },
        notOkButton: {
            exposed: false,
        }
    };

    // Modal configuration object for "Save as Template" confirmation
    @track modalConf1 = {
        title: 'Save as Template',
        message: 'The transaction has been successfully completed',
        okButton: {
            exposed: false,
            label: 'OK',
            function: () => {
                this.showModal1 = false;
                this.showModal2 = true; // Show final modal on OK button click
            }
        },
    };

    // Modal configuration object for template creation success
    @track modalConf2 = {
        title: 'Template created successfully.',
        okButton: {
            exposed: true,
            label: 'OK',
            function: () => {
                this.showModal2 = false;
                this.navigateTo(TRANSFERS_PAGE); // Navigate to transfers page on OK button click
            }
        },
        noButton: {
            exposed: false,
        },
    };

    // Mock API callout method with modal display
    apiCallout() {
        this.showModal = true; // Show loading modal
        this.modalConf.isLoading = true; // Show loading message

        setTimeout(() => {
            // Simulate delay for API callout
            this.showModal = false; // Hide loading modal
            this.showModal1 = true; // Show next modal
        }, 2500); // Simulated 2.5 seconds delay
    }

    // Method to close "Save as Template" modal
    closeSavesAsTempModal() {
        this.showModal1 = false; // Close modal
        this.navigateTo(TRANSFERS_PAGE); // Navigate to transfers page
    }

    // Method to fetch comments from child component modal
    fetchCommentsFromModal(event) {
        console.log(event.detail.comments); // Log comments received from modal
        this.showModal1 = false; // Close modal
        this.showModal2 = true; // Show final modal
    }
}