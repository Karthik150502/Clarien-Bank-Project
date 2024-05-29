/*
    Author - __
    Created Date - __/__/202_
    Modified Date - __/__/202_, __/__/202_
    Description - {***Purpose of creation or modification, Additional Comment***}
*/

import { LightningElement, api } from 'lwc';

import CANCEL from '@salesforce/label/c.CB_Cancel';
import DONE from '@salesforce/label/c.CB_Done';



export default class CBCalender extends LightningElement {



    label = {
        CANCEL: CANCEL.toUpperCase(),
        DONE: DONE.toUpperCase(),

    }

    @api maxDate = ''
    @api minDate = ''



    currentMonth = 12
    currentYear = 2024
    currentDate = 1
    date = ""
    years = []
    allDates = [
    ]

    connectedCallback() {
        this.updateDates()
        this.loadYears()
    }

    months = [
        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMEBER"
    ]


    loadYears() {
        let currDate = new Date();
        let currYear = currDate.getFullYear();
        for (let i = currYear - 150; i <= currYear; i++) {
            this.years.push(i)
        }
    }

    get currMonth() {
        return this.months[this.currentMonth - 1]
    }
    monthReduce() {
        if (this.currentMonth == 1) {
            this.currentMonth = 12;
            this.currentYear = this.currentYear - 1
        } else {
            this.currentMonth = this.currentMonth - 1;
        }
        this.updateDates();
    }
    monthForward() {
        if (this.currentMonth == 12) {
            this.currentMonth = 1;
            this.currentYear = this.currentYear + 1
        } else {
            this.currentMonth = this.currentMonth + 1;
        }
        this.updateDates();
    }




    updateDates() {
        this.allDates = []
        // Present Month 
        let currMonth = new Date(this.currentYear, this.currentMonth - 1, 1);
        // Previous Month
        let lastMonth = new Date(this.currentMonth == 1 ? this.currentYear - 1 : this.currentYear, currMonth.getMonth() == 0 ? 12 : currMonth.getMonth(), 0);

        let prevMonthDateStart = lastMonth.getDate() - (currMonth.getDay() == 0 ? 6 : currMonth.getDay() - 1)

        let prevMonthDateEnd = lastMonth.getDate()

        let nextMonth = new Date(this.currentYear, this.currentMonth == 12 ? 0 : this.currentMonth, 1);

        let currMonthDateEnd = new Date(nextMonth - 1).getDate();

        let nextMonthEndDate = 42 - ((prevMonthDateEnd - prevMonthDateStart + 1) +
            currMonthDateEnd)



        //Previous Month Date
        for (let i = prevMonthDateStart; i <= prevMonthDateEnd; i++) {
            let dateObj = {
                value: i,
                class: "date disable",
            }
            this.allDates.push(dateObj)
        }

        //Current Month Date
        for (let i = 1; i <= currMonthDateEnd; i++) {
            let dateObj = {
                value: i,
                class: new Date(this.currentYear, this.currentMonth - 1, i).getDay() == 0 ? "date sunday" : "date other-day",
                dataAttr: i
            }
            this.allDates.push(dateObj)
        }

        //Next Month Date
        for (let i = 1; i <= nextMonthEndDate; i++) {
            let dateObj = {
                value: i,
                class: "date disable",
            }
            this.allDates.push(dateObj)
        }

    }


    selectDate(event) {
        let updatedDates = this.allDates.map((date) => {
            if (date.dataAttr == event.target.dataset.date) {
                this.currentDate = date.value
                return {
                    ...date,
                    class: date.class.includes("active") ? date.class.replace("active", "") : date.class == "date sunday" ? "date sunday active" : "date other-day active"
                }
            } else {
                return {
                    ...date,
                    class: date.class.includes("active") ? date.class.replace("active", "") : date.class
                }
            }
        })
        this.allDates = updatedDates
    }
    setDate() {
        this.date = `${this.currentDate}/${this.currentMonth}/${this.currentYear}`
        console.log(this.date)
        const event = new CustomEvent('dateselect', {
            bubbles: true,
            detail: {
                date: this.date
            }
        })

        this.dispatchEvent(event)
    }
    handleCancel() {
        console.log("Cancel handled!!!")
    }


    // Selecting year from dropwdown,, Karthik J..18-03-2024, 11:02AM
    selectYear(event) {
        console.log(event.target.value)
        this.currentYear = event.target.value
        this.updateDates();
    }
}