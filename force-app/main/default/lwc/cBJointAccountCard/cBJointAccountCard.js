import { LightningElement, api } from 'lwc';
import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBJointAccountCard extends LightningElement {

    creditCardView = true


    CBCardRotate = `${CBSVG}/CBSVGs/CBCardRotate.svg#CBCardRotate`;
    CBHideCardNumber = `${CBSVG}/CBSVGs/CBHideCardNumber.svg#CBHideCardNumber`;
    CBShare = `${CBSVG}/CBSVGs/CBShare.svg#CBShare`;

    @api accDetails = {
        accountNo: 6000876590564,
        accBal: 'BMD 9000.00',
        currentBal: 'BMD 9000.00',
        totalHolds: 'BMD 0.00',
        holderName: 'John Due',
        secHolderName: 'Abhraram'
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