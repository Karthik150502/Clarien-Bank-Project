import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CBAddBeneficiaryIntraBank extends NavigationMixin(LightningElement) {

    createBeneficiary() {
        this.navigateTo('CBIntraBankBeneficiary__c')
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