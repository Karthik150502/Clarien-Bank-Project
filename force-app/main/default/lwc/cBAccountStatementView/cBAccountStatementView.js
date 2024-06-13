import { LightningElement ,wire,track} from 'lwc';
import PDF_ICON from '@salesforce/resourceUrl/CBPng'
import { getJsonData ,dateToTimestamp} from 'c/cBUtilities';
import docDownload from '@salesforce/apex/CBApiController.docDownload';
import getDocumentid from '@salesforce/apex/CBDocDownloadHandler.getDocumentid';
import { NavigationMixin, CurrentPageReference } from'lightning/navigation';
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
       //Authentication Status Modal initial configuration
       @track authenticationPopup = {

        // Initial Authentication Status message
        authenticationStatus: '',
        // Authentication Status GIF
        authenticationSpinnergif: null,
        // Authentication Status open or close status
        openModal: false,
        // Authentication loading animation visibility
        showLoadingAnimation: true
    }
    statements = [
        // {
        //     id: '13200509',
        //     fileName: '4010050124 - 12-16-2017',
        // },
        // {
        //     id: '13200509',
        //     fileName: '4010050124 - 09-18-2017',
        // },
        // {
        //     id: '13200509',
        //     fileName: '4010050124 - 10-07-2017',
        // },
        // {
        //     id: '13200509',
        //     fileName: '4010050124 - 02-05-2017',
        // },
        // {
        //     id: '13200509',
        //     fileName: '4010050124 - 01-29-2017',
        // }
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
    @wire(CurrentPageReference) pageRef;
    connectedCallback() {
        this.fetchDocDownloadXmlData(this.downloadAPIName)
        this.requestUUID = dateToTimestamp()
        this.statements = JSON.parse(this.pageRef?.state?.documentId);
        console.log(JSON.stringify(this.statements));
    }
    downloadPdf(event) {
        event.preventDefault();
        event.stopPropagation(); 
        event.stopImmediatePropagation();
        this.authenticationInProgress()
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

    generatePDF(base64String, fileName) {
        console.log('base64String value ',base64String)
        getDocumentid({ base64: base64String, fileName :fileName})
            .then((result) => {
                console.log('Document id ',result)
                let domain = window.location.href;
                // Find the index of "/s"
                let index = domain.indexOf("/s");
                if (index !== -1) {
                    // Remove everything till "/s"
                    domain = domain.substring(0, index);
                }
                let documentId=result;
                let documentUrl = domain+'/sfc/servlet.shepherd/document/download/' + documentId + '?operationContext=S1';
                alert('Document URL'+documentUrl)
                this.authenticationPopup.openModal = false;
                window.open(documentUrl, "_Self");
            })
            .catch((error) => {
                console.error(error);
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
    authenticationInProgress() {
        this.authenticationPopup.openModal = true
        this.authenticationPopup.authenticationStatus = '' //AUTHENTICATION_INPROGRESS_MESSAGE
        this.authenticationPopup.showLoadingAnimation = true
    }
}