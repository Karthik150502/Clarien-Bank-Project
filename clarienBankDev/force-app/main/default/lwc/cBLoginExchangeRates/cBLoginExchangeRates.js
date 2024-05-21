/*
    Author - Mahalakshmi
    Created Date - 06/03/2024
    Modified Date - 21/03/2024
    Description - "Exchange Rates popover, Close popover, exapand button to open the Exchanges Rates Page"
*/


// Ṣalesforce Plugins and variables
import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

// Custom Labels
import TODAYS_EXCHANGE_RATES from '@salesforce/label/c.CB_TodaysExchangeRates';
import MONTH from '@salesforce/label/c.CB_Month';
import MONTHS from '@salesforce/label/c.CB_Months';
import BUY from '@salesforce/label/c.CB_Buy';
import SELL from '@salesforce/label/c.CB_Sell';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBLoginExchangeRates extends NavigationMixin(LightningElement) {

CBExpand = `${CBSVG}/CBSVGs/CBExpand.svg#CBExpand`;

    // Custom Labels
    label = {
        TODAYS_EXCHANGE_RATES,
        MONTH,
        MONTHS,
        BUY,
        SELL,
    }


    // Current day's Exchange Rates 
    @api exchangeRates = []


    /**
     * Method to fire a custom event notifying to close the popover from the child 
     *
     * @return {void}
    */
    closeExchangeRates() {
        this.dispatchEvent(new CustomEvent('closeexchanegrates', {
            bubbles: true,
            detail: {

            }
        }))
    }


    /**
     * Method that navigates to the Exchange Rates page
     *
     * @return {void} 
    */
    expandPage() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'CBExchangeRates__c'
            }
        })
    }


}