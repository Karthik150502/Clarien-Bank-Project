import { LightningElement } from 'lwc';

export default class CBDepositDurationDatePickerNew extends LightningElement {
    
    numbers = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    timePeriods = ["Months", "Years"]

    number = ''
    monOrYear = ''



    checkNumberScrollPos(event) {
        let isScrolling;
        clearTimeout(isScrolling);
        isScrolling = setTimeout(
            this.estimateNumber(event.target.scrollTop, event.target.clientHeight), 1000);
            console.log("Number = " + this.number)
            console.log("Month or Year = " + this.monOrYear)
    };
    estimateNumber(scrollTop, clientHeight) {
        let pos = scrollTop - 9.33
        let approIndex = Math.floor(pos / clientHeight)
        let index = approIndex < 0 ? 0 : approIndex
        this.number = this.numbers[index]
    }
    checkMonOrYearScrollPos(event) {
        let isScrolling;
        clearTimeout(isScrolling);
        isScrolling = setTimeout(
            this.estimateTimePeriod(event.target.scrollTop, event.target.clientHeight), 1000);
            console.log("Number = " + this.number)
            console.log("Month or Year = " + this.monOrYear)
    }

    estimateTimePeriod(scrollTop, clientHeight) {
        let pos = scrollTop - 9.33
        let approIndex = Math.floor(pos / clientHeight)
        let index = approIndex < 0 ? 0 : approIndex
        this.monOrYear = this.timePeriods[index]
    }

    getData() {
        console.log("Number = " + this.number)
        console.log("Month or Year = " + this.monOrYear)
    }
    
}