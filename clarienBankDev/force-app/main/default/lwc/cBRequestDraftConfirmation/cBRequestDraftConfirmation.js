import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CBRequestDraftConfirmation extends LightningElement {

    configuration = {
        previousPageUrl: 'CBRequestDraft__c',
        heading: 'Request a Draft',
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    accountNum = 6000316231;
    accountType = 'Personal Saving USD';
    amount = '2000';
    currency = 'BMD';
    payeeName = 'John';
    remark = 'No Remark';

    successModalOpen = false;

    successModalconfig={
        title: `Draft request Sucessfully`,
        message: 'Thanks for requesting draft',
        okButton: {
            exposed: true,
            label: 'Ok',
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
                name: 'CBServiceRequest__c'
            }
        });
    }

    submitForm(){
        this.successModalOpen = true;
    }
    
}