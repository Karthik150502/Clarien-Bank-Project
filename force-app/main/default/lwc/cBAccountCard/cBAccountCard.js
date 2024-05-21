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
import BMD from '@salesforce/label/c.CB_Bmd';


import FAVORITEACCOUNTS_PAGE from '@salesforce/label/c.CB_Page_Favoriteaccounts';

export default class CBAccountCard extends NavigationMixin(LightningElement) {

    // Labels for UI elements
    label = {
        TOTAL_HOLDS,
        AVAILABLE_BALANCE,
        CURRENT_BALANCE,
        BMD,
        VIEW_ALL: VIEW_ALL.toUpperCase() // Converting "View All" label to uppercase
    };


    @api account = {
        accountNo: '600017725563',
        accountBal: '5556.54',
        totalHolds: '0.0',
        accountType: 'SAVINGS ACCOUNT',
        favorite: true
    }


    navigateToFavoriteAccs() {
        this.navigateTo(FAVORITEACCOUNTS_PAGE)
    }

    // Helper function for navigation 
    navigateTo(pageApiName) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            }
        });
    }

}