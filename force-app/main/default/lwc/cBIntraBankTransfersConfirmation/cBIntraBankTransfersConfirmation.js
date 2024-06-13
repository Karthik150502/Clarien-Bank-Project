import { LightningElement, wire, track } from 'lwc';

import { CurrentPageReference } from 'lightning/navigation';
import { NavigationMixin } from 'lightning/navigation';

import AUTHENTICATION_SUCCESSFUL_MESSAGE from '@salesforce/label/c.CB_Authentication_Successful';
import AUTHENTICATION_INPROGRESS_MESSAGE from '@salesforce/label/c.CB_Authentication_InProgress';
import AUTHENTICATION_FAILURE_MESSAGE from '@salesforce/label/c.CB_Authentication_Failed';
import CB_AUTHENTICATION_SUCCESS from '@salesforce/resourceUrl/CBAutenticationSuccess';
import CB_AUTHENTICATION_FAILED from '@salesforce/resourceUrl/CBAutenticationFailed';

import CONFIRM from '@salesforce/label/c.CB_Confirm';
export default class CBIntraBankTransfersConfirmation extends NavigationMixin(LightningElement) {



    @wire(CurrentPageReference)
    pageRefHandler({ state }) {
        if (state) {
            this.fromAccountNo = state.fromAccount ? state.fromAccount : 'N/A'
            this.date = state.dateSelected ? state.dateSelected : 'N/A'
            this.amount = state.amount ? state.amount : 'N/A'
            this.benefAccountNo = state.toAccount ? state.toAccount : 'N/A'
            this.comments = state.comment ? state.comment : 'N/A'
            this.fromAccountCurrency = state.currency ? state.currency : 'N/A'
            this.benefName = state.name ? state.name : 'N/A'
        }
    }



    label = {
        CONFIRM, // Converting "Submit" label to uppercase
    };
    headerConfguration = {
        previousPageUrl: 'CBIntraBankTransfers__c',
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


    handleSubmit() {
        this.apiCallout();
    }

    navigateBack() {
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

    apiCallout() {
        this.showModal = true
        this.modalConf.isLoading = true
        setTimeout(() => {
            // this.modalConf.isLoading = false
            this.showModal = false
            this.showModal1 = true
        }, 2500)
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


}