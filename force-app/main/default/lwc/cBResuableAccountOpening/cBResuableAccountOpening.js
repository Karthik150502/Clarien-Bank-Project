import { LightningElement, api, track } from 'lwc';

import { getAccountProducts } from 'c/cBUtilities'; // Importing utility methods

// Importing labels for easy manipulation of the data in labels
import DEPOSIT_DURATION from '@salesforce/label/c.CB_Deposit_Duration'; // Label for deposit duration
import DEPOSIT_AMOUNT from '@salesforce/label/c.CB_DepositAmount'; // Label for deposit amount
import DEBIT_ACCOUNT from '@salesforce/label/c.CB_Debit_Account'; // Label for debit account
import PRODUCT from '@salesforce/label/c.CB_Product'; // Label for product
import CURRENCY from '@salesforce/label/c.CBCurrency'; // Label for currency
import INTEREST_INSTRUCTIONS from '@salesforce/label/c.CB_InterestInstructions'; // Label for interest instructions
import INTEREST_PAYMENT from '@salesforce/label/c.CB_InterestPayment'; // Label for interest payment
import RENEWAL_INSTRUCTIONS from '@salesforce/label/c.CB_RenewalInstructions'; // Label for renewal instructions
import PRINCIPAL_MATURITY from '@salesforce/label/c.CB_PrincipalMaturity'; // Label for principal maturity
import ACCOUNT_OPENING_DATE from '@salesforce/label/c.CB_AccountOpeningDate'; // Label for account opening date
import REMARKS from '@salesforce/label/c.CB_Remarks'; // Label for remarks
import SUBMIT from '@salesforce/label/c.CB_Submit'; // Label for submit button
import SELECT from '@salesforce/label/c.CB_Select'; // Label for select option
import I_AGREE_TO_COMPANY from '@salesforce/label/c.CB_IAgreeToTheCompany'; // Label for agreeing to company terms
import TERMS_AND_CONDITIONS from '@salesforce/label/c.CB_TermsConditionsprivacyPolicy'; // Label for terms and conditions
import I_AGREE_FOR_COMPANY_CODE_OF_CONDUCT from '@salesforce/label/c.CB_IAgreeForCompanyCodeOfConduct'; // Label for agreeing to company code of conduct
import MARKETING_CONSENT from '@salesforce/label/c.CB_MarketingConsent'; // Label for marketing consent
import ACCOUNT from '@salesforce/label/c.CB_ACCOUNTS'; // Label for submit button
import CB_Refer from '@salesforce/label/c.CB_Refer';
import CB_FeeSchedule from '@salesforce/label/c.CB_FeeSchedule';
import CB_Charges_For_All_Fees from '@salesforce/label/c.CB_Charges_For_All_Fees';


export default class CBResuableAccountOpening extends LightningElement {

    @api type = ''; // Property to store the type of account

    // Getter to determine if the account type is a time deposit account
    get accountType() {
        return this.type === 'timeDepositAccount';
    }

    accounts = [
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855541255',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855000054',
            accountType: 'Joint Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '651235641254',
            accountType: 'Time Deposit Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '709945651354',
            accountType: 'Current Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
    ]

    // Labels for UI elements
    label = {
        I_AGREE_TO_COMPANY,
        TERMS_AND_CONDITIONS,
        I_AGREE_FOR_COMPANY_CODE_OF_CONDUCT,
        MARKETING_CONSENT,
        SELECT,
        DEPOSIT_AMOUNT,
        CURRENCY,
        ACCOUNT_OPENING_DATE,
        DEBIT_ACCOUNT,
        DEPOSIT_DURATION,
        PRODUCT,
        INTEREST_INSTRUCTIONS,
        INTEREST_PAYMENT,
        RENEWAL_INSTRUCTIONS,
        PRINCIPAL_MATURITY,
        REMARKS,
        ACCOUNT,
        SUBMIT,
        CB_FeeSchedule,
        CB_Charges_For_All_Fees,
        CB_Refer
    }

