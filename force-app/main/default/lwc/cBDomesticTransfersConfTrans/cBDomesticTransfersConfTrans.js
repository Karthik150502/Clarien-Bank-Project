import { LightningElement, wire, track } from 'lwc';

import { CurrentPageReference } from 'lightning/navigation';
import { NavigationMixin } from 'lightning/navigation';

import AUTHENTICATION_SUCCESSFUL_MESSAGE from '@salesforce/label/c.CB_Authentication_Successful';
import AUTHENTICATION_INPROGRESS_MESSAGE from '@salesforce/label/c.CB_Authentication_InProgress';
import CB_AUTHENTICATION_SUCCESS from '@salesforce/resourceUrl/CBAutenticationSuccess';
import CB_AUTHENTICATION_FAILED from '@salesforce/resourceUrl/CBAutenticationFailed';
import CB_ConfirmTransaction from '@salesforce/label/c.CB_ConfirmTransaction';
import CB_FromAccount from '@salesforce/label/c.CB_FromAccount';
import CB_FromAcctDesc from '@salesforce/label/c.CB_FromAcctDesc';
import CB_FromAcctCurrency from '@salesforce/label/c.CB_FromAcctCurrency';
import CB_BeneficiaryDetailsAccountNo from '@salesforce/label/c.CB_BeneficiaryDetailsAccountNo';
import CB_BeneficiaryBankName from '@salesforce/label/c.CB_BeneficiaryBankName';
import CB_Fees from '@salesforce/label/c.CB_Fees';
import CB_Fcc from '@salesforce/label/c.CB_Fcc';
import CB_Fcpt from '@salesforce/label/c.CB_Fcpt';
import CB_Amount from '@salesforce/label/c.CB_Amount';
import CB_Date from '@salesforce/label/c.CB_Date';
import CB_Ok from '@salesforce/label/c.CB_Ok';
import CB_Disclaimer from '@salesforce/label/c.CB_Disclaimer';
import CB_BeneficiaryName from '@salesforce/label/c.CB_BeneficiaryName';
import CB_Charges from '@salesforce/label/c.CB_Charges';
import CB_Remarks from '@salesforce/label/c.CB_Remarks';
import CB_Page_DomesticTransfers from '@salesforce/label/c.CB_Page_DomesticTransfers';
import CB_TransactionCompleted from '@salesforce/label/c.CB_TransactionCompleted';
import CB_ProcessinsKindlyWait from '@salesforce/label/c.CB_ProcessinsKindlyWait';
import CB_SaveAsTemplate from '@salesforce/label/c.CB_SaveAsTemplate';
import CB_Page_Transfers from '@salesforce/label/c.CB_Page_Transfers';
import CB_TemplateCreatedSuccessfully from '@salesforce/label/c.CB_TemplateCreatedSuccessfully';



import CONFIRM from '@salesforce/label/c.CB_Confirm';
export default class CBDomesticTransfersConfTrans extends NavigationMixin(LightningElement) {


    label = {
        CONFIRM,
        CB_FromAcctCurrency,
        CB_FromAcctDesc,
        CB_FromAccount,
        CB_BeneficiaryDetailsAccountNo,
        CB_BeneficiaryBankName,
        CB_Fees,
        CB_Fcc,
        CB_BeneficiaryName,
        CB_Fcpt,
        CB_Amount,
        CB_Date,
        CB_Ok,
        CB_Charges,
        CB_Remarks,
        CB_Disclaimer
    };


    // Handler for the current page reference.
    // Initializes component properties based on the state object.
    @wire(CurrentPageReference)
    pageRefHandler({ state }) {
        if (state) {
            this.fromAccountNo = state.fromAccount ? state.fromAccount : ''
            this.date = state.dateSelected ? state.dateSelected : ''
            this.amount = state.amount ? state.amount : ''
            this.benefAccountNo = state.toAccount ? state.toAccount : ''
            this.comments = state.comments ? state.comments : ''

        }
    }



    headerConfguration = {
        previousPageUrl: CB_Page_DomesticTransfers,
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
    disclaimer = this.label.disclaimer

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
        title: CB_SaveAsTemplate,
        message: this.label.CB_TransactionCompleted,
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




    // Method to get the description from the Save As Template modal.
    // Retrieves the value from a textarea element and assigns it to 'saveAsTemplateDesc'.
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
    // Method to handle the authentication process in progress.
    // Updates the 'authenticationPopup' properties to show the loading animation and open the modal.
    authenticationInProgress() {
        this.authenticationPopup.showLoadingAnimation = true
        this.authenticationPopup.openModal = true
        this.authenticationPopup.authenticationStatus = AUTHENTICATION_INPROGRESS_MESSAGE
    }
    // Method to handle successful authentication.
    // Updates the 'authenticationPopup' properties to show the success message and GIF, and then hides the modal after a delay.
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

    // Method to close the Save As Template modal.
    // Hides the modal and navigates to the transfers page.
    closeSavesAsTempModal() {
        this.showModal1 = false
        this.navigateTo(CB_Page_Transfers)
    }
    // Method to handle comments fetched from the modal.
    // Logs the comments and shows the next modal.
    fetchCommentsFromModal(event) {
        console.log(event.detail.comments)
        this.showModal1 = false
        this.showModal2 = true
    }

    handleCancel() {
    }

    // Method to handle the form submission.
    // Initiates the API callout process.
    handleSubmit() {
        this.apiCallout()
    }
    // Method to simulate an API callout.
    // Shows a loading modal and then transitions to the next modal after a delay.
    apiCallout() {
        this.showModal = true
        this.modalConf.isLoading = true
        setTimeout(() => {
            // this.modalConf.isLoading = false
            this.showModal = false
            this.showModal1 = true
        }, 2500)
    }

    // Helper function for navigation to a specified page with optional state data.
    // Uses the NavigationMixin to navigate.
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