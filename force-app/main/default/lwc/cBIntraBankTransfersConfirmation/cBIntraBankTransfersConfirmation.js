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
export default class CBIntraBankTransfersConfirmation extends NavigationMixin(LightningElement) {



    @wire(CurrentPageReference)
    pageRefHandler({ state }) {
        if (state) {
            this.fromAccountNo = state.fromAccount ? state.fromAccount : ''
            this.date = state.dateSelected ? state.dateSelected : ''
            this.amount = state.amount ? state.amount : ''
            this.benefAccountNo = state.toAccount ? state.toAccount : ''
            this.comments = state.comment ? state.comment : ''
            this.fromAccountCurrency = state.currency? state.currency : ''

        }
    }



    label = {
        CONFIRM, // Converting "Submit" label to uppercase
        CANCEL: CANCEL.toUpperCase(), // Converting "Cancel" label to uppercase
    };
    headerConfguration = {
        previousPageUrl: 'CBDomesticTransfers__c',
        heading: 'Confirm Transaction',
        iconsExposed: false,
    }



    fromAccountNo = 'N/A'
    fromAccountDesc = 'N/A'
    fromAccountCurrency = 'N/A'
    benefAccountNo = 'N/A'
    fees = 'N/A'
    benefBankName = 'N/A'
    fcc = 'N/A'
    benefName = 'N/A'
    fcpt = 'N/A'
    amount = 'N/A'
    date = 'N/A'
    comments = 'N/A'
    charges = 'N/A'
    disclaimer = 'Please be advised that payments that are not scheduled within the bank\'s normal business hours will not be processed until the next business date.'
    showReusableSuccessModal = false
    showReusableSuccessModal2 = false
    showReusableSuccessModal3 = false
    saveAsTemplateDesc = ''
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
                this.showReusableSuccessModal2 = true
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


    modalconf2 = {
        title: 'Create new transaction template?',
        okButton: {
            exposed: true,
            label: 'CONFIRM',
            function: () => {
                this.showReusableSuccessModal2 = false
                this.showReusableSuccessModal3 = true
            }
        },
        noButton: {
            exposed: true,
            label: 'CLOSE',
            function: () => {
                this.showReusableSuccessModal2 = false
            }
        },
    }



    modalconf3 = {
        title: 'Template created successfully',
        okButton: {
            exposed: true,
            label: 'OK',
            function: () => {
                this.showReusableSuccessModal3 = false
                this.navigateBack();
            }
        },
        noButton: {
            exposed: false,
        },
    }





    getTheSaveAsTempDesc() {
        let textArea = this.template.querySelector('.success-modal-desc')
        this.saveAsTemplateDesc = textArea.value
        console.log(this.saveAsTemplateDesc)
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
        // history.back();
        this.navigateTo('CBTransfers__c')
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

    navigateBack(){
        this.navigateTo('CBTransfers__c')
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

}