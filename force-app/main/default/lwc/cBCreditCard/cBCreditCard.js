import { LightningElement, api } from 'lwc';
import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBCreditCard extends LightningElement {

    creditCardView = true


    CBCardRotate = `${CBSVG}/CBSVGs/CBCardRotate.svg#CBCardRotate`;
    CBHideCardNumber = `${CBSVG}/CBSVGs/CBHideCardNumber.svg#CBHideCardNumber`;
    CBShare = `${CBSVG}/CBSVGs/CBShare.svg#CBShare`;

    @api accDetails = {
        cardNum: 600015474586,
        accBal: 'BMD 10,000.00',
        currentBal: 'BMD 10,000.00',
        pendingBal: 'BMD 8000.00',
        cardExpiryDate : '06/27',
        productName: 'PLATINUM CREDIT CARD',
        cardStatus: 'Active'
    }



    get style() {
        return this.creditCardView ? 'container front' : 'container back';
    }


    rotateToBack() {
        this.creditCardView = false;
    }

    rotateToFront() {
        this.creditCardView = true;
    }

    hideCardNo = true;

    showCardNumber() {
        this.hideCardNo = !this.hideCardNo
    }

    get cardNumber() {
        if (this.hideCardNo && this.accDetails.cardNum) {
            return '****  ****  ' + (this.accDetails.cardNum).toString().slice(-4)
        } else {
            return this.accDetails.cardNum
        }
    }
}