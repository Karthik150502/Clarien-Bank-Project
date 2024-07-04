import { LightningElement, wire, api, track } from 'lwc';

import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

// Import labels for easy manipulation in the UI
import TRANSACTIONS from '@salesforce/label/c.CB_Transactions';
import ACTIVETRANSFERS from '@salesforce/label/c.CB_ActiveTransfers';
import SHOWINGTRANSACTIONSFROM from '@salesforce/label/c.CB_ShowingTransactionsFrom';
import NORECENTTRANSACTIONFOUND from '@salesforce/label/c.CB_NoRecentTransactionFound';
import SHOWING_LAST from '@salesforce/label/c.CB_ShowingLast';
import FAVORITEACCOUNTS_PAGE from '@salesforce/label/c.CB_Page_Favoriteaccounts';
import SAVINGACCOUNT_HEADER from '@salesforce/label/c.CB_Header_SavingAccount';
import SAVINGACCOUNT_PAGE from '@salesforce/label/c.CB_Page_SavingsAccount';
import CURRENTACCOUNT_HEADER from '@salesforce/label/c.CB_Header_CurrentAccount';
import NODATAAVAILABLEFORDOWNLOAD from '@salesforce/label/c.CB_NoDataAvailableForDownload';
import OK_BUTTON from '@salesforce/label/c.CB_Ok';
import NOT_BUTTON from '@salesforce/label/c.CB_Not';
import CANCEL_BUTTON from '@salesforce/label/c.CB_Cancel';
import PDFDOWNLOAD from '@salesforce/label/c.CB_PdfDownload';
import CLARIEN from '@salesforce/label/c.CB_Clarien';

import getFullAccountStatement from '@salesforce/apex/CBGetFullAccountStatement.getFullAccountStatement';
import getRecActiveTransactions from '@salesforce/apex/CBGetRecInstListController.handlegetRecInstList';
import getSchActiveTransactions from '@salesforce/apex/CBretSchdTransController.hanldeRetSchdTrans';
import getcompActiveTransactions from '@salesforce/apex/CBGetRetComTransController.handleRetComTrans';
import getProductName from '@salesforce/apex/CBUtilityController.getProductName';

import { getJsonData, dateToTimestamp, getUserCreds, setPagePath } from 'c/cBUtilities';

export default class CBSavingAccount extends NavigationMixin(LightningElement) {

    label = {
        ACTIVETRANSFERS,
        TRANSACTIONS,
        SHOWING_LAST,
        SHOWINGTRANSACTIONSFROM,
        NORECENTTRANSACTIONFOUND
    }

    // configuration for the type of card
    cardType = {
        SavingsAccount: {
            accountNo: "7500000029",
            accBal: 'BMD 5,546.54',
            currentBal: 'BMD 5664.55',
            totalHolds: 'BMD 0.00',
            productName: 'PERSONAL SAVINGS USD',
            beneficiary: 'Mr. Retail Demo',
            date: '7/05/2024',
        },
    }

