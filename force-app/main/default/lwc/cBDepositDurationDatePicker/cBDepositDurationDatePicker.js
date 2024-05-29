import { LightningElement } from 'lwc';

export default class CBDepositDurationDatePicker extends LightningElement {

    numbers = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    timePeriods = ["Months", "Years"]

    number = ''
    monOrYear = ''

    checkNumberScrollPos(event) {
        let isScrolling;
        clearTimeout(isScrolling);
        isScrolling = setTimeout(
            this.estimateNumber(event.target.scrollTop, event.target.clientHeight, event.target.scrollHeight), 1000);

    };

    estimateNumber(scrollTop, clientHeight, scrollHeight) {
        let pos = scrollTop - 9.33
        let approIndex = Math.floor(pos / clientHeight)
        let index = approIndex < 0 ? 0 : approIndex
        this.number = this.numbers[index]
        console.log(scrollTop, clientHeight, scrollHeight, index, this.number)
    }

    checkMonOrYearScrollPos(event) {
        let isScrolling;
        clearTimeout(isScrolling);
        isScrolling = setTimeout(
            this.estimateTimePeriod(event.target.scrollTop, event.target.clientHeight, event.target.scrollHeight), 1000);

    }

    estimateTimePeriod(scrollTop, clientHeight, scrollHeight) {
        let pos = scrollTop - 9.33
        let approIndex = Math.floor(pos / clientHeight)
        let index = approIndex < 0 ? 0 : approIndex
        this.monOrYear = this.timePeriods[index]
        console.log(scrollTop, clientHeight, scrollHeight, index, this.monOrYear)
    }

    getData() {
        console.log("Number = " + this.number)
        console.log("Month or Year = " + this.monOrYear)
    }

}