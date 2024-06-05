import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import { setLocalStorage, getLocalStorage } from 'c/cBUtilities';

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

    connectedCallback() {
        this.setPagePath()
    }

    setPagePath() {
        if (getLocalStorage('pagePath')) {

            let path = getLocalStorage('pagePath')

            if(path.indexOf('CBCreateMessage__c') !== -1){
                setLocalStorage('pagePath', path.substring(0, path.indexOf('CBCreateMessage__c') + ('CBCreateMessage__c').length))
                console.log('Message path -1',getLocalStorage('pagePath'))
                this.configuration.previousPageUrl = path.split('.')[path.split('.').length-2]
            }
            else{
                this.configuration.previousPageUrl = path.split('.')[path.split('.').length-1]
                setLocalStorage('pagePath', `${path}.CBCreateMessage__c`)
                console.log('Message path',getLocalStorage('pagePath'))
            }
        }
        else {
            setLocalStorage('pagePath', 'Home')
        }
        console.log('previousPageUrl',this.configuration.previousPageUrl);
    }

    submitHandler(){
        this.navigateTo();
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