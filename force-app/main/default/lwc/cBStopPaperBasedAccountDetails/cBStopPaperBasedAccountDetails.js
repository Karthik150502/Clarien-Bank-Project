import { LightningElement, wire } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';

import CURRENCY from '@salesforce/label/c.CBCurrency';
import REMARKS from '@salesforce/label/c.CB_Remarks';

export default class CBStopPaperBasedAccountDetails extends NavigationMixin(LightningElement)  {
        
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

    // @wire(CurrentPageReference)
    // urlDataHandler({ state }){
    //     console.log('2nd Page',JSON.parse(state))
    //     this.accounts = state ? JSON.parse(state) : ' ' ;
    //     // this.accounts.forEach(account=>{
    //     //     console.log(account)
    //     // })
    // }

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

    submitForm(){
        console.log('Submit');
        this.navigateBack()
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