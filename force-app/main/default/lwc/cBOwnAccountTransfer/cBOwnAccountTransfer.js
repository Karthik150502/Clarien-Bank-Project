import { LightningElement, wire } from 'lwc';

import { NavigationMixin } from 'lightning/navigation';
import CONTINUE from '@salesforce/label/c.CB_Continue';
import COMMENTS_OPTIONAL from '@salesforce/label/c.CB_CommentsOptional'
import REMARKS from '@salesforce/label/c.CB_Remarks'
import UNTIL_END_DATE from '@salesforce/label/c.CB_UntilEndDate'
import DATE from '@salesforce/label/c.CB_Date'

import CB_Select from '@salesforce/label/c.CB_Select';

import CB_FromAccount from '@salesforce/label/c.CB_FromAccount';
import CB_TO_ACCOUNT from '@salesforce/label/c.CB_TO_ACCOUNT';
import CB_Amount from '@salesforce/label/c.CB_Amount';
import CB_Currency from '@salesforce/label/c.CB_Currency';
import CB_Payments_Amount from '@salesforce/label/c.CB_Payments_Amount';
import CB_Repeat from '@salesforce/label/c.CB_Repeat';
import CB_Recurring from '@salesforce/label/c.CB_Recurring';
import CB_Page_OwnAcctTransConf from '@salesforce/label/c.CB_Page_OwnAcctTransConf';
import CB_Page_Predefined from '@salesforce/label/c.CB_Page_Predefined';
import CB_OwnAccountTransfers from '@salesforce/label/c.CB_OwnAccountTransfers';
import CB_Page_OwnAcctTransfers from '@salesforce/label/c.CB_Page_OwnAcctTransfers';


import { setPagePath, formatDate, getMobileSessionStorage, getPicklistValues } from 'c/cBUtilities';



// LMS
import LMS from "@salesforce/messageChannel/cBRecurringTransferLMS__c";
import { APPLICATION_SCOPE, MessageContext, subscribe, unsubscribe } from 'lightning/messageService';




export default class CBOwnAccountTransfer extends NavigationMixin(LightningElement) {

    @wire(MessageContext)
    context;

    label = {
        CONTINUE,
        COMMENTS_OPTIONAL,
        REMARKS,
        UNTIL_END_DATE,
        DATE,
        CB_FromAccount,
        CB_TO_ACCOUNT,
        CB_Amount,
        CB_Payments_Amount,
        CB_Repeat,
        CB_Recurring,
        CB_Currency,
        CB_Select

    };




    headerConfguration = {
        previousPageUrl: CB_Page_Predefined,
        heading: CB_OwnAccountTransfers,
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        },
        openTemplates: {
            transferTypePage: CB_Page_OwnAcctTransfers
        }
    }

    connectedCallback() {
        this.headerConfguration.previousPageUrl = setPagePath(CB_Page_OwnAcctTransfers)
        this.setAccountData()
        this.loadAllPicklistValues()
        this.subscribeMessage()
    }

    setAccountData() {
        this.accounts = JSON.parse(getMobileSessionStorage('CB_All_Account_Details')) ? JSON.parse(getMobileSessionStorage('CB_All_Account_Details')) : [];
        this.toAccountsList = JSON.parse(getMobileSessionStorage('CB_All_Account_Details')) ? JSON.parse(getMobileSessionStorage('CB_All_Account_Details')) : [];
    }


    amount = ''
    toAccount = ''
    selectedAccount = 'Select Account'
    number = 1
    remarks = ''
    currencies = []
    currency = this.label.CB_SelectCurrency
    accounts = [
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855541255',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855000054',
            accountType: 'Joint Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '651235641254',
            accountType: 'Time Deposit Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '709945651354',
            accountType: 'Current Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
    ]

    toAccountsList = [
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855541255',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855000054',
            accountType: 'Joint Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '651235641254',
            accountType: 'Time Deposit Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '709945651354',
            accountType: 'Current Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
    ]

    // Method to handle the amount input change event.
    // Updates the 'amount' property with the value from the input event.
    handleAmount(event) {
        this.amount = event.target.value
    }

    // Method to handle the To Account input change event.
    // Updates the 'toAccount' property with the value from the input event and logs it.
    handleToAccount(event) {
        this.toAccount = event.target.value
        console.log(this.toAccount);
    }

    // Method to handle the From Account input change event.
    // Updates the 'selectedAccount' property and filters the 'toAccountsList' to exclude the selected account.
    handleFromAccount(event) {
        this.selectedAccount = event.target.value

        this.toAccountsList = this.accounts.filter(account => account.accountNo !== this.selectedAccount)
    }


    // Method to handle the remarks input change event.
    // Updates the 'remarks' property with the value from the event detail.
    handleRemarks(event) {
        this.remarks = event.detail.remarks
    }



    // Getter to check if the submit button should be disabled.
    // Returns the result of the verifyValues method.
    get disableSubmit() {
        return this.verifyValues()
    }

    // Method to verify if required values are valid.
    // Checks if date, selectedAccount, toAccount, and amount are properly set.
    verifyValues() {
        return this.amount === '' || this.currency === CB_Select || (this.recurring && this.numberOfDays === 0) || this.frequency === CB_Select || this.endDateAllowed && this.endDate === 'DD/MM/YYYY'
    }

    // Helper function for navigation to a specified page with optional state data.
    // Uses the NavigationMixin to navigate.
    navigateTo(pageApiName, data = {}) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            },
            state: data
        });
    }

    // Method to handle the form submission.
    // Collects data and navigates to the confirmation page with the collected data.
    handleSubmit() {
        let data = {
            fromAccount: this.selectedAccount,
            toAccount: this.toAccount,
            amount: this.amount,
            dateSelected: this.dateSelected,
            comment: this.remarks
        }
        console.log(JSON.stringify(data))
        this.navigateTo(CB_Page_OwnAcctTransConf, data)
    }


    /**
    * Handles the input event for the currency selection.
    * @param {Event} event - The input event.
    */
    handleCurrency(event) {
        this.currency = event.target.value
    }



    /**
    * To get all the picklist values.
    */
    loadAllPicklistValues() {
        let componentName = /([^(/]*?)\.js/g.exec(new Error().stack)[1]
        getPicklistValues(componentName)
            .then(result => {
                this.currencies = result['CBOwnAccountTransferCurrencies'].split("\r\n");
            }).catch(error => {
                console.error(error)
            })
    }



    // Subscribing to LMS
    subscribeMessage() {
        //subscribe(messageContext, messageChannel, listener, subscribeOptions)
        this.subscription = subscribe(this.context, LMS, (lmsMessage) => { this.handleLMSData(lmsMessage) }, { scope: APPLICATION_SCOPE })
    }


    startDate = ''
    endDate = ''
    noOfInstallments = ''
    noOfPayments = ''
    frequency = CB_Select
    recurring = false
    endDateAllowed = false

    // Helper function for handling LMS Data
    handleLMSData(data) {
        console.log(data.lmsData)
        if (data.lmsData) {
            this.startDate = data.lmsData.startDate ? data.lmsData.startDate : ''
            this.endDate = data.lmsData.endDate ? data.lmsData.endDate : ''
            this.noOfPayments = data.lmsData.numberOfPayments ? data.lmsData.numberOfPayments : 0
            this.noOfInstallments = data.lmsData.noOfInstallments ? data.lmsData.noOfInstallments : 0
            this.frequency = data.lmsData.frequency ? data.lmsData.frequency : ''
            this.endDateAllowed = data.lmsData.endDateAllowed ? data.lmsData.endDateAllowed : ''
        }
    }
}