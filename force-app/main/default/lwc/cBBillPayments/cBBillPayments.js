import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import SUBMIT from '@salesforce/label/c.CB_Submit';

import {
    getAllMobileSessionStorage,
    getMobileSessionStorage,
    setAllMobileSessionStorage,
    checkSessionkey,
    setPagePath
} from 'c/cBUtilities';

import TRANSFERS_LINK from '@salesforce/label/c.CB_Page_Transfers'
import BILLPAYMENTS_LINK from '@salesforce/label/c.CB_Page_BillPayments'
import BILL_PAYMENTS from '@salesforce/label/c.CB_BillPayments'
import COMMENTS_OPTIONAL from '@salesforce/label/c.CB_CommentsOptional'
import UNTIL from '@salesforce/label/c.CB_Until'
import OCCURANCE from '@salesforce/label/c.CB_Occurance'
import RECURRING_TRANSFER from '@salesforce/label/c.CB_RecurringTransfer'
import DATE from '@salesforce/label/c.CB_Date'
import AMOUNT from '@salesforce/label/c.CB_Amount'
import SELECT_BILLER from '@salesforce/label/c.CB_SelectBiller'
import FROM_ACCOUNT from '@salesforce/label/c.CB_FromAccount'
import SELECT_ACCOUNT from '@salesforce/label/c.CB_SelectAccount'
import BILLER from '@salesforce/label/c.CB_Biller'

export default class CBBillPayments extends NavigationMixin(LightningElement) {
    // Object to hold imported labels
    label = {
        SUBMIT: SUBMIT.toUpperCase(), // Converting "Submit" label to uppercase
        TRANSFERS_LINK,
        BILLPAYMENTS_LINK,
        BILL_PAYMENTS,
        COMMENTS_OPTIONAL,
        UNTIL,
        OCCURANCE,
        RECURRING_TRANSFER,
        DATE,
        AMOUNT,
        SELECT_BILLER,
        FROM_ACCOUNT,
        SELECT_ACCOUNT,
        BILLER
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


    connectedCallback() {
        if (this.checkSessionStorage('billPmts_valuesRetained')) {
            this.populateValues()
        }
        this.headerConfguration.previousPageUrl = setPagePath(this.label.BILLPAYMENTS_LINK)
    }

    checkSessionStorage(param) {
        return checkSessionkey(param) && getMobileSessionStorage(param) !== 'false'
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

    amount = ''
    dateSelected = ''
    recurringTransfer = false
    accRefNumber = ''
    name = ''
    selectedFromAccount = ''
    selectedBiller = ''
    showTransDatePicker = false

    recurringTransferHandler() {
        this.recurringTransfer = !this.recurringTransfer
    }

    handleAmount(event) {
        this.amount = event.target.value
    }


    handleAccRefNumber(event) {
        this.accRefNumber = event.target.value
    }
    handleBiller(event) {
        this.selectedBiller = event.target.value
    }

    handleFromAccount(event) {
        this.selectedFromAccount = event.target.value
    }
    nameHandler(event) {
        this.name = event.target.value
    }




    handleSubmit() {
        console.log('this.name = ' + this.name)
        console.log('this.accRefNumber = ' + this.accRefNumber)
        console.log('this.date = ' + this.dateSelected)
        console.log('this.amount = ' + this.amount)
        console.log('this.recurringTransfer = ' + this.recurringTransfer)
        console.log('this.selectedFromAccount = ' + this.selectedFromAccount)
        console.log('this.selectedBiller = ' + this.selectedBiller)
        this.retainValues()
        this.navigateTo('CBBillPaymentsConfirmTrans__c')

    }

    navigateTo(pageApiName) {
        const pageReference = {
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            }
        };
        this[NavigationMixin.Navigate](pageReference);
    }


    openDateEntry() {
        this.dateSelected = 'YYYY-MM-DD'
        this.showTransDatePicker = true
    }

    retainValues() {
        let data = {
            'billPmts_amount': this.amount,
            'billPmts_recurringTransfer': this.recurringTransfer,
            'billPmts_accRefNumber': this.accRefNumber,
            'billPmts_name': this.name,
            'billPmts_selectedFromAccount': this.selectedFromAccount,
            'billPmts_selectedBiller': this.selectedBiller,
            'billPmts_transDate': this.dateSelected,
            'billPmts_valuesRetained': true
        }
        setAllMobileSessionStorage(data)
    }

    populateValues() {
        let result = getAllMobileSessionStorage('billPmts_amount', 'billPmts_recurringTransfer', 'billPmts_accRefNumber', 'billPmts_name', 'billPmts_selectedBiller', 'billPmts_selectedFromAccount', 'billPmts_transDate')
        this.amount = result['billPmts_amount']
        this.recurringTransfer = result['billPmts_recurringTransfer']
        this.accRefNumber = result['billPmts_accRefNumber']
        this.name = result['billPmts_name']
        this.selectedFromAccount = result['billPmts_selectedFromAccount']
        this.selectedBiller = result['billPmts_selectedBiller']
        this.dateSelected = result['billPmts_transDate']
    }

    amount = ''
    dateSelected = 'YYYY-MM-DD'
    recurringTransfer = false
    accRefNumber = ''
    name = ''
    selectedFromAccount = 'Select Account'
    selectedBiller = 'Select biller'
    untilDate = ''
    frequencySelected = ''

    get disableSubmit() {
        return this.verifyValues()
    }


    verifyValues() {
        return this.amount === '' || this.dateSelected === 'YYYY-MM-DD' || this.selectedBiller === this.label.SELECT_BILLER || this.selectedFromAccount === this.label.SELECT_ACCOUNT
    }

    recurringTransferView = false
    handleTransDate(event) {

        this.showTransDatePicker = false
        this.dateSelected = event.detail.transDate

        if (event.detail.recurring) {
            this.untilDate = event.detail.untilDate
            this.frequencySelected = event.detail.frequencySelected != 'End of every month' ? `Every ${event.detail.repeat} ${event.detail.frequencySelected} ` : 'End of every month';
            this.recurringTransfer = event.detail.recurring
            this.recurringTransferView = true
        }
        else {
            this.recurringTransferView = false
        }
    }

    closeTransDatInput() {
        this.showTransDatePicker = false
    }

}