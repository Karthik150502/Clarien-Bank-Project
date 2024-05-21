import { LightningElement } from 'lwc';

import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality


import networkId from '@salesforce/community/Id';
import basePath from '@salesforce/community/basePath';
const before_ = `${basePath}`.substring(0, `${basePath}`.indexOf('/s') + 1);
const commBaseUrl = `https://${location.host}${before_}`;
export default class ComponentA extends NavigationMixin(LightningElement) {


    fName
    lName
    destinationUrl

    handleFnameChange(event) {
        this.fName = event.target.value
    }

    handleLnameChange(event) {
        this.lName = event.target.value
    }




    submitHandler() {
        // let url = window.location.href
        let url = `https://clarienbank--developer.sandbox.my.site.com/s/test-page-2`
        if (this.fName && this.lName) {
            try {
                this.destinationUrl = url + `?firstname=${encodeURIComponent(this.fName)}&` + `lastname=${encodeURIComponent(this.lName)}`;
                this.navigateTo(this.destinationUrl)
            } catch (error) {
                console.log('Error occured --> ' + JSON.stringify(error))
            }
        } else {
            console.log("Enter the Firstname and Lastname")
        }


    }


    navigateTo(url) {
        window.location.href = url
        // this[NavigationMixin.Navigate]({
        //     type: 'standard__webPage',
        //     attributes: {
        //         url
        //     }
        // }).then((url) => {
        //     window.location.href = url;
        // }).catch((error) => {
        //     console.log("Error --> " + JSON.stringify(error))
        // });
    }

}