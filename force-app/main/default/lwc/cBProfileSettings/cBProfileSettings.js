/*
    Author - Aditya
    Created Date - 08/03/2024
    Modified Date - 12/03/2024, 21/03/2024
    Description - The component displays a header with configurable icons for quick access to different sections.
                It utilizes a metadata object to define the structure and visibility of profile settings items.
                The security settings section is exposed and configurable based on organizational requirements.
*/

import { LightningElement, track, wire } from 'lwc';
// Importing custom labels from Salesforce
import PROFILE_SETTINGS from '@salesforce/label/c.CB_ProfileSettings';
import CHANGE_PASSWORD from '@salesforce/label/c.CB_ChangePassword';
import FAVORITE_ACCOUNTS from '@salesforce/label/c.CB_FavoriteAccounts';
import ONLINE_ACTIVITES from '@salesforce/label/c.CB_OnlineActivites';

import searchProfile from '@salesforce/apex/CBApiController.searchProfile';
import { dateToTimestamp, getJsonData, getSessData, getUserCreds } from 'c/cBUtilities';
import { CurrentPageReference } from 'lightning/navigation';
import HOME_PAGE from '@salesforce/label/c.CB_Page_Home';



export default class CBProfileSettings extends LightningElement {
    // Labels for various UI elements
    label = {
        PROFILE_SETTINGS,
        CHANGE_PASSWORD,
        FAVORITE_ACCOUNTS,
        ONLINE_ACTIVITES,
    };

    // Object to manage header icons
    header_icons = {
        // Announcements icon settings
        announcements: {
            exposed: true,  // Whether to display the Announcements icon
            haveItems: true // Whether the Announcements icon has items to display
        },
        // Whether to display the Announcements icon
        notifications: {
            exposed: true,  // Whether to display the Notifications icon
            haveItems: true // Whether the Notifications icon has items to display
        },
        // Inbox icon settings
        inbox: {
            exposed: true,  // Whether to display the Inbox icon
            haveItems: true // Whether the Inbox icon has items to display
        },
        // Scan Code icon settings
        scanCode: {
            exposed: false, // Whether to display the Scan Code icon
            haveItems: false    // Whether the Scan Code icon has items to display
        }
    };

    // Initial Profile Item Configuration
    @track profileItems = {
        previousPageUrl: HOME_PAGE,    // URL for the previous page
        heading: this.label.PROFILE_SETTINGS,   // Heading for the profile page (using label for security settings)
        headingShow: true,
        profileInfo: false, // Whether to display profile information
        profileSettings: {
            exposed: true   // Whether to display profile settings
        },
        profile: {
            exposed: false  // Whether to display profile details
        },
        serviceRequest: {
            exposed: false  // Whether to display service requests
        },
        securitySettings: {
            exposed: false// Whether to display security settings (exposed)
        },
        applyNow: {
            exposed: false
        },
        chequeBook: {
            exposed: false
        },
        email: '',
        phone: ''
    };

    profileSearchApiMdtName = 'CB_Post_Profile_Search';
    reqBody = '';
    jsonPathData = [];
    username = ''
    password = ''
    requestUUID = ''
    hasRendered = false
    isLoading = false

    refreshContainerID;

    connectedCallback() {
        this.requestUUID = dateToTimestamp();
        this.getUsernamePasswordHandler();
        this.isLoading = true
    }



    getUsernamePasswordHandler() {
        getUserCreds().then(result => {
            console.log('Result: ' + JSON.stringify(result))
            if (result.CBUsername && result.CBPassword) {
                this.username = result.CBUsername
                this.password = result.CBPassword
                this.fetchJsonData()
            }
        }).catch(error => {
            console.log("Was not able to get Username and password from the Salesforce session.!")
            console.error(error)
        });
    }

    getProfileDetails() {
        this.reqBody = this.dataMap(this.reqBody, this.jsonPathData);
        let reqWrapper = {
            payload: JSON.stringify(this.reqBody),
            metadataName: this.profileSearchApiMdtName,
            headers: null
        }
        console.log('reqWrapper ', JSON.stringify(reqWrapper));
        searchProfile({ reqWrapper: reqWrapper })
            .then((result) => {
                console.log('result:', JSON.stringify(result))
                this.profileItems.email = JSON.parse(result)?.cEmailId;
                this.profileItems.phone = JSON.parse(result)?.cMPhoneNo;
                console.log(this.profileItems.email);
                console.log(this.profileItems.phone);
                this.isLoading = false
            })
            .catch((error) => {
                this.isLoading = false
                console.error("Error:", JSON.stringify(error))
            })
    }

    /**
    * This function uses a method from the cBJsonDataHandler package that calls an Apex method that returns the API's request body and JSON paths for substitution.
    * @returns {void}
    */
    fetchJsonData() {
        getJsonData(this.profileSearchApiMdtName)
            .then(result => {
                console.log('Profile Search : ', result);
                this.reqBody = JSON.parse(result[0]);
                this.jsonPathData = result[1];
                console.log('reqBody: ', JSON.stringify(this.reqBody));
                console.log('jsonPathData: ', this.jsonPathData);
                this.getProfileDetails();
            }).catch((error) => {
                console.log('Some error occured: ' + error)
            })
    }

    /**
    * This function takes in the request body and ther path and uses eval() to substitute the  values in the request body.
    * @param {Object} jsonReq - The request body, as a JSON.
    * @param {Array} JsonPath - The Json path data to be used for substitution.
    * @returns {Object} The request body after the values have been substituted.
    */
    dataMap(jsonReq, JsonPath) {
        JsonPath.forEach((record) => {
            if (!record.Is_Active__c) {
                return
            }
            if (record.Is_Constant__c) {
                console.log(`jsonReq${record.JSON_Path__c}=${record.Value__c}`)
                eval(`jsonReq${record.JSON_Path__c}=${record.Value__c}`);
            } else {
                console.log(`jsonReq${record.JSON_Path__c}=this.${record.Field_Name__c}`);
                eval(`jsonReq${record.JSON_Path__c}=this.${record.Field_Name__c}`);
            }
        });
        return jsonReq
    }
}