import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';

// Importing labels for easy manipulation of the data in labels
import OK_BUTTON from '@salesforce/label/c.CB_Ok';
import NOT_BUTTON from '@salesforce/label/c.CB_Not';
import DELETE from '@salesforce/label/c.CB_Delete';
import DELETE_BENEFICIARIES from '@salesforce/label/c.CB_Delete_Beneficiaries';
import DELETE_CONFIRM_MESSAGE from '@salesforce/label/c.CB_BeneficiariesDeleteMessage';
import DELETED_SUCCESS_MESSAGE from '@salesforce/label/c.CB_BeneficiariesDeletedSucessfully';
import PAGE_DELETEBENEFICIARY from '@salesforce/label/c.CB_Page_DeleteBeneficiary';

// Importing SVG file from Static Resource
import CBSVG from "@salesforce/resourceUrl/CBSVG";

import { setPagePath } from 'c/cBUtilities'; // Importing utility methods

export default class CBDeleteBeneficiaries extends NavigationMixin(LightningElement) {

    // Label for the delete button
    label = {
        DELETE
    }
    
    // SVG icon from static resource
    CBSearchIcon = `${CBSVG}/CBSVGs/CBSearchIcon.svg#CBSearchIcon`;

    // Current page reference to get URL parameters
    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
        this.configuration.previousPageUrl = setPagePath(PAGE_DELETEBENEFICIARY)
        // Parsing the beneficiary list from URL parameters
        this.beneficiaryList = JSON.parse(this.pageRef.state.benefList);
    }

    // State variable to control the visibility of the confirmation modal
    confirmModal = false

    // Configuration for the UI layout
    configuration = {
        previousPageUrl: '',
        heading: DELETE_BENEFICIARIES,
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    // Configuration for the confirmation modal
    @track confirmModalConfiguration = {
        logo: true,
        message: DELETE_CONFIRM_MESSAGE
    }

    // Function to handle successful deletion
    successfullyDeleted(){
        this.confirmModal = false;
        this.modalOpen = true;
    }

    // State variable to control the visibility of the success modal
    modalOpen = false;

    // Metadata for the success modal
    @track modal = {
        title: '',
        message: DELETED_SUCCESS_MESSAGE,
        yesButton: {
            exposed: true,
            label: OK_BUTTON,
            implementation: () => {
                this.modalOpen = false;
                this.navigateBack();
            }
        },
        noButton: {
            exposed: false,
            label: NOT_BUTTON,
            implementation: () => {
                this.modalOpen = false;
            }
        }
    };

    // Function to navigate back to the previous page
    navigateBack(){
        this.navigateTo(this.configuration.previousPageUrl )
    }

    // Configuration for beneficiary actions
    beneficiaryAction = {
        delete: true,
        detailView: false
    }

    // List of beneficiaries
    beneficiaryList = []

    // List of selected beneficiaries
    @track beneficiarySelected = []

    // Getter to disable the delete button if no beneficiaries are selected
    get disableButton() {
        console.log('Button Status', this.beneficiarySelected.length < 1);
        return this.beneficiarySelected.length < 1;
    }

    // Function to handle the selection of a beneficiary
    selectedBeneficiary(event) {
        if (this.beneficiarySelected.includes(event.detail.accountNum)) {
            this.beneficiarySelected.pop(event.detail.accountNum);
        } else {
            this.beneficiarySelected.push(event.detail.accountNum);
        }
        console.log(this.beneficiarySelected.length, this.beneficiarySelected.length < 1);
        console.log(JSON.stringify(this.beneficiarySelected));
    }

    // Function to navigate to a specified page
    navigateTo(pageName) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageName
            }
        });
    }

    // Function to handle delete button click
    handleDelete(event) {
        event.preventDefault();
        this.confirmModal = true;
    }

    // Function to close the confirmation modal
    closeConfirmModal() {
        this.confirmModal = false;
    }
}