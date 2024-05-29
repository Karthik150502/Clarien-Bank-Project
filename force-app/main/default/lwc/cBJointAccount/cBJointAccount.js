import { LightningElement, wire, api, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBJointAccount extends LightningElement {

    cardType = {
        JointAccount: {
            accountNo: 6000876590564,
            accBal: 'BMD 9000.00',
            currentBal: 'BMD 9000.00',
            totalHolds: 'BMD 0.00',
            holderName: 'John Due',
            secHolderName: 'Abhraram'
        }
    }

    configuration = {
        previousPageUrl: 'CBFavoriteAccounts__c',
        heading: 'Joint Account',
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
                    this.cardType.JointAccount.accountNo = obj.accountNo || '';
                    this.cardType.JointAccount.accBal = obj.accountBal || '0';
                    this.cardType.JointAccount.totalHolds = obj.totalHolds || '0';
                    this.cardType.JointAccount.currentBal = obj.currentBal || '0';
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
        { id: '1', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988901', date: '01/09/23', amount: '3.00', transactionType: 'Transfer' },
        { id: '2', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988902', date: '01/10/23', amount: '4.00', transactionType: 'Loan' },
        { id: '3', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988903', date: '01/11/23', amount: '6.00', transactionType: 'Transfer' },
        { id: '4', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988904', date: '01/12/23', amount: '8.00', transactionType: 'Fee' },
        { id: '5', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988905', date: '01/13/23', amount: '9.88', transactionType: 'Transfer' },
        { id: '6', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988906', date: '01/14/23', amount: '9.00', transactionType: 'Lorem' },
        { id: '7', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988907', date: '01/15/23', amount: '6.00', transactionType: 'Transfer' },
        { id: '8', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988908', date: '01/16/23', amount: '2.00', transactionType: 'Transfer' },
        { id: '9', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988909', date: '01/17/23', amount: '2.20', transactionType: 'Transfer' },
        { id: '10', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988910', date: '01/18/23', amount: '5.00', transactionType: 'Transfer' }
    ];

    @api overviewData = [
        { id: 0, label: "CIF ID Primary Account holder Name", value: "1000011111" },
        { id: 1, label: "CIF ID Secondary Account holder Name", value: "1111123455" },
        { id: 2, label: "Primary Account holder Name", value: "John due" },
        { id: 3, label: "Secondary Account holder Name", value: "Abhraham" },
        { id: 4, label: "Account Number", value: "6000876590564" },
        { id: 5, label: "Available Balance", value: "BMD 9000" }
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
        let currentDate = new Date();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        this.toDate = new Date(`${year}-${month}`).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        currentDate.setMonth(currentDate.getMonth() - 7)
        month = currentDate.getMonth() + 1;
        year = currentDate.getFullYear();
        this.fromDate = new Date(`${year}-${month}`).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        console.log("CCB");
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
}