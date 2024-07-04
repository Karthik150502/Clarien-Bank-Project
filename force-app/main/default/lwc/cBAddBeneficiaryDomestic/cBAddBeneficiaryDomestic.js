import { LightningElement } from 'lwc';

import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality

import DOMESTIC_BENEFICIARY_PAGE from '@salesforce/label/c.CB_Page_DomesticBeneficiary';// Importing label for Domestic Beneficiary Page API Name

// Extending the LightningElement class and applying the NavigationMixin for navigation capabilities
export default class CBAddBeneficiaryDomestic extends NavigationMixin(LightningElement) {

    previousPage = DOMESTIC_BENEFICIARY_PAGE

    // This makes the Bank input visiable to get the bank name from customer
    bankName=true

    //This method is triggered from child component via custom event
    createBeneficiary(){
        // Method to navigate to Domestic Beneficiary Page
        this.navigateTo(DOMESTIC_BENEFICIARY_PAGE)
    }

    //Helper function to handle navigation to a specified page
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