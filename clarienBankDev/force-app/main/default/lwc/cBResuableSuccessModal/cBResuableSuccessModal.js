import { LightningElement, api } from 'lwc';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBResuableSuccessModal extends LightningElement {

    CBReusableModelSuccessfull = `${CBSVG}/CBSVGs/CBReusableModelSuccessfull.svg#CBReusableModelSuccessfull`;

    @api configuration = {
        // title: 'Thank You',
        // message: 'Your Feedback was successfully submitted',
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






}