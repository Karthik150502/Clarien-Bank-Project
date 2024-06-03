import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality
import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBInbox extends NavigationMixin(LightningElement) {

    CBNewMessage = `${CBSVG}/CBSVGs/CBNewMessage.svg#CBNewMessage`;

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