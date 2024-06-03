import { LightningElement } from 'lwc';

export default class CBCreateMessage extends LightningElement {

    configuration = {
        previousPageUrl: 'CBInbox__c',
        heading: 'Create Message',
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }, favorite: {
            selected: false
        }
    }
}