import { LightningElement } from 'lwc';

import { NavigationMixin } from 'lightning/navigation';
import CONTINUE from '@salesforce/label/c.CB_Continue';
import CANCEL from '@salesforce/label/c.CB_Cancel';
export default class CBIntraBankTransfers extends NavigationMixin(LightningElement) {

    // Object to hold imported labels
    label = {
        CONTINUE: CONTINUE.toUpperCase(), // Converting "Submit" label to uppercase
        CANCEL: CANCEL.toUpperCase(), // Converting "Cancel" label to uppercase
    };


    headerConfguration = {
        previousPageUrl: 'CBTransfers__c',
        heading: 'Intra Bank Transfer',
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
    currency = 'BMD'
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

    handleName(event) {
        this.name = event.target.value
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
        return this.verifyValues()
    }

    verifyValues() {
        return this.selectedAccount === 'Select Account' || this.toAccount === '' || this.amount === '' || this.name === ''
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
        console.log('Navigation Called');
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
        this.navigateTo('CBTransfers__c')
    }
    handleSubmit() {
        let comment = this.template.querySelector(".text-area-inp").value
        let data = {
            fromAccount: this.selectedAccount,
            toAccount: this.toAccount,
            name:this.name,
            amount: this.amount,
            dateSelected: this.date,
            currency: this.currency,
            comment
        }
        console.log(JSON.stringify(data))
        this.navigateTo('CBIntraBankTransfersConfirmation__c', data)
    }


}