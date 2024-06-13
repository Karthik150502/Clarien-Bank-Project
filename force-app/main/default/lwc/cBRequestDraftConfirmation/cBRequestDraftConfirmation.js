import { LightningElement, wire } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';

import CB_Page_Applynow from '@salesforce/label/c.CB_Page_Applynow';

export default class CBRequestDraftConfirmation extends NavigationMixin(LightningElement) {

    configuration = {
        previousPageUrl: '',
        heading: 'Request a Draft',
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    @wire(CurrentPageReference) pageRef;

    get accountNum() {
        return this.pageRef?.state?.accountNum;
    }
    get accountType(){
        return this.pageRef?.state?.accountType;
    }
    get amount() {
        return this.pageRef?.state?.amount;
    }
    get currency() {
        return this.pageRef?.state?.currency;
    }
    get payeeName() {
        return this.pageRef?.state?.payeeName;
    }

    // accountNum = 6000316231;
    // accountType = 'Personal Saving USD';
    // amount = '2000';
    // currency = 'BMD';
    // payeeName = 'John';
    // remark = 'No Remark';

    successModalOpen = false;

    successModalconfig = {
        title: `Your request is submitted sucessfully`,
        message: '',
        okButton: {
            exposed: true,
            label: 'OK',
            function: () => {
                this.navigateBack();
            }
        },
        noButton: {
            exposed: false,
            label: 'Cancel',
            function: () => {
            }
        },
        alertMsg: 'Collect from "25 Reid Street" Any Submission after 4.00 PM will be next bussiness day'
    }

    navigateBack() {
        console.log('navigate called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: CB_Page_Applynow
            }
        });
    }

    submitForm() {
        this.successModalOpen = true;
    }

}