import { LightningElement, api, track, wire } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality
import CBSVG from "@salesforce/resourceUrl/CBSVG"
import { setPagePath } from 'c/cBUtilities';


export default class CBPredefinedList extends NavigationMixin(LightningElement) {

    CBNewMessage = `${CBSVG}/CBSVGs/CBNewMessage.svg#CBNewMessage`;

    /**
* Lifecycle hook invoked when the component is inserted into the DOM
* Loads the username, password from local session storage when the component is connected to the DOM.
* @returns {void}
*/

    @wire(CurrentPageReference)
    urlHandler({ state }) {
        if (state) {
            this.heading = state.heading;
            this.nextPageURL = state.nextUrl;
        }
    }

    connectedCallback() {
    }
    nextPageURL = ''
    heading = ''
    templates = [
        {
            id: 1,
            name: 'Rent Payment',
            fromAcc: '9845121565',
            toAcc: '5913215524',
            amount: 'BMD 3000'
        },
        {
            id: 2,
            name: 'Transfer',
            fromAcc: '9845121565',
            toAcc: '5913215524',
            amount: 'BMD 500'
        },
        {
            id: 3,
            name: 'Transfer',
            fromAcc: '9844221500',
            toAcc: '5913215511',
            amount: 'BMD 1500'
        },
        {
            id: 4,
            name: 'Electricity Payment',
            fromAcc: '9845121565',
            toAcc: '5913215524',
            amount: 'BMD 300'
        },
        {
            id: 5,
            name: 'Loan Interest Payment',
            fromAcc: '9845121565',
            toAcc: '5913215524',
            amount: 'BMD 450'
        },
    ]

    // getMessage() {
    //     return this.messages.map((msg)=> {
    //         const nameArr = msg.name.split(' ');
    //         let initial = '';
    //         for(let part of nameArr) {
    //             initial += part[0].toUpperCase();
    //         }
    //         return {...msg, initial};
    //     });
    // }


    configuration = {
        previousPageUrl: 'CBPredefined__c',
        heading: this.heading,
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    naviagteTo() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: this.nextPageURL
            }
        });
    }

    handleAddTemplate() {
        this.showModal1 = true;
    }

    showModal1 = false
    showModal2 = false
    @track modalConf1 = {
        title: 'Save as Template',
        message: 'Create new transaction template?',
        okButton: {
            exposed: false,
            label: 'OK',
            function: () => {
                this.showModal1 = false
                this.showModal2 = true
            }
        },
    }
    @track modalConf2 = {
        title: 'Template created successfully.',
        okButton: {
            exposed: true,
            label: 'OK',
            function: () => {
                this.showModal2 = false
                this.navigateTo("CBTransfers__c")
            }
        },
        noButton: {
            exposed: false,
        },
    }
    closeSavesAsTempModal() {
        this.showModal1 = false
        this.navigateTo("CBTransfers__c")
    }
}