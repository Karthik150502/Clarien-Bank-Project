import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import SUBMIT from '@salesforce/label/c.CBChangePassword_submit';
import FIRST_NAME from '@salesforce/label/c.CB_FirstName';
import LAST_NAME from '@salesforce/label/c.CB_LastName';
import EMAIL_ADDRESS from '@salesforce/label/c.CB_EmailAddress';
import PHONE_NUMBER from '@salesforce/label/c.CB_PhoneNumber';
import APPOINTMENT_DATE from '@salesforce/label/c.CB_AppointmentDate';
import IAM_INTERESTED_IN from '@salesforce/label/c.CB_IamInterestedIn';
import TICK_ALL_THAT_APPLIES from '@salesforce/label/c.CB_TickApplies';



import CB_Page_Applynow from '@salesforce/label/c.CB_Page_Applynow';
import ERROR_INVALID_EMAIL from '@salesforce/label/c.CB_ErrorInvalidEmail';
import YOUR_REQUEST_IS_SUB from '@salesforce/label/c.CB_YourRequestIsSub';
import CANCEL from '@salesforce/label/c.CB_Cancel';
import OK from '@salesforce/label/c.CB_Ok';
import SCHEDULE_AN_APPOINTMENT from '@salesforce/label/c.CB_ScheduleAnRmAppointment';


import { formatDate } from 'c/cBUtilities';


export default class CBRMAppointment extends NavigationMixin(LightningElement) {

    label = {
        SUBMIT,
        ERROR_INVALID_EMAIL,
        YOUR_REQUEST_IS_SUB,
        CANCEL,
        SCHEDULE_AN_APPOINTMENT,
        OK,
        FIRST_NAME,
        LAST_NAME,
        EMAIL_ADDRESS,
        PHONE_NUMBER,
        APPOINTMENT_DATE,
        IAM_INTERESTED_IN,
        TICK_ALL_THAT_APPLIES
    }


    email = ''
    phone = ''
    firstName = ''
    lastName = ''
    emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    // configuration for secondary header
    configuration = {
        previousPageUrl: '',//should Navigate to Make Request after creating page for that
        heading: this.label.SCHEDULE_AN_APPOINTMENT,
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    appointmentDate = 'DD/MM/YYYY'
    comment = ' '
    today = new Date().toISOString().split('T')[0];
    notSelected = true;
    /**
    * Array of objects representing different options for applying.
    * @type {Array}
    */
    @track apply = [
        {
            id: '1',
            apply: 'Private Banking and Wealth Management',
            selected: false
        },
        {
            id: '2',
            apply: 'Discretionary Investment Management',
            selected: false
        },
        {
            id: '3',
            apply: 'Trust and Family Office',
            selected: false
        },
        {
            id: '4',
            apply: 'Corporate Services',
            selected: false
        },
        {
            id: '5',
            apply: 'Brokerage',
            selected: false
        },
        {
            id: '6',
            apply: 'Commercial Banking',
            selected: false
        },
        {
            id: '7',
            apply: 'Clarien+',
            selected: false
        },
        {
            id: '8',
            apply: 'Lending',
            selected: false
        },
        {
            id: '9',
            apply: 'Not Sure Yet',
            selected: false
        },
    ]

    /**
     * Handles changes to the comment input field.
     * @param {Event} event - The input change event.
     */
    commentHandler(event) {
        this.comment = event.target.value;
        console.log(this.comment);
    }

    /**
    * Handles changes to the date input field.
    * Formats the date and assigns it to the appointmentDate property.
    * @param {Event} event - The input change event.
    */
    dateHandler(event) {
        this.appointmentDate = formatDate(event.target.value)
    }
    /**
     * Handles changes to the email input field.
     * Validates the email address format and updates the email property.
     * Sets an error message if the email format is invalid.
     * @param {Event} event - The input change event.
     */
    handleEmail(event) {
        this.email = event.target.value
        this.checkEmailAddressError = !this.emailRegex.test(this.email) ? this.label.ERROR_INVALID_EMAIL : ''
    }

    /**
     * Handles changes to the phone number input field.
     * Updates the phone property with the entered value.
     * @param {Event} event - The input change event.
     */
    handlePhone(event) {
        this.phone = event.target.value
    }
    /**
     * Handles changes to the first name input field.
     * Updates the firstName property with the entered value.
     * @param {Event} event - The input change event.
     */
    handleFirstName(event) {
        this.firstName = event.target.value
    }
    /**
     * Handles changes to the last name input field.
     * Updates the lastName property with the entered value.
     * @param {Event} event - The input change event.
     */
    handleLastName(event) {
        this.lastName = event.target.value
    }

    /**
     * Handles changes in the checkbox for applying to specific services.
     * Updates the apply array based on the checkbox state and apply type.
     * @param {Event} event - The checkbox change event.
     */
    handleApplies(event) {
        let type = event.target.dataset.applytype
        let notSelected = true;
        this.apply = this.apply.map((a) => {
            let objFound = a.apply === type;
            if ((!objFound && a.selected) || event.target.checked) {
                notSelected = false;
            }
            return objFound ? {
                ...a,
                selected: event.target.checked
            } : {
                ...a
            }
        })
        this.notSelected = notSelected;
    }

    /**
     * Determines whether the submit button should be disabled based on form validation criteria.
     * @returns {Boolean} True if the submit button should be disabled, otherwise false.
     */
    get submitBtnDisable() {
        return this.appointmentDate === 'DD/MM/YYYY' || !this.emailRegex.test(this.email) || this.notSelected || this.firstName === '' || this.lastName === '' || this.phone === ''
    }

    successModalOpen = false;
    /**
     * Opens the success modal and logs the appointment date and comment to the console.
     */
    successModalconfig = {
        title: this.label.YOUR_REQUEST_IS_SUB,
        message: '',
        okButton: {
            exposed: true,
            label: this.label.OK,
            function: () => {
                this.navigateBack();
            }
        },
        noButton: {
            exposed: false,
            label: this.label.CANCEL,
            function: () => {
            }
        },
        alertMsg: ''
    }
    /**
     * Navigates back to the previous page using Lightning NavigationMixin.
     * Logs a message indicating the navigation action.
     */
    navigateBack() {
        console.log('navigate called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: CB_Page_Applynow
            }
        });
    }

    submitForm() {
        console.log(this.appointmentDate, this.comment)
        this.successModalOpen = true;
    }



}