import { LightningElement, api } from 'lwc';
import REMARKS from '@salesforce/label/c.CB_Remarks'

export default class CBRemarks extends LightningElement {
    label = {
        REMARKS
    }
    leng = 0
    @api labelname = ''
    @api length = 50
    @api placeholder = ''
    remarks = ''



    // Handles changes to the remarks input field
    remarksHandler(event) {
        this.remarks = event.target.value
        this.leng = this.remarks.length
        this.fireCustomEvent(this.remarks)
    }


    // Fires a custom event with the given text as the detail
    fireCustomEvent(text) {
        let evt = new CustomEvent('remarks', {
            bubbles: true,
            detail: {
                remarks: text
            }
        })

        this.dispatchEvent(evt);
    }
}