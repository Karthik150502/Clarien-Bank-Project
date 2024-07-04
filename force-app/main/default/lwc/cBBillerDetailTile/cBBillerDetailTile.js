import { LightningElement, api } from 'lwc';
import CBSVG from "@salesforce/resourceUrl/CBSVG" // Importing SVG file from Static Resource


import CB_BillerName from '@salesforce/label/c.CB_BillerName'
import CB_PayeeName from '@salesforce/label/c.CB_PayeeName'
import CB_BillerCategory from '@salesforce/label/c.CB_BillerCategory'
import CB_AccountNo from '@salesforce/label/c.CB_AccountNo'
export default class CBBillerDetailTile extends LightningElement {


    label = {
        CB_BillerName,
        CB_PayeeName,
        CB_BillerCategory,
        CB_AccountNo
    }


    // SVG's from static resource with specific fragment identifiers
    CBBin = `${CBSVG}/CBSVGs/CBBin.svg#CBBin`;
    CBEditIcon = `${CBSVG}/CBSVGs/CBEditIcon.svg#CBEditIcon`;
    // { id: 1, name: "Electric Company", category: "Utilities", accountNo: "684751234567890", payeeName: "John Doe" },
    @api biller = {

    }


    editBiller() {
        let data = {
            id: this.biller.id,
        }
        this.fireCustomEvent('editbiller', data)
    }
    deleteBiller() {
        let data = {
            id: this.biller.id,
        }
        this.fireCustomEvent('deletebiller', data)
    }


    // Fires a custom event with the given text as the detail
    fireCustomEvent(eventName, data = {}) {
        let evt = new CustomEvent(eventName, {
            bubbles: true,
            detail: {
                ...data
            }
        })

        this.dispatchEvent(evt);
    }

}