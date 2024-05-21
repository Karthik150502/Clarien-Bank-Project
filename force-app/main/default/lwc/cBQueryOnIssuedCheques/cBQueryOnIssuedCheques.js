import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBQueryOnIssuedCheques extends LightningElement {

    CBDownloadIcon = `${CBSVG}/CBSVGs/CBDownloadIcon.svg#CBDownloadIcon`;

    chequeNoFrom
    chequeNoTo


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
        heading: 'Query on Issued Cheques',
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }



    @wire(CurrentPageReference)
    urlDataHandler({ state }) {
        if (state) {
            this.chequeNoFrom = state.chequeNoFrom ? state.chequeNoFrom : ''
            this.chequeNoTo = state.chequeNoTo ? state.chequeNoTo : ''
        }
    };

}