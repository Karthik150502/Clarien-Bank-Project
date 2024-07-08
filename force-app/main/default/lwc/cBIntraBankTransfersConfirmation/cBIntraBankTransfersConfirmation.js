import { LightningElement, wire, track } from 'lwc';

import { CurrentPageReference } from 'lightning/navigation';
import { NavigationMixin } from 'lightning/navigation';


import CB_AUTHENTICATION_SUCCESS from '@salesforce/resourceUrl/CBAutenticationSuccess';
import CB_AUTHENTICATION_FAILED from '@salesforce/resourceUrl/CBAutenticationFailed';


import CB_Debit_Account from '@salesforce/label/c.CB_Debit_Account';
import CB_Date from '@salesforce/label/c.CB_Date';
import CB_Amount from '@salesforce/label/c.CB_Amount';
import CB_BeneficiaryName from '@salesforce/label/c.CB_BeneficiaryName';
import CB_Payments_Amount from '@salesforce/label/c.CB_Payments_Amount';
import CB_Fcpt from '@salesforce/label/c.CB_Fcpt';
import CB_Fcc from '@salesforce/label/c.CB_Fcc';
import CB_Fees from '@salesforce/label/c.CB_Fees';
import CB_BeneficiaryDetailsAccountNo from '@salesforce/label/c.CB_BeneficiaryDetailsAccountNo';
import CB_FromAcctDesc from '@salesforce/label/c.CB_FromAcctDesc';
import CB_DebitAccount from '@salesforce/label/c.CB_DebitAccount';
import CB_DebitAcctCurrency from '@salesforce/label/c.CB_DebitAcctCurrency';
import CB_Remarks from '@salesforce/label/c.CB_Remarks';


import CB_Ok from '@salesforce/label/c.CB_Ok';
import CB_Page_Transfers from '@salesforce/label/c.CB_Page_Transfers';
import CB_TransactionCompleted from '@salesforce/label/c.CB_TransactionCompleted';
import CB_ProcessinsKindlyWait from '@salesforce/label/c.CB_ProcessinsKindlyWait';
import CB_SaveAsTemplate from '@salesforce/label/c.CB_SaveAsTemplate';
import CB_TemplateCreatedSuccessfully from '@salesforce/label/c.CB_TemplateCreatedSuccessfully';
import CB_ConfirmTransaction from '@salesforce/label/c.CB_ConfirmTransaction';
import CB_Page_IntrabankTransfers from '@salesforce/label/c.CB_Page_IntrabankTransfers';
import CB_Disclaimer from '@salesforce/label/c.CB_Disclaimer';

import CONFIRM from '@salesforce/label/c.CB_Confirm';
export default class CBIntraBankTransfersConfirmation extends NavigationMixin(LightningElement) {


    label = {
        CONFIRM,
        CB_Debit_Account,
        CB_Date,
        CB_Amount,
        CB_BeneficiaryName,
        CB_Payments_Amount,
        CB_Fcpt,
        CB_Fcc,
        CB_Fees,
        CB_BeneficiaryDetailsAccountNo,
        CB_FromAcctDesc,
        CB_DebitAccount,
        CB_DebitAcctCurrency,
        CB_Remarks,
    };



    /**
    * Handler for the current page reference. Extracts state parameters and assigns them to component variables.
    * @param {Object} state - The state object containing parameters from the URL.
    */
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


    headerConfguration = {
        previousPageUrl: CB_Page_IntrabankTransfers,
        heading: CB_ConfirmTransaction,
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
    disclaimer = CB_Disclaimer
    showReusableSuccessModal = false
    showReusableSuccessModal2 = false
    showReusableSuccessModal3 = false
    saveAsTemplateDesc = ''
    successGif = CB_AUTHENTICATION_SUCCESS
    failureGif = CB_AUTHENTICATION_FAILED











    /**
    * Retrieves and stores the description from a textarea in the save-as-template modal.
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



    connectedCallback() {

    }


    /**
    * Handles the form submission and initiates the API callout process.
    */
    handleSubmit() {
        this.apiCallout();
    }



    /**
    * Navigates back to the transfers page.
    */
    navigateBack() {
        this.navigateTo(CB_Page_Transfers)
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
    * Simulates an API callout and handles the display of modals based on the callout result.
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
    * Closes the save-as-template modal and navigates back to the transfers page.
    */
    closeSavesAsTempModal() {
        this.showModal1 = false
        this.navigateTo(CB_Page_Transfers)
    }



    /**
    * Fetches comments from the modal event and transitions to the next modal.
    * @param {Event} event - The event containing the comments data.
    */
    fetchCommentsFromModal(event) {
        console.log(event.detail.comments)
        this.showModal1 = false
        this.showModal2 = true
    }


}