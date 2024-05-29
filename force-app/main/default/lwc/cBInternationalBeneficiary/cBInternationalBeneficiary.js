import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CBInternationalBeneficiary extends NavigationMixin(LightningElement) {
    
    configuration = {
        previousPageUrl: '',
        heading: 'Manage Beneficiaries',
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    beneficiaryAction ={
        delete:false,
        detailView:true
    }

    beneficiaryList = [
        {
            accountNum : 604567891,
            name: 'John',
            status : true
        },
        {
            accountNum : 604567882,
            name: 'Johnny',
            status : true
        }
        ,
        {
            accountNum : 604567793,
            name: 'Robert',
            status : false
        }
    ]

    navigateToAddBeneficiary(){
        console.log('Add called');
        this.navigateTo('CBAddBeneficiary__c')
    }

    navigateTo(pageName) {
        console.log('navigate called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageName
            }
        });
    }
    
}