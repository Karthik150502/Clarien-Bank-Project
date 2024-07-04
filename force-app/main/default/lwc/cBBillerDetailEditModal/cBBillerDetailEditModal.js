import { LightningElement, api } from 'lwc';
import CBSVG from "@salesforce/resourceUrl/CBSVG"

import CB_EditBiller from '@salesforce/label/c.CB_EditBiller'


import CB_BillerName from '@salesforce/label/c.CB_BillerName'
import CB_PayeeName from '@salesforce/label/c.CB_PayeeName'
import CB_BillerCategory from '@salesforce/label/c.CB_BillerCategory'
import CB_AccountNo from '@salesforce/label/c.CB_AccountNo'
import CB_Done from '@salesforce/label/c.CB_Done'
export default class CBBillerDetailEditModal extends LightningElement {



    label = {
        CB_EditBiller,
        CB_BillerName,
        CB_PayeeName,
        CB_BillerCategory,
        CB_AccountNo,
        CB_Done
    }

    @api billerDetails = {}

    payeeName

    connectedCallback() {
        this.payeeName = this.billerDetails.payeeName
    }

    CBBackIcon = `${CBSVG}/CBSVGs/CBBackIcon.svg#CBBackIcon`;


    closeModal() {
        this.fireCustomEvent('closemodal')
    }


    // Fires a custom event with the given text as the detail
    fireCustomEvent(eventName, data = {}) {
        let evt = new CustomEvent(eventName, {
            bubbles: true,
            detail: {
                data
            }
        })

        this.dispatchEvent(evt);
    }


    updateBiller() {
        let data = {
            ...this.billerDetails,
            payeeName: this.payeeName
        }

        this.fireCustomEvent('closemodal', data)
    }


    handlePayeeName(event) {
        this.payeeName = event.target.value
    }

}