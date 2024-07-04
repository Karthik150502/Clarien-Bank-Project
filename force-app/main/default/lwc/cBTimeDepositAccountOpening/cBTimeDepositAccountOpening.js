import { LightningElement } from 'lwc';

import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality

// Importing labels for easy manipulation of the data in labels
import TIME_DEPOSIT_ACCOUNT_OPENING from '@salesforce/label/c.CB_TimeDepositAccountOpening';
import PAGE_SERVICEREQUEST from '@salesforce/label/c.CB_Page_Servicerequest';
import YOUR_ACCOUNT_OPEN_SUCCESS from '@salesforce/label/c.CB_YourAccOpenSuccess';
import OK_BUTTON from '@salesforce/label/c.CB_Ok';
import CANCEL_BUTTON from '@salesforce/label/c.CB_Cancel';

import { getJsonData, dateToTimestamp, getAccountProducts } from 'c/cBUtilities'; // Importing utility methods
import createTimeDepositAccount from "@salesforce/apex/CBApiController.createTimeDepositAccount";

export default class CBTimeDepositAccountOpening extends NavigationMixin(LightningElement) {

    accountOpenType = 'timeDepositAccount'
    accountType = 'TIME DEPOSIT'
    accType = TIME_DEPOSIT_ACCOUNT_OPENING
    /**
     * The list of available term deposit products.
     * @type {Array}
     */
    termDepositProduct = [
        "TD GENERAL AT MAT 365A",
        "TD GENERAL AT MAT 360A",
        "TD GENERAL MONTHLY",
        "TD GENERAL QUARTERLY",
        "TD GENERAL HALF YEARLY",
        "TD GENERAL YEARLY",
        "TD COMMERICAL AT MAT 365A",
        "TD COMMERICAL AT MAT 360A",
        "TD COMMERICAL MONTHLY",
        "TD COMMERCIAL QUARTERLY",
        "TD COMMERICAL HALF YEARLY",
        "TD COMMERICAL YEARLY",
        "TD PREMIUM AT MATURITY",
        "TD PREMIUM MONTHLY",
        "TD PREMIUM QUARTERLY",
        "TD PREMIUM HALF YEARLY",
        "TD PREMIUM YEARLY",
        "TD SUPREME AT MATURITY",
        "TD SUPREME MONTHLY",
        "TD SUPREME QUARTERLY",
        "TD SUPREME HALF YEARLY",
        "TD PREMIUM COM AT MATURITY",
        "TD PREMIUM COM MONTHLY",
        "TD PREMIUM COM QUARTERLY",
        "TD PREMIUM COM HALF YEARLY",
        "TD PREMIUM COM YEARLY"
    ]
    /**
     * The configuration object for the secondary header.
     * @type {Object}
     */
    configuration = {
        previousPageUrl: PAGE_SERVICEREQUEST,
        heading: TIME_DEPOSIT_ACCOUNT_OPENING,
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }


    successModalOpen = false;
    /**
     * Configuration object for the success modal.
     * @type {Object}
     */
    successModalconfig = {
        title: YOUR_ACCOUNT_OPEN_SUCCESS,
        message: '',
        okButton: {
            exposed: true,
            label: OK_BUTTON,
            function: () => {
                this.navigateBack();
            }
        },
        noButton: {
            exposed: false,
            label: CANCEL_BUTTON,
            function: () => {
            }
        },
        alertMsg: ''
    }
    /**
     * Navigates back to the service request page.
     */
    navigateBack() {
        console.log('navigate called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: PAGE_SERVICEREQUEST
            }
        });
    }
    /**
     * Handles the event when an account creation form is submitted.
     * Extracts and assigns various account details from the event and initiates the account creation process.
     * 
     * @param {Event} event - The event containing the account creation details.
     */
    createAccount(event) {
        console.log(event.detail.depitAmount);
        console.log(JSON.stringify(event.detail));
        this.duration = event.detail.duration;
        this.depositAmount = event.detail.depositAmount;
        this.currency = event.detail.currency;
        this.product = event.detail.product;
        this.interestPayment = event.detail.interestPayment;
        this.principalMaturity = event.detail.principalMaturity;

        this.timeDepositAccountHandler();
        this.successModalOpen = true;
    }

    requestUUID = ''
    duration = ''
    currency = ''
    depositAmount = ''
    product = ''
    interestPayment = ''
    principalMaturity = ''

    apiName = 'CB_TdAccAdd'
    reqBody = ''
    jsonPathData = ''

    /**
     * Lifecycle hook called when the component is inserted into the DOM.
     * Generates a unique request UUID and fetches the JSON data for the API request.
     */
    connectedCallback() {
        this.requestUUID = dateToTimestamp();
        this.fetchJsonData();
    }

    /**
     * Fetches the JSON data required for the API request by calling an Apex method.
     * Parses and sets the request body and JSON path data.
     */
    fetchJsonData() {
        getJsonData(this.apiName)
            .then(result => {
                console.log('result : ', JSON.stringify(result));
                this.reqBody = JSON.parse(result[0]);
                this.jsonPathData = result[1];
                console.log(this.reqBody)
                console.log(this.jsonPathData)
            }).catch((error) => {
                console.log('Some error occured: ' + error)
            })
    }

    /**
     * Maps the JSON path data to the request body using the values from the component.
     * 
     * @param {Object} jsonReq - The JSON request object to be populated.
     * @param {Array} JsonPath - The JSON path data used for mapping values.
     * @returns {Object} The populated JSON request object.
     */
    dataMap(jsonReq, JsonPath) {
        JsonPath.forEach((record) => {
            eval(`jsonReq${record.JSON_Path__c}=this.${record.Field_Name__c};`)
            console.log(`jsonReq${record.JSON_Path__c}=this.${record.Field_Name__c}`);
        });
        return jsonReq
    }

    /** 
    * Handles the time deposit account creation process.
    * Maps the request body with necessary data and calls the Apex method to create the account.
    */
    timeDepositAccountHandler() {
        this.reqBody = this.dataMap(this.reqBody, this.jsonPathData);
        let reqWrapper = {
            payload: JSON.stringify(this.reqBody),
            metadataName: this.apiName,
            headers: null
        }
        createTimeDepositAccount({ reqWrapper: reqWrapper })
            .then((result) => {
                console.log('====================================');
                console.log(result);
                console.log('====================================');
            })
            .catch((error) => {
                console.error(error);
            })
    }

   
}