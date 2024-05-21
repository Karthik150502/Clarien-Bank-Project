import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import LOANS from '@salesforce/label/c.CB_Loans';
import PERSONAL from '@salesforce/label/c.CB_PersonalLoan';
import CAR from '@salesforce/label/c.CB_CarLoan';
import HOME from '@salesforce/label/c.CB_HomeLoan';
import REMARKS from '@salesforce/label/c.CB_Remarks';
import SUBMIT from '@salesforce/label/c.CB_Submit';

export default class CBApplyNowLoans extends NavigationMixin(LightningElement) {

    label = {
        LOANS,
        PERSONAL,
        CAR,
        HOME,
        REMARKS,
        SUBMIT:SUBMIT.toUpperCase()
}

    configuration = {
        previousPageUrl: '',
        heading: 'Loans',
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    // Object to manage header icons visibility and items
    header_icons = {
        announcements: {
            exposed: false, // Indicates whether the announcements icon is exposed
            haveItems: false // Indicates whether there are items associated with announcements
        },
        notifications: {
            exposed: false, // Indicates whether the notifications icon is exposed
            haveItems: false // Indicates whether there are items associated with notifications
        },
        inbox: {
            exposed: true, // Indicates whether the inbox icon is exposed
            haveItems: true // Indicates whether there are items associated with the inbox
        },
        scanCode: {
            exposed: true, // Indicates whether the scanCode icon is exposed
            haveItems: false // Indicates whether there are items associated with scanCode
        }
    }

    successModalconfig = {
        title: 'Your Loan has been successfully applied!',
        message: 'Our bank employee will be in touch with you soon',
        okButton: {
            exposed: true,
            label: 'OK',
            function: () => {
                this.navigateBack();
            }
        },
        noButton: {
            exposed: false,
            label: 'Cancel',
            function: () => {
            }
        },
        alertMsg: ''
    }

    remarks = ''
    loan = ''
    successModalOpen = false

    handleLoanType(event) {
        this.loan = event.target.value;
    }
    handleRemark(event) {
        this.remarks = event.target.value;
    }



    handleSubmit() {
        console.log(this.loan);
        console.log(this.remarks);
        this.successModalOpen = true;
    }

    // Method to determine if the button should be disabled or not
    get buttonDisabled() {
        return !this.loan || !this.remarks // Disable button if either username or registered email address is empty
    }

    // Method to navigate back to login page
    navigateBack() {
        console.log('navigate called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'CBApplyNow__c'
            }
        });
    }
}