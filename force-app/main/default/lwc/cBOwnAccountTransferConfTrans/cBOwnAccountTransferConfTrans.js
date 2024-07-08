import { LightningElement, wire, track } from 'lwc';

import { CurrentPageReference } from 'lightning/navigation';
import { NavigationMixin } from 'lightning/navigation';

import AUTHENTICATION_SUCCESSFUL_MESSAGE from '@salesforce/label/c.CB_Authentication_Successful';
import AUTHENTICATION_INPROGRESS_MESSAGE from '@salesforce/label/c.CB_Authentication_InProgress';
import CB_AUTHENTICATION_SUCCESS from '@salesforce/resourceUrl/CBAutenticationSuccess';
import CB_AUTHENTICATION_FAILED from '@salesforce/resourceUrl/CBAutenticationFailed';
import CONFIRM from '@salesforce/label/c.CB_Confirm';

import CB_ConfirmTransaction from '@salesforce/label/c.CB_ConfirmTransaction';
import CB_FromAccount from '@salesforce/label/c.CB_FromAccount';
import CB_ToAccount from '@salesforce/label/c.CB_TO_ACCOUNT';
import CB_FromAcctDesc from '@salesforce/label/c.CB_FromAcctDesc';
import CB_FromAcctCurrency from '@salesforce/label/c.CB_FromAcctCurrency';
import CB_ToAccountCurrency from '@salesforce/label/c.CB_ToAccountCurrency';
import CB_Fcpt from '@salesforce/label/c.CB_Fcpt';
import CB_Amount from '@salesforce/label/c.CB_Amount';
import CB_Date from '@salesforce/label/c.CB_Date';
import CB_Ok from '@salesforce/label/c.CB_Ok';
import CB_Remarks from '@salesforce/label/c.CB_Remarks';
import CB_ExchangeRates from '@salesforce/label/c.CB_ExchangeRates';
import CB_Page_OwnAcctTransfers from '@salesforce/label/c.CB_Page_OwnAcctTransfers';
import CB_Page_Transfers from '@salesforce/label/c.CB_Page_Transfers';
import CB_TransactionCompleted from '@salesforce/label/c.CB_TransactionCompleted';
import CB_ProcessinsKindlyWait from '@salesforce/label/c.CB_ProcessinsKindlyWait';
import CB_SaveAsTemplate from '@salesforce/label/c.CB_SaveAsTemplate';
import CB_TemplateCreatedSuccessfully from '@salesforce/label/c.CB_TemplateCreatedSuccessfully';
import CB_ExchangeRatesDisclaimer from '@salesforce/label/c.CB_ExchangeRatesDisclaimer';


export default class CBOwnAccountTransferConfTrans extends NavigationMixin(LightningElement) {

    label = {
        CONFIRM,
        CB_FromAcctCurrency,
        CB_ToAccountCurrency,
        CB_FromAcctDesc,
        CB_FromAccount,
        CB_ToAccount,
        CB_Fcpt,
        CB_Amount,
        CB_Date,
        CB_Remarks,
        CB_ExchangeRates
    };








    // Handler for the current page reference.
    // Initializes component properties based on the state object.
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



    headerConfguration = {
        previousPageUrl: CB_Page_OwnAcctTransfers,
        heading: CB_ConfirmTransaction,
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
    disclaimer = CB_ExchangeRatesDisclaimer
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
        message: CB_TransactionCompleted,
        loadingStatusMsg: CB_ProcessinsKindlyWait,
        isLoading: true,
        yesButton: {
            exposed: true,
            label: CB_Ok,
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
        title: '',
        message: CB_TransactionCompleted,
        okButton: {
            exposed: false,
            label: CB_Ok,
            function: () => {
                this.showModal1 = false
                this.showModal2 = true
            }
        },
    }



    @track modalConf2 = {
        title: CB_TemplateCreatedSuccessfully,
        okButton: {
            exposed: true,
            label: CB_Ok,
            function: () => {
                this.showModal2 = false
                this.navigateTo(CB_Page_Transfers)
            }
        },
        noButton: {
            exposed: false,
        },
    }




    /**
    * Retrieves and logs the description entered in the modal for saving as a template.
    */
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


    // Lifecycle hook method called when the component is inserted into the DOM
    connectedCallback() {

    }


    /**
    * Displays the authentication in progress modal with loading animation.
    */
    authenticationInProgress() {
        this.authenticationPopup.showLoadingAnimation = true
        this.authenticationPopup.openModal = true
        this.authenticationPopup.authenticationStatus = AUTHENTICATION_INPROGRESS_MESSAGE
    }


    /**
    * Displays the authentication success modal with a success GIF and message.
    */
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


    /**
    * Closes the "Save As Template" modal and navigates to the transfers page.
    */
    closeSavesAsTempModal() {
        this.showModal1 = false
        this.navigateTo(CB_Page_Transfers)
    }


    /**
    * Fetches and logs comments from the modal event, and transitions to the next modal.
    * @param {Event} event - The event containing the comments detail.
    */
    fetchCommentsFromModal(event) {
        console.log(event.detail.comments)
        this.showModal1 = false
        this.showModal2 = true
    }


    /**
    * Handles the form submission by initiating the API callout.
    */
    handleSubmit() {
        this.apiCallout()
    }

    /**
    * Simulates an API callout, showing a loading modal and then transitioning to the success modal.
    */
    apiCallout() {
        this.showModal = true
        this.modalConf.isLoading = true
        setTimeout(() => {
            // this.modalConf.isLoading = false
            this.showModal = false
            this.showModal1 = true
        }, 2500)
    }

    /**
    * Helper function for navigation to a specified page.
    * @param {string} pageApiName - The API name of the page to navigate to.
    * @param {Object} data - The state data to pass during navigation.
    */
    navigateTo(pageApiName, data = {}) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            },
            state: data
        });
    }


    /**
    * Handles the generation of an E-Receipt and logs the action.
    */
    handleEReceipt() {
        console.log("E - Receipt generated...!")
    }
}