/*
    Author - Mahalakshmi
    Created Date - 06/03/2024
    Modified Date - 21/03/2024
    Description - "Login Footer, Contact Us Popover, help redirection, ATM Locater Popover and Exchange Rates Popover"
*/


// Ṣalesforce Plugins and variables
import { LightningElement, api } from 'lwc'; // Importing LightningElement base class and api decorator
import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality


// Custom Labels
import CONTACT_US from '@salesforce/label/c.CB_ContactUs'; // Importing custom label for Contact Us
import HELP from '@salesforce/label/c.CB_Help'; // Importing custom label for Help
import ATM_LOCATOR from '@salesforce/label/c.CB_ATMLocator'; // Importing custom label for ATM Locator
import EXCHANGE_RATES from '@salesforce/label/c.CB_ExchangeRates'; // Importing custom label for Exchange Rates

export default class CBLoginFooter extends NavigationMixin(LightningElement) {

    // Properties to control visibility of contact us and ATM locator popovers
    showContactUs = false;
    showAtmLocator = false;

    // Object to hold imported labels
    label = {
        CONTACT_US, // Contact Us label
        HELP, // Help label
        ATM_LOCATOR, // ATM Locator label
        EXCHANGE_RATES // Exchange Rates label
    };

    // Initial footer Item configutaion, Property to pass footer item info from parent component
    @api footerItemInfo = {}; 

    /**
     * Event handler for opening the Contact Us popover
     *
     * @return {void} 
    */
    openContactPopOver(event) {
        this.dispatchEvent(new CustomEvent('opencontactus', {
            bubbles: true,
            detail: {} // No additional detail sent with the event
        }));
    }

    /**
     * Event handler for opening the ATM Locator popover
     *
     * @return {void} 
    */
    openAtmLocaterPopOver(event) {
        this.dispatchEvent(new CustomEvent('openatmlocater', {
            bubbles: true,
            detail: {} // No additional detail sent with the event
        }));
    }

    

    /**
     * Event handler for opening the Exchange Rates popover
     *
     * @return {void} 
    */
    openExchangeRatesPopOver() {
        this.dispatchEvent(new CustomEvent('openexchanegrates', {
            bubbles: true,
            detail: {} // No additional detail sent with the event
        }));
    }

    /**
     * Method to open the Help page in a new tab
     *
     * @return {void} 
    */
    openHelpPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: 'https://clarienbank.com' // URL for Help page
            }
        }).then((url) => {
            window.location.href = url; // Redirecting to the Help page
        });
    }
}