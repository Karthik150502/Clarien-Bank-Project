/*
     Author - Prateek Deshmukh
    Created Date - 2024-03-09
    Modified Date - 2024-03-10,2024-03-15,2024-03-21
    Description - The CBProfileLayoutTemplate component serves as a reusable template 
    for rendering various sections based on provided data.It facilitates dynamic navigation 
    and content display, showcasing specific sections like security settings, profile settings etc based on configured paramet
*/

import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';


import MANAGE_TEMPLATES from '@salesforce/label/c.CB_ManageTemplates'; // Importing label for predefined transactions
import DOMESTIC_TRANSFERS_TEMPLATE from '@salesforce/label/c.CB_DomesticTransfersTemplate'; // Importing label for predefined transactions
import OWN_ACCOUNT_TRANSFERS_TEMPLATE from '@salesforce/label/c.CB_OwnAccountTransfersTemplate'; // Importing label for predefined transactions
import INTERNATIONAL_PAYMENTS_TEMPLATE from '@salesforce/label/c.CB_InternationalTransfersTemplate'; // Importing label for predefined transactions
import INTRABANK_TRANSFERS_TEMPLATE from '@salesforce/label/c.CB_IntrabankTransfersTemplate'; // Importing label for predefined transactions
import CBSVG from "@salesforce/resourceUrl/CBSVG";

import { setPagePath } from 'c/cBUtilities';


// import uploadFile from '@salesforce/apex/CBProfileUploadHandler.uploadFile'
// import getProfileDocId from '@salesforce/apex/CBProfileUploadHandler.getProfileDocId'



export default class CBPredefined extends NavigationMixin(LightningElement) {


    // Labels for UI elements
    label = {
        OWN_ACCOUNT_TRANSFERS_TEMPLATE,
        INTRABANK_TRANSFERS_TEMPLATE,
        DOMESTIC_TRANSFERS_TEMPLATE,
        INTERNATIONAL_PAYMENTS_TEMPLATE,
        MANAGE_TEMPLATES
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
        this.navigateToPage('CBPredefinedList__c', { nextUrl: 'CBOwnAccountTransfer__c', heading: this.label.OWN_ACCOUNT_TRANSFERS_TEMPLATE })
    }

    navigateToPreviousPage() {
        this.navigateToPage('CBTransfers__c')
    }

    navigateToIntrabankTransfer() {
        this.navigateToPage('CBPredefinedList__c', { nextUrl: 'CBIntraBankTransfers__c', heading: this.label.INTRABANK_TRANSFERS_TEMPLATE })
    }

    navigateToDomesticPayments() {
        this.navigateToPage('CBPredefinedList__c', { nextUrl: 'CBDomesticTransfers__c', heading: this.label.DOMESTIC_TRANSFERS_TEMPLATE })
    }

    navigateToInternationalTransfer() {
        this.navigateToPage('CBPredefinedList__c', { nextUrl: 'CBInternationalTransfers__c', heading: this.label.INTERNATIONAL_PAYMENTS_TEMPLATE })
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