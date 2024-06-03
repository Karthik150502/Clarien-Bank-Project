import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import CBSVG from "@salesforce/resourceUrl/CBSVG";

export default class CBManageBeneficiaries extends NavigationMixin(LightningElement)  {
   
    label = {

    }

    configuration = {
        previousPageUrl: 'CBTransfers__c',
        heading: 'Manage Beneficiaries',
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
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

    navigateToIntraBankBeneficiary(){
        console.log('Intra called');
        this.navigateTo('CBIntraBankBeneficiary__c')
    }
    
    navigateToDomesticBeneficiary(){
        console.log('Domestic Called');
        this.navigateTo('CBDomesticBeneficiary__c')
    }
    navigateToInternationalBeneficiary(){
        console.log('called');
        this.navigateTo('CBInternationalBeneficiary__c')
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