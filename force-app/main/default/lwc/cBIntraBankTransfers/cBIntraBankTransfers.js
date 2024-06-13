import { LightningElement } from 'lwc';

import { NavigationMixin } from 'lightning/navigation';
import CONTINUE from '@salesforce/label/c.CB_Continue';
import CANCEL from '@salesforce/label/c.CB_Cancel';

import { setPagePath } from 'c/cBUtilities';

export default class CBIntraBankTransfers extends NavigationMixin(LightningElement) {

    // Object to hold imported labels
    label = {
        CONTINUE: CONTINUE.toUpperCase(), // Converting "Submit" label to uppercase
        CANCEL: CANCEL.toUpperCase(), // Converting "Cancel" label to uppercase
    };

    connectedCallback() {
        this.headerConfguration.previousPageUrl = setPagePath('CBIntraBankTransfers__c')
    }

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
    currency = 'Select Currency'
    currencies = ["BMD", "USD"]
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
            accountNum : 604567894,
            name: 'Jhon',
            accountType : 'Saving',
            status : true
        },
        {
            accountNum : 604567885,
            name: 'Robert',
            accountType : 'Saving',
            status : false
        }
        ,
        {
            accountNum : 604567796,
            name: 'Mike',
            accountType : 'Current',
            status : true
        },
        {
            accountNum : 604567899,
            name: 'Robin',
            accountType : 'Saving',
            status : false
        },
        {
            accountNum : 604567810,
            name: 'Bruce',
            accountType : 'Saving',
            status : false
        }
        ,
        {
            accountNum : 604567711,
            name: 'Donna',
            accountType : 'Current',
            status : true
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

    recurringTransferHandler() {
        this.recurringTransfer = !this.recurringTransfer
    }

    // handleName(event) {
    //     this.name = event.target.value
    // }

    handleAmount(event) {
        this.amount = event.target.value
    }

    handleToAccount(event) {
        this.toAccount = event.target.value
        console.log(this.toAccount);
        for(let i=0;i<this.toAccountsList.length;i++){
            console.log(this.toAccountsList[i].accountNum)
            if(this.toAccountsList[i].accountNum == this.toAccount ){
                console.log(this.toAccountsList[i].name);
                this.name = this.toAccountsList[i].name;
                break;
            }
        }
    }

    handleFromAccount(event) {
        this.selectedAccount = event.target.value
    }

    handleBankSelect(event) {
        this.selectedBank = event.target.value
    }
    handleCurrency(event) {
        this.currency = event.target.value
    }
    dateHandler(event) {
        this.date = event.target.value? event.target.value : 'YYYY-MM-DD'
    }

    handleName(event) {
        this.name = event.target.value
    }

    get disableSubmit() {
        return this.verifyValues()
    }

    verifyValues() {
        return this.selectedAccount === 'Select Account' || this.toAccount === '' || this.currency === 'Select Currency' || this.amount === '' || this.name === '' || this.date ==='YYYY-MM-DD'
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
        this.navigateTo(this.headerConfguration.previousPageUrl)
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