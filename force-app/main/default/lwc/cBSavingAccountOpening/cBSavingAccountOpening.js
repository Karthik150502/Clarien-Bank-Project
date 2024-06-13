import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import SAVINGS_ACCOUNT_OPENING from '@salesforce/label/c.CB_SavingsAccountOpening';

export default class CBSavingAccountOpening extends NavigationMixin(LightningElement) {


    @track product = ' ';
    @track currency = ' ';
    @track accountType = ' ';
    configuration = {
        previousPageUrl: 'CBServiceRequest__c',
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
    @track notes = [
        { id: 1, number: '1.', content: 'Account Must Be Funded Within 30 Days To Avoid Closure' },
        { id: 2, number: '2.', content: 'Refer <a href="#">Fee Schedule</a> For Minimum Balance On Deposit Requirements' },
        { id: 3, number: '3.', content: 'For Debit Card Or Cheque Book Request, Please Contact Bank.' }
    ];


    connectedCallback() {
        // Fetch options data
        this.fetchAccountTypes();
        this.fetchProducts();
        this.fetchCurrencies();
        this.product = this.products[0].value
        // this.accountType = this.accountTypes[0].value
        this.currency = this.currencies[0].value
    }

    fetchAccountTypes() {
        // Simulated data fetching, replace it with actual data fetching logic
        // Example data
        this.accountType = 'Saving'
    }

    fetchProducts() {
        // Simulated data fetching, replace it with actual data fetching logic
        // Example data
        this.products = [
            { label: 'Select', value: 'Select' },
            { label: 'SAVINGS IRON KIDS ACCOUNT', value: 'SAVINGS IRON KIDS ACCOUNT' },
            { label: 'SAVINGS RETAIL GRADUATE ACCOUNT', value: 'SAVINGS RETAIL GRADUATE ACCOUNT' },
            { label: 'SAVINGS RETAIL REGULAR ACCOUNT', value: 'SAVINGS RETAIL REGULAR ACCOUNT' },
            { label: 'SAVINGS RETAIL MASS AFFLUENT ACCOUNT', value: 'SAVINGS RETAIL MASS AFFLUENT ACCOUNT' },
            { label: 'SAVINGS SENIOR ACCOUNT', value: 'SAVINGS SENIOR ACCOUNT' },
            { label: 'STAFF SAVINGS ACCOUNT', value: 'STAFF SAVINGS ACCOUNT' },
            { label: 'SAVINGS PREMIUM DIAMOND ACCOUNT', value: 'SAVINGS PREMIUM DIAMOND ACCOUNT' },
            { label: '35 DAY NOTICE OF WITHDRAWAL SAVINGS', value: '35 DAY NOTICE OF WITHDRAWAL SAVINGS' },
            { label: 'COMMERCIAL BUSINESS OPERATING ACCOUNT', value: 'COMMERCIAL BUSINESS OPERATING ACCOUNT' },
            { label: 'COMMERCIAL CORPORATE OPERATING ACCOUNT', value: 'COMMERCIAL CORPORATE OPERATING ACCOUNT' },
            { label: 'COMMERCIAL ELITE OPERATING ACCOUNT', value: 'COMMERCIAL ELITE OPERATING ACCOUNT' },
            { label: 'COMMERCIAL PREMIUM DEMAND ACCOUNT', value: 'COMMERCIAL PREMIUM DEMAND ACCOUNT' },
            { label: '35 DAY NOTICE OF WITHDRAWAL BUSINESS', value: '35 DAY NOTICE OF WITHDRAWAL BUSINESS' },
            { label: '35 DAY NOTICE OF WITHDRAWAL CORPORATE', value: '35 DAY NOTICE OF WITHDRAWAL CORPORATE' },
            { label: '35 DAY NOTICE OF WITHDRAWALELITE', value: '35 DAY NOTICE OF WITHDRAWALELITE' }

        ];
    }

    fetchCurrencies() {
        // Simulated data fetching, replace it with actual data fetching logic
        // Example data
        this.currencies = [
            { label: 'Select', value: 'Select' },
            { label: 'BMD', value: 'BMD' },
            { label: 'USD', value: 'USD' }
        ];
    }

    get buttonDisabled() {
        console.log(this.product === ' ', this.product === 'Select', this.accountType === ' ', this.currency === ' ' , this.accountType === 'Select' , this.currency === 'Select', !this.termsConditionsFlag,!this.conductFlag , !this.marketingConsentFlag);
        return this.product === ' ' || this.product === 'Select' || this.accountType === ' ' || this.currency === ' ' || this.accountType === 'Select' || this.currency === 'Select' || !this.termsConditionsFlag || !this.conductFlag || !this.marketingConsentFlag
    }

    productHandler(event) {
        this.product = event.target.value
        console.log('Product : ', this.product);

    }

    acccountTypeHandler(event) {
        this.accountType = event.target.value
        console.log('AccountType : ', this.accountType);

    }
    currencyHandler(event) {
        this.currency = event.target.value
        console.log('Currency : ', this.currency);

    }

    termsConditionsFlag = false
    termsConditions() {
        this.termsConditionsFlag = !this.termsConditionsFlag
    }
    conductFlag = false
    conduct() {
        this.conductFlag = !this.conductFlag
    }
    marketingConsentFlag = false
    marketingConsent() {
        this.marketingConsentFlag = !this.marketingConsentFlag
    }

    submitHandler(event) {
        console.log('product:', this.product);
        console.log('currency:', this.currency);
        console.log('accountType:', this.accountType);
        this.navigateToCommunityPage('CBSavingaccountconfirmation__c');
    }
    navigateToCommunityPage(pageApiName) {
        // Define the pageReference object with the community page's name and any parameters
        console.log('naviagteion Call');
        const pageReference = {
            type: 'comm__namedPage', // Replace with the appropriate type for your community page
            attributes: {
                name: pageApiName // Replace 'yourPageName' with your actual page name
            },
            state: {
                product: this.product,
                currency: this.currency,
                accountType: this.accountType
            }
        };

        // Navigate to the community page using NavigationMixin
        this[NavigationMixin.Navigate](pageReference);
    }

}