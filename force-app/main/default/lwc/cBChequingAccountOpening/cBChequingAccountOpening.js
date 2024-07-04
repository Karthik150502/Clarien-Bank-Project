import { LightningElement, track } from 'lwc';

import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality

// Importing labels for easy manipulation of the data in labels
import CHEQUING_ACCOUNT_OPENING from '@salesforce/label/c.CB_ChequingAccountOpening';
import CHEQUING_ACCOUNT1_PAGE from '@salesforce/label/c.CB_Page_ChequingAccountOpening1';
import SERVICE_REQUEST_PAGE from '@salesforce/label/c.CB_Page_Servicerequest';
import CBCreateUserCreds_companyCodeConduct from '@salesforce/label/c.CBCreateUserCreds_companyCodeConduct';
import CB_IAgreeToCompanyConduct from '@salesforce/label/c.CB_IAgreeToCompanyConduct';
import CB_TermsAndConditions from '@salesforce/label/c.CB_TermsAndConditions';
import CB_MarketingConsent from '@salesforce/label/c.CB_MarketingConsent';
import CB_Next from '@salesforce/label/c.CB_Next';
import CB_Product from '@salesforce/label/c.CB_Product';
import CBCurrency from '@salesforce/label/c.CBCurrency';
import CB_AccountType from '@salesforce/label/c.CB_AccountType';
import SELECT from '@salesforce/label/c.CB_Select';
import CB_Refer from '@salesforce/label/c.CB_Refer';
import CB_FeeSchedule from '@salesforce/label/c.CB_FeeSchedule';
import CB_Charges_For_All_Fees from '@salesforce/label/c.CB_Charges_For_All_Fees';

import { getAccountProducts } from 'c/cBUtilities'; // Importing utility methods

// Extending the LightningElement class and applying the NavigationMixin for navigation capabilities
export default class CBChequingAccountOpening extends NavigationMixin(LightningElement) {

    // Labels for UI elements
    label = {
        SELECT,
        CBCreateUserCreds_companyCodeConduct,
        CB_IAgreeToCompanyConduct,
        CB_TermsAndConditions,
        CB_MarketingConsent,
        CB_Next,
        CB_AccountType,
        CBCurrency,
        CB_Product,
        CB_FeeSchedule,
        CB_Charges_For_All_Fees,
        CB_Refer,
        CHEQUING_ACCOUNT_OPENING
    }

    //Variables to store data given by customer from UI
    termsConditionsFlag = false
    conductFlag = false
    apiName = 'CHEQUING'
    marketingConsentFlag = false
    @track product = 'Select Product'
    productName = ''
    @track currency = 'Select Currency'
    @track accountType = ' ';
    @track accountTypes = [];
    @track products = [];
    @track currencies = [];
    @track notes = [
        { id: 1, number: '1.', content: 'Refer <a href="https://clarienbank.com/fees/">Fee Schedule</a> For Minimum Balance On Deposit Requirements' }
    ];

    // Configuration object for the component
    configuration = {
        previousPageUrl: SERVICE_REQUEST_PAGE,
        heading: CHEQUING_ACCOUNT_OPENING,
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    // Lifecycle hook that is called when the component is inserted into the DOM.
    connectedCallback() {
        this.loadPicklistValues();
        // Fetch options data
        this.fetchAccountTypes();
        // this.fetchProducts();
        // this.fetchCurrencies();
        // this.product = this.products[0].value
        // this.accountType = this.accountTypes[0].value
        // this.currency = this.currencies[0].value
    }


    // Method to fetch account types.
    // Simulated data fetching, replace it with actual data fetching logic.
    fetchAccountTypes() {
        // Simulated data fetching, replace it with actual data fetching logic
        // Example data
        this.accountType = 'Chequing';
    }


    // Method to fetch currencies.
    // Simulated data fetching, replace it with actual data fetching logic.
    fetchCurrencies(allCurrencies) {
        // Simulated data fetching, replace it with actual data fetching logic
        // Example data
        let list = allCurrencies.split(",")
        this.currencies = list.map((curr) => {
            return {
                label: curr,
                value: curr,
            }
        })
    }


    // Getter method to determine if the button should be disabled based on the selected options and flags.
    // Returns a boolean.
    get buttonDisabled() {
        return this.product === ' ' || this.product === SELECT || this.currency === ' ' || this.currency === SELECT || !this.termsConditionsFlag
    }


    // Event handler for product selection change.
    // Updates the product property based on the event value.
    productHandler(event) {
        this.product = event.target.value
        let prod = this.products.find((p) => p.value === this.product)
        this.productName = prod.label
        this.fetchCurrencies(prod.allowedCurrencies)
    }


    // Event handler for account type selection change.
    // Updates the accountType property based on the event value.
    acccountTypeHandler(event) {
        this.accountType = event.target.value
    }

    // Event handler for currency selection change.
    // Updates the currency property based on the event value.
    currencyHandler(event) {
        this.currency = event.target.value
    }


    // Toggles the termsConditionsFlag.
    termsConditions() {
        this.termsConditionsFlag = !this.termsConditionsFlag
    }

    // Toggles the conductFlag.
    conduct() {
        this.conductFlag = !this.conductFlag
    }

    // Toggles the marketingConsentFlag.
    marketingConsent() {
        this.marketingConsentFlag = !this.marketingConsentFlag
    }


    // Event handler for form submission.
    // Navigates to the specified community page.
    submitHandler(event) {
        this.navigateToCommunityPage(CHEQUING_ACCOUNT1_PAGE);
    }

    // Navigates to a community page with specified pageApiName and state parameters.
    // Uses the NavigationMixin for navigation.
    navigateToCommunityPage(pageApiName) {
        // Define the pageReference object with the community page's name and any parameters
        const pageReference = {
            type: 'comm__namedPage', // Replace with the appropriate type for your community page
            attributes: {
                name: pageApiName // Replace 'yourPageName' with your actual page name
            },
            state: {
                product: this.product,
                productName: this.productName,
                currency: this.currency,
                accountType: this.accountType
            }
        };

        // Navigate to the community page using NavigationMixin
        this[NavigationMixin.Navigate](pageReference);
    }


    // To get the picklist values from the Metadata
    loadPicklistValues() {
        getAccountProducts(this.apiName).then((result) => {
            let values = Object.keys(result);
            this.products = values.map((val) => {
                return {
                    value: val,
                    label: result[val][0],
                    allowedCurrencies: result[val][1]
                }
            })
            console.log(JSON.stringify(this.products));
            this.isLoading = false
        }).catch((error) => {
            this.isLoading = false
            console.log(error)
        })
    }

}