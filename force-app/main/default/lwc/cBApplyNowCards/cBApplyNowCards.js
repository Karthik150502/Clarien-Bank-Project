import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import CARDS from '@salesforce/label/c.CB_Cards';
import CREDIT_CARD from '@salesforce/label/c.CB_CreditCard';
import DEBIT_CARD from '@salesforce/label/c.CB_DebitCard';
import BMD from '@salesforce/label/c.CB_Bmd';
import USD from '@salesforce/label/c.CB_Usd';
import SUBMIT from '@salesforce/label/c.CB_Submit';
import APPLYNOW_PAGE from '@salesforce/label/c.CB_Page_Applynow';

export default class CBApplyNowCards extends NavigationMixin(LightningElement) {


    label = {
        CARDS,
        CREDIT_CARD,
        DEBIT_CARD,
        BMD,
        USD,
        SUBMIT: SUBMIT.toUpperCase()
    }

    cardSelected = 'Credit Card'
    currencyOptionsShow = false
    currencySelected = 'USD'
    remarks = ''
    hasRendered = false
    successModal = false

    renderedCallback() {
        this.hasRendered = true
    }



    @track configuration = {
        title: `Your Credit Card has been successfully applied!`,
        message: `Our bank employee will be in touch with you soon.`,
        okButton: {
            exposed: true,
            label: 'OK',
            function: () => {
                this.successModal = false
                this.navigateToApplyNowPage()
            }
        },
        noButton: {
            exposed: false,
            label: '',
            function: () => {
            }
        },
        alertMsg: ''
    }


    // Object to manage header icons
    header_icons = {
        // Announcements icon settings
        announcements: {
            exposed: false,  // Whether to display the Announcements icon
            haveItems: true // Whether the Announcements icon has items to display
        },
        // Whether to display the Announcements icon
        notifications: {
            exposed: false,  // Whether to display the Notifications icon
            haveItems: true // Whether the Notifications icon has items to display
        },
        // Inbox icon settings
        inbox: {
            exposed: true,  // Whether to display the Inbox icon
            haveItems: true // Whether the Inbox icon has items to display
        },
        // Scan Code icon settings
        scanCode: {
            exposed: true, // Whether to display the Scan Code icon
            haveItems: false    // Whether the Scan Code icon has items to display
        }
    };


    currencies = [
        'USD', 'BMD'
    ]

    headerConfguration = {
        previousPageUrl: APPLYNOW_PAGE,
        heading: 'Cards',
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    navigateToApplyNowPage() {
        const pageReference = {
            type: 'comm__namedPage',
            attributes: {
                name: APPLYNOW_PAGE
            }
        };
        this[NavigationMixin.Navigate](pageReference);
    }


    get disableButton() {
        return this.remarks === ''
    }

    handleSubmit() {
        let remarks = this.template.querySelector('.remarks')
        let radios = this.template.querySelectorAll('.radio-input')
        this.cardSelected = radios[0].checked ? 'Credit Card' : radios[1].checked ? 'Debit Card' : ''
        this.successModal = true
        console.log("Card selected --> " + this.cardSelected)
        console.log("Currency selected --> " + this.currencySelected)
        console.log("Remarks -->" + remarks.value)
    }



    setCard(event) {
        this.cardSelected = event.target.value
        this.configuration.title = `Your ${this.cardSelected} has been successfully applied!`
    }

    handleRemarks(event) {
        this.remarks = event.target.value
    }
    // handleCancel() {

    // }

    setPicklistValue(event) {
        this.currencySelected = event.target.value
    }



}