import { LightningElement } from 'lwc';
import CBSVG from "@salesforce/resourceUrl/CBSVG";

export default class CBFilterLoanAccountModal extends LightningElement {

    CBBackIcon = `${CBSVG}/CBSVGs/CBBackIcon.svg#CBBackIcon`;

    fromDate = 'YYYY-MM-DD'
    toDate = 'YYYY-MM-DD'
    currDate = ''

    closeFilter(data) {
        this.dispatchEvent(new CustomEvent('filter',{
            detail : data
        }))
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



    get validateDate(){
        return this.fromDate >= this.toDate
    }

    submitHandler(){
        this.closeFilter({
            fromDate : this.fromDate,
            toDate: this.toDate
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
        return ''
    }

    get toDateMax() {
        if (this.currDate) {
            return this.currDate
        }
        return ''
    }

}