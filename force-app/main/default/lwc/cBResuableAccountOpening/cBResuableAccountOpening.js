import { LightningElement, api } from 'lwc';

import DEPOSIT_AMOUNT from '@salesforce/label/c.CB_DepositAmount';
import DEBIT_ACCOUNT from '@salesforce/label/c.CB_Debit_Account';
import PRODUCT from '@salesforce/label/c.CB_Product';
import INTEREST_INSTRUCTIONS from '@salesforce/label/c.CB_InterestInstructions';
import INTEREST_PAYMENT from '@salesforce/label/c.CB_InterestPayment';
import RENEWAL_INSTRUCTIONS from '@salesforce/label/c.CB_RenewalInstructions';
import PRINCIPAL_MATURITY from '@salesforce/label/c.CB_PrincipalMaturity';
import ACCOUNT_OPENING_DATE from '@salesforce/label/c.CB_AccountOpeningDate';
import REMARKS from '@salesforce/label/c.CB_Remarks';
import SUBMIT from '@salesforce/label/c.CB_Submit';

export default class CBResuableAccountOpening extends LightningElement {

    @api type = ''

    get accountType(){
        return this.type === 'timeDepositAccount'
    }

    label={
        DEPOSIT_AMOUNT,
        ACCOUNT_OPENING_DATE,
        DEBIT_ACCOUNT,
        PRODUCT,
        INTEREST_INSTRUCTIONS,
        INTEREST_PAYMENT,
        RENEWAL_INSTRUCTIONS,
        PRINCIPAL_MATURITY,
        REMARKS,
        SUBMIT
    }

    accountTypes = ['Select','Savings','Current']
    productList = ['Select','Product-1','Product-2']
    interestPaymentList = ['Select','interestPayment-1','interestPayment-2']
    principalMaturityList = ['Select','Fixed Deposit','Savings Account']

    depositAccount = this.accountTypes[0]
    duration = '2Y'
    depitAmount = ''
    currency = ''
    product = ''
    interestPayment = ''
    principalMaturity = ''

    depositAccountHandler(event){
        this.depositAccount = event.target.value;
    }
    // durationHandler(event){
    //     this.duration = event.detail;
    // }
    debitAmountHandler(event){
        this.depitAmount = event.target.value
        console.log(this.depitAmount);
    }
    get currencyHandler(){
        this.currency= this.depositAccount=='Savings'?'BMD':'USD';
        return this.depositAccount=='Savings'?'BMD':'USD';
    }
    productHandler(event){
        this.product = event.target.value
    }
    interestPaymentHandler(event){
        this.interestPayment = event.target.value
    }
    principalMaturityHandler(event){
        this.principalMaturity = event.target.value
    }

    termsConditionsFlag = false
    termsConditions(){
        this.termsConditionsFlag = !this.termsConditionsFlag
    }
    conductFlag = false
    conduct(){
        this.conductFlag = !this.conductFlag
    }
    marketingConsentFlag = false
    marketingConsent(){
        this.marketingConsentFlag = !this.marketingConsentFlag
    }

    get buttonDisabled(){
        if(this.type === 'timeDepositAccount'){
            console.log('Acc Type',this.type);
            console.log(this.depositAccount === ''||this.depositAccount === 'Select' || this.duration === '' || this.depitAmount === '' || this.currency === '' || this.product === '' || this.product === 'Select' || this.interestPayment === 'Select' || this.principalMaturity === 'Select' || this.interestPayment === '' || this.principalMaturity === '' || !this.termsConditionsFlag || !this.conductFlag || !this.marketingConsentFlag)
            return this.depositAccount === ''||this.depositAccount === 'Select' || this.duration === '' || this.depitAmount === '' || this.currency === '' || this.product === '' || this.product === 'Select' || this.interestPayment === 'Select' || this.principalMaturity === 'Select' || this.interestPayment === '' || this.principalMaturity === '' || !this.termsConditionsFlag || !this.conductFlag || !this.marketingConsentFlag
        }
        else if(this.type === 'topUpAccount'){
            console.log(this.depositAccount === '', this.duration === '', this.depitAmount === '', this.currency === '', this.principalMaturity === '', !this.termsConditionsFlag, !this.conductFlag, !this.marketingConsentFlag, this.product === 'Select', this.depositAccount === 'Select', this.principalMaturity === 'Select');
            return this.depositAccount === '' || this.duration === '' || this.depitAmount === '' || this.currency === '' || this.principalMaturity === '' || !this.termsConditionsFlag || !this.conductFlag || !this.marketingConsentFlag || this.product === 'Select' || this.depositAccount === 'Select' || this.principalMaturity === 'Select'
        }
    }


    submitForm(event){
        event.preventDefault();
        this.dispatchEvent(
            new CustomEvent('customerdetail',{
                detail : {
                    depositAmount : this.depositAmount,
                    duration : this.duration,
                    currency : this.currency,
                    depitAmount : this.depitAmount,
                    product : this.product,
                    interestPayment : this.interestPayment,
                    principalMaturity : this.principalMaturity,
                }
            })
        )
    }

}