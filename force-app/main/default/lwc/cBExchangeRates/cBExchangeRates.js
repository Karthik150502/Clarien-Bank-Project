/*
    Author - Mahalakshmi
    Created Date - 06/03/2024
    Modified Date - 21/03/2024
    Description - "Exchange Rates, displaying the current day's Exchange Rates"
*/


// Ṣalesforce Plugins and variables
import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';


// Custom Labels
import TODAYS_EXCHANGE_RATES from '@salesforce/label/c.CB_TodaysExchangeRates';
import MONTH from '@salesforce/label/c.CB_Month';
import MONTHS from '@salesforce/label/c.CB_Months';
import BUY from '@salesforce/label/c.CB_Buy';
import SELL from '@salesforce/label/c.CB_Sell';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

import fetchExchangeRate from "@salesforce/apex/CBApiController.fetchExchangeRate";
import LOGIN_PAGE from '@salesforce/label/c.CB_Page_Login';

// JS Scripts
import { } from 'c/cBUtilities';

export default class CBExchangeRates extends NavigationMixin(LightningElement) {

    CBBackIcon = `${CBSVG}/CBSVGs/CBBackIcon.svg#CBBackIcon`;

    // Custom labels
    label = {
        TODAYS_EXCHANGE_RATES,
        MONTH,
        MONTHS,
        BUY,
        SELL,
    }


    hasRendered = false
    isPageLoading = true
    exchangeRates = []




    @wire(fetchExchangeRate, { reqWrapper: { metadataName: 'CB_GET_Exchange_Rates' } })
    exchangeRateHandler({ data, error }) {
        if (data) {
            this.exchangeRates = JSON.parse(data)?.fxRateList
            console.log(data)
            console.log(this.exchangeRates);
        } else {
            console.log(error);
        }
    }





    renderedCallback() {
        if (!this.hasRendered) {
            this.hasRendered = true
        }
    }




    /**
     * Method to navigate back to the Login page 
     *
     * @return {void} 
    */
    navigateBack() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: LOGIN_PAGE
            }
        })
    }



}