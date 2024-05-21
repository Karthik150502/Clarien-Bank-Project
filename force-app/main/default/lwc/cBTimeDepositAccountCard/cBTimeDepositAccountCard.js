import { LightningElement, api } from 'lwc';
import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBTimeDepositAccountCard extends LightningElement {

    creditCardView = true


    CBCardRotate = `${CBSVG}/CBSVGs/CBCardRotate.svg#CBCardRotate`;
    CBHideCardNumber = `${CBSVG}/CBSVGs/CBHideCardNumber.svg#CBHideCardNumber`;
    CBShare = `${CBSVG}/CBSVGs/CBShare.svg#CBShare`;

    @api accDetails = {
        accountNo: 600017725563,
        accBal: 'BMD 5,585.54',
        currentBal: 'BMD 5,585.54',
        totalHolds: 'BMD 0.00',
        principalAmount: 'BMD 10,000.0',
        depositStartDate: '12/12/2023',
        maturityDate: '13/12/2025',
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