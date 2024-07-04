import { LightningElement, track } from 'lwc';

// Importing NavigationMixin for navigation functionality
import { NavigationMixin } from 'lightning/navigation';

// Importing labels for easy manipulation of the data in labels
import INTERNATIONAL_BENEFICIARY_PAGE from '@salesforce/label/c.CB_Page_InternationalBeneficiary';// Importing label for Domestic Beneficiary Page API Name
import BENEFICIARYADDEDSUCCESSFULLY from '@salesforce/label/c.CB_BeneficiaryAddedSuccessfully';
import ADD_BENEFICIARIES from '@salesforce/label/c.CB_AddBeneficiaries';
import BENEFICIARY_BANK from '@salesforce/label/c.CB_BeneficiaryBank';
import INTERNATIONAL_BENEFICIARY_ACCOUNTNUMBER from '@salesforce/label/c.CB_International_Beneficiary_AccountNumber';
import BENEFICIARY_NAME from '@salesforce/label/c.CB_BeneficiaryName';
import BENEFICIARY_ADDRESS from '@salesforce/label/c.CB_BeneficiaryAddress';
import BENEFICIARY_CITY from '@salesforce/label/c.CB_BeneficiaryCity';
import BENEFICIARY_COUNTRY from '@salesforce/label/c.CB_BeneficiaryCountry';
import BENEFICIARY_SWIFTCODE from '@salesforce/label/c.CB_Beneficiary_SwiftCode';
import OK_BUTTON from '@salesforce/label/c.CB_Ok';
import NOT_BUTTON from '@salesforce/label/c.CB_Not';
import ADD from '@salesforce/label/c.CB_Add';

// Extending the LightningElement class and applying the NavigationMixin for navigation capabilities
export default class CBAddBeneficiaryInternational extends NavigationMixin(LightningElement) {

    // Labels for UI elements
    label = {
        BENEFICIARY_BANK,
        BENEFICIARY_NAME,
        INTERNATIONAL_BENEFICIARY_ACCOUNTNUMBER,
        BENEFICIARY_ADDRESS,
        BENEFICIARY_CITY,
        BENEFICIARY_COUNTRY,
        BENEFICIARY_SWIFTCODE,
        ADD
    }

    modalOpen = false;
    /**
    * Metadata for the Phone Update modal.
    */
    @track modal = {
        title: '',
        message: BENEFICIARYADDEDSUCCESSFULLY,
        yesButton: {
            exposed: true,
            label: OK_BUTTON,
            // Implementation for the "OK" button click action.
            implementation: () => {
                this.modalOpen = false;
                this.navigateTo(INTERNATIONAL_BENEFICIARY_PAGE)
            }
        },
        noButton: {
            exposed: false,
            label: NOT_BUTTON,
            //Implementation for the "Not" button click action.
            implementation: () => {
                this.modalOpen = false;
            }
        }
    };

    configuration = {
        previousPageUrl: '',
        heading: ADD_BENEFICIARIES,
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    // Properties to hold form input values
    accountNumber = '';
    beneficiaryName = '';
    beneficiaryBank = '';
    beneficiaryAddress = '';
    beneficiaryCity = '';
    beneficiaryCountry = '';
    beneficiarySwiftCode = '';

    // Handlers to update for account number input values
    accountNumberHandler(event) {
        this.accountNumber = event.target.value;
    }

    // Handlers to update for beneficiaryName input values
    beneficiaryNameHandler(event) {
        this.beneficiaryName = event.target.value;
    }

    // Handlers to update for beneficiaryBank input values
    beneficiaryBankHandler(event) {
        this.beneficiaryBank = event.target.value;
    }

    // Handlers to update for beneficiaryAddress input values
    beneficiaryAddressHandler(event) {
        this.beneficiaryAddress = event.target.value;
    }

    // Handlers to update for beneficiaryCity input values
    beneficiaryCityHandler(event) {
        this.beneficiaryCity = event.target.value;
    }

    // Handlers to update for beneficiaryCountry input values
    beneficiaryCountryHandler(event) {
        this.beneficiaryCountry = event.target.value;
    }

    // Handlers to update for beneficiarySwiftCode input values
    beneficiarySwiftCodeHandler(event) {
        this.beneficiarySwiftCode = event.target.value;
    }

    // Getter to determine if the submit button should be disabled
    get submitDisable() {
        // Return true to disable the submit button if any of the fields are empty
        return this.accountNumber === '' || this.beneficiaryName === '' || this.beneficiaryBank === '' || this.beneficiaryAddress === '' || this.beneficiaryCity === '' || this.beneficiaryCountry === '' || this.beneficiarySwiftCode === '';
    }

    // Method to handle form submission
    submitForm() {
        // Set modalOpen to true to open the modal
        this.modalOpen = true;
    }

    //Helper function to handle navigation to a specified page
    navigateTo(pageName) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageName
            }
        });
    }
}