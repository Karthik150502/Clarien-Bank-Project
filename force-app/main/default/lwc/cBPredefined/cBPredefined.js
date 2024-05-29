/*
     Author - Prateek Deshmukh
    Created Date - 2024-03-09
    Modified Date - 2024-03-10,2024-03-15,2024-03-21
    Description - The CBProfileLayoutTemplate component serves as a reusable template 
    for rendering various sections based on provided data.It facilitates dynamic navigation 
    and content display, showcasing specific sections like security settings, profile settings etc based on configured paramet
*/

import { LightningElement, api, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';



import CBSVG from "@salesforce/resourceUrl/CBSVG";


// import uploadFile from '@salesforce/apex/CBProfileUploadHandler.uploadFile'
// import getProfileDocId from '@salesforce/apex/CBProfileUploadHandler.getProfileDocId'
import { getJsonData, dateToTimestamp, setMobileSessionStorage, getMobileSessionStorage } from 'c/cBUtilities';




export default class CBPredefined extends NavigationMixin(LightningElement) {



    // Labels for UI elements
    label = {
        OWN_ACCOUNT_TRANSFER: 'Own Account Transfer',
        INTRABANK_TRANSFER: 'Intrbank Transfer',
        DOMESTIC_PAYMENTS: 'Domestic Payments',
        INTERNATIONAL_PAYMENTS: 'International Payments',
        PREDEFINED: 'Predefined'
    };



    CBBackIcon = `${CBSVG}/CBSVGs/CBBackIcon.svg#CBBackIcon`;


    connectedCallback() {


    }
    hasRendered = false
    renderedCallback() {
        if (!this.hasRendered) {
            this.hasRendered = true
        }
    }



    navigateToPreviousPage() {
        this.navigateToPage('CBTransfers__c')
    }


    // Method to navigate to a named page
    // @param {string} pageName - The name of the page to navigate to
    navigateToPage(pageName, data = {}) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageName
            },
            state: data
        });
    }



}