import { LightningElement, api } from 'lwc';
import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBSavingsAccountCard extends LightningElement {

    creditCardView = true


    CBCardRotate = `${CBSVG}/CBSVGs/CBCardRotate.svg#CBCardRotate`;
    CBHideCardNumber = `${CBSVG}/CBSVGs/CBHideCardNumber.svg#CBHideCardNumber`;
    CBShare = `${CBSVG}/CBSVGs/CBShare.svg#CBShare`;

    @api accDetails = {
        accountNo: 600015474586,
        accBal: 'BMD 5,546.54',
        currentBal: 'BMD 5664.55',
        totalHolds: 'BMD 0.00',
        productName: 'PERSONAL SAVINGS USD',
        beneficiary: 'Mr. Retail Demo',
        date: '7/05/2024',
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
}