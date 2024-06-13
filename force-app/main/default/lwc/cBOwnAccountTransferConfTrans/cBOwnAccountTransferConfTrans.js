import { LightningElement, wire, track } from 'lwc';

import { CurrentPageReference } from 'lightning/navigation';
import { NavigationMixin } from 'lightning/navigation';

import AUTHENTICATION_SUCCESSFUL_MESSAGE from '@salesforce/label/c.CB_Authentication_Successful';
import AUTHENTICATION_INPROGRESS_MESSAGE from '@salesforce/label/c.CB_Authentication_InProgress';
import AUTHENTICATION_FAILURE_MESSAGE from '@salesforce/label/c.CB_Authentication_Failed';
import CB_AUTHENTICATION_SUCCESS from '@salesforce/resourceUrl/CBAutenticationSuccess';
import CB_AUTHENTICATION_FAILED from '@salesforce/resourceUrl/CBAutenticationFailed';

import CONFIRM from '@salesforce/label/c.CB_Confirm';
export default class CBOwnAccountTransferConfTrans extends NavigationMixin(LightningElement) {



    @wire(CurrentPageReference)
    pageRefHandler({ state }) {
        if (state) {
            this.fromAccountNo = state.fromAccount ? state.fromAccount : ''
            this.date = state.dateSelected ? state.dateSelected : ''
            this.amount = state.amount ? state.amount : ''
            this.toAccountNo = state.toAccount ? state.toAccount : ''
            this.comment = state.comment ? state.comment : ''

        }
    }



    label = {
        CONFIRM, // Converting "Submit" label to uppercase
    };
    headerConfguration = {
        previousPageUrl: 'CBOwnAccountTransfer__c',
        heading: 'Confirm Transaction',
        iconsExposed: false,
    }



    fcpt = 'N/A'
    date = 'N/A'
    comment = 'N/A'
    fromAccountNo = 'N/A'
    fromAccountCurrency = 'N/A'
    toAccountNo = 'N/A'
    toAccountCurrency = 'N/A'
    fromAccountDesc = 'N/A'
    exchangeRates = 'N/A'
    amount = 'N/A'
    disclaimer = 'Exchange Rates are only indicative for immediate transactions. Future dated or recurring transaction rates may differ according to market rates.'
    showReusableSuccessModal = false
    showReusableSuccessModal2 = false
    showReusableSuccessModal3 = false
    saveAsTemplateDesc = ''
    successGif = CB_AUTHENTICATION_SUCCESS
    failureGif = CB_AUTHENTICATION_FAILED

    showModal = false
    showModal1 = false
    showModal2 = false

    @track modalConf = {
        title: '',
        message: 'The transaction has been successfully completed',
        loadingStatusMsg: 'Processing, kindly wait....',
        isLoading: true,
        yesButton: {
            exposed: true,
            label: 'OK',
            implementation: () => {
                this.showModal = false
                this.showModal1 = true
            }
        },
        notOkButton: {
            exposed: false,
        }
    }
    @track modalConf1 = {
        title: 'Save as Template',
        message: 'The transaction has been successfully completed',
        okButton: {
            exposed: false,
            label: 'OK',
            function: () => {
                this.showModal1 = false
                this.showModal2 = true
            }
        },
    }



    @track modalConf2 = {
        title: 'Template created successfully.',
        okButton: {
            exposed: true,
            label: 'OK',
            function: () => {
                this.showModal2 = false
                this.navigateTo("CBTransfers__c")
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



    closeSavesAsTempModal() {
        this.showModal1 = false
        this.navigateTo("CBTransfers__c")
    }

    fetchCommentsFromModal(event) {
        console.log(event.detail.comments)
        this.showModal1 = false
        this.showModal2 = true
    }



    handleSubmit() {
        this.apiCallout()
    }


    apiCallout() {
        this.showModal = true
        this.modalConf.isLoading = true
        setTimeout(() => {
            // this.modalConf.isLoading = false
            this.showModal = false
            this.showModal1 = true
        }, 2500)
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

    handleEReceipt() {
        console.log("E - Receipt generated...!")
    }


}