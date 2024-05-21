import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBQueryOnChequeBook extends LightningElement {

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