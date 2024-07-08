import { LightningElement, wire, track } from 'lwc'; // Import necessary decorators and modules from LWC framework
import { CurrentPageReference } from 'lightning/navigation'; // Import navigation and current page reference modules

import CBSVG from "@salesforce/resourceUrl/CBSVG"; // Import SVG resources

// Import labels for easy manipulation in the UI
import DETAILS from '@salesforce/label/c.CB_Details';
import TRANSACTIONS from '@salesforce/label/c.CB_Transactions';
import SHOWINGTRANSACTIONSFROM from '@salesforce/label/c.CB_ShowingTransactionsFrom';
import NORECENTTRANSACTIONFOUND from '@salesforce/label/c.CB_NoRecentTransactionFound';
import SHOWING_LAST from '@salesforce/label/c.CB_ShowingLast';

// Import Apex method to get last N transactions
import getFullAccountStatement from '@salesforce/apex/CBGetFullAccountStatement.getFullAccountStatement';

// Import utility functions
import { getJsonData, dateToTimestamp, setPagePath } from 'c/cBUtilities';

export default class CBCreditAccountDetails extends LightningElement {

    // Labels for UI elements
    label = {
        DETAILS,
        SHOWING_LAST,
        TRANSACTIONS,
        SHOWINGTRANSACTIONSFROM,
        NORECENTTRANSACTIONFOUND,
    }

    // Initial account details
    cardType = {
        CreditAccount: {
            cardNum: 600015474586,
            accBal: 'BMD 10,000.00',
            currentBal: 'BMD 10,000.00',
            pendingBal: 'BMD 8000.00',
            cardExpiryDate: '06/27',
            productName: 'PLATINUM CREDIT CARD',
            cardStatus: 'Active',
        }
    }

    // Configuration settings for the component
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

    // SVG resources for icons
    CBPdf = `${CBSVG}/CBSVGs/CBPdf.svg#CBPdf`;
    CBSortOrder = `${CBSVG}/CBSVGs/CBSortOrder.svg#CBSortOrder`;
    CBFilter = `${CBSVG}/CBSVGs/CBFilter.svg#CBFilter`;

    // Styles for transaction and overview display
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
                    this.cardType.CreditAccount.cardNum = obj.accountNo || '';
                    this.cardType.CreditAccount.accBal = obj.accountBal || '0';
                    this.cardType.CreditAccount.totalHolds = obj.totalHolds || '0';
                    this.cardType.CreditAccount.currentBal = obj.currentBal || '0';
                    this.accountNumber = obj.accountNo || '';
                    this.branchId = obj.branchId || '';
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

    // Flag to determine if transactions are being viewed
    transaction = true;

    @track transactionData = []; // Track changes to transaction data

    // Check if there is any transaction data
    get hasTransactionData() {
        return this.transactionData.length > 0
    }

    overviewData = [
        { id: 0, label: "Credit Limit", value: "BMD 10,000.00" },
        { id: 1, label: "Last Statement Balance", value: "BMD 8,000.00" },
        { id: 2, label: "Minimum Payment", value: "BMD 500.00" },
        { id: 3, label: "Payment Due Date", value: "27/12/23" },
        { id: 4, label: "Available Limit", value: "BMD 8000.00" },
        { id: 5, label: "Last Payment Date", value: "05/01/24" }
    ];

    // Handle transactions button click
    handleTransactionsClick() {
        this.transaction = true;
        this.transactionStyle = 'overview';
        this.overViewStyle = "";
        console.log('Transactions clicked');
    }

    // Handle overview button click
    handleOverviewClick() {
        this.transaction = false;
        this.overViewStyle = 'overview';
        this.transactionStyle = ""
        console.log('Overview clicked');
    }

    // Lifecycle hook to run when the component is inserted into the DOM
    connectedCallback() {
        setPagePath('CBCreditCardAccount__c')
        this.requestUUID = 'Req_' + dateToTimestamp();
        this.currentDate();
        this.fetchJsonData(this.FullAccountStatementApiName)
    }

    currentDate(){
        let pastDate = new Date();
        pastDate.setDate(new Date().getDate() - 365)
        this.fromDate =  pastDate.toISOString().split('.')[0] + ".000"
        this.toDate = new Date().toISOString().split('.')[0] + ".000"
    }

