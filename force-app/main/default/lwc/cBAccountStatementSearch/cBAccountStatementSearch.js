import { LightningElement, track } from 'lwc';

// Importing NavigationMixin for navigation functionality
import { NavigationMixin } from 'lightning/navigation';

import DONE from '@salesforce/label/c.CB_Done'; // Importing label for Done
import CANCEL from '@salesforce/label/c.CB_Cancel'; // Importing label for Cancel
import ACCOUNTSTATEMEMTS from '@salesforce/label/c.CB_PageHeader_AccountStatements'; // Importing label for Account Statements
import GetLast30DaysStatement from '@salesforce/label/c.CB_GetLast30DaysStatement'; // Importing label for GetLast30DaysStatement
import GetStatementBetweenDays from '@salesforce/label/c.CB_GetStatementBetweenDays'; // Importing label for GetStatementBetweenDays
import LATESTSTATEMENTS from '@salesforce/label/c.CB_LatestStatements'; // Importing label for Latest Statements
import OR from '@salesforce/label/c.CB_Or'; // Importing label for OR
import FROM_DATE from '@salesforce/label/c.CB_FromDate'; // Importing label for Latest Statements
import TO_DATE from '@salesforce/label/c.CB_ToDate'; // Importing label for OR
import SELECT from '@salesforce/label/c.CB_Select';

import ACCOUNTSTATEMENTSEARCH_PAGE from '@salesforce/label/c.CB_Page_AccountStatementSearch'; // Importing label for Account Statement Search Page API Name
import ACCOUNTSTATEMENTVIEW_PAGE from '@salesforce/label/c.CB_Page_AccountStatementView'; // Importing label for Account Statement View Page API Name
import HOME_PAGE from '@salesforce/label/c.CB_Page_Home'; // Importing label for Home Page API Name

import docSearch from '@salesforce/apex/CBApiController.docSearch'; // Importing Apex method document search for API call Out
import { getJsonData, dateToTimestamp, formatDate, setPagePath, getMobileSessionStorage } from 'c/cBUtilities'; // Importing utility methods

import CBSVG from "@salesforce/resourceUrl/CBSVG" // Importing SVG file from Static Resource

// Extending the LightningElement class and applying the NavigationMixin for navigation capabilities
export default class CBAccountStatementSearch extends NavigationMixin(LightningElement) {

    // Labels for UI elements
    label = {
        DONE,
        CANCEL,
        GetLast30DaysStatement,
        GetStatementBetweenDays,
        LATESTSTATEMENTS,
        OR,
        FROM_DATE,
        TO_DATE,
        SELECT
    }

    //SVG's from static resource
    CBSearchIcon = `${CBSVG}/CBSVGs/CBSearchIcon.svg#CBSearchIcon`;
    // CBPdfIcon = `${CBSVG}/CBSVGs/CBPdfIcon.svg#CBPdfIcon`;
    CBCalendar = `${CBSVG}/CBSVGs/CBCalendar.svg#CBCalendar`;

    // Need to fetch from APIs
    allAccounts = [
        {
            accountNo: '600017725563',
            accountType: 'Savings Account'
        },
        {
            accountNo: '654147489652',
            accountType: 'Current Account'
        },
        {
            accountNo: '3310916047',
            docType: '2026',
            accountType: 'Loan Account'
        },
        {
            accountNo: '6000149418',
            docType: '1937',
            accountType: 'Chequing Account'
        },
        {
            accountNo: '6000149129',
            docType: '1937',
            accountType: 'Savings Account'
        },
        {
            accountNo: '6000123456',
            accountType: 'Credit Card Account'
        }
    ]

    // Selected Accounts to view Account Statements
    queriedAccounts = []

    headerConfguration = {
        previousPageUrl: HOME_PAGE,
        heading: ACCOUNTSTATEMEMTS,
        iconsExposed: true,
        logout: {
            exposed: true
        },
        search: {
            exposed: false
        }
    }

    // Properties to hold input values and dates
    inputValue = ''
    startDate = ''
    endDate = ''
    currDate = ''
    showDates = false
    accountNumber = ''

    // Properties related to document search API
    requestUUID = ''
    apiName = 'CB_Doc_Search'
    docSearchReqBody = ''
    docSearchXmlPathData = []
    isDocumentsAvailable = false
    @track documentIdList = []

    // Lifecycle hook to be executed when the component is inserted into the DOM
    connectedCallback() {

        this.headerConfguration.previousPageUrl = setPagePath(ACCOUNTSTATEMENTSEARCH_PAGE)

        this.requestUUID = dateToTimestamp()

        this.setCurrentDate()
        this.fetchDocSearchXmlData(this.apiName)

        // this.setAccountList()
    }

