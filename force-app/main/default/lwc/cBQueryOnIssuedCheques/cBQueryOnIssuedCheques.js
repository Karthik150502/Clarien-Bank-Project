import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

import CBSVG from "@salesforce/resourceUrl/CBSVG"
import SHOWING_CHEQUEBOOK_NUMBER from '@salesforce/label/c.CB_ShowingChequebookNumbers';


export default class CBQueryOnIssuedCheques extends LightningElement {

    label = {
        SHOWING_CHEQUEBOOK_NUMBER
    }
    CBDownloadIcon = `${CBSVG}/CBSVGs/CBDownloadIcon.svg#CBDownloadIcon`;

    chequeNoFrom
    chequeNoTo

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
        heading: 'Query on Issued Cheques',
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }


/**
 * Handles the current page reference and extracts state parameters.
 * Sets cheque number range based on state parameters.
 * @param {Object} pageReference - The current page reference object containing state parameters.
 */
    @wire(CurrentPageReference)
    urlDataHandler({ state }) {
        if (state) {
            this.chequeNoFrom = state.chequeNoFrom ? state.chequeNoFrom : ''
            this.chequeNoTo = state.chequeNoTo ? state.chequeNoTo : ''
        }
    };

}