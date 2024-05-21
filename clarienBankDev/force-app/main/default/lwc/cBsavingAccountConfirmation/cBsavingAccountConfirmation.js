import { LightningElement,wire } from 'lwc';
import ACCOUNT_NAME from '@salesforce/label/c.CB_AccountName';
import PRODUCT from '@salesforce/label/c.CB_Product';
import { CurrentPageReference } from 'lightning/navigation';

export default class CBsavingAccountConfirmation extends LightningElement {
       configuration = {
        previousPageUrl: 'SavingsAccountOpening__c',
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


 label = {
        ACCOUNT_NAME,
        PRODUCT
    }
}