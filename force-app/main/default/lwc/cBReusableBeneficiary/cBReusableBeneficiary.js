import { LightningElement, api } from 'lwc';

import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality

// Importing labels for easy manipulation of the data in labels
import PAGE_MANAGEBENEFICIARIES from '@salesforce/label/c.CB_Page_ManageBeneficiaries';
import PAGE_DELETEBENEFICIARY from '@salesforce/label/c.CB_Page_DeleteBeneficiary';
import MANAGE_BENEFICIARIES from '@salesforce/label/c.CB_ManageBeneficiaries';
import ADD from '@salesforce/label/c.CB_Add';

import CBSVG from "@salesforce/resourceUrl/CBSVG"; // Importing static resource URL for SVG icons

import { setPagePath } from 'c/cBUtilities'; // Importing utility methods

export default class CBReusableBeneficiary extends NavigationMixin(LightningElement) {

    // Label for show in UI
    label = {
        ADD
    }

    // Configuration object for the component
    @api configuration =     {
        previousPageUrl: PAGE_MANAGEBENEFICIARIES,
        heading: MANAGE_BENEFICIARIES,
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    // SVG's from static resource with specific fragment identifiers
    CBSearchIcon = `${CBSVG}/CBSVGs/CBSearchIcon.svg#CBSearchIcon`;
    CBPlusIcon = `${CBSVG}/CBSVGs/CBPlusIcon.svg#CBPlusIcon`;
    
    // Configuration for beneficiary actions
    beneficiaryAction = {
        delete: false,
        detailView: true
    }

    // API properties to allow parent components to pass data
    @api pageName = '';
    @api beneficiaryType = '';
    @api beneficiaryList = [];

    // Lifecycle hook to set up the page path on component initialization
    connectedCallback() {
        setPagePath(this.pageName);
    }

    // Navigation method to add beneficiary page
    navigateToAddBeneficiary() {
        if (this.beneficiaryType == 'Intrabank Beneficiary') {
            this.navigateTo('CBAddBeneficiaryIntraBank__c')
        }
        else if (this.beneficiaryType == 'Domestic Beneficiary') {
            this.navigateTo('CBAddBeneficiaryDomestic__c')
        }
        else if (this.beneficiaryType == 'International Beneficiary') {
            this.navigateTo('CBAddBeneficiaryInternational__c')
        }
    }

    // Navigation method to delete beneficiary page
    navigateToDeleteBeneficiary() {
        this.navigateTo(PAGE_DELETEBENEFICIARY, { benefList: JSON.stringify(this.beneficiaryList) });
    }

    // Helper function to handle navigation to a specified page with data
    navigateTo(pageName, data) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageName
            },
            state: data
        });
    }
}