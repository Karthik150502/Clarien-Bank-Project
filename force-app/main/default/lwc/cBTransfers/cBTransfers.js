import { LightningElement, wire, track } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';


import MANAGE_TEMPLATES from '@salesforce/label/c.CB_ManageTemplates'; // Importing label for predefined transactions
import OWN_ACC_PAYMENTS from '@salesforce/label/c.CB_OwnAccountTransfers'; // Importing label for own account transfers
import INTRABANK_PAYMENTS from '@salesforce/label/c.CB_IntrabankTransfers'; // Importing label for intrabank transfers
import DOMESTIC_PAYMENTS from '@salesforce/label/c.CB_DomesticPayments'; // Importing label for domestic payments
import INTERNATIONAL_PAYMENTS from '@salesforce/label/c.CB_InternationalPayments'; // Importing label for international payments
import MANAGE_BENEF from '@salesforce/label/c.CB_ManageBeneficiaries'; // Importing label for managing beneficiaries
import BILL_PAYMENTS from '@salesforce/label/c.CB_BillPayments';
import SEND_MONEY from '@salesforce/label/c.CB_SendMoney';
import CB_ManageBillers from '@salesforce/label/c.CB_ManageBillers';


import CBSVG from "@salesforce/resourceUrl/CBSVG"

import { setPagePath } from 'c/cBUtilities';

export default class CBTransfers extends NavigationMixin(LightningElement) {
    // Labels for dashboard icons
    label = {
        MANAGE_TEMPLATES,
        OWN_ACC_PAYMENTS,
        INTRABANK_PAYMENTS,
        DOMESTIC_PAYMENTS,
        INTERNATIONAL_PAYMENTS,
        MANAGE_BENEF,
        BILL_PAYMENTS,
        SEND_MONEY,
        CB_ManageBillers
    }

    //SVG's from static resource
    CBSendMoney = `${CBSVG}/CBSVGs/CBSendMoney.svg#CBSendMoney`;
    CBQRCode = `${CBSVG}/CBSVGs/CBQRCode.svg#CBQRCode`;
    CBBillPayments = `${CBSVG}/CBSVGs/CBBillPayments.svg#CBBillPayments`;
    CBApprovals = `${CBSVG}/CBSVGs/CBApprovals.svg#CBApprovals`;
    CBCreditCards = `${CBSVG}/CBSVGs/CBCreditCards.svg#CBCreditCards`;
    CBInvestmentProfiles = `${CBSVG}/CBSVGs/CBInvestmentProfiles.svg#CBInvestmentProfiles`;
    CBAccountStatements = `${CBSVG}/CBSVGs/CBAccountStatements.svg#CBAccountStatements`;
    CBApplyForLoans = `${CBSVG}/CBSVGs/CBApplyForLoans.svg#CBApplyForLoans`;
    CBServiceRequest = `${CBSVG}/CBSVGs/CBServiceRequest.svg#CBServiceRequest`;
    CBBankAccounts = `${CBSVG}/CBSVGs/CBBankAccounts.svg#CBBankAccounts`;
    CBScanPay = `${CBSVG}/CBSVGs/CBScanPay.svg#CBScanPay`;
    CBOffers = `${CBSVG}/CBSVGs/CBOffers.svg#CBOffers`;
    CBAccountsDeposits = `${CBSVG}/CBSVGs/CBAccountsDeposits.svg#CBAccountsDeposits`;
    CBChequebookServices = `${CBSVG}/CBSVGs/CBChequebookServices.svg#CBChequebookServices`;
    CBEnableDisableBiometric = `${CBSVG}/CBSVGs/CBEnableDisableBiometric.svg#CBEnableDisableBiometric`;

