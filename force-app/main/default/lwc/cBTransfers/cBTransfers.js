import { LightningElement, wire, api, track } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';

import PREDEFINED from '@salesforce/label/c.CB_Predefined'; // Importing label for predefined transactions
import OWN_ACC_PAYMENTS from '@salesforce/label/c.CB_OwnAccountTransfers'; // Importing label for own account transfers
import INTRABANK_PAYMENTS from '@salesforce/label/c.CB_IntrabankTransfers'; // Importing label for intrabank transfers
import DOMESTIC_PAYMENTS from '@salesforce/label/c.CB_DomesticPayments'; // Importing label for domestic payments
import INTERNATIONAL_PAYMENTS from '@salesforce/label/c.CB_InternationalPayments'; // Importing label for international payments
import MANAGE_BENEF from '@salesforce/label/c.CB_ManageBeneficiaries'; // Importing label for managing beneficiaries
import BILL_PAYMENTS from '@salesforce/label/c.CB_BillPayments';
import ADHOC_PAYMENTS from '@salesforce/label/c.CB_AdHocPayments';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBTransfers extends NavigationMixin(LightningElement) {
    // Labels for dashboard icons
    label = {
        PREDEFINED,
        OWN_ACC_PAYMENTS,
        INTRABANK_PAYMENTS,
        DOMESTIC_PAYMENTS,
        INTERNATIONAL_PAYMENTS,
        MANAGE_BENEF,
        ADHOC_PAYMENTS,
        BILL_PAYMENTS
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
    CBAdHocPayment = `${CBSVG}/CBSVGs/CBAdHocPayment.svg#CBAdHocPayment`;
    CBServiceRequest = `${CBSVG}/CBSVGs/CBServiceRequest.svg#CBServiceRequest`;
    CBBankAccounts = `${CBSVG}/CBSVGs/CBBankAccounts.svg#CBBankAccounts`;
    CBScanPay = `${CBSVG}/CBSVGs/CBScanPay.svg#CBScanPay`;
    CBOffers = `${CBSVG}/CBSVGs/CBOffers.svg#CBOffers`;
    CBAccountsDeposits = `${CBSVG}/CBSVGs/CBAccountsDeposits.svg#CBAccountsDeposits`;
    CBChequebookServices = `${CBSVG}/CBSVGs/CBChequebookServices.svg#CBChequebookServices`;
    CBEnableDisableBiometric = `${CBSVG}/CBSVGs/CBEnableDisableBiometric.svg#CBEnableDisableBiometric`;

    configuration = {
        previousPageUrl: 'Home',
        heading: 'Transfers',
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

    @track transactionData = [
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
        if (!this.modalFilter && event.detail.fromDate != undefined && event.detail.toDate != undefined) {
            this.fromDate = new Date(event.detail.fromDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            this.toDate = new Date(event.detail.toDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        }
    }

    sortAmount() {
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

    navigateToManageBeneficiaries() {
        this.navigateTo('CBManageBeneficiaries__c')
    }
    navigateToBillPayment() {
        this.navigateTo('CBBillPayments__c')
    }

    navigateToPredefined() {
        this.navigateTo('CBPredefined__c')
    }

    navigateToAdHocPaymts() {
        this.navigateTo('CBAdHocPayments__c')
    }

    navigateToOwnAccTransfer() {
        this.navigateTo('CBOwnAccountTransfer__c')
    }
    navigateToIntrabankTransfer() {
        this.navigateTo('CBIntraBankTransfers__c')
    }
    navigateToInternationalTransfer() {
        this.navigateTo('CBInternationalTransfers__c')
    }
    navigateToDomesticPayments() {
        this.navigateTo('CBPredefinedDomesticTransfer__c')
    }

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