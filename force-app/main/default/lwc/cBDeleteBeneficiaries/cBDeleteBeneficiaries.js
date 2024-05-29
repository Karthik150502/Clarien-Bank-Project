import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import CBSVG from "@salesforce/resourceUrl/CBSVG";

export default class CBDeleteBeneficiaries extends NavigationMixin(LightningElement) {
    
    configuration = {
        previousPageUrl: '',
        heading: 'Delete Beneficiaries',
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    beneficiaryAction ={
        delete:true,
        detailView:false
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
    
    handleDelete(event){
        event.preventDefault()
        console.log("Delete Called");
        let beneficiarySelected = this.template.querySelectorAll('.beneficiarySelected')
        beneficiarySelected.forEach((bs)=>{
            console.log(bs);
            console.log('bvs value',bs.value, bs.checked);
        })
        console.log(beneficiarySelected);
    }
}