/*
	Author - Aditya
	Created Date - 08/03/2024
	Modified Date - 12/03/2024, 21/03/2024
	Description -  This component imports a default profile image resource and sets up metadata for profile items such as profile information,
                profile settings, service requests, and security settings. It includes logic in the connectedCallback() lifecycle hook
                for any initialization tasks and provides a getter method to dynamically set the background image for the profile based
                on the imported default image resource.
*/

import { LightningElement } from 'lwc';
import LOGIN_FLOW_IMAGES from '@salesforce/resourceUrl/LoginFlowImages';

export default class CBProfile extends LightningElement {
    // Default profile image path
    profileDefualtImage = LOGIN_FLOW_IMAGES + '/Images/defualtProfile.png';
    // Profile items metadata
    profileItems = {
        previousPageUrl: 'Home',    // URL of the previous page
        heading: '',    // Heading for the profile section
        profileInfo: true,  // Flag to show profile information
        profileSettings: {
            exposed: false  // Flag to indicate if profile settings are exposed
        },
        profile: {
            exposed: true   // Flag to indicate if profile is exposed
        },
        serviceRequest: {
            exposed: false  // Flag to indicate if service request is exposed
        },
        securitySettings: {
            exposed: false  // Flag to indicate if security settings are exposed
        },
        applyNow: {
            exposed: false
        },
        chequeBook: {
            exposed: false
        }
    };

    // Lifecycle hook that runs when the component is initialized
    connectedCallback() {
        // Logic to execute on component initialization
    }

    // Getter method for profile default background image
    get profileDefault() {
        // Returns the background image URL for the profile section
        return `background-image: url(${this.profileDefualtImage})`;
    }
}