    // configuration for secondary heading
    configuration = {
        previousPageUrl: FAVORITEACCOUNTS_PAGE,
        heading: SAVINGACCOUNT_HEADER,
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

    /**
     * Path to the PDF SVG icon resource.
     * @type {String}
     */
    CBPdf = `${CBSVG}/CBSVGs/CBPdf.svg#CBPdf`;
    CBSortOrder = `${CBSVG}/CBSVGs/CBSortOrder.svg#CBSortOrder`;
    CBFilter = `${CBSVG}/CBSVGs/CBFilter.svg#CBFilter`;

    transactionStyle = 'overview';
    overViewStyle = "";

    username = ''
    password = ''
    @wire(CurrentPageReference)
    wiredPageRef;
    testAccountNumber = '7500000043'

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

    @track
    transactionData = [];


    get hasTransactionData() {
        return this.transaction ? this.transactionData.length > 0 : this.activeTransactionData.length > 0
    }

    @track activeTransactionData = []
    tempActiveTransactionData = []
    fullAccountStatementApiName = 'CB_Get_Full_Account_Statement'
    getRecInstListAPIName = 'CB_Retrieve_Recurring_Instructions_List'
    getRetSchdTransAPIName = 'CB_Retrieve_Scheduled_Transaction'
    getRetCompTransAPIName = 'CB_Retrieve_Completed_TransList'
    fullAccountStatementReqBody = ''
    getRecInstListReqBody = ''
    getRetSchdTransReqBody = ''
    getRetCompTransReqBody = ''
    jsonPathData = []
    getRecInstListjsonPath = []
    getRetCompTransJsonpath = []
    getRetSchdTransJsonpath = []
    requestUUID = ''
    accountNumber = '7500000029';
    branchId = '100'
    lastNTransactions = 10
    nTransactions = true
    recFromDate = '2024-04-01'
    recToDate = '2025-04-01'
    isLoading = true
    schTransactionFromDate = '24/05/2024'
    schTrransactionToDate = '24/05/2025';
    productCode = ''
    connectedCallback() {
        this.configuration.previousPageUrl = setPagePath(SAVINGACCOUNT_PAGE)
        this.initializeCardType(this.wiredPageRef);
        this.requestUUID = 'Req_' + dateToTimestamp();
        this.currentDate();
        this.fetchJsonData(this.fullAccountStatementApiName)
        this.getUsernamePasswordHandler();
    }

    currentDate(){
        let pastDate = new Date();
        pastDate.setDate(new Date().getDate() - 365)
        this.fromDate =  pastDate.toISOString().split('.')[0] + ".000"
        this.toDate = new Date().toISOString().split('.')[0] + ".000"
    }

    /**
     * Fetches JSON data for the given API name.
     * Parses the response into full account statement request body and JSON path data.
     * Logs the parsed request body and JSON path data.
     * Initiates the process to retrieve the last N transactions.
     * @param {String} apiName - The name of the API to fetch JSON data from.
     */
    fetchJsonData(apiName) {
        getJsonData(apiName)
            .then(result => {
                this.fullAccountStatementReqBody = JSON.parse(result[0]);
                this.jsonPathData = result[1];
                console.log('reqBody: ', JSON.stringify(this.fullAccountStatementReqBody));
                console.log('jsonPathData: ', this.jsonPathData);
                this.fullStmt();

            }).catch((error) => {
                console.log('Some error occurred: ' + error);
            });
    }

    /**
    * Initializes the card type based on the provided page reference state.
    * Updates the Savings Account details with parsed values from the state.account object.
    * Retrieves additional details such as product name using the product code.
    * @param {Object} pageRef - The page reference object containing state information.
    */
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
                    this.cardType.SavingsAccount.beneficiary = obj.beneficiary || 'Mr. Retail Demo';
                    this.cardType.SavingsAccount.date = obj.date || '7/05/2024';
                    this.accountNumber = obj.accountNo || '';
                    this.branchId = obj.branchId || '100';
                    this.productCode = obj.productCode || '';
                    console.log(this.branchId,obj.branchId)
                    console.log('this.productCode', this.productCode)
                    getProductName({ productCode: this.productCode })
                        .then((productName) => {
                            console.log('productName: ', productName);
                            this.cardType.SavingsAccount.productName = productName;
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

    /**
     * Handles click event for displaying transaction details.
     * Sets transaction flag to true, transactionStyle to 'overview', and clears overViewStyle.
     */
    handleTransactionsClick() {
        this.transaction = true;
        this.transactionStyle = 'overview';
        this.overViewStyle = "";
        this.fetchJsonData(this.fullAccountStatementApiName)
        this.handleTransactionsClick = true
        this.nTransactions=true
    }
    /**
     * Handles click event for displaying overview details.
     * Initiates loading state, fetches active transfer JSON data, sets transaction flag to false,
     * overViewStyle to 'overview', and clears transactionStyle.
     */
    handleOverviewClick() {
        this.fromDate = this.schTransactionFromDate
        this.toDate =  this.schTrransactionToDate
        this.nTransactions=false
        this.isLoading = true;
        this.getActiveTranfersJsonData()
        this.transaction = false;
        this.overViewStyle = 'overview';
        this.transactionStyle = ""
    }
    /**
     * Retrieves username and password from Salesforce session.
     * Sets username and password properties if available in the result.
     * Logs any errors encountered during the retrieval process.
     */
    getUsernamePasswordHandler() {
        getUserCreds().then(result => {
            console.log('UserCred: ' + JSON.stringify(result))
            if (result.CBUsername && result.CBPassword) {
                this.username = result.CBUsername
                this.password = result.CBPassword
            }
        }).catch(error => {
            console.log("Was not able to get Username and password from the Salesforce session.!")
            console.error(error)
        });
    }

    /**
     * Initiates a call to retrieve the last N transactions based on the configured request body and API.
     * Updates transactionData with the fetched transaction details upon success.
     * Sets isLoading to false after completing the API call.
     */
    fullStmt() {
        this.fullAccountStatementReqBody = this.dataMap(this.fullAccountStatementReqBody, this.jsonPathData)
        let reqWrapper = {
            payload: JSON.stringify(this.fullAccountStatementReqBody),
            metadataName: this.fullAccountStatementApiName,
            headers: null
        }

        getFullAccountStatement({ reqWrapper: reqWrapper })
            .then((result) => {
                console.log("Result = " + JSON.stringify(result))
                this.transactionData = JSON.parse(result);
                this.isLoading = false
            }).catch((error) => {
                this.isLoading = false
                console.log('Error: ' + JSON.stringify(error));
            })
            this.fromDate = (this.fromDate.substring(0,10)).split('-').reverse().join('/');
            this.toDate = (this.fromDate.substring(0,10)).split('-').reverse().join('/');
    }

    fromDate = ''
    toDate = ''

    successModalOpen = false;
    successModalconfig = {
        title: CLARIEN,
        message: PDFDOWNLOAD,
        okButton: {
            exposed: true,
            label: OK_BUTTON,
            function: () => {
                this.generatePdf();
            }
        },
        noButton: {
            exposed: false,
            label: CANCEL_BUTTON,
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
        message: NODATAAVAILABLEFORDOWNLOAD,
        yesButton: {
            exposed: true,
            label: OK_BUTTON,
            // Implementation for the "OK" button click action.
            implementation: () => {
                this.modalOpen = false;
            }
        },
        noButton: {
            exposed: false,
            label: NOT_BUTTON,
            //Implementation for the "Not" button click action.
            implementation: () => {
                console.log('no');
                this.modalOpen = false;
            }
        }
    };

    /**
     * Toggles the success modal open state if transaction data exists; otherwise, opens the modal.
     * Logs a message to indicate the PDF generation action.
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
     * Sorts the transaction data using the merge sort algorithm.
     * Updates the transactionData array in place with the sorted results.
     */
    sortDetails() {
        this.mergeSort(this.transactionData);
    }

    /**
     * Retrieves JSON data asynchronously for multiple APIs related to active transfers.
     * Parses and stores the request bodies and JSON paths for each API.
     * Initiates subsequent actions to fetch active recurring transactions.
     */
    async getActiveTranfersJsonData() {
        this.tempActiveTransactionData=[];
        const apiNames = [this.getRecInstListAPIName, this.getRetSchdTransAPIName, this.getRetCompTransAPIName];
        const promises = apiNames.map(apiName => getJsonData(apiName));
        const results = await Promise.all(promises);

        results.forEach((result, index) => {
            const [reqBody, jsonPath] = result;
            switch (index) {
                case 0:
                    this.getRecInstListReqBody = JSON.parse(reqBody);
                    this.getRecInstListjsonPath = jsonPath;
                    console.log(JSON.parse(reqBody))
                    break;
                case 1:
                    this.getRetSchdTransReqBody = JSON.parse(reqBody);
                    this.getRetSchdTransJsonpath = jsonPath;
                    console.log(JSON.parse(reqBody))
                    break;
                case 2:
                    this.getRetCompTransReqBody = JSON.parse(reqBody);
                    this.getRetCompTransJsonpath = jsonPath;
                    console.log(JSON.parse(reqBody))
                    break;
            }
        });

        this.getActiveRecTransactions();
    }
    /**
     * Retrieves active recurring transactions using the mapped request body for recurring instructions.
     * Processes the returned data to extract relevant transaction details such as ID, date, amount, and type.
     * Stores processed transaction data in temporary storage for further use.
     * Initiates fetching of active scheduled transactions upon completion.
     */
    getActiveRecTransactions() {
        this.getRecInstListReqBody = this.dataMap(this.getRecInstListReqBody, this.getRecInstListjsonPath);
        let reqWrapper = {
            payload: JSON.stringify(this.getRecInstListReqBody),
            metadataName: this.getRecInstListAPIName,
            headers: null
        }
        getRecActiveTransactions({ reqWrapper: reqWrapper })
            .then((result) => {
                if (result != '') {
                    let activeTransactionDataListResult = JSON.parse(result);
                    let codeSets = activeTransactionDataListResult.footer.codedescription;
                    let activeRecTransactionData = activeTransactionDataListResult.RecurringInstructionsList.RecurringInstructionsList_REC.map((transaction, index) => {
                        return {
                            id: index + 1,
                            CHQSId: this.getDescription(codeSets, transaction.txnStatus),
                            EMIId: transaction.refId,
                            date: transaction.recDate.split(' ')[0],
                            amount: transaction.totAmt.split('|')[1],
                            transactionType: this.getDescription(codeSets, transaction.txnType),
                            currencyCode : transaction.txnCrn

                        };
                    });
                    console.log('activeRecTransactionData ', JSON.stringify(activeRecTransactionData));
                    this.tempActiveTransactionData.push(...activeRecTransactionData);
                }
            })
            .catch(error => {
                console.error('Some error occurred: ', error);
            }).finally(error=>{
                this.getActiveSchTransactions();
            });
    }
    /**
     * Retrieves active scheduled transactions using the mapped request body for scheduled transfers.
     * Processes the returned data to extract relevant transaction details such as ID, date, amount, and type.
     * Stores processed transaction data in temporary storage for further use.
     * Initiates fetching of active completed transactions upon completion.
     */
    getActiveSchTransactions() {
        this.getRetSchdTransReqBody = this.dataMap(this.getRetSchdTransReqBody, this.getRetSchdTransJsonpath);
        let reqschWrapper = {
            payload: JSON.stringify(this.getRetSchdTransReqBody),
            metadataName: this.getRetSchdTransAPIName,
            headers: null
        }
        return getSchActiveTransactions({ reqWrapper: reqschWrapper })
            .then((result) => {
                if (result != '') {
                    let activeTransactionDataListResult = JSON.parse(result);
                    let codeSets = activeTransactionDataListResult.footer.codedescription;
                    let activeSchTransactionData = activeTransactionDataListResult.ScheduledTransactionResultList.ScheduledTransactionResultList_REC.map((transaction, index) => {
                        return {
                            id: index + 1,
                            CHQSId: this.getDescription(codeSets, transaction.transactionStatus),
                            EMIId: transaction.refId,
                            date: transaction.transactionDate.split(' ')[0],
                            amount: transaction.totAmt.split('|')[1],
                            transactionType: this.getDescription(codeSets, transaction.transactionType),
                            currencyCode : transaction.transactionCrn

                        };
                    });
                    console.log('activeSchTransactionData ', JSON.stringify(activeSchTransactionData));
                    this.tempActiveTransactionData.push(...activeSchTransactionData);
                }
            }).catch(error => {
                console.error('Some error occurred: ', error);
            }).finally(error=>{
                this.getActiveCmpTransactions();
            });

    }
    /**
     * Retrieves active completed transactions using the mapped request body for completed transfers.
     * Processes the returned data to extract relevant transaction details such as ID, date, amount, and type.
     * Stores processed transaction data in temporary storage and assigns it to the active transaction data for display.
     * Sets isLoading flag to false upon completion to indicate data loading is complete.
     */
    getActiveCmpTransactions() {
        this.getRetCompTransReqBody = this.dataMap(this.getRetCompTransReqBody, this.getRetCompTransJsonpath);
        let reqcmphWrapper = {
            payload: JSON.stringify(this.getRetCompTransReqBody),
            metadataName: this.getRetCompTransAPIName,
            headers: null
        }
        return getcompActiveTransactions({ reqWrapper: reqcmphWrapper })
            .then((result) => {
                if (result != '') {
                    let activeTransactionDataListResult = JSON.parse(result);
                    let codeSets = activeTransactionDataListResult.footer.codedescription;
                    let activeCmpTransactionData = activeTransactionDataListResult.CompleteTxnList.CompleteTxnList_REC.map((transaction, index) => {
                        return {
                            id: index + 1,
                            CHQSId: this.getDescription(codeSets, transaction.tranStatus),
                            EMIId: transaction.refId,
                            date: transaction.tranDate.split(' ')[0],
                            amount:transaction.totalAmount.split('|')[1],
                            transactionType: this.getDescription(codeSets, transaction.txnType),
                            currencyCode : transaction.txnCurrency
                        };
                    });
                    console.log('activeCmpTransactionData ', JSON.stringify(activeCmpTransactionData));
                    this.tempActiveTransactionData.push(...activeCmpTransactionData);
                }
            }).catch(error => {
                console.error('Some error occurred: ', error);
            }).finally(error=>{
                this.activeTransactionData = this.tempActiveTransactionData
                this.isLoading = false;
            });
    }

    /**
     * Sorts an array of transactions using the merge sort algorithm based on transaction date/time.
     * @param {Array} arr - The array of transactions to be sorted.
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

    get activetrans (){
        return !this.transaction
    }
    transactionDate = ''
    filterPage = false
    /**
    * Filters transactions based on date range or amount range.
    * Updates fromDate, toDate, and nTransactions based on the filter criteria.
    * @param {CustomEvent} event - The event containing filter details like date range or amount range.
    */
    filterTransactions(event) {
        if (this.filterPage) {
            this.isLoading = true;
            if(this.transaction){
                if (event?.detail?.toDate && event?.detail?.fromDate) {
                    this.toDate = (event.detail.toDate).split('/').reverse().join('-') + 'T00:00:00.000'
                    this.fromDate = (event.detail.fromDate).split('/').reverse().join('-') + 'T00:00:00.000'
                    this.nTransactions = false
                }
                else if (event?.detail?.fromAmount && event?.detail?.toAmount) {
                    this.fromAmount = event.detail.fromAmount
                    this.toAmount = event.detail.toAmount
                    this.nTransactions = false
                }
                this.fullStmt();
            }
            else{
                console.log('event.detail.toDate',event?.detail?.toDate)
                console.log('Entered in else condition')
                console.log('event.detail.fromDate',event?.detail?.fromDate)
                if (event?.detail?.toDate && event?.detail?.fromDate) {
                    this.nTransactions = false
                    this.schTransactionFromDate=event.detail.fromDate
                    console.log('schTransactionFromDate',this.schTransactionFromDate)
                    this.schTrransactionToDate=event.detail.toDate
                    console.log('schTrransactionToDate',this.schTrransactionToDate)
                    this.recToDate = event.detail.toDate.split('/').reverse().join('-');
                    console.log('recToDate',this.recToDate)
                    this.recFromDate = event.detail.fromDate.split('/').reverse().join('-');
                    console.log('recFromDate',this.recFromDate)
                    this.fromDate = event.detail.fromDate
                    this.toDate =  event.detail.toDate
                    this.getActiveTranfersJsonData();
                }
            }
        }
        console.log('filter page',this.filterPage);
        this.isLoading = false;
        this.filterPage = !this.filterPage
    }

    /**
     * Formats a date string from DD/MM/YYYY to YYYY-MM-DD and subtracts 1 from the month.
     * @param {String} dateStr - The date string to format (DD/MM/YYYY).
     * @returns {String} - The formatted date string (YYYY-MM-DD).
     */
    formatDate(dateStr) {
        let [day, month, year] = dateStr.split('/');

        let formattedDate = `${year}-${month}-${day}`;
        console('date ',formattedDate)
        return formattedDate
    }

    /**
     * Retrieves the description from the provided codedescription based on the given value.
     * @param {Array} codedescription - Array containing code sets with descriptions.
     * @param {String} value - The value to match and retrieve description for.
     * @returns {String|null} - The description corresponding to the value, or null if not found.
     */
    
    getDescription(codedescription, value) {
        for (const codeSet of codedescription) {
            for (const code of codeSet.codeSet.code) {
                if (code.value === value) {
                    return code.description;
                }
            }
        }
        return null; // or some default value if not found
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
        console.log('Mapped JSON' + JSON.stringify(jsonReq));
        return jsonReq
    }
}