    configuration = {
        previousPageUrl: 'Home',
        heading: this.label.SEND_MONEY,
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    CBPdf = `${CBSVG}/CBSVGs/CBPdf.svg#CBPdf`;
    CBSortOrder = `${CBSVG}/CBSVGs/CBSortOrder.svg#CBSortOrder`;
    CBFilter = `${CBSVG}/CBSVGs/CBFilter.svg#CBFilter`;
    transactionStyle = 'overview';
    overViewStyle = "";

    // accountNumber='222265449987';

    @wire(CurrentPageReference) pageRef;



    // Getter method that returns the account number 
    get accountNumber() {
        return this.pageRef && this.pageRef.state.accountNumber;
    }


    cardDetail = {
        availableBalance: '11,000.00',
        currentBalance: '11,000.00',
        pendingAmount: '11,000.00',
        creditExpiryDate: '10/29',
        productName: 'PLATINUM CREDIT CARD',
        cardStatus: 'Active'
    }

    // Object to manage header icons
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

    @track transactionData = [
        { id: '1', CHQSId: 'recieved money from david - saving account', EMIId: 'CRED0010200988901', date: '01/09/23', amount: '304.00', transactionType: 'Transfer', type: 'credit' },
        { id: '2', CHQSId: 'credit money to loan - loan account', EMIId: 'LN0010200988902', date: '01/10/23', amount: '400.00', transactionType: 'Loan', type: 'debit' },
        { id: '3', CHQSId: 'Sent money to david - saving account', EMIId: 'DEB0010200988903', date: '01/11/23', amount: '62.00', transactionType: 'Transfer', type: 'debit' },
        { id: '4', CHQSId: 'Sent money to JIO Recharge - saving account', EMIId: 'DEB0010200988904', date: '01/12/23', amount: '80.00', transactionType: 'Fee', type: 'debit' },
        { id: '5', CHQSId: 'recieved money from John - saving debit account', EMIId: 'CRED0010200988905', date: '01/13/23', amount: '945.88', transactionType: 'Transfer', type: 'credit' },
        { id: '6', CHQSId: 'Sent money to John - saving account', EMIId: 'DEB0010200988906', date: '01/14/23', amount: '400.00', transactionType: 'Loan', type: 'debit' },
        { id: '7', CHQSId: 'recieved interset for dec - saving account', EMIId: 'CRED0010200988907', date: '01/15/23', amount: '633.00', transactionType: 'Transfer', type: 'credit' },
        { id: '8', CHQSId: 'Sent money to Electricity Bill - saving account', EMIId: 'DEB0010200988908', date: '01/16/23', amount: '165.00', transactionType: 'Fee', type: 'debit' },
        { id: '9', CHQSId: 'Sent money to DMart - saving account', EMIId: 'DEB0010200988909', date: '01/17/23', amount: '50.00', transactionType: 'Fee', type: 'debit' },
        { id: '10', CHQSId: 'recieved money from elton - saving account', EMIId: 'CRED0010200988910', date: '01/18/23', amount: '51.00', transactionType: 'Transfer', type: 'credit' }
    ];



    connectedCallback() {
        setPagePath('CBTransfers__c')
        let currentDate = new Date();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        this.toDate = new Date(`${year}-${month}`).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        currentDate.setMonth(currentDate.getMonth() - 1)
        month = currentDate.getMonth() + 1;
        year = currentDate.getFullYear();
        this.fromDate = new Date(`${year}-${month}`).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        console.log("CCB");
    }

    fromDate = ''
    toDate = ''
    modalFilter = false

    // Handles opening and closing of the filter popup
    openFilterPopup(event) {
        this.modalFilter = !this.modalFilter;
        if (!this.modalFilter && event.detail.fromDate != undefined && event.detail.toDate != undefined) {
            this.fromDate = new Date(event.detail.fromDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            this.toDate = new Date(event.detail.toDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        }
    }



    // Sorts the transaction data by amount
    sortAmount() {
        this.mergeSort(this.transactionData);
    }


    // Performs merge sort on the given array
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
                if (Number(leftArr[i].amount) < Number(rightArr[j].amount)) {
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
    // Navigates to the "Manage Beneficiaries" page
    navigateToManageBeneficiaries() {
        this.navigateTo('CBManageBeneficiaries__c')
    }
    // Navigates to the "Manage Beneficiaries" page
    navigateToManageBiller() {
        this.navigateTo('CBManageBiller__c')
    }
    // Navigates to the "Bill Payment" page
    navigateToBillPayment() {
        this.navigateTo('CBBillPayments__c')
    }


    // Navigates to the "Predefined" page
    navigateToPredefined() {
        this.navigateTo('CBPredefined__c')
    }




    // Navigates to the "Own Account Transfer" page
    navigateToOwnAccTransfer() {
        this.navigateTo('CBOwnAccountTransfer__c')
    }

    // Navigates to the "IntraBank Transfers" page
    navigateToIntrabankTransfer() {
        this.navigateTo('CBIntraBankTransfers__c')
    }

    // Navigates to the "International Transfers" page
    navigateToInternationalTransfer() {
        this.navigateTo('CBInternationalTransfers__c')
    }

    // Navigates to the "Domestic Payments" page
    navigateToDomesticPayments() {
        this.navigateTo('CBDomesticTransfers__c')
    }



    // Helper function for navigation
    navigateTo(pageName) {
        console.log('navigate called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageName
            }
        });
    }
}