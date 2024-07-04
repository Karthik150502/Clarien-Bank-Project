import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality

// Importing labels for easy manipulation of the data in labels
import FROM_DATE from '@salesforce/label/c.CB_FromDate';
import TO_DATE from '@salesforce/label/c.CB_ToDate';
import SUBMIT from '@salesforce/label/c.CB_Submit';
import SELECT_CARD from '@salesforce/label/c.CB_SelectCard';
import SELECT_COUNTRY from '@salesforce/label/c.CB_SelectCountry';
import SELECT_STATE from '@salesforce/label/c.CB_SelectState';
import TRAVEL_DATE from '@salesforce/label/c.CB_TravelDate';
import IF_USA_CHOOSE_UNITEDSTATES from '@salesforce/label/c.CB_IfUSAChooseUnitedStates';
import ANY_OTHER_COUNTRY_CHOOSE_INTERNATIONAL from '@salesforce/label/c.CB_AnyOtherCountriesChooseInternational';
import TRAVEL_NOTIFICATION from '@salesforce/label/c.CB_TravelNotification';
import CB_Page_Applynow from '@salesforce/label/c.CB_Page_Applynow';
import NEXT from '@salesforce/label/c.CB_Next';
import PAGE_TRAVELNOTIFICATIONCONFIRMATION from '@salesforce/label/c.CB_Page_TravelNotificationConfirmation';
import SELECT from '@salesforce/label/c.CB_Select'; // Label for select option

import { formatDate } from 'c/cBUtilities'; // Importing utility methods

import CBSVG from "@salesforce/resourceUrl/CBSVG" // Importing SVG file from Static Resource

export default class CBTravelNotification extends NavigationMixin(LightningElement) {

    // Labels for UI elements
    label = {
        FROM_DATE,
        TO_DATE,
        NEXT,
        SUBMIT,
        SELECT,
        SELECT_CARD,
        SELECT_COUNTRY,
        SELECT_STATE,
        TRAVEL_DATE,
        IF_USA_CHOOSE_UNITEDSTATES,
        ANY_OTHER_COUNTRY_CHOOSE_INTERNATIONAL
    }

    //SVG's from static resource
    CBCalendar = `${CBSVG}/CBSVGs/CBCalendar.svg#CBCalendar`;

