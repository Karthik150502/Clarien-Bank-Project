import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import CURRENCY from '@salesforce/label/c.CBCurrency';
import NEXT from '@salesforce/label/c.CBForgotPassword2_NEXT';
import REMARKS from '@salesforce/label/c.CB_Remarks';
import StartDate from '@salesforce/schema/Contract.StartDate';

export default class CBRequestDraft extends NavigationMixin(LightningElement) {

    label = {
        CURRENCY,
        REMARKS,
        NEXT
    }

    configuration = {
        previousPageUrl: '',
        heading: 'Request a Draft',
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    accountList = [
        {
            accountNo: '6000316231',
            accountType: 'Saving Accounts'
        },
        {
            accountNo: '6000314531',
            accountType: 'Personal Saving Accounts'
        },
        {
            accountNo: '6000452371',
            accountType: 'Personal Saving Accounts'
        }
    ]
    currencyList = ['Select', 'BMD', 'USD']

    accountNum = '';
    accountType = '';
    amount = ''
    currency = ''
    subCurrency = 'USD Local'
    payeeName = ''
    // remark = ''

    accountNumHandler(event) {
        this.accountNum = event.target.value;
        console.log('accountNum', this.accountNum);

        for (let i=0;i<this.accountList.length;i++) {
            if (this.accountList[i].accountNo == this.accountNum) {
                this.accountType =  this.accountList[i].accountType;
                console.log(this.accountType);
                break;
            }
        }
    }
    amountHandler(event) {
        this.amount = event.target.value;
        console.log('Amount', this.amount);
    }
    currencyHandler(event) {
        this.currency = event.target.value;
        console.log('Currency', this.currency);
    }
    payeeNameHandler(event) {
        this.payeeName = event.target.value;
        console.log('Payee Name', this.payeeName);
    }
    // remarkHandler(event) {
    //     this.remark = event.target.value;
    //     console.log(this.remark);
    // }

    get usdCurrencyType() {
        return this.currency == 'USD'
    }
    get submitBtnDisable() {
        return this.accountNum === '' || this.amount === '' || this.currency === '' || this.payeeName === '' || this.accountNum === 'Select' || this.currency === 'Select';
    }
    submitForm(event) {
        event.preventDefault();
        if (this.currency == 'USD') {
            let radios = this.template.querySelectorAll('.subCurrency')
            this.subCurrency = radios[0].checked ? radios[0].value : radios[1].checked ? radios[1].value : ''
        }
        else {
            this.subCurrency = ''
        }
        console.log('accountNum', this.accountNum);
        console.log('Amount', this.amount);
        console.log('Currency', this.currency);
        console.log('subCurrency', this.subCurrency);
        console.log('Payee Name', this.payeeName);
        // console.log('Remark', this.remark)

        this.navigateTo('CBRequestDraftConfirmation__c', { accountNum: this.accountNum, accountType:this.accountType, amount: this.amount, currency: this.currency, payeeName: this.payeeName })
    }

    navigateTo(pageApiName, data) {
        console.log('navigate called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            },
            state: data
        });
    }

}