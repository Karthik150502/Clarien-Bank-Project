import { LightningElement, track } from 'lwc';

// import docSearch from '@salesforce/apex/CBApiController.docSearch';
// import docDownload from '@salesforce/apex/CBApiController.docDownload';
// import generatePdf from '@salesforce/apex/TestDocSearchWrapper.generatePdf';
import { getJsonData } from 'c/cBUtilities';
import { docSearchh } from 'c/cBDocSearch';

export default class TestDocSearch extends LightningElement {
    accountList = [
        {
            accountNo: '6000149418',
            accountType: 'Cheque Accounts',
            type: '1937',
            sDate: '2017-12-01',
            eDate: '2018-08-01'
        },
        {
            accountNo: '6000149129',
            accountType: 'Checking Accounts',
            type: '1937',
            sDate: '2016-07-01',
            eDate: '2018-12-31'
        },
        {
            accountNo: '477166200012753',
            accountType: 'Credit Card',
            type: '388'
        },
        {
            accountNo: '3310916047',
            accountType: 'Loan Account',
            type: '2026',
            sDate: '2014-01-01',
            eDate: '2018-08-31'
        },
        {
            accountNo: '6000071447',
            accountType: 'Desposit Account',
            type: '1984',
            sDate: '2014-01-01',
            eDate: '2018-08-31'
        }
    ]

    @track
    selectedAcc = ''

    startDate = ''
    startDateHandler(event) {
        this.startDate = event.target.value;
    }

    endDate = ''
    endDateHandler(event) {
        this.endDate = event.target.value;
    }

    accountNumber = this.accountList[0].accountNo;
    accountNumHandler(event) {
        this.accountNumber = event.target.value;
        this.selectedAcc = this.fetchAccountByNo(this.accountNumber)
    }

    fetchAccountByNo(accountNo) {
        for (let i = 0; i < this.accountList.length; i++) {
            if (this.accountList[i].accountNo == accountNo) {
                return this.accountList[i];
            }
        }
        return null; // Return null if accountNo is not found
    }

    apiName = ['CB_Doc_Search', 'CB_Doc_Download']
    docSearchReqBody = ''
    docSearchXmlPathData = []

    docDownloadReqBody = ''
    docDownloadXmlPathData = []

    connectedCallback() {
        this.fetchDocSearchXmlData(this.apiName[0])
        this.fetchDocDownloadXmlData(this.apiName[1])
    }
    documentIdList
    docSearch() {
        this.docSearchReqBody = this.mapData(this.docSearchReqBody, this.docSearchXmlPathData);
                        console.log("Doc Search doc Search Request Body " + this.docSearchReqBody);
        let reqWrapper = {
            payload: this.docSearchReqBody,
            metadataName: this.apiName[0]
        }
        docSearch({ reqWrapper: reqWrapper })
            .then((result) => {
                console.log("Doc Search Result " + result);
                const parser = new DOMParser();
                const resultXmlDoc = parser.parseFromString(result, "text/xml");
                this.documentIdList = Array.from(resultXmlDoc.querySelectorAll("DocumentInquiryRs > Document > ID")).map(id => id.textContent);
                console.log('documentIdList : ',this.documentIdList); 
                if(this.documentIdList!=null){
                    this.isdownloadClicked=true;
                    this.isDocumentsAvailable=true;
                }
            })
            .catch((error) => {
                this.isdownloadClicked=true;
                console.error(error);
            });
    }
    isDocumentsAvailable=false;
    isdownloadClicked=false;
    documentId = ''
    downloadhandler(){
        console.log('call js doc search');
        docSearchh(this.startDate, this.endDate,this.accountNumber ,this.apiName[0],)
        // this.docSearch();
    }
    docDownload(event) {
        this.documentId = event.target.dataset.id
        this.docDownloadReqBody = this.mapData(this.docDownloadReqBody, this.docDownloadXmlPathData);
        let reqWrapper = {
            payload: this.docDownloadReqBody,
            metadataName: this.apiName[1]
        }
        docDownload({ reqWrapper: reqWrapper })
            .then((result) => {
                // console.log("Doc Download Result " + result);
                const parser = new DOMParser();
                const resultXmlDoc = parser.parseFromString(result, "text/xml");
                let base65 = resultXmlDoc.querySelector("DocumentInquiryRs > Document > Page > Value").textContent;
                let fileName = resultXmlDoc.querySelector("DocumentInquiryRs > Document > Name").textContent;
                this.generatePDF(base65,fileName);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    generatePDF(base64String, FileName) {

        const binaryString = atob(base64String);
        const byteArray = new Uint8Array(binaryString.length);

        for (let i = 0; i < binaryString.length; i++) {
            byteArray[i] = binaryString.charCodeAt(i);
        }

        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${FileName}.pdf`;
        link.click();

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
                // console.log('docSearchReqBody: ', this.docSearchReqBody);
                // console.log('docSearchXmlPathData: ', this.docSearchXmlPathData);
            }).catch((error) => {
                console.error('Some error occured in Fetch: ' + error)
            })
    }

    fetchDocDownloadXmlData(apiName) {
        getJsonData(apiName)
            .then(result => {
                this.docDownloadReqBody = result[0];
                this.docDownloadXmlPathData = result[1];
                // console.log('docDownloadReqBody: ', this.docDownloadReqBody);
                // console.log('docDownloadXmlPathData: ', this.docDownloadXmlPathData);
            }).catch((error) => {
                console.error('Some error occured in Fetch: ' + error)
            })
    }

}