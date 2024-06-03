import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { CurrentPageReference } from 'lightning/navigation';
import CBSVG from "@salesforce/resourceUrl/CBSVG"
export default class CBErrorComponent extends NavigationMixin(LightningElement) {

    CBBackIcon = `${CBSVG}/CBSVGs/CBBackIcon.svg#CBBackIcon`;
    userAuthenticated = false
    error = "Our systems are encountering an unexpected error. We're on it, though! Our team has been alerted, and they're already tackling the issue head-on"
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



    // @wire(CurrentPageReference)
    // urlDataHandler({data, error}) {
    //     if (data) {
    //         this.error = result.state.errorMsg ? result.state.errorMsg : ''
    //         this.previousPageUrl = result.state.previousPageUrl ? result.state.previousPageUrl : ''
    //     }else{
    //         console.log(JSON.stringify(error))
    //     }
    // };


    /**
    * Method to navigate back to the Login page 
    *
    * @return {void} 
    */
    // navigateBack() {
    //     window.history.back();
    //     // this[NavigationMixin.Navigate]({
    //     //     type: 'comm__namedPage',
    //     //     attributes: {
    //     //         name: this.previousPageUrl
    //     //     }
    //     // })
    // }

    handleOkClick() {
        // Logic to handle the OK button click
        window.history.back();
    }
}