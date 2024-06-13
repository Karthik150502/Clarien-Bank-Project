import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import TOP_UP_ACCOUNT_OPENING from '@salesforce/label/c.CB_Top_UpAccountOpening';

export default class CBTopUpAccountOpening extends NavigationMixin(LightningElement) {
    
    accountOpenType = 'topUpAccount'
    accountType = 'Top Up Account'
    topUpProduct = [
        "PERSONAL 5 YR SAVER",
        "COMMERCIAL 5 YR SAVER",
        "PERSONAL ACCUMULATOR",
        "COMMERCIAL ACCUMULATOR",
        "EMPLOYEE SAVER"
      ]
      
    configuration = {
        previousPageUrl: '',//should Navigate to Service Request after creating page for that
        heading: TOP_UP_ACCOUNT_OPENING,
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
        title: `Your account has been opened successfully`,
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