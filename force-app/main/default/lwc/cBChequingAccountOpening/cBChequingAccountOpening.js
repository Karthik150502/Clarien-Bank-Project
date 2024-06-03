import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CBChequingAccountOpening extends NavigationMixin(LightningElement) {


    @track product = ' ';
    @track currency = ' ';
    @track accountType = ' ';
    configuration = {
        previousPageUrl: 'CBServiceRequest__c',
        heading: 'Chequing Account Opening',
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
        { id: 1, number: '1.', content: 'Account must be funded within 30 Days to avoid closure' },
        { id: 2, number: '2.', content: 'Refer <a href="#">Fee Schedule</a> for minimum balance on deposit requirements' },
        { id: 3, number: '3.', content: 'For Debit Card or cheque book request, please contact bank.' }
    ];


    connectedCallback() {
        // Fetch options data
        this.fetchAccountTypes();
        this.fetchProducts();
        this.fetchCurrencies();
        this.product = this.products[0].value
        this.accountType = this.accountTypes[0].value
        this.currency = this.currencies[0].value
    }

    fetchAccountTypes() {
        // Simulated data fetching, replace it with actual data fetching logic
        // Example data
        this.accountTypes = [
            { label: 'Select', value: 'Select' },
            { label: 'Savings', value: 'Savings' },
            { label: 'Chequing', value: 'Chequing' }
        ];
    }

    fetchProducts() {
        // Simulated data fetching, replace it with actual data fetching logic
        // Example data
        this.products = [
            { label: 'Select', value: 'Select' },
            { label: 'product1', value: 'product1' },
            { label: 'product2', value: 'product2' }
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
        console.log(this.product === ' ' ||  this.product === 'Select' || this.accountType === ' ' || this.currency === ' ' || this.accountType === 'Select' || this.currency === 'Select' ||  !this.termsConditionsFlag || !this.conductFlag || !this.marketingConsentFlag);
        return this.product === ' ' ||  this.product === 'Select' || this.accountType === ' ' || this.currency === ' ' || this.accountType === 'Select' || this.currency === 'Select' ||  !this.termsConditionsFlag || !this.conductFlag || !this.marketingConsentFlag
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
    termsConditions(){
        console.log('b Term Flag',this.termsConditionsFlag);
        this.termsConditionsFlag = !this.termsConditionsFlag
        console.log('a Term Flag',this.termsConditionsFlag);
    }
    conductFlag = false
    conduct(){
        this.conductFlag = !this.conductFlag
    }
    marketingConsentFlag = false
    marketingConsent(){
        this.marketingConsentFlag = !this.marketingConsentFlag
    }

    submitHandler(event) {
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