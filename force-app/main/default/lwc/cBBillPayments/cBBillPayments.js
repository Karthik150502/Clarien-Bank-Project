import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import {
    setPagePath,
    formatDate
} from 'c/cBUtilities';

import SUBMIT from '@salesforce/label/c.CB_Submit';
import ADHOC_BILLER_NAME from '@salesforce/label/c.CB_AdHocBillerName';
import BILLER_NAME from '@salesforce/label/c.CB_BillerNickname';
import TRANSFERS_LINK from '@salesforce/label/c.CB_Page_Transfers'
import BILLPAYMENTS_LINK from '@salesforce/label/c.CB_Page_BillPayments'
import BILL_PAYMENTS from '@salesforce/label/c.CB_BillPayments'
import REMARKS from '@salesforce/label/c.CB_Remarks'
import OCCURANCE from '@salesforce/label/c.CB_Occurance'
import RECURRING_TRANSFER from '@salesforce/label/c.CB_RecurringTransfer'
import DATE from '@salesforce/label/c.CB_Date'
import AMOUNT from '@salesforce/label/c.CB_Amount'
import SELECT_BILLER from '@salesforce/label/c.CB_SelectBiller'
import FROM_ACCOUNT from '@salesforce/label/c.CB_FromAccount'
import SELECT_ACCOUNT from '@salesforce/label/c.CB_SelectAccount'
import LOOKUP from '@salesforce/label/c.CB_Lookup'
import ACC_REF_NUMBER from '@salesforce/label/c.CB_AccRefNumber'
import CUSTOMER_NAME from '@salesforce/label/c.CB_CustomerName'
import UNTIL_END_DATE from '@salesforce/label/c.CB_UntilEndDate'
import REPEAT from '@salesforce/label/c.CB_Repeat'


export default class CBBillPayments extends NavigationMixin(LightningElement) {
    // Object to hold imported labels
    label = {
        SUBMIT,
        TRANSFERS_LINK,
        BILLPAYMENTS_LINK,
        BILL_PAYMENTS,
        REMARKS,
        OCCURANCE,
        RECURRING_TRANSFER,
        DATE,
        AMOUNT,
        SELECT_BILLER,
        FROM_ACCOUNT,
        SELECT_ACCOUNT,
        BILLER_NAME,
        ADHOC_BILLER_NAME,
        LOOKUP,
        ACC_REF_NUMBER,
        CUSTOMER_NAME,
        UNTIL_END_DATE,
        REPEAT
    };




    headerConfguration = {
        previousPageUrl: this.label.TRANSFERS_LINK,
        heading: this.label.BILL_PAYMENTS,
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        },
        favorite: {
            selected: false
        }
    }




    // Lifecycle hook that is called when the component is inserted into the DOM.
    connectedCallback() {
        this.headerConfguration.previousPageUrl = setPagePath(this.label.BILLPAYMENTS_LINK)
    }



    accounts = [
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
    ]

    biller = [
        { name: 'John Elder' },
        { name: 'Sebastian Vettel' },
        { name: 'Winston Chruchill' },
        { name: 'Dwyane Johnson' },

    ]


    dateSelected = ''
    selectedFromAccount = ''
    selectedBiller = ''
    remarks = ''
    billerNickname = ''
    adHocBillerName = ''
    showBillers = false
    number = 1
    recurring = false
    amount = ''

    dateSelected = 'DD/MM/YYYY'
    untilDate = 'DD/MM/YYYY'

    name = ''
    frequencySelected = ''
    customerName = ''
    accRefNo = ''

    frequencies = ["Day", "Month", "End of every month"]

    // Method to handle the recurring payment toggle.
    // Toggles the value of the recurring property between true and false.
    recurringHandler() {
        this.recurring = !this.recurring
    }


    // Method to handle date selection.
    // Formats the selected date using formatDate utility and assigns it to dateSelected property.
    handleDate(event) {
        this.dateSelected = formatDate(event.target.value)
    }


    // Method to handle until date selection for recurring payments.
    // Formats the selected date using formatDate utility and assigns it to untilDate property.
    handleUntilDate(event) {
        this.untilDate = formatDate(event.target.value)
    }



    // Method to handle amount input change.
    // Assigns the input value to amount property.
    handleAmount(event) {
        this.amount = event.target.value
    }



    // Method to handle account reference number input change.
    // Assigns the input value to accRefNumber property.
    handleAccRefNumber(event) {
        this.accRefNumber = event.target.value
    }


    // Method to handle biller selection.
    // Assigns the selected value to selectedBiller property.
    handleBiller(event) {
        this.selectedBiller = event.target.value
    }



    // Method to handle from account selection.
    // Assigns the selected value to selectedFromAccount property.
    handleFromAccount(event) {
        this.selectedFromAccount = event.target.value
    }



    // Method to handle name input change.
    // Assigns the input value to name property.
    nameHandler(event) {
        this.name = event.target.value
    }
    // Method to handle remarks input change.
    // Assigns the remarks value from the event detail to remarks property.
    handleRemarks(event) {
        this.remarks = event.detail.remarks
    }
    // Method to handle form submission.
    // Prepares the data object with form values and navigates to the confirmation page with the data.

    handleSubmit() {

        let data = {
            amount: this.amount,
            date: this.dateSelected,
            accRefNo: this.accRefNo,
            customerName: this.customerName,
            fromAccount: this.selectedFromAccount,
            biller: this.adHocBillerName
        }
        this.navigateTo('CBBillPaymentsConfirmTrans__c', data)
    }
    // Method to handle frequency selection for recurring payments.
    // Assigns the selected value to frequencySelected property.
    handleFreq(event) {
        this.frequencySelected = event.target.value
    }
    // Method to navigate to a specified page with given state parameters.
    // Uses the NavigationMixin to navigate.
    navigateTo(pageApiName, state = {}) {
        const pageReference = {
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            },
            state
        };
        this[NavigationMixin.Navigate](pageReference);
    }





    // Getter method to determine if the submit button should be disabled.
    // Calls verifyValues method to check if all required fields are filled correctly.
    get disableSubmit() {
        return this.verifyValues()
    }
    // Method to verify if all required form values are valid.
    // Returns true if any required value is missing or invalid, otherwise false.
    verifyValues() {
        return this.amount === '' || this.dateSelected === 'DD/MM/YYYY' || this.selectedBiller === this.label.SELECT_BILLER || this.selectedFromAccount === this.label.SELECT_ACCOUNT
    }
    // Method to toggle the visibility of biller details.
    // Sets the showBillers property to true.
    openBillersDetails() {
        this.showBillers = true
    }

    // Method to increase the number property by 1.
    increaseNumber() {
        this.number = this.number + 1

    }


    // Method to decrease the number property by 1, ensuring it doesn't go below 1.
    decreaseNumber() {
        this.number = this.number > 1 ? this.number - 1 : this.number
    }


}