    // configuration for secondary header
    configuration = {
        previousPageUrl: CB_Page_Applynow,
        heading: TRAVEL_NOTIFICATION,
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    cardTypeList = [ 'Credit Card', 'Debit Card']
    countryList = [ 'United States', 'International']
    stateList =  [
          {"name": "Alabama", "abbr": "AL"},
          {"name": "Alaska", "abbr": "AK"},
          {"name": "Arizona", "abbr": "AZ"},
          {"name": "Arkansas", "abbr": "AR"},
          {"name": "California", "abbr": "CA"},
          {"name": "Colorado", "abbr": "CO"},
          {"name": "Connecticut", "abbr": "CT"},
          {"name": "Delaware", "abbr": "DE"},
          {"name": "Florida", "abbr": "FL"},
          {"name": "Georgia", "abbr": "GA"},
          {"name": "Hawaii", "abbr": "HI"},
          {"name": "Idaho", "abbr": "ID"},
          {"name": "Illinois", "abbr": "IL"},
          {"name": "Indiana", "abbr": "IN"},
          {"name": "Iowa", "abbr": "IA"},
          {"name": "Kansas", "abbr": "KS"},
          {"name": "Kentucky", "abbr": "KY"},
          {"name": "Louisiana", "abbr": "LA"},
          {"name": "Maine", "abbr": "ME"},
          {"name": "Maryland", "abbr": "MD"},
          {"name": "Massachusetts", "abbr": "MA"},
          {"name": "Michigan", "abbr": "MI"},
          {"name": "Minnesota", "abbr": "MN"},
          {"name": "Mississippi", "abbr": "MS"},
          {"name": "Missouri", "abbr": "MO"},
          {"name": "Montana", "abbr": "MT"},
          {"name": "Nebraska", "abbr": "NE"},
          {"name": "Nevada", "abbr": "NV"},
          {"name": "New Hampshire", "abbr": "NH"},
          {"name": "New Jersey", "abbr": "NJ"},
          {"name": "New Mexico", "abbr": "NM"},
          {"name": "New York", "abbr": "NY"},
          {"name": "North Carolina", "abbr": "NC"},
          {"name": "North Dakota", "abbr": "ND"},
          {"name": "Ohio", "abbr": "OH"},
          {"name": "Oklahoma", "abbr": "OK"},
          {"name": "Oregon", "abbr": "OR"},
          {"name": "Pennsylvania", "abbr": "PA"},
          {"name": "Rhode Island", "abbr": "RI"},
          {"name": "South Carolina", "abbr": "SC"},
          {"name": "South Dakota", "abbr": "SD"},
          {"name": "Tennessee", "abbr": "TN"},
          {"name": "Texas", "abbr": "TX"},
          {"name": "Utah", "abbr": "UT"},
          {"name": "Vermont", "abbr": "VT"},
          {"name": "Virginia", "abbr": "VA"},
          {"name": "Washington", "abbr": "WA"},
          {"name": "West Virginia", "abbr": "WV"},
          {"name": "Wisconsin", "abbr": "WI"},
          {"name": "Wyoming", "abbr": "WY"}
        ]
        
    isInternational = false
    cardType = '';
    country = 'International';
    state = '';

    get countryInternational() {
        return this.country === 'International'
    }
    /**
    * Handles the change event for the card type selection.
    * Updates the cardType variable with the selected value.
    * 
    * @param {Event} event - The change event triggered by the card type selection
    */
    cardHandler(event) {
        this.cardType = event.target.value;
    }
    /**
    * Handles the change event for the country selection.
    * Updates the country variable with the selected value.
    * 
    * @param {Event} event - The change event triggered by the country selection
    */
    countryHandler(event) {
        this.country = event.target.value;
    }
    /**
     * Handles the change event for the state selection.
     * Updates the state variable with the selected value.
     * 
     * @param {Event} event - The change event triggered by the state selection
     */
    stateHandler(event) {
        this.state = event.target.value;
    }

    @track fromDate = 'DD/MM/YYYY'
    @track toDate = 'DD/MM/YYYY'

    /**
 * Opens the date picker for the 'fromDate' input field.
 * Updates the 'fromDate' variable with the selected date or sets it to 'YYYY-MM-DD' if no date is selected.
 */
    openFromDate() {
        let fromDate = this.template.querySelector('.from-date-invis')
        fromDate.showPicker()
        this.fromDate = this.template.querySelector('.from-date-invis').value ? this.template.querySelector('.from-date-invis').value : 'DD/MM/YYYY';
    }
    /**
     * Opens the date picker for the 'toDate' input field.
     * Updates the 'toDate' variable with the selected date or sets it to 'YYYY-MM-DD' if no date is selected.
     */
    openToDate() {
        let toDate = this.template.querySelector('.to-date-invis')
        toDate.showPicker()
        this.toDate = this.template.querySelector('.to-date-invis').value ? this.template.querySelector('.to-date-invis').value : 'DD/MM/YYYY';
    }
    /**
     * Handles the change event for the 'fromDate' input field.
     * Updates the 'fromDate' variable with the selected date.
     * 
     * @param {Event} event - The change event triggered by the 'fromDate' input field
     */
    fromDateHandler(event) {
        this.fromDate = formatDate(event.target.value)
    }
    /**
     * Handles the change event for the 'toDate' input field.
     * Updates the 'toDate' variable with the selected date.
     * 
     * @param {Event} event - The change event triggered by the 'toDate' input field
     */
    toDateHandler(event) {
        this.toDate = formatDate(event.target.value)
    }
    /**
     * Computes the disable status of the submit button.
     * Returns true if any of the required fields (cardType, country, state, fromDate, toDate) are not properly selected or filled.
     * 
     * @returns {boolean} - Indicates whether the submit button should be disabled
     */
    get submitDisable() {
        if(this.countryInternational){
            return this.cardType == 'Select' || this.country == 'Select' || this.cardType == '' || this.country == '' || this.fromDate === 'DD/MM/YYYY' || this.toDate === '' || this.toDate === '' || this.toDate === 'DD/MM/YYYY';
        }
        else{
            return this.cardType == 'Select' || this.country == 'Select' || this.state == 'Select' || this.cardType == '' || this.country == '' || this.state == '' || this.fromDate === 'DD/MM/YYYY' || this.toDate === '' || this.toDate === '' || this.toDate === 'DD/MM/YYYY';
        }
    }
    /**
     * Handles the submit event.
     * Navigates to the travel notification confirmation page.
     */
    handleSubmit() {
        this.navigateToTravelNotificationConfirmation(PAGE_TRAVELNOTIFICATIONCONFIRMATION);
    }
    /**
     * Navigates to the specified page with the current form data as state.
     * 
     * @param {string} PageApi - The API name of the page to navigate to
     */
    navigateToTravelNotificationConfirmation(PageApi) {
        console.log('navigate called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: PageApi
            },
            state: {
                cardType: this.cardType,
                country: this.country,
                state: this.state,
                fromDate: this.fromDate,
                toDate: this.toDate
            }
        });
    }
}