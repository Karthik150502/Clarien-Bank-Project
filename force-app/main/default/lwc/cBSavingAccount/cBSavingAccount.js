import { LightningElement, wire, api, track } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBSavingAccount extends NavigationMixin(LightningElement) {

    cardType = {
        SavingsAccount: {
            accountNo: 600015474586,
            accBal: 'BMD 5,546.54',
            currentBal: 'BMD 5664.55',
            totalHolds: 'BMD 0.00',
            productName: 'PERSONAL SAVINGS USD',
            beneficiary: 'Mr. Retail Demo',
            date: '7/05/2024',
        },
    }


    configuration = {
        previousPageUrl: 'CBFavoriteAccounts__c',
        heading: 'Savings Account',
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
                    this.cardType.SavingsAccount.accountNo = obj.accountNo || '';
                    this.cardType.SavingsAccount.accBal = obj.accountBal || '0';
                    this.cardType.SavingsAccount.totalHolds = obj.totalHolds || '0';
                    this.cardType.SavingsAccount.currentBal = obj.currentBal || '0';
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
        { id: '1', CHQSId: 'Recieved money from Elon - saving debit account', EMIId: 'IBM0010200988901', date: '01/09/23', amount: '3.00', transactionType: 'Transfer', type: 'credit' },
        { id: '2', CHQSId: 'Sent money to Indian Oil - saving debit account', EMIId: 'IBM0010200988902', date: '01/10/23', amount: '4.00', transactionType: 'Fuel', type: 'debit' },
        { id: '3', CHQSId: 'Bill Payment for Dec Electricity  - saving debit account', EMIId: 'IBM0010200988903', date: '01/11/23', amount: '6.00', transactionType: 'Transfer Bill Payment', type: 'debit' },
        { id: '4', CHQSId: 'Sent money to Indian Oil - saving debit account', EMIId: 'IBM0010200988904', date: '01/12/23', amount: '8.00', transactionType: 'Fuel', type: 'debit' },
        { id: '5', CHQSId: 'Sent money to Indian Oil - saving debit account', EMIId: 'IBM0010200988905', date: '01/13/23', amount: '9.88', transactionType: 'Fuel', type: 'debit' },
        { id: '6', CHQSId: 'Loan Interest Payment for Jan - loan account', EMIId: 'IBM0010200988906', date: '01/01/24', amount: '9.00', transactionType: 'Loan', type: 'debit' },
        { id: '7', CHQSId: 'Sent money to Indian Oil - saving debit account', EMIId: 'IBM0010200988907', date: '01/02/24', amount: '6.00', transactionType: 'Fuel', type: 'debit' },
        { id: '8', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988908', date: '05/08/24', amount: '2.00', transactionType: 'Transfer Bill Payment', type: 'debit' },
        { id: '9', CHQSId: 'Recieved money from Jeff - saving debit account', EMIId: 'IBM0010200988909', date: '07/10/24', amount: '2.20', transactionType: 'Transfer', type: 'credit' },
        { id: '10', CHQSId: 'Recieved money from Bill - saving debit account', EMIId: 'IBM0010200988910', date: '15/12/24', amount: '5.00', transactionType: 'Transfer', type: 'credit' }
    ];

    @api activeTransactionData = [
        { id: '1', CHQSId: 'Recieved money from david - saving debit account', EMIId: 'IBM0010200988901', date: '01/09/24', amount: '3.00', transactionType: 'Transfer', type: 'credit' },
        { id: '2', CHQSId: 'Sent money to Indian Oil - saving debit account', EMIId: 'IBM0010200988902', date: '01/10/24', amount: '4.00', transactionType: 'Fuel', type: 'debit' },
        { id: '3', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988903', date: '01/11/24', amount: '6.00', transactionType: 'Transfer Bill Payment', type: 'debit' }
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
        console.log('filter called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'CBFilterSavingsAccount__c'
            }
        });
    }
}