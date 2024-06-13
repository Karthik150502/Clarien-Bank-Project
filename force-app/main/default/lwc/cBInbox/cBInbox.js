import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality
import CBSVG from "@salesforce/resourceUrl/CBSVG"
import { setPagePath } from 'c/cBUtilities';


export default class CBInbox extends NavigationMixin(LightningElement) {

    CBNewMessage = `${CBSVG}/CBSVGs/CBNewMessage.svg#CBNewMessage`;

    /**
* Lifecycle hook invoked when the component is inserted into the DOM
* Loads the username, password from local session storage when the component is connected to the DOM.
* @returns {void}
*/
    connectedCallback() {
        this.configuration.previousPageUrl = setPagePath('CBInbox__c')
        console.log(this.configuration.previousPageUrl);
    }

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


    configuration = {
        previousPageUrl: '',
        heading: 'Inbox',
        iconsExposed: true,
        logout: {
            exposed: true
        },
        search: {
            exposed: false
        }
    }

    naviagteToCreateMessage() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'CBCreateMessage__c'
            }
        });
    }
}