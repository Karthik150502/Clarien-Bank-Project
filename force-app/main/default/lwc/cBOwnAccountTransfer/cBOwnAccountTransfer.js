import { LightningElement } from 'lwc';

import { NavigationMixin } from 'lightning/navigation';
import CONTINUE from '@salesforce/label/c.CB_Continue';
import CANCEL from '@salesforce/label/c.CB_Cancel';

export default class CBOwnAccountTransfer extends NavigationMixin(LightningElement) {


    // Object to hold imported labels
    label = {
        CONTINUE: CONTINUE.toUpperCase(), // Converting "Submit" label to uppercase
        CANCEL: CANCEL.toUpperCase(), // Converting "Cancel" label to uppercase
    };


    headerConfguration = {
        previousPageUrl: 'CBPredefined__c',
        heading: 'Own Account Transfer',
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
    date = 'YYYY-MM-DD'
    showTransDatePicker = false
    untilDate = ''
    frequencySelected = ''
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

    handleTransDate(event) {
        this.showTransDatePicker = false
        this.date = event.detail.transDate
        this.untilDate = event.detail.untilDate
        this.frequencySelected = event.detail.frequencySelected

    }

    closeTransDatInput() {
        this.showTransDatePicker = false
    }

    openTransDateSelect() {
        this.showTransDatePicker = true
    }
    get disableSubmit() {
        return this.verifyValues()
    }


    verifyValues() {
        return this.date === 'YYYY-MM-DD' || this.selectedAccount === 'Select Account' || this.toAccount === '' || this.amount === '' || this.untilDate === '' || this.frequencySelected === ''
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
        let comment = this.template.querySelector(".text-area-inp").value
        let data = {
            fromAccount: this.selectedAccount,
            toAccount: this.toAccount,
            amount: this.amount,
            dateSelected: this.date,
            comment
        }
        console.log(JSON.stringify(data))
        this.navigateTo('CBOwnAccountTransferConfTrans__c', data)
    }
}