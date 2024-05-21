import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import FROM_DATE from '@salesforce/label/c.CB_FromDate';
import TO_DATE from '@salesforce/label/c.CB_ToDate';
import SUBMIT from '@salesforce/label/c.CB_Submit';

export default class CBTravelNotification extends LightningElement {

    label = {
        FROM_DATE,
        TO_DATE,
        SUBMIT
    }

    configuration = {
        previousPageUrl: 'CBServiceRequest__c',
        heading: 'Travel Notification',
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    successModalOpen = false;
    successModalConfiguration = {
        title: 'Your Travel Notification has successfully',
        message: 'Travel Notification',
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

    navigateBack() {
        console.log('navigate called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'CBServiceRequest__c'
            }
        });
    }

    cardType = '';
    country = '';
    state = '';

    cardHandler(event) {
        this.cardType = event.target.value;
    }
    countryHandler(event) {
        this.country = event.target.value;   
    }
    stateHandler(event) {
        this.state = event.target.value;
    }

    fromDate = 'YYYY-MM-DD'
    toDate = 'YYYY-MM-DD'

    openFromDate() {
        let fromDate = this.template.querySelector('.from-date-invis')
        fromDate.showPicker()
        this.fromDate = this.template.querySelector('.from-date-invis').value;
    }

    openToDate() {
        let toDate = this.template.querySelector('.to-date-invis')
        toDate.showPicker()
    }

    fromDateHandler(event) {
        this.fromDate = event.target.value
    }

    toDateHandler(event) {
        this.toDate = event.target.value
    }

    get submitDisable() {
        return this.cardType == '' || this.country == '' || this.state == '' || this.fromDate === 'YYYY-MM-DD' || this.fromDate === '' || this.toDate ==='' || this.toDate === 'YYYY-MM-DD';

    }

    handleSubmit(){
        this.successModalOpen = true;
    }
}