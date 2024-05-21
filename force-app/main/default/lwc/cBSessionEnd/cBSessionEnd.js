/*
    Author - Aditya
    Created Date - 	2024-03-20
    Modified Date - 2024-03-20
    Description - This child component is responsible for monitoring user inactivity.
*/

import { LightningElement} from 'lwc';
import { logout } from 'c/cBUtilities';

import SESSION_EXPIRY_MESSAGE from '@salesforce/label/c.CB_Session_Expiry_Message';


export default class CBSessionEnd extends LightningElement {

    modalOpen = false;
    sessionTimer
    idleTimer
    /**
  * Modal metadata for session expiration
  */
    modal = {
        // Title of the modal indicating session end
        title: SESSION_EXPIRY_MESSAGE,
        // Message in the modal (empty for now)
        message: '',
        // Metadata for the "Ok" button in the modal
        yesButton: {
            // Exposed property indicating visibility of the button
            exposed: true,
            // Label for the "Ok" button
            label: "Ok",
            // Implementation of the action performed when the "Ok" button is clicked
            implementation: () => {
                // Close the modal
                this.modalOpen = false;
                // Perform logout action
                logout();
            }
        },
        // Metadata for the "Cancel" button in the modal
        noButton: {
            // Exposed property indicating visibility of the button
            exposed: false,
            // Label for the "Cancel" button
            label: "Cancel",
            // Empty implementation for the "Cancel" button
            implementation: () => { }
        }
    };

    /**
     * Lifecycle hook invoked when the component is inserted into the DOM
     * Initiates the idle logout process on component initialization.
     * @returns {void}
     */
    connectedCallback() {
        this.idleLogout();
    }


    /**
     * Method to logout the user due to inactivity
     * Starts a timer to monitor user activity and triggers logout after a period of inactivity.
     * @returns {void}
     */
    idleLogout() {
        const yourFunction = () => {
            this.modalOpen = true;
            this.idleTimer = setTimeout(() => {
                logout()
            }, 150000)
        }

        const resetTimer = () => {
            clearTimeout(this.sessionTimer);
            clearTimeout(this.idleTimer);
            this.sessionTimer = setTimeout(yourFunction, 600000);  // Time is in milliseconds (10 min)
        }


        document.addEventListener('load', resetTimer, true);
        document.addEventListener('mousemove', resetTimer, true);
        document.addEventListener('mousedown', resetTimer, true);
        document.addEventListener('touchstart', resetTimer, true);
        document.addEventListener('touchmove', resetTimer, true);
        document.addEventListener('click', resetTimer, true);
        document.addEventListener('keydown', resetTimer, true);
        document.addEventListener('scroll', resetTimer, true);
    }

}