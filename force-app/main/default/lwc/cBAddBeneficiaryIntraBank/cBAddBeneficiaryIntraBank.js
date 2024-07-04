import { LightningElement } from 'lwc';

// Importing NavigationMixin for navigation functionality
import { NavigationMixin } from 'lightning/navigation';

import Intrabank_BENEFICIARY_PAGE from '@salesforce/label/c.CB_Page_IntraBankBeneficiary';// Importing label for Domestic Beneficiary Page API Name

// Extending the LightningElement class and applying the NavigationMixin for navigation capabilities
export default class CBAddBeneficiaryIntraBank extends NavigationMixin(LightningElement) {

    previousPage = Intrabank_BENEFICIARY_PAGE

    //This method is triggered from child component via custom event
    createBeneficiary(){
        // Method to navigate to Intrabank Beneficiary Page
        this.navigateTo(Intrabank_BENEFICIARY_PAGE)
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