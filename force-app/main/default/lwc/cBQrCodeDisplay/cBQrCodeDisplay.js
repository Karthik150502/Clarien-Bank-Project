import { LightningElement, wire } from 'lwc';

import { CurrentPageReference } from 'lightning/navigation';
import { NavigationMixin } from 'lightning/navigation';

export default class CBQrCodeDisplay extends NavigationMixin(LightningElement) {



    @wire(CurrentPageReference)
    pageRefHandler({ state }) {
        if (state) {
            this.accountNo = state.accountNo ? state.accountNo : ''
        }
    }

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



    headerConfguration = {
        previousPageUrl: 'CBQrCodeGeneration__c',
        heading: "Receive Money",
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        },
        favorite: {
            selected: false
        }
    }





    accountNo = ''
    accountHolder = 'S. SMITH'


    connectedCallback() {
    }

    get maskedAccountNo() {
        let accNo = this.accountNo
        return accNo.slice(accNo.length - 4, accNo.length).padStart(accNo.length, 'X')
    }
}