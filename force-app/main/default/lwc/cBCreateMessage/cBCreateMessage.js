import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { setPagePath } from 'c/cBUtilities';

import TOPIC from '@salesforce/label/c.CB_Topic';
import SUBJECT from '@salesforce/label/c.CB_Subject';
import MESSAGE_BODY from '@salesforce/label/c.CB_MessageBody';
import BROWSE from '@salesforce/label/c.CB_Browse';
import DONE from '@salesforce/label/c.CB_Done';
import INBOX_PAGE from '@salesforce/label/c.CB_Page_Inbox';
import CREATE_MESSAGE from '@salesforce/label/c.CB_CreateMessage';
import MESSAGE_SENT_SUCCESSFULLY from '@salesforce/label/c.CB_MessageSentSuccessfully';
import OK from '@salesforce/label/c.CB_Ok';
import CREATE_MESSAGE_PAGE from '@salesforce/label/c.CB_Page_CreateMessage';
import ACCOUNT_INFO from '@salesforce/label/c.CB_AccountInfo';
import APPOINTMENT_REQUEST from '@salesforce/label/c.CB_AppointmentRequest';
import COMPLAINT from '@salesforce/label/c.CB_Complaint';
import LIQUIDITY_WITHDRAWL_NOTICE from '@salesforce/label/c.CB_LiquidityWithdrawlNotice';
import TECHNICAL_ISSUE from '@salesforce/label/c.CB_TechnicalIssue';
import TRAVEL_DISPUTE from '@salesforce/label/c.CB_TransactionDispute';
import TRAVEL_NOTIFICATION from '@salesforce/label/c.CB_TravelNotification';


export default class CBCreateMessage extends NavigationMixin(LightningElement) {

    label = {
        TOPIC, SUBJECT, MESSAGE_BODY, BROWSE, DONE, INBOX_PAGE,
        ACCOUNT_INFO, APPOINTMENT_REQUEST, COMPLAINT, LIQUIDITY_WITHDRAWL_NOTICE, TECHNICAL_ISSUE, TRAVEL_DISPUTE, TRAVEL_NOTIFICATION
    }

    //configuration for secondary header
    configuration = {
        previousPageUrl: INBOX_PAGE,
        heading: CREATE_MESSAGE,
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }, favorite: {
            selected: false
        }
    }

    modalOpen = false;
    // configuration for success modal
    modal = {
        title: '',
        message: MESSAGE_SENT_SUCCESSFULLY,
        yesButton: {
            exposed: true,
            label: OK,
            // Implementation for the "OK" button click action.
            implementation: () => {
                this.modalOpen = false;
                this.navigateTo();
            }
        },
        noButton: {
            exposed: false,
            label: "No",
            //Implementation for the "Not" button click action.
            implementation: () => {
                console.log('no');
                this.modalOpen = false;
            }
        }
    };

    file = 'Add Attachment'
    subject = ''
    message = ''

    /**
     * Handles the input event for the subject field.
     * Sets the subject property based on the input value.
     * @param {Event} event - The input event from the subject field.
     */
    subjectHandler(event) {
        this.subject = event.target.value;
    }
    /**
     * Handles the input event for the message field.
     * Sets the message property based on the input value.
     * @param {Event} event - The input event from the message field.
     */
    messageHandler(event) {
        this.message = event.target.value;
    }
    /**
     * Handles the input event for the file field.
     * Extracts and sets the file name from the input value.
     * @param {Event} event - The input event from the file field.
     */
    fileHandler(event) {
        let str = event.target.value;
        this.file = str.substring(str.lastIndexOf("\\") + 1, str.length);
        console.log('file: ', this.file);
    }
    /**
     * Lifecycle hook that is called when the component is inserted into the DOM.
     * Sets the previous page URL configuration and logs it to the console.
     */
    connectedCallback() {
        this.configuration.previousPageUrl = setPagePath(CREATE_MESSAGE_PAGE)
        console.log(this.configuration.previousPageUrl);
    }
    /**
     * Handles the form submission event.
     * Opens the modal upon form submission.
     */
    submitHandler() {
        this.modalOpen = true;
    }
    /**
     * Getter that determines if the submit button should be disabled.
     * The button is disabled if both the subject and message fields are empty.
     * @returns {boolean} - Returns true if both subject and message are empty, false otherwise.
     */
    get isDisabled() {
        return this.subject === '' && this.message === ''
    }


    /**
     * Navigates to the inbox page.
     * Uses the NavigationMixin to perform the navigation.
     */
    navigateTo() {
        console.log('navigate called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: INBOX_PAGE
            }
        });
    }
}