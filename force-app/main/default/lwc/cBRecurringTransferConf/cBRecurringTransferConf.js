import { LightningElement, wire } from 'lwc';
import CB_Recurring from '@salesforce/label/c.CB_Recurring';
import CB_EndDate from '@salesforce/label/c.CB_EndDate'
import CB_StartDate from '@salesforce/label/c.CB_StartDate'
import CB_PaymentDate from '@salesforce/label/c.CB_PaymentDate'
import CB_SelectEndDate from '@salesforce/label/c.CB_SelectEndDate'
import CB_Frequency from '@salesforce/label/c.CB_Frequency'
import CB_NumberOfInstallments from '@salesforce/label/c.CB_NumberOfInstallments'
import CB_Select from '@salesforce/label/c.CB_Select'


import LMS from "@salesforce/messageChannel/cBRecurringTransferLMS__c";
import { MessageContext, publish } from 'lightning/messageService';



import { getPicklistValues, formatDate, formatLocalDateStringDate, getCurrentDate } from 'c/cBUtilities';


export default class CBRecurringTransferConf extends LightningElement {




    @wire(MessageContext)
    context;

    label = {
        CB_Recurring,
        CB_SelectEndDate,
        CB_StartDate,
        CB_EndDate,
        CB_Frequency,
        CB_Select,
        CB_NumberOfInstallments,
        CB_PaymentDate
    }



    startDate = 'DD/MM/YYYY'
    startDateUnformatted = ''
    untilDate = 'DD/MM/YYYY'
    frequencies = []
    frequency = 'Select'
    recurring = false
    inputEndDate = false
    noOfDays = 0
    currentDate = 'DD/MM/YYYY'
    filledRequiredFields = false
    startDateHtmlFmt = 'YYYY-MM-DD'
    noOfInstallments = 0
    timePeriodDays = {
        'Daily': 1,
        'Weekly': 7,
        'Monthly': 30,
        'Fortnightly': 14,
        'Half Yearly': 182,
        'Yearly': 365
    }




    // Lifecycle hook that gets called at connect phase of the LWC component
    connectedCallback() {
        this.loadPicklistValues()
        this.loadTodaysDate()
    }




    // Method to handle frequency select
    handleFrequency(event) {
        this.frequency = event.target.value

        const message = {
            lmsData: {
                frequency: this.frequency,
            }
        }
        publish(this.context, LMS, message)
        this.getEndDateBasedNoOfInstallments(this.noOfInstallments)

    }






    // Function to load current date fields
    loadTodaysDate() {
        this.startDate = getCurrentDate()
        let d = this.startDate.split("/")
        this.currentDate = `${d[2]}-${d[1]}-${d[0]}`
        this.startDateHtmlFmt = `${d[2]}-${d[0]}-${d[1]}`
        this.startDateUnformatted = new Date(this.currentDate)

        const message = {
            lmsData: {
                startDate: this.startDate,
            }
        }

        publish(this.context, LMS, message)
    }






    // Method to toggle the recurring payment option.
    // Updates the 'recurring' property to its opposite value.
    recurringHandler() {
        this.recurring = !this.recurring
        const message = {
            lmsData: {
                recurring: this.recurring,
            }
        }

        publish(this.context, LMS, message)
    }


    // Method to toggle the end date input option.
    // Updates the 'inputEndDate' property to its opposite value.
    enableEndDate() {
        this.inputEndDate = !this.inputEndDate
        const message = {
            lmsData: {
                endDateAllowed: this.inputEndDate,
            }
        }

        publish(this.context, LMS, message)
    }


    // Method to handle the start date input change event.
    // Updates the 'dateSelected' property with the formatted date value from the input event.
    handleStartDate(event) {
        this.startDateUnformatted = new Date(event.target.value)
        this.startDate = formatDate(event.target.value)
        let res = this.startDate.split("/")
        this.startDateHtmlFmt = `${res[2]}-${res[1]}-${res[0]}`
        const message = {
            lmsData: {
                startDate: this.startDate,
            }
        }

        publish(this.context, LMS, message)
        // this.getNoOfDaysBasedOnEndDate(new Date(event.target.value))
    }


    // Method to handle the end date input change event.
    // Updates the 'dateSelected' property with the formatted date value from the input event.
    handleEndDate(event) {
        this.getNoOfDaysBasedOnEndDate(new Date(event.target.value))
        this.untilDate = formatDate(event.target.value)
        const message = {
            lmsData: {
                endDate: this.untilDate,
            }
        }

        publish(this.context, LMS, message)
    }

    /**
    * To get all the picklist values.
    */
    loadPicklistValues() {
        let componentName = /([^(/]*?)\.js/g.exec(new Error().stack)[1]
        getPicklistValues(componentName)
            .then(result => {
                this.frequencies = result["CBRecurringTransferConfFrequencies"].split("\r\n");
            }).catch(error => {
                console.error(error)
            })
    }




    // Function To get the number of days input
    handleNumberOfInstallments(event) {
        this.getEndDateBasedNoOfInstallments(Number(event.target.value))
        this.noOfInstallments = Number(event.target.value)
        const message = {
            lmsData: {
                numberOfInstallments: this.noOfInstallments,
            }
        }

        publish(this.context, LMS, message)
    }


    // A Funtion to get number of days based on End date and Start date
    getNoOfDaysBasedOnEndDate(endDate) {
        this.noOfDays = (endDate - this.startDateUnformatted) / (1000 * 60 * 60 * 24)

        const message = {
            lmsData: {
                numberOfDays: this.noOfDays,
            }
        }

        publish(this.context, LMS, message)
    }






    // A Funtion to get End Date based on start date and Number of date
    getEndDateBasedNoOfInstallments(num) {
        let res = new Date((num * this.timePeriodDays[this.frequency]) * (1000 * 60 * 60 * 24) + this.startDateUnformatted.getTime()).toLocaleDateString()
        this.endDate = formatLocalDateStringDate(res.split("T")[0])

        const message = {
            lmsData: {
                endDate: this.endDate,
            }
        }
        publish(this.context, LMS, message)
    }






}