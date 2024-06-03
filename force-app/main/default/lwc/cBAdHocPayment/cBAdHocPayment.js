import { LightningElement } from 'lwc';
import SUBMIT from '@salesforce/label/c.CB_Submit';
import CANCEL from '@salesforce/label/c.CB_Cancel';
import { NavigationMixin } from 'lightning/navigation';

export default class CBAdHocPayment extends NavigationMixin(LightningElement) {
    dateSelected=''
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
    label = {
        SUBMIT: SUBMIT.toUpperCase(), // Converting "Submit" label to uppercase
        CANCEL: CANCEL.toUpperCase(), // Converting "Cancel" label to uppercase
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
    
    handleAmountInput(event) {
        this.amount = event.target.value
    }
    
    handleNameInput(event) {
        this.name = event.target.value
    }
    handleDate(event) {
        this.dateSelected = event.target.value
    }
    handleFromAccountInput(event) {
        this.fromAccount = event.target.value

    }
    handletoAccountInput(event) {
        this.toAccount = event.target.value
    }
    handleCommentsInput(event){
        this.comments = event.target.value

    }
    handleSubmit(){
        let data={
            name:this.name,
            fromAccount:this.fromAccount,
            toAccount :this.toAccount,
            date:this.dateSelected,
            fees:'0.01',
            fcpt:'0.02',
            fcc:'0.04',
            date:this.dateSelected
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
        return this.amount === '' || this.dateSelected === '' || this.toAccount === '' || this.fromAccount === 'Select from Account' ||this.name==='';
    }
   
    closeTransDatInput() {
        this.showTransDatePicker = false
    }
}