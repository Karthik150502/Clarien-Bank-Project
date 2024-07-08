import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import CONTINUE from '@salesforce/label/c.CB_Continue';
import REMARKS from '@salesforce/label/c.CB_Remarks'
import UNTIL_END_DATE from '@salesforce/label/c.CB_UntilEndDate'
import CB_Page_Transfers from '@salesforce/label/c.CB_Page_Transfers'
import CB_DomesticTransfers from '@salesforce/label/c.CB_DomesticPayments'
import CB_Page_DomesticTransfers from '@salesforce/label/c.CB_Page_DomesticTransfers'
import CB_Page_DomesticTransfersConf from '@salesforce/label/c.CB_Page_DomesticTransfersConf'
import CB_FromAccount from '@salesforce/label/c.CB_FromAccount'
import CB_ToAccount from '@salesforce/label/c.CB_TO_ACCOUNT'
import CB_Amount from '@salesforce/label/c.CB_Amount'
import CB_Date from '@salesforce/label/c.CB_Date'
import CB_Name from '@salesforce/label/c.CB_Name'
import CB_Currency from '@salesforce/label/c.CBCurrency'
import CB_Recurring from '@salesforce/label/c.CB_Recurring'
import CB_Repeat from '@salesforce/label/c.CB_Repeat'
import CB_Select from '@salesforce/label/c.CB_Select'

import { setPagePath, formatDate, getMobileSessionStorage } from 'c/cBUtilities';


// LMS
import LMS from "@salesforce/messageChannel/cBRecurringTransferLMS__c";
import { APPLICATION_SCOPE, MessageContext, subscribe, unsubscribe } from 'lightning/messageService';

export default class CBDomesticTransfers extends NavigationMixin(LightningElement) {



    @wire(MessageContext)
    context;

    subscription = null;


    // Object to hold imported labels
    label = {
        CONTINUE, // Converting "Submit" label to uppercase
        REMARKS,
        UNTIL_END_DATE,
        CB_FromAccount,
        CB_ToAccount,
        CB_Amount,
        CB_Date,
        CB_Name,
        CB_Currency,
        CB_Recurring,
        CB_Repeat,
        CB_Select
    };

    headerConfguration = {
        previousPageUrl: CB_Page_Transfers,
        heading: CB_DomesticTransfers,
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        },
        openTemplates: {
            transferTypePage: CB_Page_DomesticTransfers
        }
    }

    connectedCallback() {
        this.headerConfguration.previousPageUrl = setPagePath(CB_Page_DomesticTransfers)
        this.setAccountData()
        this.subscribeMessage()

    }

    setAccountData() {
        this.accounts = JSON.parse(getMobileSessionStorage('CB_All_Account_Details')) ? JSON.parse(getMobileSessionStorage('CB_All_Account_Details')) : [];
    }

    recurring = false
    amount = ''
    toAccount = ''
    selectedAccount = CB_Select
    selectedBank = CB_Select
    name = ''
    currencies = ["BMD", "USD"]
    currency = CB_Select
    remarks = ''
    number = 1
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

    toAccountsList = [
        {
            accountNum: 604567894,
            name: 'Kumaran',
            accountType: 'Saving',
            status: true
        },
        {
            accountNum: 604567885,
            name: 'Raju',
            accountType: 'Saving',
            status: false
        }
        ,
        {
            accountNum: 604567796,
            name: 'Rohit',
            accountType: 'Current',
            status: true
        },
        {
            accountNum: 604567899,
            name: 'Robin',
            accountType: 'Saving',
            status: false
        },
        {
            accountNum: 604567810,
            name: 'Kartik',
            accountType: 'Saving',
            status: false
        }
        ,
        {
            accountNum: 604567711,
            name: 'Prateek',
            accountType: 'Current',
            status: true
        }
    ]

    banks = [
        {
            "id": '51561',
            "name": 'Bank of NT Butterfield and Son LTD'
        },
        {
            "id": '51461',
            "name": 'Bank of NT Butterfield and Son LTD'
        },
    ]
    // Method to handle the amount input change.
    // Updates the 'amount' property with the value from the input event.
    handleAmount(event) {
        this.amount = event.target.value
    }


    // Method to handle the selection of a to-account.
    // Updates the 'toAccount' property and sets the 'name' property based on the selected account number.
    handleToAccount(event) {
        this.toAccount = event.target.value
        console.log(this.toAccount);
        for (let i = 0; i < this.toAccountsList.length; i++) {
            console.log(this.toAccountsList[i].accountNum)
            if (this.toAccountsList[i].accountNum == this.toAccount) {
                console.log(this.toAccountsList[i].name);
                this.name = this.toAccountsList[i].name;
                break;
            }
        }
    }
    // Method to handle the selection of a from-account.
    // Updates the 'selectedAccount' property with the value from the input event.
    handleFromAccount(event) {
        this.selectedAccount = event.target.value
    }

    // Method to handle the currency selection.
    // Updates the 'currency' property with the value from the input event.
    handleCurrency(event) {
        this.currency = event.target.value
    }
    // Method to handle the bank selection.
    // Updates the 'selectedBank' property with the value from the input event.
    handleBankSelect(event) {
        this.selectedBank = event.target.value
    }

    // Method to handle the name input change.
    // Updates the 'name' property with the value from the input event.
    handleName(event) {
        this.name = event.target.value
    }

    // Method to handle remarks input change.
    // Updates the 'remarks' property with the value from the input event.
    handleRemarks(event) {
        this.remarks = event.detail.remarks
    }


    // get method to check the values and disable the submit button accordingly
    get disableSubmit() {
        return this.selectedAccount === CB_Select || this.toAccount === CB_Select || this.selectedBank === CB_Select || this.amount === '' || this.name === '' || this.currency === CB_Select(this.recurring && this.numberOfDays === 0) || this.frequency === CB_Select || this.endDateAllowed && this.endDate === 'DD/MM/YYYY'
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
    // Constructs the data object and navigates to the confirmation page with the data.
    handleSubmit() {
        let data = {
            fromAccount: this.selectedAccount,
            toAccount: this.toAccount,
            amount: this.amount,
            dateSelected: this.dateSelected,
            comments: this.remarks
        }
        console.log(JSON.stringify(data))
        this.navigateTo(CB_Page_DomesticTransfersConf, data)
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