import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import DONE from '@salesforce/label/c.CB_Done';
import CANCEL from '@salesforce/label/c.CB_Cancel';
export default class CBAccountStatementSearch extends NavigationMixin(LightningElement) {



    label = {
        DONE: DONE.toUpperCase(),
        CANCEL: CANCEL.toUpperCase()
    }

    // Need to fetch from APIs
    allAccounts = [
        {
            accountNo: '600017725563',
            accountType: 'Savings Account'
        },
        {
            accountNo: '654147489652',
            accountType: 'Current Account'
        },
        {
            accountNo: '654147856985',
            accountType: 'Time Account'
        },
        {
            accountNo: '698547458265',
            accountType: 'Loan Account'
        },
        {
            accountNo: '697458541256',
            accountType: 'Credit Card Account'
        }
    ]


    queriedAccounts = []







    headerConfguration = {
        previousPageUrl: 'Home',
        heading: 'Account Statements',
        iconsExposed: true,
        logout: {
            exposed: true
        },
        search: {
            exposed: true
        }
    }

    inputValue = ''
    fromDate = ''
    toDate = ''
    currDate = ''
    showDates = false
    selectedAccount = 'None'
    connectedCallback() {
        this.setCurrentDate()
    }


    setCurrentDate() {
        let today = new Date()
        this.currDate = `${today.getFullYear()}-${String(today.getMonth() + 1) < 10 ? "0" : ""}${today.getMonth() + 1}-${today.getDate() < 10 ? '0' : ''}${today.getDate()}`
        console.log(this.currDate)
    }


    get fromDateMax() {
        if (this.currDate && !this.toDate) {
            return this.currDate
        } else if (this.toDate) {
            return this.toDate
        }
    }

    get toDateMax() {
        if (this.currDate) {
            return this.currDate
        }
    }

    get validateDate() {
        return this.fromDate === '' || this.toDate === '' || new Date(this.fromDate) > new Date(this.toDate)
    }



    handleAccSelect(event) {
        let acc = event.target.value
        this.selectedAccount = acc
        this.showDates = true
        this.fromDate = ''
        this.toDate = ''
        console.log(acc)
    }


    handleFromDate(event) {
        this.fromDate = event.target.value
    }

    handleToDate(event) {
        this.toDate = event.target.value
    }




    submitHandler() {
        this.navigateToAccountStatementsView();
    }


    navigateToAccountStatementsView() {
        this.navigateTo('CBAccountStatementView__c')
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
}