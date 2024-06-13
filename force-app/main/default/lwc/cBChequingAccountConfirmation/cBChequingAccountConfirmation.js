import { LightningElement, wire } from 'lwc';
import ACCOUNT_NAME from '@salesforce/label/c.CB_AccountName';
import PRODUCT from '@salesforce/label/c.CB_Product';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';

export default class CBChequingAccountConfirmation extends NavigationMixin(LightningElement) {

    label = {
        ACCOUNT_NAME,
        PRODUCT
    }

    configuration = {
        previousPageUrl: 'CBChequingAccountOpening__c',
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
        return this.pageRef?.state?.accountType?this.pageRef?.state?.accountType:'N/A';
    }
    get selectedProduct() {
        return this.pageRef?.state?.product?this.pageRef?.state?.product:'N/A';
    }
    get selectedCurrency() {
        return this.pageRef?.state?.currency?this.pageRef?.state?.currency:'N/A';
    }

    successModalOpen = false;

    successModalconfig = {
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

    submitForm() {
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