import { LightningElement, track } from 'lwc';
import CONTINUE from '@salesforce/label/c.CB_Continue';
import { NavigationMixin } from 'lightning/navigation';

import CANCEL from '@salesforce/label/c.CB_Cancel';
import {
    removeMobileSessionStorage,
    getAllMobileSessionStorage,
    getMobileSessionStorage,
} from 'c/cBUtilities';
export default class CBBillPaymentsConfirmTrans extends NavigationMixin(LightningElement) {

    label = {
        CONTINUE: CONTINUE.toUpperCase(), // Converting "Submit" label to uppercase
        CANCEL: CANCEL.toUpperCase(), // Converting "Cancel" label to uppercase
    };
    headerConfguration = {
        previousPageUrl: 'CBBillPayments__c',
        heading: 'Confirm Transaction',
        iconsExposed: false,
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
                this.removeAllSessionStorageData()
                this.navigateTo("CBTransfers__c")
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
    disclaimer = 'Please be advised that payments that are not scheduled within the bank\'s normal business hours will not be processed until the next business date.'



    connectedCallback() {
        this.populateValues()

    }

    navigateTo(pageApiName) {
        const pageReference = {
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            }
        };
        this[NavigationMixin.Navigate](pageReference);
    }


    populateValues() {
        let result = getAllMobileSessionStorage('billPmts_amount', 'billPmts_recurringTransfer', 'billPmts_accRefNumber', 'billPmts_name', 'billPmts_selectedBiller', 'billPmts_selectedFromAccount',
            'billPmts_transDate', 'recurring', 'frequencySelected', 'untilDate')
        this.amount = result['billPmts_amount']
        this.date = result['billPmts_transDate']
        this.accRefNo = result['billPmts_accRefNumber']
        this.customerName = result['billPmts_name']
        this.fromAccount = result['billPmts_selectedFromAccount']
        this.biller = result['billPmts_selectedBiller']
    }

    closeSavesAsTempModal() {
        this.showModal1 = false
        this.removeAllSessionStorageData()
        this.navigateTo("CBTransfers__c")
    }

    fetchCommentsFromModal(event) {
        console.log(event.detail.comments)
        this.showModal1 = false
        this.showModal2 = true
        this.removeAllSessionStorageData()
    }

    handleCancel() {
        this.removeAllSessionStorageData()
    }


    handleSubmit() {
        console.log("Submitted...!")
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

    get disableSubmit() {

    }


    removeAllSessionStorageData() {
        removeMobileSessionStorage('transDate', 'recurring', 'frequencySelected', 'untilDate', 'billPaymentsTransDate', 'billPmts_amount', 'billPmts_recurringTransfer', 'billPmts_accRefNumber', 'billPmts_name', 'billPmts_selectedBiller', 'billPmts_selectedFromAccount', 'billPmts_valuesRetained')
    }


    handleSaveAsTemplate() {
        console.log("handleSaveAsTemplate")
    }


    handleEReceipt() {
        console.log("handleEReceipt")
    }
}