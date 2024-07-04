import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

import CBSVG from "@salesforce/resourceUrl/CBSVG"
import SHOWING_CHEQUEBOOK_STATEMENT from '@salesforce/label/c.CB_ShowingChequebookStatementsFor';

export default class CBQueryOnChequeBook extends LightningElement {

    label = {
        SHOWING_CHEQUEBOOK_STATEMENT
    }
    CBDownloadIcon = `${CBSVG}/CBSVGs/CBDownloadIcon.svg#CBDownloadIcon`;

    @wire(CurrentPageReference) pageRef

    fromDate = ''
    toDate = ''

    connectedCallback() {
        if(this.pageRef) {
            const {state} = this.pageRef;
            this.fromDate = state.fromDate;
            this.toDate = state.toDate;
        }
    }

       /**
 * Configuration object for the success modal.
 * Defines title, message, button properties, and alert message.
 */
    configuration = {
        title: 'Thank You',
        message: `Card has been successfully applied!`,
        okButton: {
            exposed: true,
            label: 'Ok',
            function: () => {
                this.successModal = false
                this.navigateToApplyNowPage()
            }
        },
        noButton: {
            exposed: false,
            label: '',
            function: () => {
            }
        },
        alertMsg: ''
    }




/**
 * Configuration object for the header section.
 * Defines previous page URL, heading text, and visibility of various icons and buttons.
 */
    headerConfguration = {
        previousPageUrl: 'CBApplyNowChequebook__c',
        heading: 'Query on Cheque Book',
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

}