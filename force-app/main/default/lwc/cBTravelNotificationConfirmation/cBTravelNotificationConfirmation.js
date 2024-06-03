import { LightningElement, wire } from 'lwc';

import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';

import CB_Page_Applynow from '@salesforce/label/c.CB_Page_Applynow';


export default class CBTravelNotificationConfirmation extends NavigationMixin(LightningElement) {

    configuration = {
        previousPageUrl: 'CBTravelNotification__c',
        heading: 'Travel Notification',
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    @wire(CurrentPageReference) pageRef;
    get cardType() {
        return this.pageRef && this.pageRef.state.cardType;
    }
    get country() {
        return this.pageRef && this.pageRef.state.country;
    }
    get state() {
        return this.pageRef && this.pageRef.state.state;
    }
    get fromDate() {
        return this.pageRef && this.pageRef.state.fromDate;
    }
    get toDate() {
        return this.pageRef && this.pageRef.state.toDate;
    }

    successModalOpen = false;

    successModalconfig = {
        title: `Your request is submitted successfully`,
        message: '',
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

    submitForm() {
        console.log('Submit');
        this.successModalOpen = true
    }

    navigateBack() {
        console.log('navigate called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: CB_Page_Applynow
            }
        });
    }
}