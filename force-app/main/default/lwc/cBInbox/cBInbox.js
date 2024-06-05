import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality
import CBSVG from "@salesforce/resourceUrl/CBSVG"
import { setLocalStorage, getLocalStorage } from 'c/cBUtilities';


export default class CBInbox extends NavigationMixin(LightningElement) {

    CBNewMessage = `${CBSVG}/CBSVGs/CBNewMessage.svg#CBNewMessage`;

    /**
* Lifecycle hook invoked when the component is inserted into the DOM
* Loads the username, password from local session storage when the component is connected to the DOM.
* @returns {void}
*/
    connectedCallback() {
        this.setPagePath()
    }

    setPagePath() {
        if (getLocalStorage('pagePath')) {

            let path = getLocalStorage('pagePath')

            if(path.indexOf('CBInbox__c') !== -1){
                setLocalStorage('pagePath', path.substring(0, path.indexOf('CBInbox__c') + ('CBInbox__c').length))
                path = getLocalStorage('pagePath')
                this.configuration.previousPageUrl = path.split('.')[path.split('.').length-2]
            }
            else{
                this.configuration.previousPageUrl = path.split('.')[path.split('.').length-1]
                setLocalStorage('pagePath', `${path}.CBInbox__c`)
                console.log('inbox path',getLocalStorage('pagePath'))
            }
        }
        else {
            setLocalStorage('pagePath', 'Home')
        }
        console.log('previousPageUrl',this.configuration.previousPageUrl);
    }

    messages = [
        {
            id: 1,
            name: 'Ajay Lorem',
            message: 'Bank detail please'
        },
        {
            id: 2,
            name: 'Anish Joseph',
            message: 'Gold Loan Interest'
        },
        {
            id: 3,
            name: 'Subri Joseph',
            message: 'How to open FD account'
        },
        {
            id: 4,
            name: 'John',
            message: 'How to open RD account'
        },
        {
            id: 5,
            name: 'Alex',
            message: 'How to withdraw cash from account'
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
            exposed: true
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