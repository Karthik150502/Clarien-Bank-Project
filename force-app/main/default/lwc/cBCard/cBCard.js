import { LightningElement, api } from 'lwc';
import CBSVG from "@salesforce/resourceUrl/CBSVG"

import CB_Next_Interest_Payment_Amount from '@salesforce/label/c.CB_Next_Interest_Payment_Amount';
import CB_Next_Interest_Payment_Date from '@salesforce/label/c.CB_Next_Interest_Payment_Date';
import CB_CurrentBalance from '@salesforce/label/c.CB_CurrentBalance';
import CB_TotalHolds from '@salesforce/label/c.CB_TotalHolds';
import CB_AvailableBalance from '@salesforce/label/c.CB_AvailableBalance';
import CB_Account_Number from '@salesforce/label/c.CB_Account_Number';
import CB_Beneficiary from '@salesforce/label/c.CB_Beneficiary';
import CB_Product_Name from '@salesforce/label/c.CB_Product_Name';
import CB_Maturity_Date from '@salesforce/label/c.CB_Maturity_Date';
import CB_Deposit_StartDate from '@salesforce/label/c.CB_Deposit_StartDate';
import CB_Pending_Balance from '@salesforce/label/c.CB_Pending_Balance';
import CB_Date from '@salesforce/label/c.CB_Date';

import CB_CardExpiryDate from '@salesforce/label/c.CB_CardExpiryDate';
import CB_CardNo from '@salesforce/label/c.CB_CardNo';
import CB_CardStatus from '@salesforce/label/c.CB_CardStatus';


export default class CBCard extends LightningElement {
    // Labels object to hold custom labels.
    label = {
        CB_Next_Interest_Payment_Amount,
        CB_Next_Interest_Payment_Date,
        CB_CurrentBalance,
        CB_TotalHolds,
        CB_AvailableBalance,
        CB_Account_Number,
        CB_Beneficiary,
        CB_Product_Name,
        CB_Maturity_Date,
        CB_Deposit_StartDate,
        CB_Pending_Balance,
        CB_Date,
        CB_CardExpiryDate,
        CB_CardNo,
        CB_CardStatus,
    }

    // @api decorator to make cardType property reactive and public.
    @api cardType = {
        // Sample data for different types of accounts can be uncommented as needed.
    }

    connectedCallback() {
        console.log("CBCard connectedCallback")
        console.log(JSON.stringify(this.cardType))
        this.formatAmountFields()
    }

    formatAmountFields() {
        let acct = { ...this.cardType }
        let allAccountTypes = new Set([
            "CurrentAccount",
            "TimeDepositAccount",
            "SavingsAccount",
            "JointAccount",
            "LoanAccount",
            "CreditAccount"
        ])
        let amountFields = new Set([
            "principalAmount",
            "totalHolds",
            "currentBal",
            "accBal",
            "interestAmount",
            "pendingBal"
        ])
        let cardType = Object.keys(acct).find(item => allAccountTypes.has(item))
        let amountFieldObj = { ...acct[cardType] }
        Object.keys(acct[cardType]).forEach((key) => {
            if (amountFields.has(key)) {
                if (!isNaN(acct[cardType][key])) {
                    amountFieldObj[key] = Number(amountFieldObj[key]).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })
                }
            }
        })
        acct[cardType] = amountFieldObj
        this.cardType = acct
    }

    creditCardView = true // Boolean flag to toggle between front and back view of the card.

    // URLs for various SVG icons.
    CBCardRotate = `${CBSVG}/CBSVGs/CBCardRotate.svg#CBCardRotate`;
    CBHideCardNumber = `${CBSVG}/CBSVGs/CBHideCardNumber.svg#CBHideCardNumber`;
    CBShare = `${CBSVG}/CBSVGs/CBShare.svg#CBShare`;

    // Getter method to return CSS class for styling based on creditCardView state.
    get style() {
        return this.creditCardView ? 'container front' : 'container back';
    }

    // Method to rotate the card to the back view. No parameters. No return value.
    rotateToBack() {
        this.creditCardView = false;
    }

    // Method to rotate the card to the front view. No parameters. No return value.
    rotateToFront() {
        this.creditCardView = true;
    }

    hideCardNo = true; // Boolean flag to toggle card number visibility.

    // Method to toggle the visibility of the card number. No parameters. No return value.
    showCardNumber() {
        this.hideCardNo = !this.hideCardNo;
    }

    // Getter method to return the card number based on hideCardNo state.
    // If hideCardNo is true, return masked card number. Otherwise, return full card number.
    // No parameters.
    // Returns a string representing the card number.
    get cardNumber() {
        if (this.hideCardNo && this.cardType.CreditAccount.cardNum) {
            return '****  ****  ****' + (this.cardType.CreditAccount.cardNum).toString().slice(-4);
        } else {
            return this.cardType.CreditAccount.cardNum;
        }
    }
}