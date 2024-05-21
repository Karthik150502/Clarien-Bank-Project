import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CBSavingAccountOpening extends NavigationMixin(LightningElement) {


    @track product = ' ';
    @track currency = ' ';
    @track accountType = ' ';
    configuration = {
        previousPageUrl: 'CBApplyNowChequebook__c',
        heading: 'Savings Account Opening',
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
    }

    fetchAccountTypes() {
        // Simulated data fetching, replace it with actual data fetching logic
        // Example data
        this.accountTypes = [
            { label: 'Savings', value: 'Savings' },
            { label: 'Current', value: 'Current' }
        ];
    }

    fetchProducts() {
        // Simulated data fetching, replace it with actual data fetching logic
        // Example data
        this.products = [
            { label: 'product1', value: 'product1' },
            { label: 'product2', value: 'product2' }
        ];
    }

    fetchCurrencies() {
        // Simulated data fetching, replace it with actual data fetching logic
        // Example data
        this.currencies = [
            { label: 'BMD', value: 'BMD' },
            { label: 'USD', value: 'USD' }
        ];
    }

    get buttonDisabled() {
        return this.product === ' ' || this.accountType === ' ' || this.currency === ' '
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

    submitHandler(event) {
        this.navigateToCommunityPage('SavingAccountConfirmation__c');
    }
     navigateToCommunityPage(pageApiName) {
        // Define the pageReference object with the community page's name and any parameters
        const pageReference = {
            type: 'comm__namedPage', // Replace with the appropriate type for your community page
            attributes: {
                pageName: pageApiName // Replace 'yourPageName' with your actual page name
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