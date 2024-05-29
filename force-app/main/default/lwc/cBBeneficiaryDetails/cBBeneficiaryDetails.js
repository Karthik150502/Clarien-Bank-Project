import { LightningElement,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBBeneficiaryDetails extends NavigationMixin(LightningElement) {
    @api beneficiaryDetails = {
        accountNum : 604567893,
        name: 'John',
        status : true
    }
    @api beneficiaryAction ={
        delete:true,
        detailView:false
    }

    CBEditIcon = `${CBSVG}/CBSVGs/CBEditIcon.svg#CBEditIcon`;
    
    get beneficiaryName(){
        return '***' + this.beneficiaryDetails.name.slice(-2)
    }

    get status(){
        return this.beneficiaryDetails.status?'Enabled':'Disable'
    }

    beneficiarySelected = false
    selectHandler(event){
        if(this.beneficiarySelected){
            this.beneficiarySelected = !this.beneficiarySelected
            event.target.checked = this.beneficiarySelected
        }
        else{
            this.beneficiarySelected = event.target.checked
        }
        console.log('Checked',event.target.checked);
    }
    navigateToEditBeneficiary(){
        console.log('Edit called');
        this.navigateTo('CBEditBeneficiary__c')
    }

    navigateToDeleteBeneficiary(){
        console.log('Delete called');
        this.navigateTo('CBDeleteBeneficiary__c')
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