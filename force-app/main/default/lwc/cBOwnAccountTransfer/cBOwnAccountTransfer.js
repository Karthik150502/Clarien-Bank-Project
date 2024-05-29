import { LightningElement } from 'lwc';

export default class CBOwnAccountTransfer extends LightningElement {

    configuration = {
        previousPageUrl: 'CBTransfers__c',
        heading: 'Own Account Transfer',
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