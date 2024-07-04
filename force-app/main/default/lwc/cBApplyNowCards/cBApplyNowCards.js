import { LightningElement, track } from 'lwc';

import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality

// Importing labels for easy manipulation of the data in labels
import CARDS from '@salesforce/label/c.CB_Cards';
import REMARKS from '@salesforce/label/c.CB_Remarks';
import CREDIT_CARD from '@salesforce/label/c.CB_CreditCard';
import DEBIT_CARD from '@salesforce/label/c.CB_DebitCard';
import BMD from '@salesforce/label/c.CB_Bmd';
import USD from '@salesforce/label/c.CB_Usd';
import SUBMIT from '@salesforce/label/c.CB_Submit';
import OK_BUTTON from '@salesforce/label/c.CB_Ok';
import APPLYNOW_PAGE from '@salesforce/label/c.CB_Page_Applynow';
import APPLYNOWCARDS_PAGE from '@salesforce/label/c.CB_Page_Applynowcards';
import APPLY_CARD_MODAL_TITLE from '@salesforce/label/c.CB_ApplyCardModalTitle';
import APPLY_CARD_MODAL_MESSAGE from '@salesforce/label/c.CB_ApplyCardModalMessage';
import MakeARequest_Card from '@salesforce/label/c.CBMakeARequest_Card';

import createCardRequest from '@salesforce/apex/CBMakeARequestController.createCardRequest'; // Importing Apex method for creating card requests
import serviceRequestCaseRecordTypeId from '@salesforce/apex/CBMakeARequestController.serviceRequestCaseRecordTypeId';

import { setPagePath } from 'c/cBUtilities'; // Importing utility methods

// Extending the LightningElement class and applying the NavigationMixin for navigation capabilities
export default class CBApplyNowCards extends NavigationMixin(LightningElement) {

    // Labels for UI elements
    label = {
        CARDS,
        CREDIT_CARD,
        DEBIT_CARD,
        BMD,
        USD,
        SUBMIT,
        REMARKS
    }

    // Lifecycle hook to execute when component is added to the DOM
    connectedCallback() {
        setPagePath(APPLYNOWCARDS_PAGE);
    }

    // Initial state variables
    cardSelected = 'Credit Card'; // Default card selection
    currencyOptionsShow = false; // Flag to control currency options display
    currencySelected = 'USD'; // Default currency selection
    remarks = ''; // User input for remarks
    hasRendered = false; // Flag to track if component has rendered
    successModal = false; // Flag to control success modal visibility

    // Lifecycle hook to execute when component is rendered
    renderedCallback() {
        this.hasRendered = true
    }


    // Configuration object for success modal
    @track configuration = {
        title: APPLY_CARD_MODAL_TITLE,
        message: APPLY_CARD_MODAL_MESSAGE,
        okButton: {
            exposed: true,
            label: OK_BUTTON,
            function: () => {
                this.successModal = false;
                this.navigateToApplyNowPage();
            }
        },
        noButton: {
            exposed: false,
            label: '',
            function: () => { }
        },
        alertMsg: ''
    };


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


    // Array of available currencies
    currencies = ['USD', 'BMD'];

    // Header configuration object
    headerConfguration = {
        previousPageUrl: APPLYNOW_PAGE,
        heading: 'Cards',
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    };

    // Method to navigate back to Apply Now page
    navigateToApplyNowPage() {
        const pageReference = {
            type: 'comm__namedPage',
            attributes: {
                name: APPLYNOW_PAGE
            }
        };
        this[NavigationMixin.Navigate](pageReference);
    }

    // Method to disable submit button if remarks are empty
    get disableButton() {
        return this.remarks === '';
    }

    // Method to handle form submission
    handleSubmit() {
        let remarks = this.template.querySelector('.remarks');
        let radios = this.template.querySelectorAll('.radio-input');
        this.cardSelected = radios[0].checked ? 'Credit Card' : radios[1].checked ? 'Debit Card' : '';
        this.successModal = true;

        // Logging selected values for verification (can be removed in production)
        console.log("Card selected --> " + this.cardSelected);
        console.log("Currency selected --> " + this.currencySelected);
        console.log("Remarks --> " + remarks.value);

        serviceRequestCaseRecordTypeId({ recordType: 'Cards' })
            .then((recordId) => {
                let caseRecord = {
                    sObjectName: 'Case',
                    fields: [
                        {
                            fieldName: 'Subject',
                            fieldValue: `60000456 - Request a ${this.cardSelected}`
                        },
                        {
                            fieldName: 'Type',
                            fieldValue: MakeARequest_Card
                        },
                        {
                            fieldName: 'Sub_Type__c',
                            fieldValue: this.cardSelected
                        },
                        {
                            fieldName: 'Account_Number__c',
                            fieldValue: '60000456'
                        },
                        {
                            fieldName: 'CurrencyIsoCode',
                            fieldValue: this.currencySelected
                        },
                        {
                            fieldName: 'Description',
                            fieldValue: this.remarks
                        },
                        {
                            fieldName: 'Status',
                            fieldValue: 'New'
                        },
                        {
                            fieldName: 'RecordTypeId',
                            fieldValue: recordId
                    }]
                };
                console.log(JSON.stringify(caseRecord))
                // Calling Apex method to create card request
                createCardRequest({ wrapper: caseRecord })
                    .then(() => {
                        this.successModalOpen = true;
                        console.log("Card request created successfully");
                    })
                    .catch((error) => {
                        console.error("Error creating card request", error);
                        this.configuration.title = error.message;
                        this.successModalOpen = true;
                    });
            })
            .catch((error) => {
                console.error("Error creating card request", error);
                this.configuration.title = error.message;
                this.successModalOpen = true;
            });
    }

    // Method to update selected card type
    setCard(event) {
        this.cardSelected = event.target.value;
        this.configuration.title = `Your ${this.cardSelected} Has Been Successfully Applied!`;
    }

    // Method to handle remarks input
    handleRemarks(event) {
        this.remarks = event.detail.remarks;
    }

    // Method to update selected currency
    setPicklistValue(event) {
        this.currencySelected = event.target.value;
    }

}