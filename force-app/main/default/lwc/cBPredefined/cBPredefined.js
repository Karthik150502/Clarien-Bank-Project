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

import { setPagePath } from 'c/cBUtilities';


// import uploadFile from '@salesforce/apex/CBProfileUploadHandler.uploadFile'
// import getProfileDocId from '@salesforce/apex/CBProfileUploadHandler.getProfileDocId'



export default class CBPredefined extends NavigationMixin(LightningElement) {


    // Labels for UI elements
    label = {
        OWN_ACCOUNT_TRANSFER: 'Own Account Transfer',
        INTRABANK_TRANSFER: 'Intrabank Transfer',
        DOMESTIC_PAYMENTS: 'Domestic Payments',
        INTERNATIONAL_PAYMENTS: 'International Payments',
        PREDEFINED: 'Predefined'
    };



    CBBackIcon = `${CBSVG}/CBSVGs/CBBackIcon.svg#CBBackIcon`;


    connectedCallback() {
        setPagePath('CBPredefined__c')
    }
    hasRendered = false
    renderedCallback() {
        if (!this.hasRendered) {
            this.hasRendered = true
        }
    }


    navigateToOwnAccTransfer() {
        this.navigateToPage('CBPredefinedList__c', { nextUrl: 'CBOwnAccountTransfer__c', heading: 'OwnAccount Transfers Template' })
    }

    navigateToPreviousPage() {
        this.navigateToPage('CBTransfers__c')
    }

    navigateToIntrabankTransfer() {
        this.navigateToPage('CBPredefinedList__c', { nextUrl: 'CBIntraBankTransfers__c', heading: 'IntraBank Transfers Template' })
    }

    navigateToDomesticPayments() {
        this.navigateToPage('CBPredefinedList__c', { nextUrl: 'CBDomesticTransfers__c', heading: 'Domestic Transfers Template' })
    }

    navigateToInternationalTransfer() {
        this.navigateToPage('CBPredefinedList__c', { nextUrl: 'CBInternationalTransfers__c', heading: 'International Transfers Template' })
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