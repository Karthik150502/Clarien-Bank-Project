import { LightningElement, wire, api,track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBLoanAccount extends LightningElement {

    cardType = {
        LoanAccount: {
            accountNo: 6000154360,
            accBal: 'BMD 201,210.21',
            interestAmount: 'BMD 602.00',
            interestDate: '11/12/24',
            productName: 'Cash Secured BMD-Regular',
            beneficiary: 'John LTD Demo',
            date: '11/12/2024',
        }
    }
    
    configuration = {
        previousPageUrl: 'CBFavoriteAccounts__c',
        heading: 'Loan Account',
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        },favorite:{
        selected:false
        }
    }

    @wire(CurrentPageReference)
    wiredPageRef;



    initializeCardType(pageRef) {
        const state = pageRef?.state;
        if (state && state.account) {
            try {
                let obj = JSON.parse(state.account);
                if (obj) {
                    this.cardType.LoanAccount.accountNo = obj.accountNo || '';
                    this.cardType.LoanAccount.accBal = obj.accountBal || '0';

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



    CBPdf = `${CBSVG}/CBSVGs/CBPdf.svg#CBPdf`;
    CBSortOrder = `${CBSVG}/CBSVGs/CBSortOrder.svg#CBSortOrder`;
    CBFilter = `${CBSVG}/CBSVGs/CBFilter.svg#CBFilter`;

    transactionStyle = 'overview';
    overViewStyle = "";

    // accountNumber='222265449987';


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
        { id: '1', CHQSId: 'CHQS2374904890', EMIId: 'EMI 233749082665', date: '01/09/23', amount: '236', type:"debit" },
        { id: '2', CHQSId: 'CHQS2374904891', EMIId: 'EMI 233749082666', date: '01/10/23', amount: '455', type:"debit" },
        { id: '3', CHQSId: 'CHQS2374904892', EMIId: 'EMI 233749082667', date: '01/11/23', amount: '676', type:"credit" },
        { id: '4', CHQSId: 'CHQS2374904893', EMIId: 'EMI 233749082668', date: '01/12/23', amount: '898', type:"credit" },
        { id: '5', CHQSId: 'CHQS2374904894', EMIId: 'EMI 233749082669', date: '01/13/23', amount: '988', type:"debit" },
        { id: '6', CHQSId: 'CHQS2374904895', EMIId: 'EMI 233749082670', date: '01/14/23', amount: '9999', type:"credit" },
        { id: '7', CHQSId: 'CHQS2374904896', EMIId: 'EMI 233749082671', date: '01/15/23', amount: '236', type:"credit" },
        { id: '8', CHQSId: 'CHQS2374904897', EMIId: 'EMI 233749082672', date: '01/16/23', amount: '2000', type:"debit" },
        { id: '9', CHQSId: 'CHQS2374904898', EMIId: 'EMI 233749082673', date: '01/17/23', amount: '2738', type:"credit" },
        { id: '10', CHQSId: 'CHQS2374904899', EMIId: 'EMI 233749082674', date: '01/18/23', amount: '267', type:"credit" }

    ];

    @api overviewData = [
        { id: 0, label: "Loan Amount", value: "BMD 13,000.00" },
        { id: 1, label: "Outstanding Balance", value: "BMD 6,289.00" },
        { id: 2, label: "Current Interest Rate", value: "5.0%" },
        { id: 3, label: "Next Interest payment Amount", value: "BMD 389.00" },
        { id: 4, label: "Next payment Date", value: "11/12/2024" },
        { id: 5, label: "Overdue Date", value: "11/12/2024" },
        { id: 5, label: "Overdue Amount", value: "BMD 0.00" },
        { id: 5, label: "Available Amount", value: "6,2089.00" }
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
        this.initializeCardType(this.wiredPageRef);
        let today = new Date()
        this.toDate = `${today.getFullYear()}-${String(today.getMonth() + 1) < 10 ? "0" : ""}${today.getMonth() + 1}-${today.getDate() < 10 ? '0' : ''}${today.getDate()}`
        today.setMonth(today.getMonth() - 7);
        this.fromDate = `${today.getFullYear()}-${String(today.getMonth() + 1) < 10 ? "0" : ""}${today.getMonth() + 1}-${today.getDate() < 10 ? '0' : ''}${today.getDate()}`
    }
    
    fromDate = ''
    toDate = ''
    modalFilter = false
    openFilterPopup(event) {
        this.modalFilter = !this.modalFilter;
        if (!this.modalFilter) {
            this.fromDate = event.detail.fromDate;
            this.toDate = event.detail.toDate;
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


    sortDetails(){
        this.mergeSort(this.transactionData);
    }

    mergeSort(arr){
        if(arr.length > 1){
            let leftArr = arr.slice(0,  Math.floor(arr.length/2))
            let rightArr = arr.slice(Math.floor(arr.length/2), arr.length)
            this.mergeSort(leftArr)
            this.mergeSort(rightArr)
            let i = 0
            let j = 0
            let k = 0
            while(i < leftArr.length && j < rightArr.length){
                if(Number(leftArr[i].amount) > Number(rightArr[j].amount)){
                    arr[k] = leftArr[i]
                    i++
                }else{
                    arr[k] = rightArr[j]
                    j++
                }
                k++
            }
            while(i<leftArr.length){
                arr[k] = leftArr[i]
                i++
                k++
            }        
            while(j<rightArr.length){
                arr[k] = rightArr[j]
                j++
                k++
            }
        }
    }
}