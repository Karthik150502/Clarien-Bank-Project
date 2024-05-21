import { LightningElement, api } from 'lwc';

import DEPOSIT_AMOUNT from '@salesforce/label/c.CB_DepositAmount';
import DEBIT_AMOUNT from '@salesforce/label/c.CB_DebitAmount';
import PRODUCT from '@salesforce/label/c.CB_Product';
import INTEREST_INSTRUCTIONS from '@salesforce/label/c.CB_InterestInstructions';
import INTEREST_PAYMENT from '@salesforce/label/c.CB_InterestPayment';
import RENEWAL_INSTRUCTIONS from '@salesforce/label/c.CB_RenewalInstructions';
import PRINCIPAL_MATURITY from '@salesforce/label/c.CB_PrincipalMaturity';
import ACCOUNT_OPENING_DATE from '@salesforce/label/c.CB_AccountOpeningDate';
import REMARKS from '@salesforce/label/c.CB_Remarks';
import SUBMIT from '@salesforce/label/c.CB_Submit';

export default class CBResuableAccountOpening extends LightningElement {

    @api type = ' '

    get accountType(){
        return this.type === 'timeDepositAccount'
    }

    label={
        DEPOSIT_AMOUNT,
        ACCOUNT_OPENING_DATE,
        DEBIT_AMOUNT,
        PRODUCT,
        INTEREST_INSTRUCTIONS,
        INTEREST_PAYMENT,
        RENEWAL_INSTRUCTIONS,
        PRINCIPAL_MATURITY,
        REMARKS,
        SUBMIT
    }

    depositAmount = ' '
    duration = ' '
    createDate = ' '
    depitAmount = ' '
    product = ' '
    interestPayment = ' '
    principalMaturity = ' '

    depositAmountHandler(event){
        this.depositAmount = event.target.value;
    }
    get datePlaceHolder() {
        return "DD/MM/YYYY";
    }
    dateHandler(event) {
        this.createDate = event.target.value;
    }
    durationHandler(event){
        this.duration = event.detail;
    }
    debitAmountHandler(event){
        this.depitAmount = event.target.value
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
    remarkHandler(event){
        this.remarks = event.target.value;
    }

    get buttonDisabled(){
        if(this.type === 'timeDepositAccount'){
            return this.depositAmount === ' ' || this.duration === ' ' || this.createDate === ' ' || this.depitAmount === ' ' || this.product === ' ' || this.interestPayment === ' ' || this.principalMaturity === ' '
        }
        else if(this.type === 'topUpAccount'){
            return this.depositAmount === ' ' || this.duration === ' ' || this.createDate === ' ' || this.depitAmount === ' ' || this.principalMaturity === ' '
        }
    }

    submitForm(event){
        event.preventDefault();
        this.dispatchEvent(
            new CustomEvent('customerdetail',{
                detail : {
                    depositAmount : this.depositAmount,
                    duration : this.duration,
                    createDate : this.createDate,
                    depitAmount : this.depitAmount,
                    product : this.product,
                    interestPayment : this.interestPayment,
                    principalMaturity : this.principalMaturity,
                }
            })
        )
        console.log(this.depositAmount,  this.duration, this.createDate,  this.depitAmount, this.product, this.interestPayment,  this.principalMaturity)
    }

}