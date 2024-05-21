/*
    Author - Mahalakshmi
    Created Date - 06/03/2024
    Modified Date - 21/03/2024
    Description - "Contact Us popover, Close popover, KeyPad Open in Mobiles, Map open in Mobiles"
*/

// Ṣalesforce Plugins and variables
import { LightningElement } from 'lwc'; // Importing LightningElement base class

import CBSVG from "@salesforce/resourceUrl/CBSVG"

// Custom Labels
import CLOSE_DIALOG from '@salesforce/label/c.CB_CloseDialog'; // Importing custom label for close dialog text
import ClarienAtmLattitude from '@salesforce/label/c.CB_Bank_Location_Latitude'; // Importing custom label for close dialog text
import ClarienAtmLongitude from '@salesforce/label/c.CB_Bank_Location_Longitude'; // Importing custom label for close dialog text


export default class CBLoginContactUs extends LightningElement {

    CBCloseContactUs = `${CBSVG}/CBSVGs/CBCloseContactUs.svg#CBCloseContactUs`;
    CBAddress = `${CBSVG}/CBSVGs/CBAddress.svg#CBAddress`;
    CBClock = `${CBSVG}/CBSVGs/CBClock.svg#CBClock`;

    clarienAtmLattitude = ClarienAtmLattitude
    clarienAtmLongitude = ClarienAtmLongitude
    clarienBankAtmLocation = "https://maps.google.com/maps?q=" + this.clarienAtmLattitude + this.clarienAtmLongitude

    // Custom Labels
    label = {
        CLOSE_DIALOG // Assigning custom label to a property for close dialog text
    };

    // Initial properties 
    companyName = 'Clarien Head Office';
    workingDays = 'Monday - Friday';
    timings = '8:30am - 5:00pm';
    phoneNumber = '+1 441 296 6969';
    addressLine1 = `Point House, 6 Front Street,`;
    addressLine2 = `Ground Floor, Hamilton HM11`;


    /**
     * Method to fire a custom event notifying to close the popover from the child 
     *
     * @return {void} 
    */
    closeContact() {
        this.dispatchEvent(new CustomEvent('closecontactus', {
            bubbles: true, //Event Bubbling set to true
            detail: {} // No additional detail sent with the event
        }));
    }

    /**
     * Opening the mobile phone number keypad
     *
     * @return {void} 
    */
    openPhoneApp() {
        window.location.href = `tel:${this.phoneNumber}`;
    }

    /**
     * Opening the Map in the device 
     *
     * @return {void} 
    */
    openMapsApp() {
        window.location.href = this.clarienBankAtmLocation //Opening the Map for Clarien Bank ATM
    }
}