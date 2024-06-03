import { LightningElement } from 'lwc';
import DONE from '@salesforce/label/c.CB_Done';
import CANCEL from '@salesforce/label/c.CB_Cancel';

import {
    setAllMobileSessionStorage,
    getAllMobileSessionStorage,
    getMobileSessionStorage
} from 'c/cBUtilities';


import { NavigationMixin } from 'lightning/navigation';
export default class CBBillPaymentsSelectTransDate extends NavigationMixin(LightningElement) {

    // Object to hold imported labels
    label = {
        DONE: DONE.toUpperCase(), // Converting "Submit" label to uppercase
        CANCEL: CANCEL.toUpperCase(), // Converting "Cancel" label to uppercase
    };

    connectedCallback() {
        if (getMobileSessionStorage('billPaymentsTransDate') !== "null" && getMobileSessionStorage('billPaymentsTransDate')) {
            this.getTransactionDateData()
        }
    }
    headerConfguration = {
        previousPageUrl: 'CBBillPayments__c',
        heading: 'Select Trasaction Date',
        iconsExposed: false,
    }
    transDate = 'YYYY-MM-DD'
    handleTransDate(event) {
        console.log(event.target.value)
        this.transDate = event.target.value
    }

    recurring = false
    recurringHandler() {
        this.recurring = !this.recurring
    }

    frequencySelected = ''

    handleFreq(event) {
        this.frequencySelected = event.target.value
    }

    frequencies = ["Daily", "Monthly", "End of every month"]

    untilDate = 'YYYY-MM-DD'

    handleUntilDate(event) {
        console.log(event.target.value)
        this.untilDate = event.target.value
    }

    handleSubmit() {
        console.log("this.transDate = " + this.transDate)
        console.log("this.recurring = " + this.recurring)
        console.log("this.frequencySelected = " + this.frequencySelected)
        console.log("this.untilDate = " + this.untilDate)
        this.setAllData()
        this.navigateTo('CBBillPayments__c')
    }

    handleCancel() {
        console.log('cancel called');
        this.navigateTo('CBBillPayments__c')
    }


    number = 1
    increaseNumber() {
        this.number = this.number + 1

    }

    decreaseNumber() {
        this.number = this.number > 1 ? this.number - 1 : this.number
    }
    setAllData() {
        let data = {
            'billPaymentsTransDate': true,
            'transDate': this.transDate,
            'recurring': this.recurring,
            'frequencySelected': this.frequencySelected,
            'untilDate': this.untilDate
        }
        setAllMobileSessionStorage(data)
    }


    getTransactionDateData() {
        let result = getAllMobileSessionStorage('transDate', 'recurring', 'frequencySelected', 'untilDate')
        this.dateSelected = result['transDate']
        this.transDate = result['transDate']
        this.recurring = result['recurring']
        this.frequencySelected = result['frequencySelected']
        this.untilDate = result['untilDate']
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



    get disableButton() {
        return this.untilDate === 'YYYY-MM-DD' || this.transDate === 'YYYY-MM-DD'
    }


}