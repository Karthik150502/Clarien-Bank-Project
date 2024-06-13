import { LightningElement } from 'lwc';
import DONE from '@salesforce/label/c.CB_Done';
import CANCEL from '@salesforce/label/c.CB_Cancel';
export default class CBSelectTransactionDateModal extends LightningElement {

    // Object to hold imported labels
    label = {
        DONE: DONE.toUpperCase(), // Converting "Submit" label to uppercase
        CANCEL: CANCEL.toUpperCase(), // Converting "Cancel" label to uppercase
    };

    connectedCallback() {
        this.transDate = this.currentDateMethod()
        console.log('Today',this.transDate);
        this.todayDate()
    }

    minDate = ''

    todayDate(){
        const today = new Date().toISOString().split('T')[0];
        this.minDate = today;
    }

    currentDateMethod(){
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`
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
        console.log('modal',event.target.value);
        this.frequencySelected = event.target.value
    }

    frequencies = ["Day", "Month", "End of every month"]

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
                untilDate: this.untilDate,
                repeat : this.number
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

        return this.recurring ? this.untilDate === 'YYYY-MM-DD' || this.transDate === 'YYYY-MM-DD' : this.transDate === 'YYYY-MM-DD'
    }


}