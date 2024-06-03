import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import SUBMIT from '@salesforce/label/c.CB_Submit';
// import SERVICEREQUEST_PAGE from '@salesforce/label/c.CB_Page_Servicerequest';

export default class CBAddBeneficiaryInternational extends NavigationMixin(LightningElement) {

    label = {
        SUBMIT
    }

    configuration = {
        previousPageUrl: '',
        heading: 'Add Beneficiaries',
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }
    accountNumber = ''
    beneficiaryName = ''
    beneficiaryBank = ''
    beneficiaryAddress = ''
    beneficiaryCity = ''
    beneficiaryCountry = ''
    beneficiarySwiftCode =''

    accountNumberHandler(event){
        this.accountNumber = event.target.value;
    }
    beneficiaryNameHandler(event){
        this.beneficiaryName = event.target.value;
    }
    beneficiaryBankHandler(event){
        this.beneficiaryBank = event.target.value;
    }
    beneficiaryAddressHandler(event){
        this.beneficiaryAddress = event.target.value;
    }
    beneficiaryCityHandler(event){
        this.beneficiaryCity = event.target.value;
    }
    beneficiaryCountryHandler(event){
        this.beneficiaryCountry = event.target.value;
    }
    beneficiarySwiftCodeHandler(event){
        this.beneficiarySwiftCode = event.target.value;
    }

    get submitDisable() {
        console.log(this.accountNumber === '' || this.beneficiaryName === '' || this.beneficiaryBank === '' || this.beneficiaryAddress === '' || this.beneficiaryCity === '' || this.beneficiaryCountry === '' || this.beneficiarySwiftCode ==='');
        return this.accountNumber === '' || this.beneficiaryName === '' || this.beneficiaryBank === '' || this.beneficiaryAddress === '' || this.beneficiaryCity === '' || this.beneficiaryCountry === '' || this.beneficiarySwiftCode ==='';
    }

    submitForm(){
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