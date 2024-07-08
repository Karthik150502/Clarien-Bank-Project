import { LightningElement, api } from 'lwc'; // Importing necessary decorators and modules from LWC framework

import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality

// Importing labels for easy manipulation of the data in labels
import BENEFICIARY_ACCOUNT_NO from '@salesforce/label/c.CB_BeneficiaryDetailsAccountNo';
import BENEFICIARY_NAME from '@salesforce/label/c.CB_BeneficiaryName';
import BENEFICIARY_BANK from '@salesforce/label/c.CB_BeneficiaryBank';
import BENEFICIARY_ADDRESS from '@salesforce/label/c.CB_BeneficiaryAddress';
import PAGE_EDIT_BENEFICIARY from '@salesforce/label/c.CB_Page_EditBeneficiary';

import CBSVG from "@salesforce/resourceUrl/CBSVG" // Importing SVG file from Static Resource

// Extending the LightningElement class and applying the NavigationMixin for navigation capabilities
export default class CBBeneficiaryDetails extends NavigationMixin(LightningElement) {

    // Labels for UI elements
    label = {
        BENEFICIARY_ACCOUNT_NO,
        BENEFICIARY_NAME,
        BENEFICIARY_BANK,
        BENEFICIARY_ADDRESS
    }

    // Properties to hold beneficiary details and actions
    @api beneficiaryDetails = {
        accountNum: 604567893,
        name: 'John'
    }

    @api beneficiaryAction = {
        delete: true,
        detailView: false
    }

    // SVG's from static resource with specific fragment identifiers
    CBBin = `${CBSVG}/CBSVGs/CBBin.svg#CBBin`;
    CBEditIcon = `${CBSVG}/CBSVGs/CBEditIcon.svg#CBEditIcon`;

    // Getter to display masked beneficiary name
    get beneficiaryName() {
        return '***' + this.beneficiaryDetails.name.slice(-2);
    }

    // Handler for beneficiary selection checkbox
    beneficiarySelected = false;
    selectHandler(event) {
        if (this.beneficiarySelected) {
            this.beneficiarySelected = !this.beneficiarySelected;
            event.target.checked = this.beneficiarySelected;
        } else {
            this.beneficiarySelected = event.target.checked;
        }
        // Dispatching custom event with beneficiary details when selected
        this.dispatchEvent(new CustomEvent('selected', {
            detail: this.beneficiaryDetails
        }));
    }

    // Navigates to edit beneficiary page
    navigateToEditBeneficiary() {
        this.navigateTo(PAGE_EDIT_BENEFICIARY, this.beneficiaryDetails);
    }

    // Dispatches delete event for beneficiary
    navigateToDeleteBeneficiary() {
        this.dispatchEvent(new CustomEvent("delete"));
    }

    // Generic navigation method using NavigationMixin
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