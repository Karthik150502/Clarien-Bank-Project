import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import DONE from '@salesforce/label/c.CB_Done';
import CANCEL from '@salesforce/label/c.CB_Cancel';

import ACCOUNTSTATEMENTSEARCH_PAGE from '@salesforce/label/c.CB_Page_AccountStatementSearch';

import docSearch from '@salesforce/apex/CBApiController.docSearch';
import { getJsonData ,dateToTimestamp, setPagePath} from 'c/cBUtilities';

export default class CBAccountStatementSearch extends NavigationMixin(LightningElement) {



    label = {
        DONE: DONE.toUpperCase(),
        CANCEL: CANCEL.toUpperCase()
    }

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


    queriedAccounts = []


    headerConfguration = {
        previousPageUrl: 'Home',
        heading: 'Account Statements',
        iconsExposed: true,
        logout: {
            exposed: true
        },
        search: {
            exposed: true
        }
    }

    inputValue = ''
    startDate = ''
    endDate = ''
    currDate = ''
    showDates = false
    accountNumber = ''

    requestUUID = ''
    apiName = 'CB_Doc_Search'
    docSearchReqBody = ''
    docSearchXmlPathData = []
    isDocumentsAvailable = false
    documentIdList = []

    connectedCallback() {

        this.headerConfguration.previousPageUrl = setPagePath(ACCOUNTSTATEMENTSEARCH_PAGE)

        this.requestUUID = dateToTimestamp()

        this.setCurrentDate()
        this.fetchDocSearchXmlData(this.apiName)
    }

    setCurrentDate() {
        let today = new Date()
        this.currDate = `${today.getFullYear()}-${String(today.getMonth() + 1) < 10 ? "0" : ""}${today.getMonth() + 1}-${today.getDate() < 10 ? '0' : ''}${today.getDate()}`
        console.log(this.currDate)
    }

    get fromDateMax() {
        if (this.currDate && !this.endDate) {
            return this.currDate
        } else if (this.endDate) {
            return this.endDate
        }
    }

    get toDateMax() {
        if (this.currDate) {
            return this.currDate
        }
    }

    get validateDate() {
        return this.startDate === '' || this.endDate === '' || new Date(this.startDate) > new Date(this.endDate)
    }

    handleAccSelect(event) {
        let acc = event.target.value
        this.accountNumber = acc.substring(0, acc.indexOf('-') - 1);
        this.showDates = true
        this.startDate = ''
        this.endDate = ''
        console.log(acc)
    }

    handleFromDate(event) {
        this.startDate = event.target.value
        console.log(this.startDate);
    }

    handleToDate(event) {
        this.endDate = event.target.value
        console.log(this.endDate);
    }

    submitHandler() {
        this.docSearch();
    }


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

    navigateToAccountStatementsView() {
        this.navigateTo('CBAccountStatementView__c',{documentId : JSON.stringify(this.documentIdList)})
    }
    // Helper function for navigation
    navigateTo(pageApiName,data) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            },
            state:data
        });
    }
}