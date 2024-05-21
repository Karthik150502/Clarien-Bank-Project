/*
	Author - __
	Created Date - __/__/202_
	Modified Date - __/__/202_, __/__/202_
	Description - {***Purpose of creation or modification, Additional Comment***}
*/

import { LightningElement } from 'lwc';

export default class CBMyProfile extends LightningElement {
    // Object to manage header icons visibility and items
    header_icons = {
        announcements:{
            exposed:false, // Indicates whether the announcements icon is exposed
            haveItems:false // Indicates whether there are items associated with announcements
        },
        notifications:{
            exposed:false, // Indicates whether the notifications icon is exposed
            haveItems:false // Indicates whether there are items associated with notifications
        },
        inbox:{
            exposed:true, // Indicates whether the inbox icon is exposed
            haveItems:true // Indicates whether there are items associated with the inbox
        },
        scanCode:{
            exposed:true, // Indicates whether the scanCode icon is exposed
            haveItems:false // Indicates whether there are items associated with scanCode
        }
    }

    // Object to manage profile items visibility and settings
    profileItems = {
        previousPageUrl:'CBProfile__c', // URL of the previous page
        heading:'My Profile', // Heading for the profile section
        profileInfo:false, // Indicates whether the profile info is visible
        profileSettings:{
            exposed:false // Indicates whether the profile settings are exposed
        },
        profile:{
            exposed:false // Indicates whether the profile is exposed
        },
        serviceRequest:{
            exposed:false // Indicates whether the service request is exposed
        },
        securitySettings:{
            exposed:false // Indicates whether the security settings are exposed
        }
    }
}