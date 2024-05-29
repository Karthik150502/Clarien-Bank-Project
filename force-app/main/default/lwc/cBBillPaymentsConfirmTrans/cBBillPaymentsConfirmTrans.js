import { LightningElement } from 'lwc';
import CONTINUE from '@salesforce/label/c.CB_Continue';
import CANCEL from '@salesforce/label/c.CB_Cancel';
import {
    removeMobileSessionStorage,
    getAllMobileSessionStorage,
    getMobileSessionStorage,
} from 'c/cBUtilities';
export default class CBBillPaymentsConfirmTrans extends LightningElement {

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
    modalconf = {
        title: 'Transfer Successful',
        message: '',
        okButton: {
            exposed: true,
            label: 'SAVE',
            function: () => {
                this.showModal = false
                this.removeAllSessionStorageData()
            }
        },
        noButton: {
            exposed: true,
            label: 'CLOSE',
            function: () => {
                this.showModal = false
            }
        },
        alertMsg: ''
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

    populateValues() {
        let result = getAllMobileSessionStorage('billPmts_amount', 'billPmts_recurringTransfer', 'billPmts_accRefNumber', 'billPmts_name', 'billPmts_selectedBiller', 'billPmts_selectedFromAccount',
            'transDate', 'recurring', 'frequencySelected', 'untilDate')
        this.amount = result['billPmts_amount']
        this.date = result['transDate']
        this.accRefNo = result['billPmts_accRefNumber']
        this.customerName = result['billPmts_name']
        this.fromAccount = result['billPmts_selectedFromAccount']
        this.biller = result['billPmts_selectedBiller']
    }



    handleCancel() {
        this.removeAllSessionStorageData()
    }


    handleSubmit() {
        console.log("Submitted...!")
        this.showModal = true
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