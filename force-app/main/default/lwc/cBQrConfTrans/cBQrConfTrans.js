import { LightningElement, wire, track } from 'lwc';

import { CurrentPageReference } from 'lightning/navigation';
import { NavigationMixin } from 'lightning/navigation';

import AUTHENTICATION_SUCCESSFUL_MESSAGE from '@salesforce/label/c.CB_Authentication_Successful';
import AUTHENTICATION_INPROGRESS_MESSAGE from '@salesforce/label/c.CB_Authentication_InProgress';
import AUTHENTICATION_FAILURE_MESSAGE from '@salesforce/label/c.CB_Authentication_Failed';
import CB_AUTHENTICATION_SUCCESS from '@salesforce/resourceUrl/CBAutenticationSuccess';
import CB_AUTHENTICATION_FAILED from '@salesforce/resourceUrl/CBAutenticationFailed';

import CONFIRM from '@salesforce/label/c.CB_Confirm';
import CANCEL from '@salesforce/label/c.CB_Cancel';
export default class CBQrConfTrans extends NavigationMixin(LightningElement) {



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
        CANCEL: CANCEL.toUpperCase(), // Converting "Cancel" label to uppercase
    };
    headerConfguration = {
        previousPageUrl: '',
        heading: 'Confirm Transaction',
        iconsExposed: false,
    }



    fcpt = 'N/A'
    fcc = 'N/A'
    fees = 'N/A'
    date = 'N/A'
    fromAccountNo = 'N/A'
    toAccountNo = 'N/A'
    amount = 'N/A'
    disclaimer = 'Please be advised that payments that are not scheduled within the bank\'s normal business hours will not be processed untill the next business date.'
    showReusableSuccessModal = false
    successGif = CB_AUTHENTICATION_SUCCESS
    failureGif = CB_AUTHENTICATION_FAILED

    modalconf = {
        title: 'Transfer Successful',
        okButton: {
            exposed: true,
            label: 'SAVE',
            function: () => {
                this.getTheSaveAsTempDesc()
                this.showReusableSuccessModal = false
            }
        },
        noButton: {
            exposed: true,
            label: 'CLOSE',
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



    connectedCallback() {

    }

    authenticationInProgress() {
        this.authenticationPopup.showLoadingAnimation = true
        this.authenticationPopup.openModal = true
        this.authenticationPopup.authenticationStatus = AUTHENTICATION_INPROGRESS_MESSAGE
    }

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


    handleCancel() {
    }


    handleSubmit() {
        this.apiCallout()
    }


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


    handleSaveAsTemplate() {
        console.log("Save as Template")
    }


    handleEReceipt() {
        console.log("E - Receipt generated...!")
    }


}