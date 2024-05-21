import { LightningElement,wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBAccountDetails extends LightningElement {
    
    CBPdf = `${CBSVG}/CBSVGs/CBPdf.svg#CBPdf`;
    CBSortOrder = `${CBSVG}/CBSVGs/CBSortOrder.svg#CBSortOrder`;
    CBFilter = `${CBSVG}/CBSVGs/CBFilter.svg#CBFilter`;

    transactionStyle = 'overview';
    overViewStyle ="";

    // accountNumber='222265449987';

  @wire(CurrentPageReference) pageRef;

    get accountNumber() {
        return this.pageRef && this.pageRef.state.accountNumber;
    } 

      header_icons = {
        // Announcements icon settings
        announcements: {
            exposed: false,  // Whether to display the Announcements icon
            haveItems: false // Whether the Announcements icon has items to display
        },
        // Whether to display the Announcements icon
        notifications: {
            exposed: false,  // Whether to display the Notifications icon
            haveItems: false // Whether the Notifications icon has items to display
        },
        // Inbox icon settings
        inbox: {
            exposed: true,  // Whether to display the Inbox icon
            haveItems: true // Whether the Inbox icon has items to display
        },
        // Scan Code icon settings
        scanCode: {
            exposed: true, // Whether to display the Scan Code icon
            haveItems: true    // Whether the Scan Code icon has items to display
        }
    };

    transaction=true;

    transactionData = [
        { id: '1', CHQSId: 'CHQS2374904890', EMIId: '233749082665', date: '01/09/23',amount:'236' },
        { id: '2', CHQSId: 'CHQS2374904891', EMIId: '233749082666', date: '01/10/23',amount:'455' },
        { id: '3', CHQSId: 'CHQS2374904892', EMIId: '233749082667', date: '01/11/23',amount:'676' },
        { id: '4', CHQSId: 'CHQS2374904893', EMIId: '233749082668', date: '01/12/23',amount:'898' },
        { id: '5', CHQSId: 'CHQS2374904894', EMIId: '233749082669', date: '01/13/23',amount:'988' },
        { id: '6', CHQSId: 'CHQS2374904895', EMIId: '233749082670', date: '01/14/23',amount:'9999' },
        { id: '7', CHQSId: 'CHQS2374904896', EMIId: '233749082671', date: '01/15/23',amount:'236' },
        { id: '8', CHQSId: 'CHQS2374904897', EMIId: '233749082672', date: '01/16/23',amount:'2000' },
        { id: '9', CHQSId: 'CHQS2374904898', EMIId: '233749082673', date: '01/17/23',amount:'2738' },
        { id: '10', CHQSId: 'CHQS2374904899', EMIId: '233749082674', date: '01/18/23',amount:'267' }

    ];

    overviewData = [
    { id: 0, label: "Credit Limit", value: "BMD 10,000.00" },
    { id: 1, label: "Last Statement Balance", value: "BMD 8,000.00" },
    { id: 2, label: "Minimum Payment", value: "BMD 500.00" },
    { id: 3, label: "Payment Due Date", value: "27/12/23" },
    { id: 4, label: "Available Limit", value: "BMD 8000.00" },
    { id: 5, label: "Last Payment Date", value: "05/01/24" }
]
;

handleTransactionsClick() {
        this.transaction=true;
        this.transactionStyle = 'overview';
        this.overViewStyle = "";
        console.log('Transactions clicked');
    }

    handleOverviewClick() {
        this.transaction=false;
        this.overViewStyle = 'overview';
        this.transactionStyle = ""
        console.log('Overview clicked');
    }
}