import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import SUBMIT from '@salesforce/label/c.CB_Submit';

import QUICKLINKS_PAGE from '@salesforce/label/c.CB_Page_Quicklinks';

import { setPagePath } from 'c/cBUtilities';

export default class CBAdHocPayment extends NavigationMixin(LightningElement) {
    date='YYYY-MM-DD'
    showDateModal = false
    amount = ''
    name=''
    comments=''
    fromAccount=''
    toAccount=''
    configuration = {
        previousPageUrl: 'CBQuickLinks__c',
        heading: 'Ad-hoc payment',
        iconsExposed: false,
        logout: {
            exposed: false
        },  
        search: {
            exposed: false
        }
    }

    connectedCallback(){
        this.configuration.previousPageUrl = setPagePath('CBAdHocPayments__c')
    }

    label = {
        SUBMIT: SUBMIT.toUpperCase(), // Converting "Submit" label to uppercase
    };

    inputLabel={
        fromAccount:'From Account',
        toAccount:'To Account',
        name:'Name',
        amount:'Amount',
        date:'Date',
        comments:'Comments(Optional)'
    };

    accounts = [
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55',
            name:'John'
        },
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55',
            name:'watson'
        },
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55',
            name:'maxwell'
        },
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55',
            name:'rock'
        },
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55',
            name:'walter'
        },
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55',
            name:'merry'
        },
    ]
    toAccountsList = [
        {
            accountNum : 604567894,
            name: 'John',
            accountType : 'Saving',
            status : true
        },
        {
            accountNum : 604567885,
            name: 'Trevon',
            accountType : 'Saving',
            status : false
        }
        ,
        {
            accountNum : 604567796,
            name: 'David',
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
            name: 'Steve',
            accountType : 'Saving',
            status : false
        }
        ,
        {
            accountNum : 604567711,
            name: 'Walter',
            accountType : 'Current',
            status : true
        }
    ]
    handleAmountInput(event) {
        this.amount = event.target.value
    }
    handleToAccount(event) {
        this.toAccount = event.target.value
        for(let i=0;i<this.toAccountsList.length;i++){
            console.log(this.toAccountsList[i].accountNum)
            if(this.toAccountsList[i].accountNum == this.toAccount ){
                console.log(this.toAccountsList[i].name);
                this.name = this.toAccountsList[i].name;
                break;
            }
        }
    }

    handleNameInput(event) {
        this.name = event.target.value
    }
    handleDate(event) {
        this.dateSelected = event.target.value? event.target.value : 'YYYY-MM-DD'
    }
    handleFromAccountInput(event) {
        this.fromAccount = event.target.value

    }
    handletoAccountInput(event) {
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
    handleCommentsInput(event){
        this.comments = event.target.value

    }
    handleSubmit(){
        let data={
            name:this.name,
            fromAccount:this.fromAccount,
            toAccount :this.toAccount,
            amount : this.amount,
            date:this.date,
            fees:'0.01',
            fcpt:'0.02',
            fcc:'0.04'
        }
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'CBAdHocPaymentsConfirmTrans__c'
            },
            state: data
        });
    }
    get disableSubmit() {
        return this.verifyValues()
    }

    verifyValues() {
        console.log(this.amount === '', this.date === 'YYYY-MM-DD',this.toAccount === '', this.fromAccount === 'Select from Account',this.name==='');
        return this.amount === '' || this.date === 'YYYY-MM-DD' || this.toAccount === '' || this.fromAccount === 'Select from Account' ||this.name==='';
    }
   

    navigateBack(){
        this.navigateTo(this.configuration.previousPageUrl)
    }

    navigateTo(pageApiName) {
        console.log('navigate executed')
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            }
        });
    }


    showTransDatePicker = false
    closeTransDatInput() {
        this.showTransDatePicker = false
    }

    openTransDateSelect() {
        this.showTransDatePicker = true
    }

    untilDate = ''
    frequencySelected = ''
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
        }g
    }

    recurringTransfer = false
    recurringTransferHandler() {
        this.recurringTransfer = !this.recurringTransfer
    }
}