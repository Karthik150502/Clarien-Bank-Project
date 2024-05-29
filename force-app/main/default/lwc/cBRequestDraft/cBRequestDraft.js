import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import CURRENCY from '@salesforce/label/c.CBCurrency';
import SUBMIT from '@salesforce/label/c.CBChangePassword_submit';
import REMARKS from '@salesforce/label/c.CB_Remarks';
import StartDate from '@salesforce/schema/Contract.StartDate';

export default class CBRequestDraft extends NavigationMixin(LightningElement) {

    label = {
        CURRENCY,
        REMARKS,
        SUBMIT
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

    accountNum = this.accountList[0].accountNo;
    amount = ''
    currency = 'BMD'
    subCurrency = 'USD Local'
    payeeName = ''
    // remark = ''
    accountNumHandler(event) {
        this.accountNum = event.target.value;
        console.log('accountNum', this.accountNum);
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
        return this.accountNum === '' || this.amount === '' || this.currency === '' || this.payeeName === '';
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

        this.navigateBack()
    }

    navigateBack() {
        console.log('navigate called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'CBRequestDraftConfirmation__c'
            }
        });
    }

}