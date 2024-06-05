import { LightningElement } from 'lwc';
import PDF_ICON from '@salesforce/resourceUrl/CBPng'
import { getJsonData ,dateToTimestamp} from 'c/cBUtilities';
import docDownload from '@salesforce/apex/CBApiController.docDownload';
export default class CBAccountStatementView extends LightningElement {

    headerConfguration = {
        previousPageUrl: 'CBAccountStatementSearch__c',
        heading: 'Account Statement',
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    icon = PDF_ICON + '/image/pdfIcon.png'

    statements = [
        {
            id: '13200509',
            fileName: '4010050124 - 12-16-2017',
        },
        {
            id: '13200509',
            fileName: '4010050124 - 09-18-2017',
        },
        {
            id: '13200509',
            fileName: '4010050124 - 10-07-2017',
        },
        {
            id: '13200509',
            fileName: '4010050124 - 02-05-2017',
        },
        {
            id: '13200509',
            fileName: '4010050124 - 01-29-2017',
        }
    ]

    navigateToAccountStatementsResult() {
        // this.navigateTo('CBAccountStatementResult__c')
    }
    // Helper function for navigation
    navigateTo(pageApiName) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            }
        });
    }
    downloadAPIName ='CB_Doc_Download';
    docDownloadReqBody=''
    docDownloadXmlPathData=''
    documentId=''
    requestUUID=''
    connectedCallback() {
        this.fetchDocDownloadXmlData(this.downloadAPIName)
        this.requestUUID = dateToTimestamp()

    }
    downloadPdf(event) {
        let fileName = event.currentTarget.dataset.filename;
        this.documentId = event.currentTarget.dataset.docid
        console.log('newfilename ',fileName);
        console.log('Payload ',this.docDownloadReqBody);
        console.log('documentId ',this.documentId);
        console.log('downloadAPIName ',this.downloadAPIName);
        this.docDownloadReqBody = this.mapData(this.docDownloadReqBody, this.docDownloadXmlPathData);
        let reqWrapper = {
            payload: this.docDownloadReqBody,
            metadataName: this.downloadAPIName
        }
        docDownload({ reqWrapper: reqWrapper })
            .then((result) => {
                // console.log("Doc Download Result " + result);
                const parser = new DOMParser();
                const resultXmlDoc = parser.parseFromString(result, "text/xml");
                let base65 = resultXmlDoc.querySelector("DocumentInquiryRs > Document > Page > Value").textContent;
                console.log('newfilename ',fileName);
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

    fetchDocDownloadXmlData(apiName) {
        getJsonData(apiName)
            .then(result => {
                this.docDownloadReqBody = result[0];
                this.docDownloadXmlPathData = result[1];
                console.log('docDownloadReqBody: ', this.docDownloadReqBody);
                console.log('docDownloadXmlPathData: ', this.docDownloadXmlPathData);
            }).catch((error) => {
                console.error('Some error occured in Fetch: ' + error)
            })
    }
}