    FullAccountStatementApiName = 'CB_Get_Full_Account_Statement'

    // isLoading = true

    reqBody = ''
    jsonPathData = []

    requestUUID = ''
    accountNumber = '';
    branchId = '500'
    lastNTransactions = 10
    nTransactions = true

    fetchJsonData(apiName) {
        getJsonData(apiName)
            .then(result => {
                this.reqBody = JSON.parse(result[0]);
                this.jsonPathData = result[1];
                console.log('reqBody: ', JSON.stringify(this.reqBody));
                console.log('jsonPathData: ', this.jsonPathData);
                this.fullStmt()
            }).catch((error) => {
                console.log('Some error occured: ' + error)
            })
    }

    fullStmt() {
        this.reqBody = this.dataMap(this.reqBody, this.jsonPathData)
        let reqWrapper = {
            payload: JSON.stringify(this.reqBody),
            metadataName: this.FullAccountStatementApiName,
            headers: null
        }
        getFullAccountStatement({ reqWrapper: reqWrapper })
            .then((result) => {
                console.log("Result = " + JSON.stringify(result))
                this.transactionData = JSON.parse(result);
                this.isLoading = false
            }).catch((error) => {
                console.log('Error: ' + JSON.stringify(error));
                console.log('Error: ' + JSON.stringify(error.body.message));
            })
            let from = this.fromDate.substring(0,7)
            let to = this.toDate.substring(0,7)
            this.fromDate = new Date(from).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            this.toDate = new Date(to).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }

    fromDate = ''
    toDate = ''
    modalFilter = false
    openFilterPopup(event) {
        this.modalFilter = !this.modalFilter;
        if (!this.modalFilter && event?.detail?.fromDate && event?.detail?.toDate) {
            this.isLoading = true
            this.fromDate = event.detail.fromDate + '-01T00:00:00.000'
            this.toDate = this.dateFormat(event.detail.toDate)
            this.nTransactions = false
            this.fullStmt()
        }
    }

    dateFormat(stringDate){
        let [year, month] = stringDate.split('-').map(Number);
        let date = new Date(year, month, 1);
        date.setDate(0);
        return date.toISOString().split('.')[0] + ".000";
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

    /**
    * Metadata for the PDF download modal.
    */
    modalOpen = false
    @track modal = {
        title: '',
        message: 'No Data Available For Download',
        yesButton: {
            exposed: true,
            label: "OK",
            // Implementation for the "OK" button click action.
            implementation: () => {
                this.modalOpen = false;
            }
        },
        noButton: {
            exposed: false,
            label: "Not",
            //Implementation for the "Not" button click action.
            implementation: () => {
                console.log('no');
                this.modalOpen = false;
            }
        }
    };

    generatePdf() {
        console.log('pdf Called');
        this.createPdf()
        if (this.transactionData.length > 0) {
            this.successModalOpen = !this.successModalOpen;
        }
        else {
            this.modalOpen = true
        }

    }

    // Sort transaction details
    sortDetails() {
        this.mergeSort(this.transactionData);
    }

    // Merge sort algorithm for sorting transactions by date
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
                if (new Date(leftArr[i].dateTime) > new Date(rightArr[j].dateTime)) {
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

    /**
    * This function takes in the request body and ther path and uses eval() to substitute the  values in the request body.
    * @param {Object} jsonReq - The request body, as a JSON.
    * @param {Array} JsonPath - The Json path data to be used for substitution.
    * @returns {Object} The request body after the values have been substituted.
    */
    dataMap(jsonReq, JsonPath) {
        JsonPath.forEach((record) => {
            if (!record.Is_Active__c) {
                return
            }
            if (record.Is_Constant__c) {
                console.log(`jsonReq${record.JSON_Path__c}=${record.Value__c}`)
                eval(`jsonReq${record.JSON_Path__c}=${record.Value__c}`);
            } else {
                console.log(`jsonReq${record.JSON_Path__c}=this.${record.Field_Name__c}`)
                eval(`jsonReq${record.JSON_Path__c}=this.${record.Field_Name__c}`);
            }
        });
        return jsonReq
    }

}