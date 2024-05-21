/*
    Author - Mahalakshmi
    Created Date - 06/03/2024
    Modified Date - 21/03/2024
    Description - "ATM Locater popover, Close popover, exapand button to open the Clarien Bank ATM Locater Page"
*/


// Ṣalesforce Plugins and variables
import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality
import { loadStyle } from 'lightning/platformResourceLoader'; // Importing loadStyle to load CSS resources

// Static Resource
import customMapStyle from '@salesforce/resourceUrl/MapCustomCss'; // Importing custom map CSS resource
import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBAtmMap extends NavigationMixin(LightningElement) {

    CBExpand = `${CBSVG}/CBSVGs/CBExpand.svg#CBExpand`;

    // Initial Properties
    markersTitle = "Clarien Bank ATMs"; // Title for the map markers
    mapMarkers = [
        {
            location: {
                Latitude: '32.29147984121012',
                Longitude: '-64.78669250244639',
            },
        },
    ]; // Initial map marker configuration
    markersTitle = ''; // Empty title for map markers
    selectedMarker; // Placeholder for selected marker



    /**
     * lifecysle Hook - connectedCallback 
     *
     * @return {void} 
    */
    connectedCallback() {
        // Loading custom map style CSS
        this.loadResources()
    }


    /**
     * Method that loads the recources from static resources - Loads the Custom Map CSS
     *
     * @return {void} 
    */
    loadResources(){
        Promise.all([
            loadStyle(this, customMapStyle) // Load custom map style
        ]).then(() => {
            console.log("Custom Map Style Loaded.."); // Logging success message
        }).catch(error => {
            console.log('an error occured--> ' + JSON.stringify(error)); // Logging error message if style loading fails
        });
    }


    /**
     * Method that navigates to the Clarien Map ATM locater page
     *
     * @return {void} 
    */
    openAtmLocator() {
        // Method to navigate to ATM locator parent component
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'CBAtmMapParent__c' // Navigate to CBAtmMapParent__c page
            }
        });
    }

}