    @api accountTypes = ''; // Property to store account types
    @track productList = []; // Property to store product list
    @api accType = ''

    // Lists for dropdown options
    interestPaymentList = ['Select', 'Re-Invest', 'Interest'];
    principalMaturityList = ['Select', 'Redeem Proceeds', 'Renew Maturity Amount'];

    // Static data for bank products categorized by account type
    // bankProducts = {
    //     "Term Deposit": [
    //       "TD GENERAL AT MAT 365A",
    //       "TD GENERAL AT MAT 360A",
    //       "TD GENERAL MONTHLY",
    //       "TD GENERAL QUARTERLY",
    //       "TD GENERAL HALF YEARLY",
    //       "TD GENERAL YEARLY",
    //       "TD COMMERICAL AT MAT 365A",
    //       "TD COMMERICAL AT MAT 360A",
    //       "TD COMMERICAL MONTHLY",
    //       "TD COMMERCIAL QUARTERLY",
    //       "TD COMMERICAL HALF YEARLY",
    //       "TD COMMERICAL YEARLY",
    //       "TD PREMIUM AT MATURITY",
    //       "TD PREMIUM MONTHLY",
    //       "TD PREMIUM QUARTERLY",
    //       "TD PREMIUM HALF YEARLY",
    //       "TD PREMIUM YEARLY",
    //       "TD SUPREME AT MATURITY",
    //       "TD SUPREME MONTHLY",
    //       "TD SUPREME QUARTERLY",
    //       "TD SUPREME HALF YEARLY",
    //       "TD PREMIUM COM AT MATURITY",
    //       "TD PREMIUM COM MONTHLY",
    //       "TD PREMIUM COM QUARTERLY",
    //       "TD PREMIUM COM HALF YEARLY",
    //       "TD PREMIUM COM YEARLY"
    //     ],
    //     "Top Up Deposit": [
    //       "PERSONAL 5 YR SAVER",
    //       "COMMERCIAL 5 YR SAVER",
    //       "PERSONAL ACCUMULATOR",
    //       "COMMERCIAL ACCUMULATOR",
    //       "EMPLOYEE SAVER"
    //     ],
    //     "Checking Accounts": [
    //       "Chequing Account Graduate",
    //       "Chequing Account (Regular)",
    //       "Chequing Account Mass",
    //       "Chequing Account Seniors",
    //       "Chequing Account Staff",
    //       "Chequing Account Business",
    //       "Chequing Account Corporate",
    //       "Chequing Account Elite",
    //       "Chequing Account Commerical Call"
    //     ],
    //     "Savings Accounts": [
    //       "SAVINGS IRON KIDS ACCOUNT",
    //       "SAVINGS RETAIL GRADUATE ACCOUNT",
    //       "SAVINGS RETAIL REGULAR ACCOUNT",
    //       "SAVINGS RETAIL MASS AFFLUENT ACCOUNT",
    //       "SAVINGS SENIOR ACCOUNT",
    //       "STAFF SAVINGS ACCOUNT",
    //       "SAVINGS PREMIUM DIAMOND ACCOUNT",
    //       "35 DAY NOTICE OF WITHDRAWAL SAVINGS",
    //       "COMMERCIAL BUSINESS OPERATING ACCOUNT",
    //       "COMMERCIAL CORPORATE OPERATING ACCOUNT",
    //       "COMMERCIAL ELITE OPERATING ACCOUNT",
    //       "COMMERCIAL PREMIUM DEMAND ACCOUNT",
    //       "35 DAY NOTICE OF WITHDRAWAL BUSINESS",
    //       "35 DAY NOTICE OF WITHDRAWAL CORPORATE",
    //       "35 DAY NOTICE OF WITHDRAWALELITE"
    //     ]
    // };

    // Method to retrieve products based on account type
    // getProductsByAccountType(accountType) {
    //     if (this.bankProducts[accountType]) {
    //       return this.bankProducts[accountType];
    //     } else {
    //       return `Account Type "${accountType}" Not Found.`;
    //     }
    // }

