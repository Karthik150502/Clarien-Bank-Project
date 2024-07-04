/*
    Author - Prateek Deshmukh
    Created Date - 05/04/2024
    Modified Date - 05/04/2024
    Description - This is a reusable child component designed toshowcase Account details, with a special feature to highlight favorite accounts.
    Its adaptability allows it to be seamlessly integrated across various contexts, effortlessly presenting tailored information based on the provided data.
*/

import { LightningElement, api, track } from 'lwc';

import { NavigationMixin } from 'lightning/navigation';// Importing NavigationMixin for navigation functionality

import CurrentBalance from '@salesforce/label/c.CB_CurrentBalance'; // Importing label for current balance
import TotalHolds from '@salesforce/label/c.CB_TotalHolds'; // Importing label for total holds
import Next_Interest_Payment_Amount from '@salesforce/label/c.CB_Next_Interest_Payment_Amount'; // Importing label for next interest payment amount
import Next_Interest_Payment_Date from '@salesforce/label/c.CB_Next_Interest_Payment_Date'; // Importing label for next interest payment date

import SavingsAccountPage from '@salesforce/label/c.CB_Page_SavingsAccount'; // Importing label for Savings Account Page API Name
import JointAccountPage from '@salesforce/label/c.CB_Page_JointAccount'; // Importing label for Joint Account Page API Name
import CreditCardAccountPage from '@salesforce/label/c.CB_Page_CreditCardAccount'; // Importing label for Credit Card Account Page API Name
import LoanAccountPage from '@salesforce/label/c.CB_Page_LoanAccount'; // Importing label for Loan Account Page API Name
import TimeDepositAccountPage from '@salesforce/label/c.CB_Page_TimeDepositAccount'; // Importing label for Time Deposit Account Page API Name
import CurrentAccountPage from '@salesforce/label/c.CB_Page_CurrentAccount'; // Importing label for Current Account Page API Name

import CBSVG from "@salesforce/resourceUrl/CBSVG" // Importing SVG file from Static Resource

// Extending the LightningElement class and applying the NavigationMixin for navigation capabilities
export default class CBAccountDetailCard extends NavigationMixin(LightningElement) {

    // Labels for UI elements
    label = {
        CurrentBalance,
        TotalHolds,
        Next_Interest_Payment_Amount,
        Next_Interest_Payment_Date
    }

    //SVG's from static resource
    CBFavoriteAccounts = `${CBSVG}/CBSVGs/CBFavoriteAccounts.svg#CBFavoriteAccounts`;
    CBNotFavoriteAccounts = `${CBSVG}/CBSVGs/CBNotFavoriteAccounts.svg#CBNotFavoriteAccounts`;
    // CBNavigateNext = `${CBSVG}/CBSVGs/CBNavigateNext.svg#CBNavigateNext`;

    // Public property to hold account information, decorated with @api to make it accessible outside the component
    @api account = {
        accountNo: '600017725563',
        accountBal: 'BMD 5556.54',
        totalHolds: 'BMD 0.0',
        accountType: 'SAVINGS ACCOUNT',
        favorite: true
    }

    // Getter method to check if the account is a loan account
    get isALoanAccount() {
        return this.account.accountType === 'Loan Account';
    }

    // Public property to hold the favorite status, decorated with @api to make it accessible outside the component
    @api isFavorite = ''

    // Method to update favorite status of the account
    updateFavorites(event) {
        event.stopPropagation()
        this.isFavorite = !this.isFavorite
        let cevent = new CustomEvent(this.isFavorite ? 'addaccfav' : 'removeaccfav', {
            bubbles: true,
            detail: {
                accountNo: this.account.accountNo,
            }
        })
        this.dispatchEvent(cevent)
    }

    // Method to navigate to different account types based on the accountType property
    navigateToAccount() {
        // console.log("Navigation initiated...!")
        // console.log('account type: ', this.account.accountType);
        if (this.account.accountType === 'Saving Account') {
            this.navigateTo('comm__namedPage', SavingsAccountPage, this.account)
        }
        if (this.account.accountType === 'Joint Account') {
            this.navigateTo('comm__namedPage', JointAccountPage, this.account)
        }
        if (this.account.accountType === 'Credit Card Account') {
            this.navigateTo('comm__namedPage', CreditCardAccountPage, this.account)
        }
        if (this.account.accountType === 'Loan Account') {
            this.navigateTo('comm__namedPage', LoanAccountPage, this.account)
        }
        if (this.account.accountType === 'Time Deposit Account') {
            this.navigateTo('comm__namedPage', TimeDepositAccountPage, this.account)
        }
        if (this.account.accountType === 'Current Account') {
            this.navigateTo('comm__namedPage', CurrentAccountPage, this.account)
        }
    }

    /**
    * Helper function to handle navigation to a specified page
    * Using a single Navigate function is more efficient, accepts source type and source name as parameters
    * @param {String} type - The page destination type
    * @param {String} url_name - source name as parameter
    * @return {void}
    */
    navigateTo(type, url_name, acc) {
        const pageReference = {
            type,
            attributes: {
                name: url_name
            },
            state: {
                account: JSON.stringify(acc) // Pass the account number as a parameter
            }
        };
        this[NavigationMixin.Navigate](pageReference);
    }

}