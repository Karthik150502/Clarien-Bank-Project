import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';


export default class CBReusableBeneficiary extends NavigationMixin(LightningElement) {

    configuration = {
        previousPageUrl: 'CBManageBeneficiaries__c',
        heading: 'Manage Beneficiaries',
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    beneficiaryAction = {
        delete: false,
        detailView: true
    }

    @api beneficiaryType = []

    @api beneficiaryList = []

    selectedBeneficiaryType = ''

    connectedCallback() {
        this.selectedBeneficiaryType = this.beneficiaryType[0]
        console.log('Type', this.selectedBeneficiaryType);
    }

    // beneficiaryTypeHandler(event) {
    //     this.selectedBeneficiaryType = event.target.value
    //     console.log(this.selectedBeneficiaryType);
    // }


    navigateToDeleteBeneficiary(){
        this.navigateTo('CBDeleteBeneficiary__c',{ benefList : JSON.stringify(this.beneficiaryList)})
    }

    navigateToAddBeneficiary() {
        if (this.selectedBeneficiaryType == 'Intra Bank Beneficiary') {
            this.navigateTo('CBAddBeneficiaryIntraBank__c')
        }
        else if (this.selectedBeneficiaryType == 'Domestic Beneficiary') {
            this.navigateTo('CBAddBeneficiaryDomestic__c')
        }
        else if (this.selectedBeneficiaryType == 'International Beneficiary') {
            this.navigateTo('CBAddBeneficiaryInternational__c')
        }
    }

    navigateTo(pageName,data) {
        console.log('navigate called');
        console.log('before Nav',JSON.stringify(data));
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageName
            },
            state:data
        });
    }

}