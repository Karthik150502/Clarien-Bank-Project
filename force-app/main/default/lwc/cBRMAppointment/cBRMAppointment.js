import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import SUBMIT from '@salesforce/label/c.CBChangePassword_submit';
import CB_Page_Applynow from '@salesforce/label/c.CB_Page_Applynow';
export default class CBRMAppointment extends NavigationMixin(LightningElement) {

    label = {
        SUBMIT
    }

    configuration = {
        previousPageUrl: '',//should Navigate to Make Request after creating page for that
        heading: 'Schedule RM Appointment',
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    appointmentDate = 'YYYY-MM-DD'
    comment = ' '
    today = new Date().toISOString().split('T')[0];

    commentHandler(event){
        this.comment = event.target.value;
        console.log(this.comment);
    }

    dateHandler(event){
        this.appointmentDate = event.target.value;
        console.log(this.appointmentDate);
    }

    get submitBtnDisable(){
        return this.appointmentDate === ' '
    }

    successModalOpen = false;

    successModalconfig={
        title: `Your request is submitted Sucessfully`,
        message: '',
        okButton: {
            exposed: true,
            label: 'Ok',
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
                name: CB_Page_Applynow
            }
        });
    }
    
    submitForm(){
        console.log(this.appointmentDate, this.comment)
        this.successModalOpen = true;
    }
    
}