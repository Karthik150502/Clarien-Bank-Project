/*
    Author - Prateek Deshmukh
    Created Date - 18/03/2024
    Modified Date - 21/03/2024
    Description - Refactored Confirmation Modal Popup for Reusability
*/

import { LightningElement, api } from 'lwc';
export default class CBOperationConfirmWLoading extends LightningElement {
    // @api - Makes that variable/property to accepts values from the parent component in LWC
    @api modalInfo = {}
    // {
    //     title,
    //     message,
    //     loadingStatusMsg: '',
    //     isLoading: false,
    //     okButton: {
    //         exposed: true,
    //         label: '',
    //         implmentation
    //     },
    //     notOkButton: {
    //         exposed: false,
    //         label: '',
    //         implmentation
    //     }
    // }



    handleSlotChange() {
        let misallaneous = this.template.querySelector(".misallaneous")
        if (misallaneous) {
            misallaneous.classList.remove("slds-hide")
        }
    }

}