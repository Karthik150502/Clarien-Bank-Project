import { LightningElement, wire, track } from 'lwc';

import { CurrentPageReference } from 'lightning/navigation';
import { NavigationMixin } from 'lightning/navigation';



import CB_Date from '@salesforce/label/c.CB_Date';
import CB_Amount from '@salesforce/label/c.CB_Amount';
import CB_Fcpt from '@salesforce/label/c.CB_Fcpt';
import CB_Fcc from '@salesforce/label/c.CB_Fcc';
import CB_Fees from '@salesforce/label/c.CB_Fees';
import CB_BeneficiaryDetailsAccountNo from '@salesforce/label/c.CB_BeneficiaryDetailsAccountNo';
import CB_BeneficiaryBankName from '@salesforce/label/c.CB_BeneficiaryBankName';
import CB_BankCode from '@salesforce/label/c.CB_BankCode';
import CB_DebitAcctCurrency from '@salesforce/label/c.CB_DebitAcctCurrency';
import CB_DebitAcctDesc from '@salesforce/label/c.CB_DebitAcctDesc';
import CB_DebitAcctNo from '@salesforce/label/c.CB_DebitAcctNo';
import CB_BenefCity from '@salesforce/label/c.CB_BenefCity';
import CB_PurposeOfPayments from '@salesforce/label/c.CB_PurposeOfPayments';
import CONFIRM from '@salesforce/label/c.CB_Confirm';



import CB_Ok from '@salesforce/label/c.CB_Ok';
import CB_Page_Transfers from '@salesforce/label/c.CB_Page_Transfers';
import CB_Page_InternationalTransfers from '@salesforce/label/c.CB_Page_InternationalTransfers';
import CB_TransactionCompleted from '@salesforce/label/c.CB_TransactionCompleted';
import CB_ProcessinsKindlyWait from '@salesforce/label/c.CB_ProcessinsKindlyWait';
import CB_SaveAsTemplate from '@salesforce/label/c.CB_SaveAsTemplate';
import CB_TemplateCreatedSuccessfully from '@salesforce/label/c.CB_TemplateCreatedSuccessfully';
import CB_ConfirmTransaction from '@salesforce/label/c.CB_ConfirmTransaction';
import CB_Disclaimer from '@salesforce/label/c.CB_Disclaimer';


export default class CBInternationalTransfersConfirmation extends NavigationMixin(LightningElement) {


    // Handles the page reference state to set various parameters
    @wire(CurrentPageReference)
    pageRefHandler({ state }) {
        console.log('state : ', JSON.stringify(state))
        this.fromAccountNo = state.fromAccount ? state.fromAccount : ''
        this.date = state.date ? state.date : ''
        this.amount = state.amount ? state.amount : ''
        this.benefAccountNo = state.beneficiaryAccount ? state.beneficiaryAccount : ''
        this.benefBankName = state.beneficiaryBankName ? state.beneficiaryBankName : ''
        this.benefCity = state.beneficiaryCity ? state.beneficiaryCity : ''
        this.comments = state.purpose ? state.purpose : ''
        this.benefCode = state.bankCode ? state.bankCode : ''
    }



    label = {
        CONFIRM,
        CB_Date,
        CB_Amount,
        CB_Fcpt,
        CB_Fcc,
        CB_Fees,
        CB_BeneficiaryDetailsAccountNo,
        CB_BeneficiaryBankName,
        CB_BankCode,
        CB_DebitAcctCurrency,
        CB_DebitAcctDesc,
        CB_DebitAcctNo,
        CB_BenefCity,
        CB_PurposeOfPayments
    };
    headerConfguration = {
        previousPageUrl: CB_Page_InternationalTransfers,
        heading: CB_ConfirmTransaction,
        iconsExposed: false,
    }



    fromAccountNo = 'N/A'
    fromAccountDesc = 'Non Personal Checking USD'
    fromAccountCurrency = 'USD'
    benefAccountNo = 'N/A'
    fees = 'N/A'
    benefBankName = 'N/A'
    benefCity = 'N/A'
    benefCode = 'N/A'
    fcc = 'N/A'
    benefName = 'N/A'
    fcpt = 'N/A'
    amount = 'N/A'
    date = 'N/A'
    comments = 'N/A'
    charges = 'N/A'
    disclaimer = CB_Disclaimer







    // Retrieves the description entered in the save as template modal
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


    // Executes when the component is inserted into the DOM
    connectedCallback() {

    }



    // Handles the cancel action
    handleCancel() {
    }



    // Handles the form submission and triggers the API callout
    handleSubmit() {
        this.apiCallout()
    }

    // Helper function for navigation to a specified page
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



    // Makes an API callout and shows the loading modal, then proceeds to the next modal after a delay
    apiCallout() {
        this.showModal = true
        setTimeout(() => {
            // this.modalConf.isLoading = false
            this.showModal = false
            this.showModal1 = true
        }, 2500)
    }



    // Closes the save as template modal and navigates back to the transfers page
    closeSavesAsTempModal() {
        this.showModal1 = false
        this.navigateTo(CB_Page_Transfers)
    }



    // Fetches comments from the modal and proceeds to the next modal
    fetchCommentsFromModal(event) {
        console.log(event.detail.comments)
        this.showModal1 = false
        this.showModal2 = true
    }


}