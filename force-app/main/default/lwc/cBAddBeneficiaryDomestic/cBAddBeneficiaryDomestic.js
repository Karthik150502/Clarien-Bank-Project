import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CBAddBeneficiaryDomestic extends NavigationMixin(LightningElement) {
    bankName=true

    createBeneficiary(){
        this.navigateTo('CBDomesticBeneficiary__c')
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