    notes = 'Refer <a href="https://clarienbank.com/fees/">Fee Schedule</a> For Charges For All Fees That Apply To ' + this.accType


    // Initial values for form fields
    depositAccount = '';
    duration = '2Y';
    depositAmount = '';
    currency = '';
    @track currencies = []
    product = '';
    productName = ''
    interestPayment = '';
    principalMaturity = '';
    selectedAccount = '';

    // Event handlers for form input changes
    depositAccountHandler(event) {
        this.depositAccount = event.target.value;
    }

    // Handler for deposit amount change
    debitAmountHandler(event) {
        this.depositAmount = event.target.value;
        console.log(this.depositAmount);
    }

    // Handler for account change
    AccountHandler(event) {
        this.selectedAccount = event.target.value;
        console.log(this.depositAmount);
    }

    // Handler for product selection
    productHandler(event) {
        this.product = event.target.value;
        let prod = this.productList.find((p) => p.value === this.product)
        this.productName = prod.label
        this.fetchCurrencies(prod.allowedCurrencies)
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
    * Handles the change event when the currency selection is changed.
    * @param {Event} event - The change event.
    */
    currencyHandler(event) {
        this.currency = event.target.value
        console.log('Currency : ', this.currency);

    }

    // Handler for interest payment selection
    interestPaymentHandler(event) {
        this.interestPayment = event.target.value;
    }

    // Handler for principal maturity selection
    principalMaturityHandler(event) {
        this.principalMaturity = event.target.value;
    }

    // Flags for terms and conditions, code of conduct, and marketing consent
    termsConditionsFlag = false;
    termsConditions() {
        this.termsConditionsFlag = !this.termsConditionsFlag;
    }

    conductFlag = false;
    conduct() {
        this.conductFlag = !this.conductFlag;
    }

    marketingConsentFlag = false;
    marketingConsent() {
        this.marketingConsentFlag = !this.marketingConsentFlag;
    }

    // Computed property to determine if the submit button should be disabled
    get buttonDisabled() {
        if (this.type === 'timeDepositAccount') {
            return this.selectedAccount === '' || this.selectedAccount === SELECT || this.duration === '' || this.depositAmount === '' || this.currency === '' || this.product === '' || this.product === 'Select' || this.interestPayment === 'Select' || this.principalMaturity === 'Select' || this.interestPayment === '' || this.principalMaturity === '' || !this.termsConditionsFlag;
        }
        else if (this.type === 'topUpAccount') {
            return this.selectedAccount === '' || this.selectedAccount === SELECT || this.duration === '' || this.depositAmount === '' || this.currency === '' || this.principalMaturity === '' || !this.termsConditionsFlag || this.product === 'Select' || this.principalMaturity === 'Select';
        }
    }

    // Handler for duration change
    durationHandler(event) {
        this.duration = event.detail.duration;
    }

    // Handler for form submission
    submitForm(event) {
        event.preventDefault();
        this.dispatchEvent(
            new CustomEvent('customerdetail', {
                detail: {
                    depositAmount: this.depositAmount,
                    duration: this.duration,
                    currency: this.currency,
                    depositAmount: this.depositAmount,
                    product: this.product,
                    interestPayment: this.interestPayment,
                    principalMaturity: this.principalMaturity,
                }
            })
        )
    }

    /**
   * Fetches picklist values for account types and products
   */
    connectedCallback() {
        this.loadPicklistValues();
        // Fetch options data
    }

    /**
     * Loads picklist values for account products based on the selected account type.
     */
    loadPicklistValues() {
        this.isLoading = true
        getAccountProducts(this.accountTypes).then((result) => {
            let values = Object.keys(result);
            this.productList = values.map((val) => {
                return {
                    value: this.toInitCap(val),
                    label: result[val][0],
                    allowedCurrencies: result[val][1]
                }
            })
            this.isLoading = false
        }).catch((error) => {
            this.isLoading = false
            console.log(error)
        })
    }

    toInitCap(product) {
        console.log(product);
        console.log(product.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' '));
        return product.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

}