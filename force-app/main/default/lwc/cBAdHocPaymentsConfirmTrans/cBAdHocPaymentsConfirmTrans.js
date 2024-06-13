import { LightningElement , wire, track} from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';

import CONTINUE from '@salesforce/label/c.CB_Continue';

export default class CBAdHocPaymentsConfirmTrans extends NavigationMixin(LightningElement) {

    @wire(CurrentPageReference) pageRef;

    label = {
        CONTINUE: CONTINUE.toUpperCase(), // Converting "Submit" label to uppercase
    };
    headerConfguration = {
        previousPageUrl: 'CBAdHocPayments__c',
        heading: 'Confirm Transaction',
        iconsExposed: false,
    }
    


    fcpt = 'N/A'
    date = 'N/A'
    fcc = 'N/A'
    amount = 'N/A'
    fees = 'N/A'
    customerName = 'N/A'
    accRefNo = 'N/A'
    fromAccount = 'N/A'
    toAccount = 'N/A'
    disclaimer = 'Please be advised that payments that are not scheduled within the bank\'s normal business hours will not be processed until the next business date.'



    connectedCallback() {
        this.populateValues()
    }

    populateValues() {
        const state = this.pageRef?.state;
        if (state) {
            this.customerName = state.name || this.customerName;
            this.fromAccount = state.fromAccount || this.fromAccount;
            this.toAccount = state.toAccount || this.toAccount;
            this.amount = state.amount || this.amount
            this.date = state.date || this.date;
            this.fees = state.fees || this.fees;
            this.fcpt = state.fcpt || this.fcpt;
            this.fcc = state.fcc || this.fcc;
        }
    }


    handleSubmit() {
        this.apiCallout();
    }

    get disableSubmit() {

    }

    handleSaveAsTemplate() {
        console.log("handleSaveAsTemplate")
    }

    handleEReceipt() {
        console.log("handleEReceipt")
    }
    
    @wire(CurrentPageReference)
    handlePageReferenceChange(pageRef) {
        this.populateValues();
    }
    navigateBack(){
        this.navigateTo('CBAdHocPayments__c')
    }

    navigateTo(pageApiName) {
        console.log('navigate executed')
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            }
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