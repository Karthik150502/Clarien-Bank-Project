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
            exposed: false
        }
    }

    activityList = [
        {
            action: 'My Portfolio',
            desc: 'Transaction description from account 6000031632',
            dateTime: '10/06/24 - 11:20:24'
        },
        {
            action: 'My Portfolio',
            dateTime: '11/06/24  - 11:20:24'
        },
        {
            action: 'My Portfolio',
            dateTime: '11/06/24  - 11:20:24'
        },
        {
            action: 'My Portfolio',
            desc: 'Transaction description from account 6000031632',
            dateTime: '11/06/12 - 11:20:24'
        },
        {
            action: 'My Portfolio',
            desc: 'Transaction description from account 6000031632',
            dateTime: '11/06/12 - 11:20:24'
        },
        {
            action: 'My Portfolio',
            desc: 'Transaction description from account 6000031632',
            dateTime: '10/06/12 - 11:20:24'
        },
        {
            action: 'My Portfolio',
            dateTime: '10/06/12 - 11:20:24'
        },
        {
            action: 'My Portfolio',
            dateTime: '10/06/12 - 11:20:24'
        },
        {
            action: 'My Portfolio',
            desc: 'Transaction description from account 6000031632',
            dateTime: '10/06/12 - 11:20:24'
        },
        {
            action: 'My Portfolio',
            desc: 'Transaction description from account 6000031632',
            dateTime: '10/06/12 - 11:20:24'
        }
    ]

    filterModal = false
    openFilterPopup(){
        this.filterModal = true
    }

    current = 'June'
    
    fromData = ''
    toData = ''

    filterData(event){
        console.log(event.detail.data);
        console.log(event.detail.fromData+' '+event.detail.toDate);
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