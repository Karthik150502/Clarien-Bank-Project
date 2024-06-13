import { LightningElement } from 'lwc';

import { NavigationMixin } from 'lightning/navigation';
import CONTINUE from '@salesforce/label/c.CB_Continue';

import { setPagePath } from 'c/cBUtilities';

export default class CBOwnAccountTransfer extends NavigationMixin(LightningElement) {


    // Object to hold imported labels
    label = {
        CONTINUE: CONTINUE.toUpperCase(), // Converting "Submit" label to uppercase
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

    connectedCallback(){
        this.headerConfguration.previousPageUrl = setPagePath('CBOwnAccountTransfer__c')
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
            accountNo: '659855541255',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855000054',
            accountType: 'Joint Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '651235641254',
            accountType: 'Time Deposit Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '709945651354',
            accountType: 'Current Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
    ]


    toAccountsList = [
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855541255',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855000054',
            accountType: 'Joint Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '651235641254',
            accountType: 'Time Deposit Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '709945651354',
            accountType: 'Current Account',
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

    handleToAccount(event) {
        this.toAccount = event.target.value
        console.log(this.toAccount);
    }

    handleFromAccount(event) {
        this.selectedAccount = event.target.value

        this.toAccountsList = this.accounts.filter(account => account.accountNo !== this.selectedAccount)
    }

    recurringTransferView = false
    handleTransDate(event) {
        this.showTransDatePicker = false
        this.date = event.detail.transDate

        if(event.detail.recurring){
            this.untilDate = event.detail.untilDate
            this.frequencySelected = event.detail.frequencySelected != 'End of every month' ? `Every ${event.detail.repeat} ${event.detail.frequencySelected} `: 'End of every month';
            this.recurringTransfer = event.detail.recurring
            this.recurringTransferView = true
        }
        else{
            this.recurringTransferView = false
        }
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
        return this.date === 'YYYY-MM-DD' || this.selectedAccount === 'Select Account' || this.toAccount === 'Select Account' || this.amount === ''
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