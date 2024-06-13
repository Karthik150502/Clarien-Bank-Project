import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import { setPagePath } from 'c/cBUtilities';

export default class CBCreateMessage extends NavigationMixin(LightningElement) {

    configuration = {
        previousPageUrl: 'CBInbox__c',
        heading: 'Create Message',
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
    modal = {
        title: '',
        message: 'Message sent successfully',
        yesButton: {
            exposed: true,
            label: "OK",
            // Implementation for the "OK" button click action.
            implementation: () => {
                this.modalOpen = false;
                this.navigateTo();
            }
        },
        noButton: {
            exposed: false,
            label: "Not",
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

    subjectHandler(event) {
        this.subject = event.target.value;
    }

    messageHandler(event) {
        this.message = event.target.value;
    }

    fileHandler(event) {
        let str = event.target.value;
        this.file = str.substring(str.lastIndexOf("\\")+1, str.length);
        console.log('file: ', this.file);
    }

    connectedCallback() {
        this.configuration.previousPageUrl = setPagePath('CBCreateMessage__c')
        console.log(this.configuration.previousPageUrl);
    }

    submitHandler(){
        this.modalOpen = true;
    }

    get isDisabled() {
        return this.subject === '' && this.message === ''
    }



    navigateTo() {
        console.log('navigate called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'CBInbox__c'
            }
        });
    }
}