/*
    Author - Prateek Deshmukh
    Created Date - 06/03/2024
    Modified Date - 08/03/2024, 17/03/2024, 19/03/2024
    Description - This is a reusable Lightning Web Component (LWC) designed to be utilized as a child component wherever a footer is required. 
                  It allows flexibility by enabling users to specify icons and data to expose as needed
*/

import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import HOME_PAGE from '@salesforce/label/c.CB_Page_Home';
import PROFILESETTINGS_PAGE from '@salesforce/label/c.CB_Page_Profilesettings';
import PROFILE from '@salesforce/label/c.CB_Profile';
import DASHBOARDS from '@salesforce/label/c.CB_Dashboards';
import SERVICES from '@salesforce/label/c.CB_Services';
import SEND_MONEY from '@salesforce/label/c.CB_SendMoney';
import { getMobileSessionStorage, checkSessionkey } from 'c/cBUtilities';

export default class CBFooter extends NavigationMixin(LightningElement) {

    // Variable to hold the current page reference
    currPageReference = null;
    isIronKidsAccount = false

    label = {
        HOME_PAGE,
        PROFILESETTINGS_PAGE,
        PROFILE,
        DASHBOARDS,
        SERVICES,
        SEND_MONEY
    }



    // Lifecycle hook, that gets called on component connect
    connectedCallback() {
        if (checkSessionkey("isIronKidsAccount")) {
            this.isIronKidsAccount = getMobileSessionStorage("isIronKidsAccount") === 'true'
        }
    }


    // Footer items configuration
    footerItems = {
        dashboards: {
            pageApiName: 'Home', // Page API name for dashboards,
            url: '', //Page url
            iconClass: window.location.href === 'https://clarienbank--developer.sandbox.my.site.com/s/' ? "logo dashboards is_active" : "logo dashboards in_active", // Icon class for dashboards
        },
        sendReceive: {
            pageApiName: '', // Page API name for sendReceive
            url: '', //Page url
            iconClass: String(window.location.href).includes("/s/transfers") ? "logo is_active" : "logo in_active", // Icon class for sendReceive
        },
        services: {
            pageApiName: '', // Page API name for services
            url: '', //Page url
            iconClass: String(window.location.href).includes("/s/profile/apply-now") ? "logo is_active" : "logo in_active", // Icon class for services
        },
        profile: {
            pageApiName: 'CBProfile__c', // Page API name for profile
            url: '/profile', //Page url
            iconClass: String(window.location.href).includes("/s/profile/profile-settings") ? "logo profile is_active" : "logo profile in_active" // Icon class for profile
        },
    }


    // Method to navigate to a named page
    // @param {string} pageName - The name of the page to navigate to
    navigateToPage(pageName) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageName
            }
        });
    }

    // Method to navigate to profile page
    navigateToProfileSettings() {
        this.navigateToPage(PROFILESETTINGS_PAGE);
    }

    // Method to navigate to home page
    navigateToHome() {
        this.navigateToPage(HOME_PAGE);
    }

    // Method to navigate to home page
    navigateToSendRecieve() {
        this.navigateToPage('CBTransfers__c');
    }


    // Method to navigate to home page
    navigateToServices() {
        this.navigateToPage('CBApplyNow__c');
    }

    /**
    * Deactivates the specified item identified by its API name.
    * @param {string} apiName - The API name of the item to be deactivated.
    */
    deactivateOtherItem(apiName) {
        let updatedItems = Object.keys(this.footerItems).map((key) => {
            if (this.footerItems[key].pageApiName === apiName) {
                return {
                    ...item, // Spread operator to clone item
                    iconClass: this.footerItems[key].iconClass.includes("in_active") ? this.footerItems[key].iconClass.replace("in_active", "is_active") : this.footerItems[key].iconClass.replace("is_active", "in_active")
                }
            } else {
                return {
                    ...item // Spread operator to clone item
                }
            }
        })
        this.footerItems = updatedItems
    }
}