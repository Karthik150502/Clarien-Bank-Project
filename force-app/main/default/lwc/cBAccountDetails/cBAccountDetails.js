import { LightningElement, wire, api } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

import CBSVG from "@salesforce/resourceUrl/CBSVG"
import { setPagePath } from 'c/cBUtilities';
import DETAILS from '@salesforce/label/c.CB_Details';
import TRANSACTIONS from '@salesforce/label/c.CB_Transactions';
export default class CBAccountDetails extends LightningElement {

    label={
        DETAILS,
        TRANSACTIONS
    }



    cardType = {
        CreditAccount: {
            cardNum: 600015474586,
            accBal: 'BMD 10,000.00',
            currentBal: 'BMD 10,000.00',
            pendingBal: 'BMD 8000.00',
            cardExpiryDate : '06/27',
            productName: 'PLATINUM CREDIT CARD',
            cardStatus: 'Active',
        }
    }

    configuration = {
        previousPageUrl: 'CBFavoriteAccounts__c',
        heading: 'Credit Card Account',
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

    CBPdf = `${CBSVG}/CBSVGs/CBPdf.svg#CBPdf`;
    CBSortOrder = `${CBSVG}/CBSVGs/CBSortOrder.svg#CBSortOrder`;
    CBFilter = `${CBSVG}/CBSVGs/CBFilter.svg#CBFilter`;

    transactionStyle = 'overview';
    overViewStyle = "";

    // accountNumber='222265449987';

    @wire(CurrentPageReference)
    wiredPageRef;



    initializeCardType(pageRef) {
        const state = pageRef?.state;
        if (state && state.account) {
            try {
                let obj = JSON.parse(state.account);
                if (obj) {
                    this.cardType.CreditAccount.cardNum = obj.accountNo || '';
                    this.cardType.CreditAccount.accBal = obj.accountBal || '0';
                    this.cardType.CreditAccount.totalHolds = obj.totalHolds || '0';
                    this.cardType.CreditAccount.currentBal = obj.currentBal || '0';
                } else {
                    console.error('Parsed object is null or undefined');
                }
            } catch (e) {
                console.error('Error parsing state.account:', e);
            }
        } else {
            console.error('state.account is undefined or null');
        }
    }

    get accountNumber() {
        return this.pageRef && this.pageRef.state.accountNumber;
    }

    header_icons = {
        // Announcements icon settings
        announcements: {
            exposed: false,  // Whether to display the Announcements icon
            haveItems: false // Whether the Announcements icon has items to display
        },
        // Whether to display the Announcements icon
        notifications: {
            exposed: false,  // Whether to display the Notifications icon
            haveItems: false // Whether the Notifications icon has items to display
        },
        // Inbox icon settings
        inbox: {
            exposed: true,  // Whether to display the Inbox icon
            haveItems: true // Whether the Inbox icon has items to display
        },
        // Scan Code icon settings
        scanCode: {
            exposed: true, // Whether to display the Scan Code icon
            haveItems: true    // Whether the Scan Code icon has items to display
        }
    };

    transaction = true;

    @api transactionData = [
        { id: '1', CHQSId: 'CHQS2374904890', EMIId: 'EMI 233749082665', date: '01/09/23', amount: '236', type: "credit" },
        { id: '2', CHQSId: 'CHQS2374904891', EMIId: 'EMI 233749082666', date: '01/10/23', amount: '455', type: "debit" },
        { id: '3', CHQSId: 'CHQS2374904892', EMIId: 'EMI 233749082667', date: '01/11/23', amount: '676', type: "debit" },
        { id: '4', CHQSId: 'CHQS2374904893', EMIId: 'EMI 233749082668', date: '01/12/23', amount: '898', type: "credit" },
        { id: '5', CHQSId: 'CHQS2374904894', EMIId: 'EMI 233749082669', date: '01/13/23', amount: '988', type: "debit" },
        { id: '6', CHQSId: 'CHQS2374904895', EMIId: 'EMI 233749082670', date: '01/14/23', amount: '9999', type: "debit" },
        { id: '7', CHQSId: 'CHQS2374904896', EMIId: 'EMI 233749082671', date: '01/15/23', amount: '236', type: "credit" },
        { id: '8', CHQSId: 'CHQS2374904897', EMIId: 'EMI 233749082672', date: '01/16/23', amount: '2000', type: "debit" },
        { id: '9', CHQSId: 'CHQS2374904898', EMIId: 'EMI 233749082673', date: '01/17/23', amount: '2738', type: "credit" },
        { id: '10', CHQSId: 'CHQS2374904899', EMIId: 'EMI 233749082674', date: '01/18/23', amount: '267', type: "debit" }
    ];

    @api overviewData = [
        { id: 0, label: "Credit Limit", value: "BMD 10,000.00" },
        { id: 1, label: "Last Statement Balance", value: "BMD 8,000.00" },
        { id: 2, label: "Minimum Payment", value: "BMD 500.00" },
        { id: 3, label: "Payment Due Date", value: "27/12/23" },
        { id: 4, label: "Available Limit", value: "BMD 8000.00" },
        { id: 5, label: "Last Payment Date", value: "05/01/24" }
    ]
        ;

    handleTransactionsClick() {
        this.transaction = true;
        this.transactionStyle = 'overview';
        this.overViewStyle = "";
        console.log('Transactions clicked');
    }

    handleOverviewClick() {
        this.transaction = false;
        this.overViewStyle = 'overview';
        this.transactionStyle = ""
        console.log('Overview clicked');
    }

    connectedCallback() {
        setPagePath('CBCreditCardAccount__c')
        // let currentDate = new Date();
        // let month = currentDate.getMonth() + 1;
        // let year = currentDate.getFullYear();  
        // this.toDate = new Date(`${year}-${month}`).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        // currentDate.setMonth(currentDate.getMonth() - 7)
        // month = currentDate.getMonth() + 1;
        // year = currentDate.getFullYear();
        // this.fromDate = new Date(`${year}-${month}`).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        // console.log("CCB");
    }
    
    fromDate = ''
    toDate = ''
    modalFilter = false
    openFilterPopup(event) {
        this.modalFilter = !this.modalFilter;
        if (!this.modalFilter && event.detail.fromDate!=undefined && event.detail.toDate!=undefined) {
            this.fromDate = new Date(event.detail.fromDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            this.toDate = new Date(event.detail.toDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        }
    }

    successModalOpen = false;
    successModalconfig={
        title: `Clarien`,
        message: 'PDF has been downloaded successfully',
        okButton: {
            exposed: true,
            label: 'Ok',
            function: () => {
                this.generatePdf();
            }
        },
        noButton: {
            exposed: false,
            label: 'Cancel',
            function: () => {
            }
        },
        alertMsg: ''
    }

    generatePdf(){
        this.successModalOpen = !this.successModalOpen;
    }

    sortAmount(){
        this.dispatchEvent(new CustomEvent('sorttransactiondetails',{
            bubbles : true
        }))
    }
}