import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CBTimeDepositAccountOpening extends NavigationMixin(LightningElement) {

    accountOpenType = 'timeDepositAccount'
    configuration = {
        previousPageUrl: 'CBServiceRequest__c',
        heading: 'Time Deposit Account',
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }
    
    
    successModalOpen = false;

    successModalconfig={
        title: `Time Deposit Account Created Successfully`,
        message: 'Thanks for creating Fixed deposit account',
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
        alertMsg: ''
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

    createCase(event){
        console.log(event.detail.depositAmount);
        console.log(event.detail.product);
        this.successModalOpen = true;
    }
}