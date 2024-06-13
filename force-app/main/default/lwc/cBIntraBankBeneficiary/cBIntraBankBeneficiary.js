import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CBIntraBankBeneficiary extends NavigationMixin(LightningElement) {
    
    beneficiaryType = [
        'Intra Bank Beneficiary', 'Domestic Beneficiary', 'International Beneficiary'
    ]

    beneficiaryList = [
        // {
        //     accountNum : 604567894,
        //     name: 'Kumaran',
        //     accountType : 'Saving',
        //     status : true
        // },
        // {
        //     accountNum : 604567885,
        //     name: 'Raju',
        //     accountType : 'Saving',
        //     status : false
        // }
        // ,
        {
            accountNum : 604567796,
            name: 'John',
            accountType : 'Current',
            status : true
        },
        {
            accountNum : 604567899,
            name: 'Walter',
            accountType : 'Saving',
            status : false
        },
        {
            accountNum : 604567810,
            name: 'Qian',
            accountType : 'Saving',
            status : false
        }
        // ,
        // {
        //     accountNum : 604567711,
        //     name: 'Prateek',
        //     accountType : 'Current',
        //     status : true
        // }
    ]

    navigateToDeleteBeneficiary(){
        this.navigateTo('CBDeleteBeneficiary__c')
    }

    navigateTo(pageName, data) {
        console.log('navigate called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageName
            },
            state:data
        });
    }
}