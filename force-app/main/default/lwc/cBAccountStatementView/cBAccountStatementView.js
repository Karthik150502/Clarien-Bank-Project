import { LightningElement, wire, track } from 'lwc';

import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';

import PDF_ICON from '@salesforce/resourceUrl/CBPng'
import ACCOUNTSTATEMEMTS from '@salesforce/label/c.CB_PageHeader_AccountStatements'; // Importing label for Account Statements

import ACCOUNTSTATEMENTSEARCH_PAGE from '@salesforce/label/c.CB_Page_AccountStatementSearch'; // Importing label for Account Statement Search Page API Name

import docDownload from '@salesforce/apex/CBApiController.docDownload';
import getDocumentid from '@salesforce/apex/CBDocDownloadHandler.getDocumentid';

import { getJsonData, dateToTimestamp } from 'c/cBUtilities';
import { generateUrl } from "lightning/fileDownload";

import CBSVG from "@salesforce/resourceUrl/CBSVG" // Importing SVG file from Static Resource

export default class CBAccountStatementView extends NavigationMixin(LightningElement) {
    //SVG's from static resource
    CBDownloadIcon = `${CBSVG}/CBSVGs/CBDownloadIcon.svg#CBDownloadIcon`;

    // Configuration for the header
    headerConfguration = {
        previousPageUrl: ACCOUNTSTATEMENTSEARCH_PAGE,
        heading: ACCOUNTSTATEMEMTS,
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    // Path to the PDF icon
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

    // List of statements
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

    // Helper function for navigation
    navigateTo(pageApiName) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            }
        });
    }

    // Properties for document download API
    downloadAPIName = 'CB_Doc_Download';
    docDownloadReqBody = ''
    docDownloadXmlPathData = ''
    documentId = ''
    requestUUID = ''
    // Property to capture the current page reference
    @wire(CurrentPageReference) pageRef;

    // Lifecycle hook to fetch document download XML data and set the request UUID
    connectedCallback() {
        this.fetchDocDownloadXmlData(this.downloadAPIName);
        this.requestUUID = dateToTimestamp();
        this.statements = JSON.parse(this.pageRef?.state?.documentId);
        console.log(JSON.stringify(this.statements));
    }

    // Method to handle PDF download
    downloadPdf(event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        this.authenticationInProgress()
        let fileName = event.currentTarget.dataset.filename;
        this.documentId = event.currentTarget.dataset.docid
        console.log('newfilename ', fileName);
        console.log('Payload ', this.docDownloadReqBody);
        console.log('documentId ', this.documentId);
        console.log('downloadAPIName ', this.downloadAPIName);
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
                console.log('newfilename ', fileName);
                this.generatePDF(base65, fileName);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // Method to generate and download the PDF
    generatePDF(base64String, fileName) {
        console.log('base64String value ', base64String)
        getDocumentid({ base64: base64String, fileName: fileName })
            .then(contentDocumentId => {
                console.log('ContentDocumentId:', contentDocumentId);
                let documentId = contentDocumentId;
                if (documentId) {
                    const url = generateUrl('0697z0000045bnpAAA');
                    window.open(url);
                }
            })
            .catch((error) => {
                console.error(error);
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

    // Method to show the authentication in progress popup
    authenticationInProgress() {
        this.authenticationPopup.openModal = true
        this.authenticationPopup.authenticationStatus = '' //AUTHENTICATION_INPROGRESS_MESSAGE
        this.authenticationPopup.showLoadingAnimation = true
    }
}