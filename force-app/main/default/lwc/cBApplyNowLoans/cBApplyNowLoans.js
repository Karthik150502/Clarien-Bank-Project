import { LightningElement } from 'lwc';

import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality

// Importing labels for easy manipulation of the data in labels
import LOANS from '@salesforce/label/c.CB_Loans';
import PERSONAL from '@salesforce/label/c.CB_PersonalLoan';
import CAR from '@salesforce/label/c.CB_CarLoan';
import SUSTAINABLE from '@salesforce/label/c.CB_Sustainable';
import HOME from '@salesforce/label/c.CB_HomeLoan';
import REMARKS from '@salesforce/label/c.CB_Remarks';
import OK_BUTTON from '@salesforce/label/c.CB_Ok';
import CANCEL_BUTTON from '@salesforce/label/c.CB_Cancel';
import SUBMIT from '@salesforce/label/c.CB_Submit';
import HEADER_LOANS from '@salesforce/label/c.CB_Header_Loans';
import APPLYNOWLOANS_PAGE from '@salesforce/label/c.CB_Page_CBApplynowloans';
import APPLYNOW_PAGE from '@salesforce/label/c.CB_Page_Applynow';
import APPLYLOANSMODAL_TITLE from '@salesforce/label/c.CB_ApplyLoansModal_Title';
import APPLYLOANSMODAL_MESSAGE from '@salesforce/label/c.CB_ApplyLoansModal_Message';
import MakeARequest_Loan from '@salesforce/label/c.CBMakeARequest_Loan';

import { setPagePath, getMobileSessionStorage } from 'c/cBUtilities'; // Importing utility methods

import createServiceRequest from '@salesforce/apex/CBMakeARequestController.createServiceRequest'; // Importing Apex method for creating card requests


// Extending the LightningElement class and applying the NavigationMixin for navigation capabilities
export default class CBApplyNowLoans extends NavigationMixin(LightningElement) {

    // Labels for UI elements
    label = {
        LOANS,
        PERSONAL,
        CAR,
        SUSTAINABLE,
        HOME,
        REMARKS,
        SUBMIT
    }

    // Connected callback to set the page path when the component is connected to the DOM
    connectedCallback() {
        setPagePath(APPLYNOWLOANS_PAGE);
    }

    // Configuration object for header settings
    configuration = {
        previousPageUrl: APPLYNOW_PAGE,
        heading: HEADER_LOANS,
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
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

    // Configuration object for the success modal
    successModalconfig = {
        title: APPLYLOANSMODAL_TITLE,
        message: APPLYLOANSMODAL_MESSAGE,
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
    };

    // Properties to manage loan type selection, remarks, and modal state
    remarks = '';
    loan = '';
    successModalOpen = false;

    // Method to handle selection of loan type
    handleLoanType(event) {
        this.loan = event.target.value;
    }

    // Method to handle input in remarks field
    handleRemarks(event) {
        this.remarks = event.detail.remarks;
    }

    // Method to handle form submission
    handleSubmit() {

        let leadRecord = {
            sObjectName: 'lead',
            fields: [
                {
                    fieldName: 'LastName',
                    fieldValue: getMobileSessionStorage('CustomerName')
                },
                {
                    fieldName: 'Type__c',
                    fieldValue: MakeARequest_Loan
                },
                {
                    fieldName: 'Sub_Type__c',
                    fieldValue: this.loan
                },
                {
                    fieldName: 'Description',
                    fieldValue: this.remarks
                },
                {
                    fieldName: 'Status',
                    fieldValue: 'New'
                }]
        };

        // Calling Apex method to create Loan request
        createServiceRequest({ wrapper: leadRecord })
            .then(() => {
                console.log("loan request created successfully");
                this.successModalOpen = true;
            })
            .catch((error) => {
                console.error("Error creating Loan request", error);
                this.configuration.title = error.message;
                this.successModalOpen = true;
            });
        // this.successModalOpen = true;

    }

    // Method to determine if the button should be disabled or not
    get buttonDisabled() {
        return !this.loan || !this.remarks
    }

    // Method to navigate back to Apply Now page
    navigateBack() {
        console.log('navigate called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: APPLYNOW_PAGE
            }
        });
    }
}