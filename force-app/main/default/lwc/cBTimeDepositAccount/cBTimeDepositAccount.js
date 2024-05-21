import { LightningElement, wire, api,track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBTimeDepositAccount extends LightningElement {

    CBPdf = `${CBSVG}/CBSVGs/CBPdf.svg#CBPdf`;
    CBSortOrder = `${CBSVG}/CBSVGs/CBSortOrder.svg#CBSortOrder`;
    CBFilter = `${CBSVG}/CBSVGs/CBFilter.svg#CBFilter`;

    transactionStyle = 'overview';
    overViewStyle = "";

    @wire(CurrentPageReference) pageRef;

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
        { id: '1', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988901', date: '01/09/23', amount: '3.00', transactionType:'Principal Amount Cr' },
        { id: '2', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988902', date: '01/10/23', amount: '4.00', transactionType:'Interest Cr' },
        { id: '3', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988903', date: '01/11/23', amount: '6.00', transactionType:'Principal Amount Cr' },
        { id: '4', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988904', date: '01/12/23', amount: '8.00', transactionType:'Interest Cr' },
        { id: '5', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988905', date: '01/13/23', amount: '9.88', transactionType:'Interest Cr' },
        { id: '6', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988906', date: '01/14/23', amount: '9.00', transactionType:'Principal Amount Cr' },
        { id: '7', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988907', date: '01/15/23', amount: '6.00', transactionType:'Principal Amount Cr' },
        { id: '8', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988908', date: '01/16/23', amount: '2.00', transactionType:'Interest Cr' },
        { id: '9', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988909', date: '01/17/23', amount: '2.20', transactionType:'TranInterest Crsfer' },
        { id: '10', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988910', date: '01/18/23', amount: '5.00', transactionType:'Interest Cr' }
    ];

    @api overviewData = [
        { id: 0, label: "Account number", value: "600017987" },
        { id: 1, label: "Deposit Amount", value: "BMD 5,800.00" },
        { id: 2, label: "Deposit Start Date", value: "12/12/23" },
        { id: 3, label: "Account Name", value: "Joh Due" },
        { id: 4, label: "Maturity Date", value: "13/12/25" },
        { id: 5, label: "Current Deposit Balance", value: "BMD 5000.00" },
        { id: 6, label: "Tenure( Months )", value: "36 Months" },
        { id: 7, label: "Rate of Interest", value: "8%" },
        { id: 8, label: "Interest Accrued", value: "10%" },
        { id: 9, label: "Interest Payment Date", value: "13/12/25" },
        { id: 10, label: "Interest Payment Account", value: "BMD 8000.00" },
        { id: 11, label: "Nominee", value: "John" },
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