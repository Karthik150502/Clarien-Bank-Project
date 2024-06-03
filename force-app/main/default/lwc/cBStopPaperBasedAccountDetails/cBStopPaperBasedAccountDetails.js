import { LightningElement, wire } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';

import CURRENCY from '@salesforce/label/c.CBCurrency';
import REMARKS from '@salesforce/label/c.CB_Remarks';
import CB_Page_Applynow from '@salesforce/label/c.CB_Page_Applynow';

export default class CBStopPaperBasedAccountDetails extends NavigationMixin(LightningElement)  {
    
    @wire(CurrentPageReference) pageRef;

    connectedCallback(){
        console.log('Page Ref',this.pageRef);
        console.log('Page Ref State',this.pageRef.state);
        console.log('Page Ref State acc',this.pageRef.state.accounts);
        this.accounts = JSON.parse(this.pageRef.state.accounts);
        console.log(JSON.stringify(this.accounts));
    }

    label = {
        CURRENCY,
        REMARKS
    }

    accounts =  [
        {
            accNumber: 5000316231,
            currency: 'USD',
            accType: 'Personal Saving Account',
            accStatus: 'Personal Active Saving USD',
            TransStatus: 'Sent to the bank'
        },
        {
            accNumber: 5000334231,
            currency: 'USD',
            accType: 'Personal Saving Account',
            accStatus: 'Personal Active Saving USD',
            TransStatus: 'Sent to the bank'
        }
    ];

    configuration = {
        previousPageUrl: 'CBStopPaperBasedStatements__c',
        heading: 'Stop Paper Based',
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    };

    successModalOpen = false;

    successModalconfig={
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
        }
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
                name: CB_Page_Applynow
            }
        });
    }
}