import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality

import QUERY_ON_CHEQUE_BOOK from '@salesforce/label/c.CB_QueryOnChequeBook';
import FROM_DATE from '@salesforce/label/c.CB_FromDate';
import TO_DATE from '@salesforce/label/c.CB_ToDate';
import QUERY_ON_ISSUED_CHEQUES from '@salesforce/label/c.CB_QueryOnIssuedCheques';
import CHEQUE_NUMBER_FROM from '@salesforce/label/c.CB_ChequeNumberFrom';
import CHEQUE_NUMBER_TO from '@salesforce/label/c.CB_ChequeNumberTo';
import CHEQUE_STATUS from '@salesforce/label/c.CB_ChequeStatus';
import ALL from '@salesforce/label/c.CB_All';
import DEPOSITED from '@salesforce/label/c.CB_Deposited';
import IN_TRANSIT from '@salesforce/label/c.CB_InTransit';
import SUBMIT from '@salesforce/label/c.CB_Submit';

export default class CBViewStopIssuedCheques extends NavigationMixin(LightningElement) {

    label = {
        QUERY_ON_CHEQUE_BOOK,
        FROM_DATE,
        TO_DATE,
        QUERY_ON_ISSUED_CHEQUES,
        CHEQUE_NUMBER_FROM,
        CHEQUE_NUMBER_TO,
        CHEQUE_STATUS,
        ALL,
        DEPOSITED,
        IN_TRANSIT,
        SUBMIT
    }

    successModal = false
    queryOnCBook = false
    queryOnIssuedC = false

    fromDate = 'YYYY-MM-DD'
    toDate = 'YYYY-MM-DD'

    chequeNoFrom = ''
    chequeNoTo = ''
    chequeStatus = 'All'
    currDate = ''

    connectedCallback() {
        let today = new Date()
        this.currDate = `${today.getFullYear()}-${String(today.getMonth() + 1) < 10 ? "0" : ""}${today.getMonth() + 1}-${today.getDate() < 10 ? '0' : ''}${today.getDate()}`
        console.log(this.currDate)
    }


    get fromDateMax() {
        if (this.currDate && this.toDate === 'YYYY-MM-DD') {
            return this.currDate
        } else if (this.toDate) {
            return this.toDate
        }
    }

    get toDateMax() {
        if (this.currDate) {
            return this.currDate
        }
    }


    configuration = {
        title: 'Thank You',
        message: `Card has been successfully applied!`,
        okButton: {
            exposed: true,
            label: 'Ok',
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

    headerConfguration = {
        previousPageUrl: 'CBApplyNowChequebook__c',
        heading: 'View Issued Cheques',
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }


    /**
    * Using a single Navigate function is more efficient, accepts source name as parameter
    *
    * @param {String} pageApiName - Source name as parameter
    * @return {void}
    */
    navigateTo(pageApiName, dataToSend) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            },
            state: dataToSend
        });
    }


    chequeNoFromHandler(event) {
        this.chequeNoFrom = event.target.value
    }

    chequeNoToHandler(event) {
        this.chequeNoTo = event.target.value
    }

    chequeStatusHandler(event) {
        this.chequeStatus = event.target.value
    }

    queryOnIssuedCHandler() {
        this.queryOnIssuedC = true
        this.queryOnCBook = false
        this.fromDate = 'YYYY-MM-DD'
        this.toDate = 'YYYY-MM-DD'
        // this.fromDate = this.fromDate === 'YYYY-MM-DD' ? 'YYYY-MM-DD' : ''
        // this.toDate = this.toDate === 'YYYY-MM-DD' ? 'YYYY-MM-DD' : ''
    }

    queryOnCBookHandler() {
        this.queryOnCBook = true
        this.queryOnIssuedC = false
        this.chequeNoFrom = ''
        this.chequeNoTo = ''
        this.chequeStatus = ''
    }

    get QICDisable() {
        return !this.queryOnIssuedC ? 'query-on-issued-c disable-con' : 'query-on-issued-c'
    }
    get QCDisable() {
        return !this.queryOnCBook ? 'query-on-c-book disable-con' : 'query-on-c-book';
    }

    get disableButton() {
        if (this.queryOnCBook || this.queryOnIssuedC) {
            return this.queryOnCBook ? !this.fromDate || !this.toDate || this.fromDate === 'YYYY-MM-DD' || this.toDate === 'YYYY-MM-DD' : this.queryOnIssuedC ? !this.chequeNoFrom || !this.chequeNoTo : false
        } else {
            return true
        }
    }

    get getFromDateMax() {
        return this.toDate ? this.toDate : this.currDate
    }

    handleSubmit() {
        if (this.queryOnCBook) {
            this.navigateTo('CBQueryOnChequeBook__c', { 'fromDate': this.fromDate, 'toDate': this.toDate })
        } else if (this.queryOnIssuedC) {
            this.navigateTo('CBQueryOnIssuedCheques__c', { 'chequeNoFrom': this.chequeNoFrom, 'chequeNoTo': this.chequeNoTo })
        }
    }

    openFromDate() {
        let fromDate = this.template.querySelector('.from-date-invis')
        fromDate.showPicker();
    }

    openToDate() {
        let toDate = this.template.querySelector('.to-date-invis')
        toDate.showPicker()
    }


    fromDateHandler(event) {
        this.fromDate = event.target.value
    }

    toDateHandler(event) {
        this.toDate = event.target.value
    }





}