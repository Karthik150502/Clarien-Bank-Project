import { LightningElement } from 'lwc';

import { NavigationMixin } from 'lightning/navigation';
import CONTINUE from '@salesforce/label/c.CB_Continue';

import { setPagePath } from 'c/cBUtilities';

export default class CBDomesticTransfers extends NavigationMixin(LightningElement) {

    // Object to hold imported labels
    label = {
        CONTINUE: CONTINUE.toUpperCase(), // Converting "Submit" label to uppercase
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

    connectedCallback() {
        this.headerConfguration.previousPageUrl = setPagePath('CBInbox__c')
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

    toAccountsList = [
        {
            accountNum: 604567894,
            name: 'Kumaran',
            accountType: 'Saving',
            status: true
        },
        {
            accountNum: 604567885,
            name: 'Raju',
            accountType: 'Saving',
            status: false
        }
        ,
        {
            accountNum: 604567796,
            name: 'Rohit',
            accountType: 'Current',
            status: true
        },
        {
            accountNum: 604567899,
            name: 'Robin',
            accountType: 'Saving',
            status: false
        },
        {
            accountNum: 604567810,
            name: 'Kartik',
            accountType: 'Saving',
            status: false
        }
        ,
        {
            accountNum: 604567711,
            name: 'Prateek',
            accountType: 'Current',
            status: true
        }
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

    handleAmount(event) {
        this.amount = event.target.value
    }



    handleToAccount(event) {
        this.toAccount = event.target.value
        console.log(this.toAccount);
        for (let i = 0; i < this.toAccountsList.length; i++) {
            console.log(this.toAccountsList[i].accountNum)
            if (this.toAccountsList[i].accountNum == this.toAccount) {
                console.log(this.toAccountsList[i].name);
                this.name = this.toAccountsList[i].name;
                break;
            }
        }
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

        return this.selectedAccount === 'Select Account' || this.toAccount === 'Select Account' || this.selectedBank === 'Select Bank' || this.amount === '' || this.date === 'YYYY-MM-DD' || this.name === '' || this.currency === 'Select Currency'
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