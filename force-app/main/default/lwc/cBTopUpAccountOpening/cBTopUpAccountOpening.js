import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CBTopUpAccountOpening extends NavigationMixin(LightningElement) {
    
    accountOpenType = 'topUpAccount'
    configuration = {
        previousPageUrl: '',//should Navigate to Service Request after creating page for that
        heading: 'Top Up Account Opening',
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
        title: `Your Account has been opened successfully`,
        message: '',
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
        this.successModalOpen = true;
    }
}