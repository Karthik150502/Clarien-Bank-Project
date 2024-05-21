import { LightningElement, api } from 'lwc';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBCreditCard extends LightningElement {
    creditCardView = true
    hideCardNo = true
    accNo = '4458 5874 9987'

    @api accountNo;

    CBCardRotate = `${CBSVG}/CBSVGs/CBCardRotate.svg#CBCardRotate`;
    CBHideCardNumber = `${CBSVG}/CBSVGs/CBHideCardNumber.svg#CBHideCardNumber`;
    CBShare = `${CBSVG}/CBSVGs/CBShare.svg#CBShare`;

    get style() {
        return this.creditCardView ? 'container front' : 'container back';
    }
    get formattedAccountNo() {
        // Check if accountNo is defined before attempting to format it
        if (this.accountNo) {
            // Format the account number with spaces after every 4 characters
            return this.accountNo.replace(/(.{4})/g, '$1 ');
        } else {
            return ''; // Return empty string if accountNo is undefined
        }
    }

    cardView() {
        this.creditCardView = !this.creditCardView
    }

    showCardNumber() {
        this.hideCardNo = !this.hideCardNo
    }

    get accountNo() {
        if (this.hideCardNo) {
            return '****  ****  ' + this.accNo.slice(10, 14)
        } else {
            return this.accNo
        }
    }
}