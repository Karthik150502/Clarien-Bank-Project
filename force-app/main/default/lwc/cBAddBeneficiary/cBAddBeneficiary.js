import { LightningElement, api, track } from 'lwc';

// Importing labels for easy manipulation of the data in labels
import BENEFICIARYADDEDSUCCESSFULLY from '@salesforce/label/c.CB_BeneficiaryAddedSuccessfully';
import ADD_BENEFICIARIES from '@salesforce/label/c.CB_AddBeneficiaries';
import BENEFICIARY_BANK from '@salesforce/label/c.CB_BeneficiaryBank';
import BENEFICIARY_NAME from '@salesforce/label/c.CB_BeneficiaryName';
import BENEFICIARY_ACCOUNT_NUMBER from '@salesforce/label/c.CB_BeneficiaryAccountNumber';
import ADD from '@salesforce/label/c.CB_Add';
import OK_BUTTON from '@salesforce/label/c.CB_Ok';
import NOT_BUTTON from '@salesforce/label/c.CB_Not';

export default class CBAddBeneficiary extends LightningElement {

    // Labels for UI elements
    label = {
        BENEFICIARY_BANK,
        BENEFICIARY_NAME,
        BENEFICIARY_ACCOUNT_NUMBER,
        ADD
    }

    @api previousPage = ''
    // Configuration object for the component
    configuration = {
        previousPageUrl: '',
        heading: ADD_BENEFICIARIES,
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    connectedCallback(){
        this.configuration.previousPageUrl = this.previousPage
    }

    // Boolean to control the modal visibility
    modalOpen = false;

    // Metadata for the Beneficiary added successfully modal
    @track modal = {
        title: '',
        message: BENEFICIARYADDEDSUCCESSFULLY,
        yesButton: {
            exposed: true,
            label: OK_BUTTON,
            // Implementation for the "OK" button click action
            implementation: () => {
                this.modalOpen = false;
                this.dispatchEvent(new CustomEvent("createbeneficiary"));
            }
        },
        noButton: {
            exposed: false,
            label: NOT_BUTTON,
            // Implementation for the "Not" button click action
            implementation: () => {
                this.modalOpen = false;
            }
        }
    };

    // Property to determine if bank name is required
    @api bankName = false;

    // Boolean to control the status
    status = true;

    // Handler to toggle the status
    statusHandler() {
        this.status = !this.status;
    }

    // Properties to hold form input values
    accountNumber = '';
    beneficiaryName = '';
    beneficiaryBank = '';

    // Method Handles to update form input values
    accountNumberHandler(event) {
        this.accountNumber = event.target.value;
    }

    // Method Handles Beneficiary Name form input values
    beneficiaryNameHandler(event) {
        this.beneficiaryName = event.target.value;
    }

    // Method Handles Beneficiary Bank form input values
    beneficiaryBankHandler(event) {
        this.beneficiaryBank = event.target.value;
    }

    // Getter to disable the submit button based on form validation
    get disableButton() {
        if (this.bankName) {
            return this.accountNumber === '' || this.beneficiaryName === '' || this.beneficiaryBank === '';
        } else {
            return this.accountNumber === '' || this.beneficiaryName === '';
        }
    }

    // Handler to submit the form and open the modal
    handleSubmit() {
        this.modalOpen = true;
    }

}