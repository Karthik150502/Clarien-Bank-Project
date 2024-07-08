import { LightningElement } from 'lwc';

import { NavigationMixin } from 'lightning/navigation';
import CONTINUE from '@salesforce/label/c.CB_Continue';
import CANCEL from '@salesforce/label/c.CB_Cancel';

export default class CBQrTransaction extends NavigationMixin(LightningElement) {


    // Object to hold imported labels
    label = {
        CONTINUE: CONTINUE.toUpperCase(), // Converting "Submit" label to uppercase
        CANCEL: CANCEL.toUpperCase(), // Converting "Cancel" label to uppercase
    };


    headerConfguration = {
        previousPageUrl: '',
        heading: 'QR Code Transaction',
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

    amount = ''
    toAccount = ''
    currencies = ["USD", "BMD"]
    selectedAccount = 'Select Account'
    date = 'YYYY-MM-DD'
    name = ''
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

    handleAmount(event) {
        this.amount = event.target.value
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

    handleDate(event) {
        this.date = event.target.value
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
        return false
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
            name: this.name,
            comment
        }
        console.log(JSON.stringify(data))
        this.navigateTo('CBQrConfTrans__c', data)
    }


}