    setAccountList(){
        this.allAccounts = JSON.parse(getMobileSessionStorage('CB_All_Account_Details'))
    }

    // Method to set the current date in the required format
    setCurrentDate() {
        let today = new Date()
        this.currDate = `${today.getFullYear()}-${String(today.getMonth() + 1) < 10 ? "0" : ""}${today.getMonth() + 1}-${today.getDate() < 10 ? '0' : ''}${today.getDate()}`
        console.log(this.currDate)
    }

    // Getter to determine the maximum value for the "From Date" input
    get fromDateMax() {
        return this.endDate || this.currDate;
    }

    // Getter to determine the maximum value for the "To Date" input
    get toDateMax() {
        return this.currDate;
    }

    // Getter to validate the date range
    get validateDate() {
        return this.startDate === '' || this.endDate === '' || new Date(this.startDate) > new Date(this.endDate);
    }

    // Method to handle account selection
    handleAccSelect(event) {
        let acc = event.target.value
        this.accountNumber = acc.substring(0, acc.indexOf('-') - 1);
        this.showDates = true
        this.startDate = ''
        this.endDate = ''
    }

    // Method to handle "From Date" input
    handleFromDate(event) {
        this.startDate = formatDate(event.target.value);
        console.log('fromdate',this.startDate);
    }

    // Method to handle "To Date" input
    handleToDate(event) {
        this.endDate = formatDate(event.target.value);
        console.log('toDate',this.endDate);
    }

    // Method to handle form submission
    submitHandler() {
        this.docSearch();
    }

    // Method to perform the document search API
    docSearch() {
        this.docSearchReqBody = this.mapData(this.docSearchReqBody, this.docSearchXmlPathData);
        console.log("Doc Search doc Search Request Body " + this.docSearchReqBody);
        let reqWrapper = {
            payload: this.docSearchReqBody,
            metadataName: this.apiName
        }
        docSearch({ reqWrapper: reqWrapper })
            .then((result) => {
                console.log("Doc Search Result " + result);
                const parser = new DOMParser();
                const resultXmlDoc = parser.parseFromString(result, "text/xml");

                this.documentIdList = Array.from(resultXmlDoc.querySelectorAll("DocumentInquiryRs > Document > ID")).map(id => { return { id: id.textContent, fileName: '' } });

                Array.from(resultXmlDoc.querySelectorAll("DocumentInquiryRs > Document > Name")).forEach((name, i) => {
                    let fileName = name.textContent;
                    this.documentIdList[i].fileName = fileName.match(/Acct# (\d+)/)[1] + ' ' + fileName.substring(fileName.lastIndexOf('-'), fileName.length)
                });

                if (this.documentIdList != null) {
                    this.isDocumentsAvailable = true;
                }
                console.log(JSON.stringify(this.documentIdList));

                this.navigateToAccountStatementsView();
            })
            .catch((error) => {
                console.error(error);
                console.error(error.message);
            });
    }

    /**
    * This function takes in the request body and ther path and uses eval() to substitute the  values in the request body.
    * @param {Object} jsonReq - The request body, as a JSON.
    * @param {Array} JsonPath - The Json path data to be used for substitution.
    * @returns {Object} The request body after the values have been substituted.
    */
    mapData(xmlBody, xmlPath) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlBody, "text/xml");
        xmlPath.forEach((record) => {
            if (!record.Is_Active__c) {
                return
            } else {
                xmlDoc.querySelector(record.XML_Path__c).textContent = this[record.Field_Name__c]
            }
        });
        return new XMLSerializer().serializeToString(xmlDoc);
    }

    /**
    * This function uses a method from the cBJsonDataHandler package that calls an Apex method that returns the API's request body and JSON paths for substitution.
    * @param {String} apiName - The API details's metadata name.
    * @returns {void}
    */
    fetchDocSearchXmlData(apiName) {
        getJsonData(apiName)
            .then(result => {
                this.docSearchReqBody = result[0];
                this.docSearchXmlPathData = result[1];
                console.log('docSearchReqBody: ', this.docSearchReqBody);
                console.log('docSearchXmlPathData: ', this.docSearchXmlPathData);
            }).catch((error) => {
                console.error('Some error occured in Fetch: ' + error)
            })
    }

    // Method to navigate to Account Statement View Page
    navigateToAccountStatementsView() {
        this.navigateTo(ACCOUNTSTATEMENTVIEW_PAGE, { documentId: JSON.stringify(this.documentIdList) })
    }

    // Helper function to handle navigation to a specified page
    navigateTo(pageApiName, data) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            },
            state: data
        });
    }
}