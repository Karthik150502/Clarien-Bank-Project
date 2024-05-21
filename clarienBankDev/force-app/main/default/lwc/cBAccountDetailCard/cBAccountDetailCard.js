/*
    Author - Prateek Deshmukh
    Created Date - 05/04/2024
    Modified Date - 05/04/2024
    Description - This is a reusable child component designed toshowcase Account details, with a special feature to highlight favorite accounts.
    Its adaptability allows it to be seamlessly integrated across various contexts, effortlessly presenting tailored information based on the provided data.
*/

import { LightningElement, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

// Importing background image resource
import AccountCardBg from "@salesforce/resourceUrl/AccountCardBg";

export default class CBAccountDetailCard extends NavigationMixin(LightningElement) {


    // Property for background image
    AccountCardBg = AccountCardBg;

    // Account card details
    @api account = {
        accountNo: '600017725563',
        accountBal: 'BMD 5556.54',
        totalHolds: 'BMD 0.0',
        accountType: 'SAVINGS ACCOUNT',
        favorite: true
    }


    // Getter method to check if the account is a loan account
    get isALoanAccount() {
        return this.account.accountType === 'LOAN ACCOUNT';
    }
    
    @api isFavorite = ''

    // Method to update favorite status of the account
    updateFavorites() {
        this.isFavorite = !this.isFavorite
        let cevent = new CustomEvent(this.isFavorite ? 'addaccfav' : 'removeaccfav', {
            bubbles: true,
            detail: {
                accountNo: this.account.accountNo,
            }
        })
        this.dispatchEvent(cevent)
    }

    navigateToAccount() {
        console.log("Navigation initiated...!")
        this.navigateTo('comm__namedPage', 'AccountDetails__c', this.account.accountNo)
    }
    navigateToAccount() {
        console.log("Fav account")
    }

    /**
    * Using a single Navigate function is more efficient, accepts source type and source name as parameters
    *
    * @param {String} type - The page destination type
    * @param {String} url_name - source name as parameter
    * @return {void}
    */
    navigateTo(type, url_name, accNo) {
        const pageReference = {
            type,
            attributes: {
                name: url_name
            },
            state: {
                accountNumber: accNo // Pass the account number as a parameter
            }
        };
        this[NavigationMixin.Navigate](pageReference);
    }


}