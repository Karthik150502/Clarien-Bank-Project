import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import SUBMIT from '@salesforce/label/c.CB_Submit';
import CANCEL from '@salesforce/label/c.CB_Cancel';

import {
    removeMobileSessionStorage,
    getAllMobileSessionStorage,
    getMobileSessionStorage,
    setAllMobileSessionStorage
} from 'c/cBUtilities';
export default class CBBillPayments extends NavigationMixin(LightningElement) {
    // Object to hold imported labels
    label = {
        SUBMIT: SUBMIT.toUpperCase(), // Converting "Submit" label to uppercase
        CANCEL: CANCEL.toUpperCase(), // Converting "Cancel" label to uppercase
    };
    headerConfguration = {
        previousPageUrl: 'CBTransfers__c',
        heading: 'Bill Payments',
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        },
        favorite: {
            selected: false
        }
    }


    connectedCallback() {
        if (this.checkSessionStorage('billPmts_valuesRetained')) {
            this.populateValues()
        }
    }

    checkSessionStorage(param) {
        return getMobileSessionStorage(param) !== "null" && getMobileSessionStorage(param)
    }



    accounts = [
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
    ]

    biller = [
        { name: 'John Elder' },
        { name: 'Sebastian Vettel' },
        { name: 'Winston Chruchill' },
        { name: 'Dwyane Johnson' },

    ]

    amount = ''
    dateSelected = ''
    recurringTransfer = false
    accRefNumber = ''
    name = ''
    selectedFromAccount = ''
    selectedBiller = ''
    showTransDatePicker = false
    recurringTransferHandler() {
        this.recurringTransfer = !this.recurringTransfer
    }

    handleAmount(event) {
        this.amount = event.target.value
    }


    handleAccRefNumber(event) {
        this.accRefNumber = event.target.value
    }
    handleBiller(event) {
        this.selectedBiller = event.target.value
    }

    handleFromAccount(event) {
        this.selectedFromAccount = event.target.value
    }
    nameHandler(event) {
        this.name = event.target.value
    }


    handleCancel() {
    }


    handleSubmit() {
        console.log('this.name = ' + this.name)
        console.log('this.accRefNumber = ' + this.accRefNumber)
        console.log('this.date = ' + this.dateSelected)
        console.log('this.amount = ' + this.amount)
        console.log('this.recurringTransfer = ' + this.recurringTransfer)
        console.log('this.selectedFromAccount = ' + this.selectedFromAccount)
        console.log('this.selectedBiller = ' + this.selectedBiller)
        this.retainValues()
        this.navigateTo('CBBillPaymentsConfirmTrans__c')

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


    openDateEntry() {
        this.showTransDatePicker = true
    }

    retainValues() {
        let data = {
            'billPmts_amount': this.amount,
            'billPmts_recurringTransfer': this.recurringTransfer,
            'billPmts_accRefNumber': this.accRefNumber,
            'billPmts_name': this.name,
            'billPmts_selectedFromAccount': this.selectedFromAccount,
            'billPmts_selectedBiller': this.selectedBiller,
            'billPmts_transDate': this.dateSelected,
            'billPmts_valuesRetained': true
        }
        setAllMobileSessionStorage(data)
    }

    populateValues() {
        let result = getAllMobileSessionStorage('billPmts_amount', 'billPmts_recurringTransfer', 'billPmts_accRefNumber', 'billPmts_name', 'billPmts_selectedBiller', 'billPmts_selectedFromAccount', 'billPmts_transDate')
        this.amount = result['billPmts_amount']
        this.recurringTransfer = result['billPmts_recurringTransfer']
        this.accRefNumber = result['billPmts_accRefNumber']
        this.name = result['billPmts_name']
        this.selectedFromAccount = result['billPmts_selectedFromAccount']
        this.selectedBiller = result['billPmts_selectedBiller']
        this.dateSelected = result['billPmts_transDate']
    }

    amount = ''
    dateSelected = ''
    recurringTransfer = false
    accRefNumber = ''
    name = ''
    selectedFromAccount = 'Select Account'
    selectedBiller = 'Select biller'

    get disableSubmit() {
        return this.verifyValues()
    }

    verifyValues() {
        return this.amount === '' || this.dateSelected === '' || this.selectedBiller === 'Select biller' || this.selectedFromAccount === 'Select Account' || this.recurringTransfer && (this.accRefNumber === '' || this.name === '')
    }



    handleTransDate(event) {
        this.showTransDatePicker = false
        this.dateSelected = event.detail.transDate
    }

    closeTransDatInput() {
        this.showTransDatePicker = false
    }

}