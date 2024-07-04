import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality
import CBSVG from "@salesforce/resourceUrl/CBSVG"
import { setPagePath } from 'c/cBUtilities';

import RECENT_MESSAGES from '@salesforce/label/c.CB_RecentMessages';
import INBOX_PAGE from '@salesforce/label/c.CB_Page_Inbox';
import INBOX from '@salesforce/label/c.CB_Inbox';
import CREATE_MESSAGE_PAGE from '@salesforce/label/c.CB_Page_CreateMessage';

export default class CBInbox extends NavigationMixin(LightningElement) {

    label = {
        RECENT_MESSAGES
    }

    // url for new message icon
    CBNewMessage = `${CBSVG}/CBSVGs/CBNewMessage.svg#CBNewMessage`;

    /**
    * Lifecycle hook invoked when the component is inserted into the DOM
    * Loads the username, password from local session storage when the component is connected to the DOM.
    * @returns {void}
    */
    connectedCallback() {
        this.configuration.previousPageUrl = setPagePath(INBOX_PAGE)
        console.log(this.configuration.previousPageUrl);
    }

    // array to hold sample message details
    messages = [
        {
            id: 1,
            shortcut: 'AI',
            name: 'Account Info',
            message: 'Cannot access the newly opened account',
            time: 'yesterday'
        },
        {
            id: 2,
            shortcut: 'AI',
            name: 'Account Info',
            message: 'Can we convert the account type',
            time: '2 days ago'
        },
        {
            id: 3,
            shortcut: 'TI',
            name: 'Technical Issue',
            message: 'Unaable to acc the biometric',
            time: '3 days ago'
        },
        {
            id: 4,
            shortcut: 'AR',
            name: 'Appointment Request',
            message: 'Need to open an Saving Account',
            time: '7 days ago'
        },
        {
            id: 5,
            shortcut: 'AR',
            name: 'Appointment Request',
            message: 'Need to open an Saving Account',
            time: '8 days ago'
        },
    ]

    // getMessage() {
    //     return this.messages.map((msg)=> {
    //         const nameArr = msg.name.split(' ');
    //         let initial = '';
    //         for(let part of nameArr) {
    //             initial += part[0].toUpperCase();
    //         }
    //         return {...msg, initial};
    //     });
    // }

    // configuration for secondary header
    configuration = {
        previousPageUrl: '',
        heading: INBOX,
        iconsExposed: true,
        logout: {
            exposed: true
        },
        search: {
            exposed: false
        }
    }

    // navigate to create message page
    naviagteToCreateMessage() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: CREATE_MESSAGE_PAGE
            }
        });
    }
}