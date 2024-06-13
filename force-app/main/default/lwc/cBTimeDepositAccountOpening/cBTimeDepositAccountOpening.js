import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import TIME_DEPOSIT_ACCOUNT_OPENING from '@salesforce/label/c.CB_TimeDepositAccountOpening';

export default class CBTimeDepositAccountOpening extends NavigationMixin(LightningElement) {

    accountOpenType = 'timeDepositAccount'
    accountType = 'Time Deposit Account'
    termDepositProduct = [
        "TD GENERAL AT MAT 365A",
        "TD GENERAL AT MAT 360A",
        "TD GENERAL MONTHLY",
        "TD GENERAL QUARTERLY",
        "TD GENERAL HALF YEARLY",
        "TD GENERAL YEARLY",
        "TD COMMERICAL AT MAT 365A",
        "TD COMMERICAL AT MAT 360A",
        "TD COMMERICAL MONTHLY",
        "TD COMMERCIAL QUARTERLY",
        "TD COMMERICAL HALF YEARLY",
        "TD COMMERICAL YEARLY",
        "TD PREMIUM AT MATURITY",
        "TD PREMIUM MONTHLY",
        "TD PREMIUM QUARTERLY",
        "TD PREMIUM HALF YEARLY",
        "TD PREMIUM YEARLY",
        "TD SUPREME AT MATURITY",
        "TD SUPREME MONTHLY",
        "TD SUPREME QUARTERLY",
        "TD SUPREME HALF YEARLY",
        "TD PREMIUM COM AT MATURITY",
        "TD PREMIUM COM MONTHLY",
        "TD PREMIUM COM QUARTERLY",
        "TD PREMIUM COM HALF YEARLY",
        "TD PREMIUM COM YEARLY"
      ]

    configuration = {
        previousPageUrl: 'CBServiceRequest__c',
        heading: TIME_DEPOSIT_ACCOUNT_OPENING,
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
        console.log(JSON.stringify(event.detail));
        this.successModalOpen = true;
    }
}