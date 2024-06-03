import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality
import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBOnlineActivities extends NavigationMixin(LightningElement) {

    CBSortOrder = `${CBSVG}/CBSVGs/CBSortOrder.svg#CBSortOrder`;
    CBFilter = `${CBSVG}/CBSVGs/CBFilter.svg#CBFilter`;

    configuration = {
        previousPageUrl: '',
        heading: 'Online Activity',
        iconsExposed: true,
        logout: {
            exposed: true
        },
        search: {
            exposed: true
        }
    }

    activityList = [
        {
            action: 'My Portfolio',
            desc: 'Transaction description from account 6000031632',
            dateTime: '15/12/12 - 11:20:24'
        },
        {
            action: 'My Portfolio',
            dateTime: '15/12/12 - 11:20:24'
        },
        {
            action: 'My Portfolio',
            dateTime: '15/12/12 - 11:20:24'
        },
        {
            action: 'My Portfolio',
            desc: 'Transaction description from account 6000031632',
            dateTime: '15/12/12 - 11:20:24'
        },
        {
            action: 'My Portfolio',
            desc: 'Transaction description from account 6000031632',
            dateTime: '15/12/12 - 11:20:24'
        },
        {
            action: 'My Portfolio',
            desc: 'Transaction description from account 6000031632',
            dateTime: '15/12/12 - 11:20:24'
        },
        {
            action: 'My Portfolio',
            dateTime: '15/12/12 - 11:20:24'
        },
        {
            action: 'My Portfolio',
            dateTime: '15/12/12 - 11:20:24'
        },
        {
            action: 'My Portfolio',
            desc: 'Transaction description from account 6000031632',
            dateTime: '15/12/12 - 11:20:24'
        },
        {
            action: 'My Portfolio',
            desc: 'Transaction description from account 6000031632',
            dateTime: '15/12/12 - 11:20:24'
        }
    ]

    filterModal = false
    openFilterPopup(){
        this.filterModal = true
    }

    fromData = ''
    toData = ''

    filterData(event){
        console.log(event.detail.data);
        console.log(JSON.stringify(event.detail));
        this.filterModal = false
    }

    naviagteToCreateMessage() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'CBCreateMessage__c'
            }
        });
    }
}