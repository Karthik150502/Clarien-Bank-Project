import { LightningElement } from 'lwc';

import { NavigationMixin } from 'lightning/navigation';
import CONTINUE from '@salesforce/label/c.CB_Continue';
import CANCEL from '@salesforce/label/c.CB_Cancel';
export default class CBDomesticTransfers extends NavigationMixin(LightningElement) {

    // Object to hold imported labels
    label = {
        CONTINUE: CONTINUE.toUpperCase(), // Converting "Submit" label to uppercase
        CANCEL: CANCEL.toUpperCase(), // Converting "Cancel" label to uppercase
    };


    headerConfguration = {
        previousPageUrl: 'CBTransfers__c',
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
    selectedBank = 'Select Bank'
    date = 'YYYY-MM-DD'
    name = ''
    currencies = ["BMD", "USD"]
    currency = 'Select Currency'
    untilDate = ''
    frequencySelected = ''
    showTransDatePicker = false
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

    handleName(event) {
        this.name = event.target.value
    }

    handleToAccount(event) {
        this.toAccount = event.target.value
    }

    handleFromAccount(event) {
        this.selectedAccount = event.target.value
    }
    handleCurrency(event) {
        this.currency = event.target.value
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
        return this.selectedAccount === 'Select Account' || this.toAccount === '' || this.selectedBank === 'Select Bank' || this.amount === '' || this.date === 'YYYY-MM-DD' || this.name === '' || this.currency === 'Select Currency'
    }

    handleTransDate(event) {
        this.showTransDatePicker = false
        this.date = event.detail.transDate
        this.untilDate = event.detail.untilDate
        this.frequencySelected = event.detail.frequencySelected
        this.recurringTransfer = event.detail.recurring
    }

    closeTransDatInput() {
        this.showTransDatePicker = false
    }

    openTransDateSelect() {
        this.showTransDatePicker = true
    }





    // Helper function for navigation
    navigateTo(pageApiName, data = {}) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            },
            state: data
        });
    }


    handleCancel() {
        console.log("Cancel Handled...!")
    }
    handleSubmit() {
        let comments = this.template.querySelector(".text-area-inp").value
        let data = {
            fromAccount: this.selectedAccount,
            toAccount: this.toAccount,
            amount: this.amount,
            dateSelected: this.date,
            comments
        }
        console.log(JSON.stringify(data))
        this.navigateTo('CBDomesticTransfersConfTrans__c', data)
    }


}