import { LightningElement, wire } from 'lwc';

import { NavigationMixin, CurrentPageReference } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality

// Importing labels for easy manipulation of the data in labels
import CB_Page_Applynow from '@salesforce/label/c.CB_Page_Applynow';
import SUBMIT from '@salesforce/label/c.CB_Submit';
import CARD from '@salesforce/label/c.CBMakeARequest_Card';
import COUNTRY from '@salesforce/label/c.CB_Country';
import STATE from '@salesforce/label/c.CB_State';
import FROM_DATE from '@salesforce/label/c.CB_FromDate';
import TO_DATE from '@salesforce/label/c.CB_ToDate';
import TRAVEL_NOTIFICATION from '@salesforce/label/c.CB_TravelNotification';
import Page_TravelNotification from '@salesforce/label/c.CB_Page_Travelnotification';
import YOURREQUESTISSUB from '@salesforce/label/c.CB_YourRequestIsSub';
import OK_BUTTON from '@salesforce/label/c.CB_Ok';
import CANCEL_BUTTON from '@salesforce/label/c.CB_Cancel';

export default class CBTravelNotificationConfirmation extends NavigationMixin(LightningElement) {

    // Labels for UI elements
    label = {
        SUBMIT,
        CARD,
        COUNTRY,
        STATE,
        FROM_DATE,
        TO_DATE
    }

    // configuration for secondaey heading
    configuration = {
        previousPageUrl: Page_TravelNotification,
        heading: TRAVEL_NOTIFICATION,
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    /**
    * Retrieves the 'cardType' value from the page reference state using a wire adapter.
    * @returns {string} - The 'cardType' value from the page reference state.
    */
    @wire(CurrentPageReference) pageRef;
    get cardType() {
        return this.pageRef && this.pageRef.state.cardType;
    }
    /**
    * Retrieves the 'country' value from the page reference state using a wire adapter.
    * @returns {string} - The 'country' value from the page reference state.
    */
    get country() {
        return this.pageRef && this.pageRef.state.country;
    }
    /**
    * Retrieves the 'state' value from the page reference state using a wire adapter.
    * @returns {string} - The 'state' value from the page reference state.
    */
    get state() {
        return this.pageRef && this.pageRef.state.state;
    }

    /**
    * Retrieves the 'fromDate' value from the page reference state using a wire adapter.
    * @returns {string} - The 'fromDate' value from the page reference state.
    */
    get fromDate() {
        return this.pageRef && this.pageRef.state.fromDate;
    }

    /**
    * Retrieves the 'toDate' value from the page reference state using a wire adapter.
    * @returns {string} - The 'toDate' value from the page reference state.
    */
    get toDate() {
        return this.pageRef && this.pageRef.state.toDate;
    }

    successModalOpen = false;

    /**
    * Configuration object for the success modal.
    * Defines the title, message, and settings for the OK and Cancel buttons.
    */
    successModalconfig = {
        title: YOURREQUESTISSUB,
        message: '',
        okButton: {
            exposed: true,
            label: OK_BUTTON,
            function: () => {
                this.navigateBack();
            }
        },
        noButton: {
            exposed: false,
            label: CANCEL_BUTTON,
            function: () => {
            }
        },
        alertMsg: ''
    }

    /**
    * Navigates back to the apply now page.
    * Uses the NavigationMixin to perform the navigation.
    */
    submitForm() {
        this.successModalOpen = true
    }

    /**
     * Navigates back to the apply now page.
     * Uses the NavigationMixin to perform the navigation.
     */
    navigateBack() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: CB_Page_Applynow
            }
        });
    }
}