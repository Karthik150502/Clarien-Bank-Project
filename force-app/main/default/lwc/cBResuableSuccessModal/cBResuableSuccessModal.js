import { LightningElement, api } from 'lwc';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBResuableSuccessModal extends LightningElement {

    CBReusableModelSuccessfull = `${CBSVG}/CBSVGs/CBReusableModelSuccessfull.svg#CBReusableModelSuccessfull`;

    @api configuration = {
        // title: 'Thank You',
        // message: 'Your Feedback was successfully submitted',
        // isError: true,
        // okButton: {
        //     exposed: true,
        //     label: 'Save',
        //     function: () => {
        //     }
        // },
        // noButton: {
        //     exposed: true,
        //     label: 'Cancel',
        //     function: () => {
        //     }
        // },
        // alertMsg: ''
    }



    // The method that runs when we have some content coming in to the slot
    handleSlotChange() {
        let misallaneous = this.template.querySelector(".misallaneous")
        if (misallaneous) {
            misallaneous.classList.remove("slds-hide")
        }
    }




}