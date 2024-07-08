import { LightningElement, wire, track } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';

// Importing labels for easy manipulation of the data in labels
import NAME from '@salesforce/label/c.CB_Name';
import SUBMIT from '@salesforce/label/c.CB_Submit';
import ACCOUNT from '@salesforce/label/c.CB_Account';
import STATUS from '@salesforce/label/c.CB_BeneficiaryStatus';
import ACCOUNT_TYPE from '@salesforce/label/c.CB_AccountType';
import BENEFICIARY_BANK from '@salesforce/label/c.CB_BeneficiaryBank';
import OK_BUTTON from '@salesforce/label/c.CB_Ok';
import NOT_BUTTON from '@salesforce/label/c.CB_Not';
import BENEFICIARYUPDATEMODALMESSAGE from '@salesforce/label/c.CB_BeneficiaryUpdateModalMessage';
import EDIT_BENEFICIARIES from '@salesforce/label/c.CB_EditBeneficiaries';
import PAGE_EDITBENEFICIARY from '@salesforce/label/c.CB_Page_EditBeneficiary';

import CBSVG from "@salesforce/resourceUrl/CBSVG"; // Importing SVG file from Static Resource

import { setPagePath } from 'c/cBUtilities'; // Importing utility methods

export default class CBEditBeneficiary extends NavigationMixin(LightningElement) {

    // Labels for UI text
    label = {
        NAME,
        SUBMIT,
        ACCOUNT,
        ACCOUNT_TYPE,
        BENEFICIARY_BANK,
        STATUS
    }

    // SVG icon for edit action
    CBEditIcon = `${CBSVG}/CBSVGs/CBEditIcon.svg#CBEditIcon`;

    // Getting the current page reference to access URL parameters
    @wire(CurrentPageReference) pageRef;

    // Extracting account number from the page reference state
    get accountNumber() {
        return this.pageRef && this.pageRef.state.accountNum;
    }

    // Extracting account type from the page reference state
    get accountType() {
        return this.pageRef && this.pageRef.state.accountType;
    }

    // Extracting beneficiary bank from the page reference state
    get beneficiaryBank() {
        return this.pageRef && this.pageRef.state.beneficiaryBank;
    }

    // Lifecycle hook to set up initial configuration and data
    connectedCallback() {
        this.configuration.previousPageUrl = setPagePath(PAGE_EDITBENEFICIARY);
        this.beneficiaryName = this.pageRef.state.name;
    }

    // Initial beneficiary name value
    beneficiaryName = '';

    // Handler for beneficiary name input field
    beneficiaryNameHandler(event) {
        this.beneficiaryName = event.target.value;
    }

    //disable button
    get disableButton(){
        return this.beneficiaryName === this.pageRef.state.name;
    }

    // Configuration object for the component
    configuration = {
        previousPageUrl: '',
        heading: EDIT_BENEFICIARIES,
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    // Handler for the submit button to open the modal
    handleSubmit() {
        this.modalOpen = true;
    }

    // Flag to track modal visibility
    modalOpen = false;

    // Metadata for the Beneficiary Update modal
    @track modal = {
        title: '',
        message: BENEFICIARYUPDATEMODALMESSAGE,
        yesButton: {
            exposed: true,
            label: OK_BUTTON,
            // Implementation for the "OK" button click action.
            implementation: () => {
                this.modalOpen = false;
                this.navigateTo(this.configuration.previousPageUrl);
            }
        },
        noButton: {
            exposed: false,
            label: NOT_BUTTON,
            // Implementation for the "Not" button click action.
            implementation: () => {
                this.modalOpen = false;
            }
        }
    };

    // Function to navigate to a specified page
    navigateTo(pageName) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageName
            }
        });
    }
}