import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import CURRENCY from '@salesforce/label/c.CBCurrency';
import NEXT from '@salesforce/label/c.CBForgotPassword2_NEXT';
import REMARKS from '@salesforce/label/c.CB_Remarks';
import CB_Amount from '@salesforce/label/c.CB_Amount';
import CB_PayeeName from '@salesforce/label/c.CB_PayeeName';
import CB_USDLocal from '@salesforce/label/c.CB_USDLocal';
import CB_USDInternational from '@salesforce/label/c.CB_USDInternational';
import CB_Refer from '@salesforce/label/c.CB_Refer';
import CB_ForApplicableFees from '@salesforce/label/c.CB_ForApplicableFees';
import CB_FeeSchedule from '@salesforce/label/c.CB_FeeSchedule';
import CB_SelectAccount from '@salesforce/label/c.CB_SelectAccount';
import CB_SelectCurrency from '@salesforce/label/c.CB_SelectCurrency';
import CB_AccountNo from '@salesforce/label/c.CB_AccountNo';
import CB_RequestADraft from '@salesforce/label/c.CB_RequestADraft';

import { getMobileSessionStorage } from 'c/cBUtilities';

export default class CBRequestDraft extends NavigationMixin(LightningElement) {

    label = {
        CURRENCY,
        REMARKS,
        NEXT,
        CB_Amount,
        CB_PayeeName,
        CB_USDLocal,
        CB_USDInternational,
        CB_Refer,
        CB_ForApplicableFees,
        CB_FeeSchedule,
        CB_SelectCurrency,
        CB_SelectAccount,
        CB_AccountNo
    }

    configuration = {
        previousPageUrl: '',
        heading: CB_RequestADraft,
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    connectedCallback() {
        this.setAccountData()
    }

    setAccountData() {
        this.accounts = JSON.parse(getMobileSessionStorage('CB_All_Account_Details')) ? JSON.parse(getMobileSessionStorage('CB_All_Account_Details')) : [];
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
    currencyList = ['BMD', 'USD']

    accountNum = 'Select Account';
    accountType = '';
    amount = ''
    currency = 'Select Currency'
    subCurrency = 'USD Local'
    payeeName = ''
    // remark = ''



    // Handles the account number selection change event
    // Updates the account number and account type based on the selected account
    accountNumHandler(event) {
        this.accountNum = event.target.value;
        console.log('accountNum', this.accountNum);

        for (let i = 0; i < this.accountList.length; i++) {
            if (this.accountList[i].accountNo == this.accountNum) {
                this.accountType = this.accountList[i].accountType;
                console.log(this.accountType);
                break;
            }
        }
    }


    // Handles the amount input change event
    // Updates the amount value based on user input
    amountHandler(event) {
        this.amount = event.target.value;
        console.log('Amount', this.amount);
    }

    // Handles the currency selection change event
    // Updates the currency value based on the selected currency
    currencyHandler(event) {
        this.currency = event.target.value;
        console.log('Currency', this.currency);
    }


    // Handles the payee name input change event
    // Updates the payee name based on user input
    payeeNameHandler(event) {
        this.payeeName = event.target.value;
        console.log('Payee Name', this.payeeName);
    }



    // Getter to check if the selected currency is USD
    get usdCurrencyType() {
        return this.currency == 'USD'
    }

    // Getter to check if the submit button should be disabled
    // Returns true if any of the required fields are not filled or are in default state
    get submitBtnDisable() {
        return this.accountNum === '' || this.amount === '' || this.currency === '' || this.payeeName === '' || this.accountNum === 'Select' || this.currency === 'Select';
    }


    // Handles the form submission event
    // Prevents default form submission, gathers form data, and triggers navigation to the confirmation page
    submitForm(event) {
        event.preventDefault();
        if (this.currency == 'USD') {
            let radios = this.template.querySelectorAll('.subCurrency')
            this.subCurrency = radios[0].checked ? radios[0].value : radios[1].checked ? radios[1].value : ''
        }
        else {
            this.subCurrency = ''
        }

        this.navigateTo('CBRequestDraftConfirmation__c', { accountNum: this.accountNum, accountType: this.accountType, amount: this.amount, currency: this.currency, payeeName: this.payeeName })
    }



    // Navigates to a specified page with provided state data
    // Uses NavigationMixin to perform the navigation
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