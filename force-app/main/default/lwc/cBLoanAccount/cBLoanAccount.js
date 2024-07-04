import { LightningElement, wire, api, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

import CBSVG from "@salesforce/resourceUrl/CBSVG"
import DETAILS from '@salesforce/label/c.CB_Details';
import TRANSACTIONS from '@salesforce/label/c.CB_Transactions';
import NO_RECENT_TRANSACTION from '@salesforce/label/c.CB_NoRecentTransactionFound';
import SHOWING_TRANSACTION_FROM from '@salesforce/label/c.CB_ShowingTransactionsFrom';
import SHOWING_LAST from '@salesforce/label/c.CB_ShowingLast';
import getFullAccountStatement from '@salesforce/apex/CBGetFullAccountStatement.getFullAccountStatement';
import { getJsonData, dateToTimestamp, setPagePath } from 'c/cBUtilities';
import getProductName from '@salesforce/apex/CBUtilityController.getProductName';

export default class CBLoanAccount extends LightningElement {

    label = {
        DETAILS,
        TRANSACTIONS,
        NO_RECENT_TRANSACTION,
        SHOWING_TRANSACTION_FROM,
        SHOWING_LAST
    }

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
    // Configuration for the secondary header
    configuration = {
        previousPageUrl: 'CBFavoriteAccounts__c',
        heading: 'Loan Account',
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
    // Represents overview data with placeholder values.
    @track overviewData = [
        // { id: 0, label: "Loan Amount", value: "BMD 13,000.00" },
        // { id: 1, label: "Outstanding Balance", value: "BMD 6,289.00" },
        // { id: 2, label: "Current Interest Rate", value: "5.0%" },
        // { id: 3, label: "Next Interest payment Amount", value: "BMD 389.00" },
        // { id: 4, label: "Next payment Date", value: "11/12/2024" },
        // { id: 5, label: "Overdue Date", value: "11/12/2024" },
        // { id: 5, label: "Overdue Amount", value: "BMD 0.00" },
        // { id: 5, label: "Available Amount", value: "6,2089.00" }
    ];
    // Represents the current page reference obtained using the @wire adapter.
    @wire(CurrentPageReference)
    wiredPageRef;


    /**
         * Initializes the card type based on the provided page reference.
         * @param {Object} pageRef - The current page reference.
         */
    initializeCardType(pageRef) {
        const state = pageRef?.state;
        if (state && state.account) {
            try {
                let obj = JSON.parse(state.account);
                if (obj) {
                    this.cardType.LoanAccount.accountNo = obj.accountNo || '';
                    this.cardType.LoanAccount.accBal = obj.accountBal || '0';
                    this.cardType.LoanAccount.interestAmount = obj.nextInterestAmt || '';
                    this.cardType.LoanAccount.interestDate = obj.nextInterestDate || '0';
                    this.cardType.LoanAccount.productName = obj.productName || 'Cash Secured BMD-Regular';
                    this.cardType.LoanAccount.date = obj.date || '0';
                    this.cardType.LoanAccount.beneficiary = obj.beneficiary || 'Mr Walter White';
                    this.accountNumber = obj.accountNo || '';
                    this.branchId = obj.branchId || '';
                    this.overviewData = obj.overviewData
                    getProductName({ productCode: this.productCode })
                        .then((productName) => {
                            console.log('productName: ', productName);
                            if (productName !== null && productName !== undefined) {
                                this.cardType.LoanAccount.productName = productName;
                            }
                        }).catch(error => {
                            console.log('Error: ' + JSON.stringify(error));
                        });
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

    transaction = true;

    @api transactionData = [];
    /**
         * Checks if there is any transaction data available.
         * @returns {boolean} True if there is transaction data, false otherwise.
         */
    get hasTransactionData() {
        return this.transactionData.length > 0
    }

    /**
         * Handles the click event for displaying transaction details.
         * Sets transaction state to true and updates styles.
         */
    handleTransactionsClick() {
        this.transaction = true;
        this.transactionStyle = 'overview';
        this.overViewStyle = "";
        console.log('Transactions clicked');
    }

    /**
     * Handles the click event for displaying overview details.
     * Sets transaction state to false and updates styles.
     */
    handleOverviewClick() {
        this.transaction = false;
        this.overViewStyle = 'overview';
        this.transactionStyle = ""
        console.log('Overview clicked');
    }
    /**
     * Lifecycle method that runs when the component is connected to the DOM.
     * Sets page path, initializes card type, generates a unique request UUID, and fetches JSON data.
     */
    connectedCallback() {
        setPagePath('CBLoanAccount__c')
        this.initializeCardType(this.wiredPageRef);
        this.requestUUID = 'Req_' + dateToTimestamp();
        this.currentDate()
        this.fetchJsonData(this.FullAccountStatementApiName)
    }

    currentDate() {
        let pastDate = new Date();
        pastDate.setDate(new Date().getDate() - 365)
        this.fromDate = pastDate.toISOString().split('.')[0] + ".000"
        this.toDate = new Date().toISOString().split('.')[0] + ".000"
    }

    // isLoading = true
    FullAccountStatementApiName = 'CB_Get_Full_Account_Statement'
    reqBody = ''
    jsonPathData = []

    requestUUID = ''
    accountNumber = '7500000029';
    branchId = '100'
    lastNTransactions = 10
    nTransactions = true

    /**
     * Fetches JSON data using the provided API name.
     * @param {String} apiName - The API name for fetching JSON data.
     */
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
    /**
     * Initiates a request to fetch the last N transactions from the server.
     * Uses data mapping to update the request body, then sends the request using the appropriate Apex method.
     */
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
            })
        this.fromDate = (this.fromDate.substring(0, 10)).split('-').reverse().join('/');
        this.toDate = (this.fromDate.substring(0, 10)).split('-').reverse().join('/');
    }

    fromDate = ''
    toDate = ''
    modalFilter = false
    openFilterPopup(event) {
        this.modalFilter = !this.modalFilter;
        if (!this.modalFilter && event?.detail?.fromDate && event?.detail?.toDate) {
            this.isLoading = true
            this.toDate = (event.detail.toDate).split('/').reverse().join('-') + 'T00:00:00.000'
            this.fromDate = (event.detail.fromDate).split('/').reverse().join('-') + 'T00:00:00.000'
            this.nTransactions = false
            // fullStmt();
        }
    }

    successModalOpen = false;
    // Represents the configuration for the success modal.
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
    /**
         * Generates a PDF and toggles the success modal or opens the modal if no transaction data is available.
         */
    generatePdf() {
        console.log('pdf Called');
        if (this.transactionData.length > 0) {
            this.successModalOpen = !this.successModalOpen;
        }
        else {
            this.modalOpen = true
        }
    }


    /**
         * Sorts the transaction data using merge sort algorithm.
         */
    sortDetails() {
        this.mergeSort(this.transactionData);
    }
    /**
         * Performs the merge sort algorithm on the provided array.
         * @param {Array} arr - The array to be sorted.
         */
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