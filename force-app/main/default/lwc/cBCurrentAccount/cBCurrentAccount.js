import { LightningElement, wire, api, track } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBCurrentAccount extends NavigationMixin(LightningElement) {

    cardType = {
        CurrentAccount: {
            accountNo: 6000876590564,
            accBal: 'BMD 9000.00',
            currentBal: 'BMD 9000.00',
            totalHolds: 'BMD 0.00',
            holderName: 'John Due',
            productName: 'CURRENT ACCOUNT',
            beneficiary: 'Mr. Current Demo',
            date: '7/05/2024',
        }
    }

    configuration = {
        previousPageUrl: 'CBFavoriteAccounts__c',
        heading: 'Current Account',
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





    @wire(CurrentPageReference)
    wiredPageRef;



    initializeCardType(pageRef) {
        const state = pageRef?.state;
        if (state && state.account) {
            try {
                let obj = JSON.parse(state.account);
                if (obj) {
                    this.cardType.CurrentAccount.accountNo = obj.accountNo || '';
                    this.cardType.CurrentAccount.accBal = obj.accountBal || '0';
                    this.cardType.CurrentAccount.totalHolds = obj.totalHolds || '0';
                    this.cardType.CurrentAccount.currentBal = obj.currentBal || '0';
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

    @api
    transactionData = [
        { id: '1', CHQSId: 'Received money from david - saving debit account', EMIId: 'IBM0010200988901', date: '01/09/23', amount: '3.00', transactionType: 'Transfer', type: 'credit' },
        { id: '2', CHQSId: 'Loan Interest of oct - saving debit account', EMIId: 'IBM0010200988902', date: '01/10/23', amount: '4.00', transactionType: 'Loan', type: 'debit' },
        { id: '3', CHQSId: 'Sent money to John - saving debit account', EMIId: 'IBM0010200988903', date: '01/11/23', amount: '6.00', transactionType: 'Transfer', type: 'debit' },
        { id: '4', CHQSId: 'Sent Money to Amazon - saving debit account', EMIId: 'IBM0010200988904', date: '01/12/23', amount: '8.00', transactionType: 'Fee', type: 'debit' },
        { id: '5', CHQSId: 'Recieved money from david - saving debit account', EMIId: 'IBM0010200988905', date: '01/03/24', amount: '9.88', transactionType: 'Transfer', type: 'credit' },
        { id: '6', CHQSId: 'Loan Payment of mar - saving debit account', EMIId: 'IBM0010200988906', date: '01/04/24', amount: '9.00', transactionType: 'Loan', type: 'debit' },
        { id: '7', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988907', date: '01/05/24', amount: '6.00', transactionType: 'Transfer', type: 'debit' },
        { id: '8', CHQSId: 'Recieved money to david - saving debit account', EMIId: 'IBM0010200988908', date: '01/06/24', amount: '2.00', transactionType: 'Transfer', type: 'credit' },
        { id: '9', CHQSId: 'Recieved money to david - saving debit account', EMIId: 'IBM0010200988909', date: '01/07/24', amount: '2.20', transactionType: 'Transfer', type: 'credit' },
        { id: '10', CHQSId: 'Recieved money to david - saving debit account', EMIId: 'IBM0010200988910', date: '01/08/24', amount: '5.00', transactionType: 'Transfer', type: 'credit' }
    ];

    @api activeTransactionData = [
        { id: '1', CHQSId: 'Recieved money to david - saving debit account', EMIId: 'IBM0010200988901', date: '01/09/23', amount: '3.00', transactionType: 'Transfer', type: 'credit' },
        { id: '2', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988902', date: '01/10/23', amount: '4.00', transactionType: 'Fuel', type: 'debit' },
        { id: '3', CHQSId: 'Sent money to WoodsFurniture - saving debit account', EMIId: 'IBM0010200988903', date: '01/11/23', amount: '6.00', transactionType: 'Transfer Bill Payment', type: 'debit' }
    ];

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
        this.initializeCardType(this.wiredPageRef);
        this.setFromToDate();
    }

    setFromToDate() {
        if (this.wiredPageRef?.state?.toDate && this.wiredPageRef?.state?.fromDate) {
            this.toDate = this.wiredPageRef?.state?.toDate
            this.fromDate = this.wiredPageRef?.state?.fromDate
        }
        else {
            let today = new Date()
            this.toDate = `${today.getFullYear()}-${String(today.getMonth() + 1) < 10 ? "0" : ""}${today.getMonth() + 1}-${today.getDate() < 10 ? '0' : ''}${today.getDate()}`
            today.setMonth(today.getMonth() - 7);
            this.fromDate = `${today.getFullYear()}-${String(today.getMonth() + 1) < 10 ? "0" : ""}${today.getMonth() + 1}-${today.getDate() < 10 ? '0' : ''}${today.getDate()}`
        }
    }

    fromDate = ''
    toDate = ''
    modalFilter = false
    openFilterPopup(event) {
        this.modalFilter = !this.modalFilter;
        if (!this.modalFilter && event.detail.fromDate != undefined && event.detail.toDate != undefined) {
            this.fromDate = new Date(event.detail.fromDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            this.toDate = new Date(event.detail.toDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        }
    }

    successModalOpen = false;
    successModalconfig = {
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

    generatePdf() {
        this.successModalOpen = !this.successModalOpen;
    }


    sortDetails() {
        this.mergeSort(this.transactionData);
    }

    mergeSort(arr) {
        if (arr.length > 1) {
            let leftArr = arr.slice(0, Math.floor(arr.length / 2))
            let rightArr = arr.slice(Math.floor(arr.length / 2), arr.length)
            this.mergeSort(leftArr)
            this.mergeSort(rightArr)
            let i = 0
            let j = 0
            let k = 0
            while (i < leftArr.length && j < rightArr.length) {
                if (Number(leftArr[i].amount) > Number(rightArr[j].amount)) {
                    arr[k] = leftArr[i]
                    i++
                } else {
                    arr[k] = rightArr[j]
                    j++
                }
                k++
            }
            while (i < leftArr.length) {
                arr[k] = leftArr[i]
                i++
                k++
            }
            while (j < rightArr.length) {
                arr[k] = rightArr[j]
                j++
                k++
            }
        }
    }

    navigateToFilter() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'CBFilterCurrentAccount__c'
            }
        });
    }
}