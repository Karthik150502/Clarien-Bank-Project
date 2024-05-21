import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

export default class CBStopPaperBasedAccountDetails extends LightningElement {
    
    // accounts = '';
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
    }
}