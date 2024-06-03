import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import CONTINUE from '@salesforce/label/c.CB_Continue';
import CANCEL from '@salesforce/label/c.CB_Cancel';
export default class CBQrCodeGeneration extends NavigationMixin(LightningElement) {



    // Object to hold imported labels
    label = {
        CONTINUE: CONTINUE.toUpperCase(), // Converting "Submit" label to uppercase
        CANCEL: CANCEL.toUpperCase(), // Converting "Cancel" label to uppercase
    };


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
        previousPageUrl: '',
        heading: 'Select Account',
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


    accounts = [
        {
            "accountNo": '659874586954',
            "accountType": "Savings Account"
        },
        {
            "accountNo": '658745896541',
            "accountType": "Loan Account"
        },
        {
            "accountNo": '666658987452',
            "accountType": "Time Deposit Account"
        },
        {
            "accountNo": '698547458265',
            "accountType": "Joint Account"
        },

    ]


    selectedAccount = 'Select Account'

    handleAccount(event) {
        this.selectedAccount = event.target.value
    }


    get disableSubmit() {
        return this.selectedAccount === 'Select Account'
    }

    handleCancel() {

    }


    handleSubmit() {
        console.log("Submitted....!")
        this.navigateTo("CBQrCodeDisplay__c", {
            "accountNo": this.selectedAccount
        })
    }


    // Helper function for navigation
    navigateTo(pageApiName, data = {}) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            },
            state: data
        });
    }


}