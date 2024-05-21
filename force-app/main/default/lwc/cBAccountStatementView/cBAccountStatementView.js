import { LightningElement } from 'lwc';
import PDF_ICON from '@salesforce/resourceUrl/CBPng'
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
            id: 1,
            file: '61234568789-june 2023.pdf',
        },
        {
            id: 2,
            file: '61234568789-july 2023.pdf'
        },
        {
            id: 3,
            file: '61234568789-aug 2023.pdf'
        },
        {
            id: 4,
            file: '61234568789-sept 2023.pdf'
        },
        {
            id: 5,
            file: '61234568789-oct 2023.pdf'
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

    downloadPdf(event) {
        console.log('Document Id = ' + event.currentTarget.dataset.docid)
    }
}