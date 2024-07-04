import { LightningElement, wire, track } from 'lwc';

import { CurrentPageReference } from 'lightning/navigation';
import { NavigationMixin } from 'lightning/navigation';

import AUTHENTICATION_SUCCESSFUL_MESSAGE from '@salesforce/label/c.CB_Authentication_Successful';
import AUTHENTICATION_INPROGRESS_MESSAGE from '@salesforce/label/c.CB_Authentication_InProgress';
import CB_AUTHENTICATION_SUCCESS from '@salesforce/resourceUrl/CBAutenticationSuccess';
import CB_AUTHENTICATION_FAILED from '@salesforce/resourceUrl/CBAutenticationFailed';

import CONFIRM from '@salesforce/label/c.CB_Confirm';
import CANCEL from '@salesforce/label/c.CB_Cancel';


import CB_FromAccount from '@salesforce/label/c.CB_FromAccount';
import CB_Date from '@salesforce/label/c.CB_Date';
import CB_TO_ACCOUNT from '@salesforce/label/c.CB_TO_ACCOUNT';
import CB_Amount from '@salesforce/label/c.CB_Amount';
import CB_Fcpt from '@salesforce/label/c.CB_Fcpt';
import CB_Fcc from '@salesforce/label/c.CB_Fcc';
import CB_Fees from '@salesforce/label/c.CB_Fees';
import CB_SaveAsTemplate from '@salesforce/label/c.CB_SaveAsTemplate';
import CB_Name from '@salesforce/label/c.CB_Name';
import CB_EReceipt from '@salesforce/label/c.CB_EReceipt';
import CB_Disclaimer from '@salesforce/label/c.CB_Disclaimer';
import CB_Close from '@salesforce/label/c.CB_Close';
import CB_Save from '@salesforce/label/c.CB_Save';
import CB_ConfirmTransaction from '@salesforce/label/c.CB_ConfirmTransaction';
import CB_TransferSuccessful from '@salesforce/label/c.CB_TransferSuccessful';
export default class CBQrConfTrans extends NavigationMixin(LightningElement) {


    // Handler for changes in the page reference state
    @wire(CurrentPageReference)
    pageRefHandler({ state }) {
        if (state) {
            this.fromAccountNo = state.fromAccount ? state.fromAccount : ''
            this.date = state.dateSelected ? state.dateSelected : ''
            this.amount = state.amount ? state.amount : ''
            this.toAccountNo = state.toAccount ? state.toAccount : ''
            this.name = state.name ? state.name : ''
        }
    }



    label = {
        CONFIRM, // Converting "Submit" label to uppercase
        CANCEL,
        CB_FromAccount,
        CB_Date,
        CB_TO_ACCOUNT,
        CB_Amount,
        CB_Fcpt,
        CB_Fcc,
        CB_Fees,
        CB_SaveAsTemplate,
        CB_Name,
        CB_EReceipt,
    };
    headerConfguration = {
        previousPageUrl: '',
        heading: CB_ConfirmTransaction,
        iconsExposed: false,
    }



    fcpt = 'N/A'
    fcc = 'N/A'
    fees = 'N/A'
    date = 'N/A'
    fromAccountNo = 'N/A'
    toAccountNo = 'N/A'
    amount = 'N/A'
    disclaimer = CB_Disclaimer
    showReusableSuccessModal = false
    successGif = CB_AUTHENTICATION_SUCCESS
    failureGif = CB_AUTHENTICATION_FAILED

    modalconf = {
        title: CB_TransferSuccessful,
        okButton: {
            exposed: true,
            label: CB_Save,
            function: () => {
                this.getTheSaveAsTempDesc()
                this.showReusableSuccessModal = false
            }
        },
        noButton: {
            exposed: true,
            label: CB_Close,
            function: () => {
                this.showReusableSuccessModal = false
            }
        },
    }






    // Authentication Status Modal initial configuration
    @track authenticationPopup = {
        // Initial Authentication Status message
        authenticationStatus: '',
        // Authentication Status GIF
        authenticationSpinnergif: null,
        // Authentication Status open or close status
        openModal: false,
        // Authentication loading animation visibility
        showLoadingAnimation: true
    }




    // Initiates the authentication process
    authenticationInProgress() {
        this.authenticationPopup.showLoadingAnimation = true
        this.authenticationPopup.openModal = true
        this.authenticationPopup.authenticationStatus = AUTHENTICATION_INPROGRESS_MESSAGE
    }
    // Handles successful authentication
    authenticationSuccess() {
        this.authenticationPopup.showLoadingAnimation = false
        this.authenticationPopup.openModal = true
        this.authenticationPopup.authenticationSpinnergif = this.successGif
        this.authenticationPopup.authenticationStatus = AUTHENTICATION_SUCCESSFUL_MESSAGE
        setTimeout(() => {
            this.authenticationPopup.openModal = false
            this.showReusableSuccessModal = true
        }, 1000)

    }



    // Handles form submission and initiates API callout
    handleSubmit() {
        this.apiCallout()
    }

    // Simulates an API callout and handles authentication process
    apiCallout() {
        this.authenticationInProgress()
        setTimeout(() => {
            this.authenticationSuccess()
        }, 2000)
    }

    // Helper function for navigation
    navigateTo(pageApiName, data = {}) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            },
            state: data
        });
    }

    // Handles the action to save the transaction as a template
    handleSaveAsTemplate() {
        console.log("Save as Template")
    }

    // Handles the action to generate an e-receipt
    handleEReceipt() {
        console.log("E - Receipt generated...!")
    }


}