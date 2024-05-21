import { LightningElement, api } from 'lwc';
import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBLoanAccountCard extends LightningElement {

    creditCardView = true


    CBCardRotate = `${CBSVG}/CBSVGs/CBCardRotate.svg#CBCardRotate`;
    CBHideCardNumber = `${CBSVG}/CBSVGs/CBHideCardNumber.svg#CBHideCardNumber`;
    CBShare = `${CBSVG}/CBSVGs/CBShare.svg#CBShare`;

    @api accDetails = {
        accountNo: 6000154360,
        accBal: 'BMD 201,210.21',
        interestAmount: 'BMD 602.00',
        interestDate: '11/12/24',
        productName: 'Cash Secured BMD-Regular',
        beneficiary: 'John LTD Demo',
        date: '11/12/2024',
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