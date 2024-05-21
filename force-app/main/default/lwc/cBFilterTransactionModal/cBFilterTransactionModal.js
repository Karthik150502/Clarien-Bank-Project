import { LightningElement } from 'lwc';

// Import CBSVG from "@salesforce/resourceUrl/profileLayoutTemplateSVG";
import CBSVG from "@salesforce/resourceUrl/CBSVG";

import DONE from '@salesforce/label/c.CB_Done';
import CANCEL from '@salesforce/label/c.CB_Cancel';

export default class CBFilterTransactionModal extends LightningElement {

    // Labels for UI elements
    label = {
        DONE: DONE.toUpperCase(), // Converting "Submit" label to uppercase
        CANCEL: CANCEL.toUpperCase(), // Converting "Cancel" label to uppercase
    };

    CBBackIcon = `${CBSVG}/CBSVGs/CBBackIcon.svg#CBBackIcon`;

    closeFilter(data) {
        this.dispatchEvent(new CustomEvent('filter',{
            detail : data
        }))
    }

    // Get current date
    currentDate = new Date();
    transFromDate = ''
    transToDate = ''

    get MinMonth() {
        // Get the minimum month (7 months ago from the current date)
        let minDate = new Date(this.currentDate);
        minDate.setMonth(minDate.getMonth() - 7);
        return minDate.toISOString().slice(0, 7);
    }

    get MaxMonth() {
        // Get the maximum month (current month)
        return this.currentDate.toISOString().slice(0, 7);
    }

    fromDate(event) {
        this.transFromDate = event.target.value
        console.log('From Date',this.transFromDate);
    }

    toDate(event) {
        this.transToDate = event.target.value
        console.log('To Date',this.transToDate );
    }

    get transactionMaxDownload() {
        return 'You can download the credit card statement until previous 7 months'
    }

    get validateDate(){
        return this.transFromDate >= this.transToDate
    }

    submitHandler(){
        this.closeFilter({
            fromDate : this.transFromDate,
            toDate: this.transToDate
        })
    }
}