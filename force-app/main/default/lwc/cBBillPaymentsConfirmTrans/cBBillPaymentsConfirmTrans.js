import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { CurrentPageReference } from 'lightning/navigation';



import CONTINUE from '@salesforce/label/c.CB_Continue';
import CANCEL from '@salesforce/label/c.CB_Cancel';
import CB_TransactionCompleted from '@salesforce/label/c.CB_TransactionCompleted';
import CB_ProcessingKindlyWait from '@salesforce/label/c.CB_ProcessingKindlyWait';
import CB_SaveAsTemplate from '@salesforce/label/c.CB_SaveAsTemplate';
import CB_TemplateCreatedSuccessfully from '@salesforce/label/c.CB_TemplateCreatedSuccessfully';
import CB_Page_Transfers from '@salesforce/label/c.CB_Page_Transfers';
import CB_Page_BillPayments from '@salesforce/label/c.CB_Page_BillPayments';
import CB_ConfirmTransaction from '@salesforce/label/c.CB_ConfirmTransaction';
import CB_FromAccount from '@salesforce/label/c.CB_FromAccount';
import CB_Biller from '@salesforce/label/c.CB_Biller';
import CB_AcctRefNumber from '@salesforce/label/c.CB_AcctRefNumber';
import CB_CustomerName from '@salesforce/label/c.CB_CustomerName';
import CB_Fees from '@salesforce/label/c.CB_Fees';
import CB_Fcc from '@salesforce/label/c.CB_Fcc';
import CB_Fcpt from '@salesforce/label/c.CB_Fcpt';
import CB_Amount from '@salesforce/label/c.CB_Amount';
import CB_Date from '@salesforce/label/c.CB_Date';
import CB_Ok from '@salesforce/label/c.CB_Ok';
import CB_Disclaimer from '@salesforce/label/c.CB_Disclaimer';



export default class CBBillPaymentsConfirmTrans extends NavigationMixin(LightningElement) {


    // Handler for the current page reference to extract query parameters.
    // Assigns values from the state object to the respective properties.
    @wire(CurrentPageReference)
    pageRefHandler({ state }) {
        this.fromAccount = state.fromAccount ? state.fromAccount : ''
        this.date = state.date ? state.date : ''
        this.amount = state.amount ? state.amount : ''
        this.accRefNo = state.accRefNo ? state.accRefNo : ''
        this.customerName = state.customerName ? state.customerName : ''
        this.biller = state.biller ? state.biller : ''
    }


    label = {
        CONTINUE,
        CANCEL,
        CB_FromAccount,
        CB_Biller,
        CB_AcctRefNumber,
        CB_CustomerName,
        CB_Fees,
        CB_Fcc,
        CB_Fcpt,
        CB_Amount,
        CB_Date,
    };
    headerConfguration = {
        previousPageUrl: CB_Page_BillPayments,
        heading: CB_ConfirmTransaction,
        iconsExposed: false,
    }
    showModal = false
    showModal1 = false
    showModal2 = false


    @track modalConf = {
        title: '',
        message: CB_TransactionCompleted,
        loadingStatusMsg: CB_ProcessingKindlyWait,
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



    fcpt = 'N/A'
    date = 'N/A'
    fcc = 'N/A'
    amount = 'N/A'
    fees = 'N/A'
    customerName = 'N/A'
    accRefNo = 'N/A'
    biller = 'N/A'
    fromAccount = 'N/A'
    disclaimer = CB_Disclaimer



    connectedCallback() {

    }
    // Method to navigate to a specified page.
    // Uses the NavigationMixin to navigate.
    navigateTo(pageApiName) {
        const pageReference = {
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            }
        };
        this[NavigationMixin.Navigate](pageReference);
    }


    // Method to close the "Save as Template" modal and navigate to a specified page.
    closeSavesAsTempModal() {
        this.showModal1 = false
        this.navigateTo("CBTransfers__c")
    }


    // Method to handle the event of fetching comments from the modal.
    // Logs the comments and transitions from the first modal to the second modal.
    fetchCommentsFromModal(event) {
        console.log(event.detail.comments)
        this.showModal1 = false
        this.showModal2 = true
    }


    // Method to handle the form submission.
    // Logs the submission action and calls the apiCallout method.
    handleSubmit() {
        console.log("Submitted...!")
        this.apiCallout()
    }
    // Method to simulate an API callout.
    // Displays the loading modal and transitions to the next modal after a timeout.
    apiCallout() {
        this.showModal = true
        this.modalConf.isLoading = true
        setTimeout(() => {
            this.showModal = false
            this.showModal1 = true
        }, 2500)
    }

    // Method to handle the "Save as Template" action.
    // Logs the action.
    handleSaveAsTemplate() {
        console.log("handleSaveAsTemplate")
    }

    // Method to handle the e-receipt action.
    // Logs the action.
    handleEReceipt() {
        console.log("handleEReceipt")
    }
}