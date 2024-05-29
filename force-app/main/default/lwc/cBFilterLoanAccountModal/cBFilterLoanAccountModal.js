import { LightningElement } from 'lwc';

export default class CBFilterLoanAccountModal extends LightningElement {

    fromDate = 'YYYY-MM-DD'
    toDate = 'YYYY-MM-DD'
    selectedTransactionType = ''
    transactionTypes = ["Credit", "Debit"]
    fromAmount = ''
    toAmount = ''

    connectedCallback() {
        this.setCurrentDate()
    }

    fromDateHandler(event) {
        this.fromDate = event.target.value
    }

    toDateHandler(event) {
        this.toDate = event.target.value
    }

    
    get disableDoneButton() {
        return this.fromDate === 'YYYY-MM-DD' || this.toDate === 'YYYY-MM-DD' 
    }

    get validateDate(){
        return this.transFromDate >= this.transToDate
    }

    submitHandler(){
        this.closeFilter({
            fromDate : this.transFromDate,
            toDate: this.transToDate
        })
    }



    setCurrentDate() {
        let today = new Date()
        this.currDate = `${today.getFullYear()}-${String(today.getMonth() + 1) < 10 ? "0" : ""}${today.getMonth() + 1}-${today.getDate() < 10 ? '0' : ''}${today.getDate()}`
        console.log(this.currDate)
    }


    get fromDateMax() {
        if (this.currDate && this.toDate === 'YYYY-MM-DD') {
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

}