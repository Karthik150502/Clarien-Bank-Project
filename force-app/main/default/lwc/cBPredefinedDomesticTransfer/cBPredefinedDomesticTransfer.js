import { LightningElement } from 'lwc';

import { NavigationMixin } from 'lightning/navigation';
import SUBMIT from '@salesforce/label/c.CB_Submit';
import CANCEL from '@salesforce/label/c.CB_Cancel';
export default class CBPredefinedDomesticTransfer extends LightningElement {

    // Object to hold imported labels
    label = {
        SUBMIT: SUBMIT.toUpperCase(), // Converting "Submit" label to uppercase
        CANCEL: CANCEL.toUpperCase(), // Converting "Cancel" label to uppercase
    };


    headerConfguration = {
        previousPageUrl: 'CBPredefined__c',
        heading: 'Domestic Transfer',
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
    recurringTransfer = false
    amount = ''
    toAccount = ''
    selectedAccount = 'Select Account'
    selectedBank = ''
    date = 'YYYY-MM-DD'
    name = ''
    currency = 'BMD'
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

    banks = [
        {
            "id": '51561',
            "name": 'Bank of NT Butterfield and Son LTD'
        },
        {
            "id": '51461',
            "name": 'Bank of NT Butterfield and Son LTD'
        },
    ]

    recurringTransferHandler() {
        this.recurringTransfer = !this.recurringTransfer
    }

    handleAmount(event) {
        this.amount = event.target.value
    }

    handleToAccount(event) {
        this.toAccount = event.target.value
    }

    handleFromAccount(event) {
        this.selectedAccount = event.target.value
    }

    handleBankSelect(event) {
        this.selectedBank = event.target.value
    }

    dateHandler(event) {
        this.date = event.target.value !== '' ? event.target.value : 'YYYY-MM-DD'
    }

    handleName(event) {
        this.name = event.target.value
    }


    get disableSubmit() {
        return false
    }
}