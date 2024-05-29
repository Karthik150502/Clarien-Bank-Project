import { LightningElement } from 'lwc';

export default class CBFilterSavingsAccount extends LightningElement {

    fromDate = 'YYYY-MM-DD'
    toDate = 'YYYY-MM-DD'
    selectedTransactionType = ''
    transactionTypes = ["Credit", "Debit"]
    fromAmount = ''
    toAmount = ''



    headerConfguration = {
        previousPageUrl: 'CBSavingsAccount__c',
        heading: 'Filter Transaction',
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }



    connectedCallback() {
        this.setCurrentDate()
    }

    fromDateHandler(event) {
        this.fromDate = event.target.value
    }

    toDateHandler(event) {
        this.toDate = event.target.value
    }
    handleFromAmount(event) {
        this.fromAmount = event.target.value
    }


    handleToAmount(event) {
        this.toAmount = event.target.value
    }

    handleDescription(event) {
        this.description = event.target.value
    }


    handleSubmit() {
        let description = this.template.querySelector(".desc-inp")
        if (description) {
            console.log(description.value)
        }
        console.log(this.fromAmount)
        console.log(this.toAmount)
        console.log(this.fromDate)
        console.log(this.toDate)
        console.log(this.selectedTransactionType)
    }

    handleCancel() {

    }

    get disableDoneButton() {
        return this.fromDate === 'YYYY-MM-DD' || this.toDate === 'YYYY-MM-DD' || this.selectedTransactionType === 'None' || this.fromAmount === '' || this.toAmount === '' || (Number(this.toAmount) < Number(this.fromAmount))
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


    handleTransactionType(event) {
        this.selectedTransactionType = event.target.value
    }
}