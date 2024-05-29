import { LightningElement,wire } from 'lwc';
import ACCOUNT_NAME from '@salesforce/label/c.CB_AccountName';
import PRODUCT from '@salesforce/label/c.CB_Product';
import { NavigationMixin,CurrentPageReference } from 'lightning/navigation';

export default class CBsavingAccountConfirmation extends NavigationMixin(LightningElement) {

    label = {
        ACCOUNT_NAME,
        PRODUCT
    }

       configuration = {
        previousPageUrl: 'CBSavingsAccountOpening__c',
        heading: 'Confirmation',
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }
  @wire(CurrentPageReference) pageRef;

    get selectedAccountType() {
        return this.pageRef && this.pageRef.state.accountType;
    }
     get selectedProduct() {
        return this.pageRef && this.pageRef.state.product;
    }
     get selectedCurrency() {
        return this.pageRef && this.pageRef.state.currency;
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

    submitForm(){
        console.log('Submit');
        this.successModalOpen = true
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
}