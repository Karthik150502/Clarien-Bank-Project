import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { CurrentPageReference } from 'lightning/navigation';
import CBSVG from "@salesforce/resourceUrl/CBSVG"
export default class CBErrorComponent extends NavigationMixin(LightningElement) {

    CBBackIcon = `${CBSVG}/CBSVGs/CBBackIcon.svg#CBBackIcon`;
    userAuthenticated = true
    error = 'Some Error Occured!'
    previousPageUrl = ''
    // Object to manage header icons
    header_icons = {
        // Announcements icon settings
        announcements: {
            exposed: true,  // Whether to display the Announcements icon
            haveItems: true // Whether the Announcements icon has items to display
        },
        // Whether to display the Announcements icon
        notifications: {
            exposed: true,  // Whether to display the Notifications icon
            haveItems: true // Whether the Notifications icon has items to display
        },
        // Inbox icon settings
        inbox: {
            exposed: true,  // Whether to display the Inbox icon
            haveItems: true // Whether the Inbox icon has items to display
        },
        // Scan Code icon settings
        scanCode: {
            exposed: false, // Whether to display the Scan Code icon
            haveItems: false    // Whether the Scan Code icon has items to display
        }
    };



    @wire(CurrentPageReference)
    urlDataHandler(result) {
        if (result.state) {
            this.error = result.state.errorMsg ? result.state.errorMsg : ''
            this.previousPageUrl = result.state.previousPageUrl ? result.state.previousPageUrl : ''
        }
    };


    /**
    * Method to navigate back to the Login page 
    *
    * @return {void} 
    */
    navigateBack() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: this.previousPageUrl
            }
        })
    }
}