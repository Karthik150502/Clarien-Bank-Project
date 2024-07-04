import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality
// Importing labels for easy manipulation of the data in labels
import SAVINGS_ACCOUNT_OPENING from '@salesforce/label/c.CB_SavingsAccountOpening';
import PRODUCT from '@salesforce/label/c.CB_Product';
import SELECT from '@salesforce/label/c.CB_Select';
import CURRENCY from '@salesforce/label/c.CBCurrency';
import PAGE_SERVICEREQUEST from '@salesforce/label/c.CB_Page_Servicerequest';
import PAGE_SAVINGACCOUNTCONFIRMATION from '@salesforce/label/c.CB_Page_Savingaccountconfirmation';
import I_AGREE_TO_THE_COMPANY from '@salesforce/label/c.CB_IAgreeToTheCompany';
import TERMS_CONDITIONS_PRIVACY_POLICY from '@salesforce/label/c.CB_TermsConditionsprivacyPolicy';
import I_AGREE_FOR_COMPANY_CODE_OF_CONDUCT from '@salesforce/label/c.CB_IAgreeForCompanyCodeOfConduct';
import I_ACCEPT_MARKETING_CONSENT from '@salesforce/label/c.CB_MarketingConsent';
import NEXT from '@salesforce/label/c.CB_Next';
import CB_Refer from '@salesforce/label/c.CB_Refer';
import CB_FeeSchedule from '@salesforce/label/c.CB_FeeSchedule';
import CB_Charges_For_All_Fees from '@salesforce/label/c.CB_Charges_For_All_Fees';

import { getAccountProducts } from 'c/cBUtilities'; // Importing utility methods

export default class CBSavingAccountOpening extends NavigationMixin(LightningElement) {
    // Labels for UI elements
    label = {
        PRODUCT,
        SELECT,
        CURRENCY,
        I_AGREE_TO_THE_COMPANY,
        TERMS_CONDITIONS_PRIVACY_POLICY,
        I_AGREE_FOR_COMPANY_CODE_OF_CONDUCT,
        I_ACCEPT_MARKETING_CONSENT, NEXT,
        CB_FeeSchedule,
        CB_Charges_For_All_Fees,
        CB_Refer,
        SAVINGS_ACCOUNT_OPENING
    }
    // Global variables for storing customer data
    product = ''
    productName = ''
    @track currency = '';
    @track accountType = 'SAVING';
    apiName = 'CB_SBAcctAdd';
    isLoading = false
    /**
    * Configuration object for the savings account opening page
    * @type {Object}
    */
    configuration = {
        previousPageUrl: PAGE_SERVICEREQUEST,
        heading: SAVINGS_ACCOUNT_OPENING,
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    @track accountTypes = [];
    @track products = [];
    @track currencies = [];

    /**
    * Array to store notes related to the savings account opening
    * @type {Array}
    */
    @track notes = [
        { id: 1, number: '1.', content: 'Refer <a href="https://clarienbank.com/fees/">Fee Schedule</a> For Minimum Balance On Deposit Requirements' }
    ];

    /**
    * Fetches picklist values for account types and products
    */
    connectedCallback() {
        this.loadPicklistValues();
        // Fetch options data
    }

    /**
    * Fetches the list of available currencies.
    * Replace this method with actual data fetching logic.
    */
    fetchCurrencies(allCurrencies) {
        // Example data
        let list = allCurrencies.split(",")
        this.currencies = list.map((curr) => {
            return {
                label: curr,
                value: curr,
            }
        })
    }

    /**
    * Determines if the form submission button should be disabled based on the input fields' values.
    * @returns {boolean} True if the button should be disabled, false otherwise.
    */
    get buttonDisabled() {
        console.log(this.product === ' ', this.product === 'Select', this.currency === ' ', this.currency === 'Select', !this.termsConditionsFlag, !this.conductFlag, !this.marketingConsentFlag);
        return this.product === ' ' || this.product === 'Select' || this.currency === ' ' || this.currency === 'Select' || !this.termsConditionsFlag
    }

    /**
    * Handles the change event when the product selection is changed.
    * @param {Event} event - The change event.
    */
    productHandler(event) {
        this.product = event.target.value
        let prod = this.products.find((p) => p.value === this.product)
        this.productName = prod.label
        this.fetchCurrencies(prod.allowedCurrencies)
    }

    /**
    * Handles the change event when the currency selection is changed.
    * @param {Event} event - The change event.
    */
    currencyHandler(event) {
        this.currency = event.target.value
        console.log('Currency : ', this.currency);

    }

    /**
    * Toggles the terms and conditions flag.
    */
    termsConditionsFlag = false
    termsConditions() {
        this.termsConditionsFlag = !this.termsConditionsFlag
    }
    conductFlag = false
    /**
    * Toggles the conduct flag.
    */
    conduct() {
        this.conductFlag = !this.conductFlag
    }
    marketingConsentFlag = false

    /**
     * Toggles the marketing consent flag.
     */
    marketingConsent() {
        this.marketingConsentFlag = !this.marketingConsentFlag
    }

    /**
    * Handles the form submission and navigates to the specified community page with parameters.
    * @param {Event} event - The form submission event.
    */
    submitHandler() {
        this.navigateToCommunityPage(PAGE_SAVINGACCOUNTCONFIRMATION);
    }
    // Helper function to handle navigation to a specified page
    navigateToCommunityPage(pageApiName) {
        const pageReference = {
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            },
            state: {
                product: this.product,
                currency: this.currency,
                accountType: this.toInitCap(this.accountType),
                productName: this.productName
            }
        };
        this[NavigationMixin.Navigate](pageReference);
    }

    /**
     * Loads picklist values for account products based on the selected account type.
     */
    loadPicklistValues() {
        this.isLoading = true
        getAccountProducts(this.accountType).then((result) => {
            let values = Object.keys(result);
            this.products = values.map((val) => {
                return {
                    
                    value: val,
                    label: this.toInitCap(result[val][0]),
                    allowedCurrencies: result[val][1]
                    

                }
            })
            this.isLoading = false
        }).catch((error) => {
            this.isLoading = false
            console.log(error)
        })
    }

    toInitCap(sentence) {
        return sentence.split(' ')
                       .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                       .join(' ');
    }
}