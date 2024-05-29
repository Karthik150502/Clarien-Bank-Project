import { LightningElement } from 'lwc';
import DONE from '@salesforce/label/c.CB_Done';
import CANCEL from '@salesforce/label/c.CB_Cancel';
export default class CBBillPaymentsSelectTransactionModal extends LightningElement {

    // Object to hold imported labels
    label = {
        DONE: DONE.toUpperCase(), // Converting "Submit" label to uppercase
        CANCEL: CANCEL.toUpperCase(), // Converting "Cancel" label to uppercase
    };

    connectedCallback() {
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

    frequencySelected = 'Daily'

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


        let evt = new CustomEvent('transdateinput', {
            bubbles: true,
            detail: {
                transDate: this.transDate,
                recurring: this.recurring,
                frequencySelected: this.frequencySelected,
                untilDate: this.untilDate
            }
        })

        this.dispatchEvent(evt)
    }

    handleCancel() {
        let evt = new CustomEvent('modalclose', {
            bubbles: true,
        })

        this.dispatchEvent(evt)
    }


    number = 1
    increaseNumber() {
        this.number = this.number + 1

    }

    decreaseNumber() {
        this.number = this.number > 1 ? this.number - 1 : this.number
    }





    get disableButton() {
        return this.untilDate === 'YYYY-MM-DD' || this.transDate === 'YYYY-MM-DD'
    }


}