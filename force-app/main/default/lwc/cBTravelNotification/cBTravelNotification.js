import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import FROM_DATE from '@salesforce/label/c.CB_FromDate';
import TO_DATE from '@salesforce/label/c.CB_ToDate';
import SUBMIT from '@salesforce/label/c.CB_Submit';
// import SERVICEREQUEST_PAGE from '@salesforce/label/c.CB_Page_Servicerequest';

export default class CBTravelNotification extends NavigationMixin(LightningElement) {

    label = {
        FROM_DATE,
        TO_DATE,
        SUBMIT
    }

    configuration = {
        previousPageUrl: '',
        heading: 'Travel Notification',
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
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
        this.navigateToTravelNotificationConfirmation('CBTravelNotificationConfirmation__c');
    }

    navigateToTravelNotificationConfirmation(PageApi) {
        console.log('navigate called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: PageApi
            },
            state:{
                cardType : this.cardType ,
                country : this.country,
                state : this.state,
                fromDate : this.fromDate,
                toDate : this.toDate
            }
        });
    }
}