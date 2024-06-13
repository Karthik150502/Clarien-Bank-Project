import { LightningElement, api } from 'lwc';

import DEPOSIT_AMOUNT from '@salesforce/label/c.CB_DepositAmount';
import DEBIT_ACCOUNT from '@salesforce/label/c.CB_Debit_Account';
import PRODUCT from '@salesforce/label/c.CB_Product';
import CURRENCY from '@salesforce/label/c.CBCurrency';
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
        CURRENCY,
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

    @api accountTypes = ''
    @api productList = []
    interestPaymentList = ['Select','Re-invest','Interest']
    principalMaturityList = ['Select','Redeem Proceeds','Renew Maturity amount']

    bankProducts = {
        "Term Deposit": [
          "TD GENERAL AT MAT 365A",
          "TD GENERAL AT MAT 360A",
          "TD GENERAL MONTHLY",
          "TD GENERAL QUARTERLY",
          "TD GENERAL HALF YEARLY",
          "TD GENERAL YEARLY",
          "TD COMMERICAL AT MAT 365A",
          "TD COMMERICAL AT MAT 360A",
          "TD COMMERICAL MONTHLY",
          "TD COMMERCIAL QUARTERLY",
          "TD COMMERICAL HALF YEARLY",
          "TD COMMERICAL YEARLY",
          "TD PREMIUM AT MATURITY",
          "TD PREMIUM MONTHLY",
          "TD PREMIUM QUARTERLY",
          "TD PREMIUM HALF YEARLY",
          "TD PREMIUM YEARLY",
          "TD SUPREME AT MATURITY",
          "TD SUPREME MONTHLY",
          "TD SUPREME QUARTERLY",
          "TD SUPREME HALF YEARLY",
          "TD PREMIUM COM AT MATURITY",
          "TD PREMIUM COM MONTHLY",
          "TD PREMIUM COM QUARTERLY",
          "TD PREMIUM COM HALF YEARLY",
          "TD PREMIUM COM YEARLY"
        ],
        "Top Up Deposit": [
          "PERSONAL 5 YR SAVER",
          "COMMERCIAL 5 YR SAVER",
          "PERSONAL ACCUMULATOR",
          "COMMERCIAL ACCUMULATOR",
          "EMPLOYEE SAVER"
        ],
        "Checking Accounts": [
          "Chequing Account Graduate",
          "Chequing Account (Regular)",
          "Chequing Account Mass",
          "Chequing Account Seniors",
          "Chequing Account Staff",
          "Chequing Account Business",
          "Chequing Account Corporate",
          "Chequing Account Elite",
          "Chequing Account Commerical Call"
        ],
        "Savings Accounts": [
          "SAVINGS IRON KIDS ACCOUNT",
          "SAVINGS RETAIL GRADUATE ACCOUNT",
          "SAVINGS RETAIL REGULAR ACCOUNT",
          "SAVINGS RETAIL MASS AFFLUENT ACCOUNT",
          "SAVINGS SENIOR ACCOUNT",
          "STAFF SAVINGS ACCOUNT",
          "SAVINGS PREMIUM DIAMOND ACCOUNT",
          "35 DAY NOTICE OF WITHDRAWAL SAVINGS",
          "COMMERCIAL BUSINESS OPERATING ACCOUNT",
          "COMMERCIAL CORPORATE OPERATING ACCOUNT",
          "COMMERCIAL ELITE OPERATING ACCOUNT",
          "COMMERCIAL PREMIUM DEMAND ACCOUNT",
          "35 DAY NOTICE OF WITHDRAWAL BUSINESS",
          "35 DAY NOTICE OF WITHDRAWAL CORPORATE",
          "35 DAY NOTICE OF WITHDRAWALELITE"
        ]
      };
      
    getProductsByAccountType(accountType) {
        if (bankProducts[accountType]) {
          return bankProducts[accountType];
        } else {
          return `Account type "${accountType}" not found.`;
        }
      }

      
    depositAccount = ''
    duration = '2Y'
    depitAmount = ''
    currency = 'BMD'
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
        // this.currency= this.depositAccount=='Savings'?'BMD':'USD';
        // return this.depositAccount=='Savings'?'BMD':'USD';
        return 'BMD'
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
            console.log( this.duration === '' || this.depitAmount === '' || this.currency === '' || this.product === '' || this.product === 'Select' || this.interestPayment === 'Select' || this.principalMaturity === 'Select' || this.interestPayment === '' || this.principalMaturity === '' || !this.termsConditionsFlag || !this.conductFlag || !this.marketingConsentFlag)
            return  this.duration === '' || this.depitAmount === '' || this.currency === '' || this.product === '' || this.product === 'Select' || this.interestPayment === 'Select' || this.principalMaturity === 'Select' || this.interestPayment === '' || this.principalMaturity === '' || !this.termsConditionsFlag || !this.conductFlag || !this.marketingConsentFlag
        }
        else if(this.type === 'topUpAccount'){
            console.log( this.duration === '', this.depitAmount === '', this.currency === '', this.principalMaturity === '', !this.termsConditionsFlag, !this.conductFlag, !this.marketingConsentFlag, this.product === 'Select',  this.principalMaturity === 'Select');
            return  this.duration === '' || this.depitAmount === '' || this.currency === '' || this.principalMaturity === '' || !this.termsConditionsFlag || !this.conductFlag || !this.marketingConsentFlag || this.product === 'Select' || this.principalMaturity === 'Select'
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