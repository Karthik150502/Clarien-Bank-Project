import { LightningElement, wire } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';

import CB_Page_Applynow from '@salesforce/label/c.CB_Page_Applynow';
import CB_Amount from '@salesforce/label/c.CB_Amount';
import CB_Header_SavingAccount from '@salesforce/label/c.CB_Header_SavingAccount';
import CB_AccountType from '@salesforce/label/c.CB_AccountType';
import CB_Payments_Amount from '@salesforce/label/c.CB_Payments_Amount';
import CB_PayeeName from '@salesforce/label/c.CB_PayeeName';
import CB_SavingsAccountOpening from '@salesforce/label/c.CB_SavingsAccountOpening';
import CBCurrency from '@salesforce/label/c.CBCurrency';
import CB_Submit from '@salesforce/label/c.CB_Submit';
import YourRequestIsSub from '@salesforce/label/c.CB_YourRequestIsSub';
import RequestDraftDisclaimer from '@salesforce/label/c.CB_RequestDraftDisclaimer';
import CB_RequestADraft from '@salesforce/label/c.CB_RequestADraft';
import OK_BUTTON from '@salesforce/label/c.CB_Ok';
import CANCEL_BUTTON from '@salesforce/label/c.CB_Cancel';
import TRANSACTION_COMPLETED_MESSAGE from '@salesforce/label/c.CB_TransactionCompleted';
import PROCESSING_KINDLY_WAIT from '@salesforce/label/c.CB_ProcessinsKindlyWait';

import MakeARequest_RequestADraft from '@salesforce/label/c.CBMakeARequest_RequestADraft';
import createCardRequest from '@salesforce/apex/CBMakeARequestController.createCardRequest'; // Importing Apex method for creating card requests
import serviceRequestCaseRecordTypeId from '@salesforce/apex/CBMakeARequestController.serviceRequestCaseRecordTypeId';


export default class CBRequestDraftConfirmation extends NavigationMixin(LightningElement) {

    label = {
        CB_Amount,
        CB_Payments_Amount,
        CB_Header_SavingAccount,
        CB_AccountType,
        CB_PayeeName,
        CB_SavingsAccountOpening,
        CBCurrency,
        CB_Submit,
    }


    configuration = {
        previousPageUrl: '',
        heading: CB_RequestADraft,
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    @wire(CurrentPageReference) pageRef;

    accountNum = 6000316231;
    accountType = 'Personal Saving USD';
    amount = '2000';
    currency = 'BMD';
    payeeName = 'John';



    // Lifecycle hook that gets called when the component is inserted into the DOM
    // Initializes the component's properties with the state from the current page reference
    connectedCallback() {
        this.accountNum = this.pageRef?.state?.accountNum;
        this.accountType = this.pageRef?.state?.accountType;
        this.amount = this.pageRef?.state?.amount;
        this.currency = this.pageRef?.state?.currency;
        this.payeeName = this.pageRef?.state?.payeeName;
    }

    successModalOpen = false;

    successModalconfig = {
        title: YourRequestIsSub,
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
        alertMsg: RequestDraftDisclaimer
    }

    /**
 * Modal configuration for transaction completion message.
 * Initializes with loading state and defines action for OK button.
 */
    modalConf = {
        title: '',
        message: TRANSACTION_COMPLETED_MESSAGE,
        loadingStatusMsg: PROCESSING_KINDLY_WAIT,
        isLoading: true,
        yesButton: {
            exposed: true,
            label: OK_BUTTON,
            implementation: () => {
                this.showModal = false
                this.navigateBack()
            }
        },
        notOkButton: {
            exposed: false,
        }
    }
    showModal = false
    // Navigates back to a specified page
    // Uses NavigationMixin to perform the navigation
    navigateBack() {
        console.log('navigate called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: CB_Page_Applynow
            }
        });
    }


    // Submits the draft request form
    // Calls the createDraftRequest Apex method with the form data
    // Handles success and error responses, and opens a success modal
    submitForm() {
        this.showModal = true
        serviceRequestCaseRecordTypeId({ recordType: 'Request a Draft' })
            .then((recordId) => {
                let caseRecord = {
                    sObjectName: 'Case',
                    fields: [
                        {
                            fieldName: 'Subject',
                            fieldValue: `${this.accountNum} - Request a Draft'`
                        },
                        {
                            fieldName: 'Type',
                            fieldValue: MakeARequest_RequestADraft
                        },
                        {
                            fieldName: 'Account_Number__c',
                            fieldValue: this.accountNum
                        },
                        {
                            fieldName: 'Account_Type__c',
                            fieldValue: this.accountType
                        },
                        {
                            fieldName: 'Amount__c',
                            fieldValue: this.amount
                        },
                        {
                            fieldName: 'Payee_Name__c',
                            fieldValue: this.payeeName
                        },
                        {
                            fieldName: 'CurrencyIsoCode',
                            fieldValue: this.currency
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
                        this.showModal = false
                        this.successModalOpen = true;
                        console.log("Request Draft created successfully");
                    })
                    .catch((error) => {
                        console.error("Error creating equest Draft request", error);
                        this.configuration.title = error.message;
                        this.showModal = false
                        this.successModalOpen = true;
                    });
            })
            .catch((error) => {
                this.showModal = false
                console.error("Error creating equest Draft request", error);
                this.configuration.title = error.message;
                this.successModalOpen = true;
            });
        // this.successModalOpen = true;
    }

}