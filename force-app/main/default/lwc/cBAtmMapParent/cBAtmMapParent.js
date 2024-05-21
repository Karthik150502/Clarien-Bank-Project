/*
    Author - __
    Created Date - 2024-03-13
    Modified Date - 2024-03-13,2024-03-16,2024-03-20
    Description - This component displays a map with available ATM locations and provides details of the selected location.
     Users can also navigate to a selected location by clicking on the direction icon.
*/

import { LightningElement, track } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import { NavigationMixin } from 'lightning/navigation';

import getLocations from "@salesforce/apex/CBATMLocationController.getATMLocations";
import customMapStyle from '@salesforce/resourceUrl/MapCustomCss2'
import PNGS from '@salesforce/resourceUrl/PngLogos'
import CBSVG from "@salesforce/resourceUrl/CBSVG"

import LOGIN_PAGE from '@salesforce/label/c.CB_Page_Login';

export default class CBAtmMapParent extends NavigationMixin(LightningElement) {

    CBBackIcon = `${CBSVG}/CBSVGs/CBBackIcon.svg#CBBackIcon`;

    deviceType = ''; // Represents the type of device.
    openMapIcon = PNGS + '/Images/OpenMapLogo.png'; // URL for the open map icon image.
    mapOptions = {
        disableDefaultUI: true
    }; // Configuration options for the map.
    @track mapMarkers = []; // Array of map markers representing locations.
    @track center = {}
    selectedMarkerValue = ''; // Value of the selected marker.
    selectedLocation = {}; // Details of the selected location.
    /**
     * Lifecycle hook invoked when the component is inserted into the DOM
     * Checks the device type and loads resources when the component is connected to the DOM.
     * @returns {void}
     */
    connectedCallback() {
        this.checkDevice()
        this.loadResources()
    }

    /**
     * Method to load resources asynchronously
     * Loads custom map style and location data asynchronously.
     * @returns {void}
     */
    loadResources() {
        Promise.all([
            loadStyle(this, customMapStyle), getLocations()
        ]).then((result) => {
            this.loadMapMarkers(result[1])
            console.log("All Resources Loaded...!")
            console.log('Result-->' + JSON.stringify(result));
        }).catch(error => {
            console.log('An error occured--> ' + JSON.stringify(error))
        })
    }


    /**
 * Method to load map markers based on the provided result
 * @param {Object[]} result - An array of locations containing data for map markers
 * @returns {void}
 */
    loadMapMarkers(result) {
        let res = result.map((location) => {

            let markerDetail = {
                location: {
                    Latitude: location.Geolocation__Latitude__s ? location.Geolocation__Latitude__s : '',
                    Longitude: location.Geolocation__Longitude__s ? location.Geolocation__Longitude__s : '',
                },
                value: location.Id ? location.Id : '',
                url: this.deviceType === 'iOS Device' ? location.Map_URL__c.replace('application', 'apple') : this.deviceType === 'Android Device' ? location.Map_URL__c.replace('application', 'google') : 'application',
                address: location.Address__c ? location.Address__c : '',
                atmName: location.Name ? location.Name : '',
                status: location.Status__c ? location.Status__c : '',
                mapIcon: {
                    path: 'M64 1C38.8 1 18.3 21.2 18.3 46S64 127 64 127s45.7-56.2 45.7-81S89.2 1 64 1zm0 73.9c-16.6 0-30-13.2-30-29.5C34 29 47.4 15.8 64 15.8S94 29 94 45.3 80.6 74.9 64 74.9z',
                    fillColor: location.Status__c === 'In Service' ? '#5e8b03' : '#ae0808',
                    scale: .25,
                    fillOpacity: 1,
                    strokeWeight: 0,
                    anchor: { x: 122.5, y: 115 }
                }
            }
            return markerDetail
        })

        this.mapMarkers = res
        this.selectedMarkerValue = res[0].value
    }
    /**
 * Method to close the card
 * Closes the location details card by setting the cardOpened property to false.
 * @returns {void}
 */
    closeCard() {
        this.cardOpened = false
    }

    /**
 * Event handler method for handling marker selection
 * Sets the selectedMarkerValue and selectedLocation based on the marker selected on the map.
 * @param {Event} event - The event object representing the marker selection event
 * @returns {void}
 */
    callMarkerHandler(event) {
        let updatedaMarkers = this.mapMarkers.map((element) => {
            let gotElement = element.value === event.target.selectedMarkerValue
            if (gotElement) {
                this.selectedLocation = { ...element }
                this.center = {
                    location: { Latitude: element.location.Latitude, Longitude: element.location.Longitude },
                }
            }
            let locationMarker = {
                ...element,
                mapIcon: {
                    ...element.mapIcon,
                    scale: gotElement ? 0.35 : 0.25,
                }
            }
            return locationMarker
        })
        this.mapMarkers = updatedaMarkers
        this.cardOpened = true
        console.log("Selected Marker...!");
    }
    /**
  * Method to navigate back to the login page
  * Navigates back to the login page using NavigationMixin.
  * @returns {void}
  */
    navigateBack() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: LOGIN_PAGE
            }
        })
    }

    /**
 * Getter method to determine the CSS class for status based on selected location's status
 * Returns the CSS class for the status based on the selected location's status.
 * @returns {string} - The CSS class for the status
 */
    get statusClass() {
        return this.selectedLocation.status === 'In Service' ? 'field-data status Active' : 'field-data status in-Active'
    }


    /**
     * Method to check the device type
     * Checks the user agent to determine the device type.
     * @returns {void}
     */
    checkDevice() {
        // Check the user agent to determine the device type
        const userAgent = navigator.userAgent;

        // Determine the device type based on the user agent
        if (userAgent.match(/iPhone|iPod|iPad/i)) {
            this.deviceType = 'iOS Device';
        } else if (userAgent.match(/Android/i)) {
            this.deviceType = 'Android Device';
        } else {
            this.deviceType = 'Unknown Device';
        }
    }

    /**
     * Method to navigate to the location URL if available
     * Navigates to the location URL (e.g., Google Maps URL) if available.
     * @returns {void}
     */
    openBrowserMap() {
        if (this.selectedLocation.url) {
            try {
                window.location.href = this.selectedLocation.url
            } catch (error) {
                console.log("Couldn't get to the maps:" + error.message())
            }
        }
    }
}