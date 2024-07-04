/*
    Author - Prateek Deshmukh
    Created Date - 06/03/2024
    Modified Date - 12/03/2024
    Description - This is a reusable child component designed to display Account details,
                  capable of being utilized multiple times to show specific details based on the provided data.
*/

import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality

import TOTAL_HOLDS from '@salesforce/label/c.CB_TotalHolds'; // Importing label for total holds
import AVAILABLE_BALANCE from '@salesforce/label/c.CB_AvailableBalance'; // Importing label for available balance
import CURRENT_BALANCE from '@salesforce/label/c.CB_CurrentBalance'; // Importing label for current balance
import VIEW_ALL from '@salesforce/label/c.CB_ViewAll'; // Importing label for "View All"
import BMD from '@salesforce/label/c.CB_Bmd'; // Importing label for BMD
import SavingsAccountPage from '@salesforce/label/c.CB_Page_SavingsAccount'; // Importing label for Savings Account Page API Name

import FAVORITEACCOUNTS_PAGE from '@salesforce/label/c.CB_Page_Favoriteaccounts'; // Importing label for favorite accounts page

// Extending the LightningElement class and applying the NavigationMixin for navigation capabilities
export default class CBAccountCard extends NavigationMixin(LightningElement) {

    // Labels for UI elements
    label = {
        TOTAL_HOLDS,
        AVAILABLE_BALANCE,
        CURRENT_BALANCE,
        BMD,
        VIEW_ALL
    };

    // Public property to hold account information, decorated with @api to make it accessible outside the component
    @api account = {
        accountNo: '600017725563',
        accountBal: '00000.00',
        currentBal: '0000.00',
        totalHolds: '00000.00',
        accountType: 'SAVINGS ACCOUNT',
        accountCur: 'BMD',
        favorite: true
    }

    // Method to navigate to the favorite accounts page
    navigateToFavoriteAccs(event) {
        event.stopPropagation()
        this.navigateTo(FAVORITEACCOUNTS_PAGE);
    }

    navigateToAccount() {
        this.navigateToAcc('comm__namedPage', SavingsAccountPage, this.account)
    }

    /**
* Helper function to handle navigation to a specified page
* Using a single Navigate function is more efficient, accepts source type and source name as parameters
* @param {String} type - The page destination type
* @param {String} url_name - source name as parameter
* @return {void}
*/
    navigateToAcc(type, url_name, acc) {
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

    // Helper function to handle navigation to a specified page
    navigateTo(pageApiName) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            }
        });
    }

}