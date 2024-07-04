import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

// Importing labels for easy manipulation of the data in labels
import PAGE_TRANSFERS from '@salesforce/label/c.CB_Page_Transfers';
import PAGE_INTRABANKBENEFICIARY from '@salesforce/label/c.CB_Page_IntraBankBeneficiary';
import PAGE_DOMESTICBENEFICIARY from '@salesforce/label/c.CB_Page_DomesticBeneficiary';
import PAGE_INTERNATIONALBENEFICIARY from '@salesforce/label/c.CB_Page_InternationalBeneficiary';
import MANAGE_BENEFICIARIES from '@salesforce/label/c.CB_ManageBeneficiaries';
import PAGE_MANAGEBENEFICIARIES from '@salesforce/label/c.CB_Page_ManageBeneficiaries';
import INTRABANK_BENEFICIARY from '@salesforce/label/c.CB_IntraBankBeneficiary';
import DOMESTIC_BENEFICIARY from '@salesforce/label/c.CB_DomesticBeneficiary';
import INTERNATIONAL_BENEFICIARY from '@salesforce/label/c.CB_InternationalBeneficiary';

import CBSVG from "@salesforce/resourceUrl/CBSVG"; // Importing static resource URL for SVG icons

import { setPagePath } from 'c/cBUtilities'; // Importing utility methods

export default class CBManageBeneficiaries extends NavigationMixin(LightningElement) {

    // Labels for beneficiary types
    label = {
        INTRABANK_BENEFICIARY,
        DOMESTIC_BENEFICIARY,
        INTERNATIONAL_BENEFICIARY
    }

    // SVG's from static resource with specific fragment identifiers
    CBBackIcon = `${CBSVG}/CBSVGs/CBBackIcon.svg#CBBackIcon`;

    // Lifecycle hook to set up configuration on component initialization
    connectedCallback() {
        this.configuration.previousPageUrl = setPagePath(PAGE_MANAGEBENEFICIARIES);
    }

    // Configuration object for the component
    configuration = {
        previousPageUrl: PAGE_TRANSFERS,
        heading: MANAGE_BENEFICIARIES,
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }


    // Navigation methods for Intrabank beneficiary types
    navigateToIntraBankBeneficiary() {
        this.navigateTo(PAGE_INTRABANKBENEFICIARY);
    }

    // Navigation methods for Domestic beneficiary types
    navigateToDomesticBeneficiary() {
        this.navigateTo(PAGE_DOMESTICBENEFICIARY);
    }

    // Navigation methods for International beneficiary types
    navigateToInternationalBeneficiary() {
        this.navigateTo(PAGE_INTERNATIONALBENEFICIARY);
    }

    // Helper function to handle navigation to a specified page
    navigateTo(pageName) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageName
            }
        });
    }
}