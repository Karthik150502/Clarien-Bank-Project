import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality

// import getSessionDetails from '@salesforce/apex/CBApiController.getSessionDetails';
import searchProfile from '@salesforce/apex/CBApiController.searchProfile';
import { getJsonData, setSessData, getSessData, dateToTimestamp } from 'c/cBUtilities';

import PREDEFINED from '@salesforce/label/c.CB_Predefined'; // Importing label for predefined transactions
import OWN_ACC_PAYMENTS from '@salesforce/label/c.CB_OwnAccountTransfers'; // Importing label for own account transfers
import INTRABANK_PAYMENTS from '@salesforce/label/c.CB_IntrabankTransfers'; // Importing label for intrabank transfers
import DOMESTIC_PAYMENTS from '@salesforce/label/c.CB_DomesticPayments'; // Importing label for domestic payments
import INTERNATIONAL_PAYMENTS from '@salesforce/label/c.CB_InternationalPayments'; // Importing label for international payments
import MANAGE_BENEF from '@salesforce/label/c.CB_ManageBeneficiaries'; // Importing label for managing beneficiaries
import ADHOC_PAYMENTS from '@salesforce/label/c.CB_AdHocPayments'; // Importing label for ad hoc payments
import BILL_PAYMENTS from '@salesforce/label/c.CB_BillPayments'; // Importing label for bill payments
import VIEW_ALL from '@salesforce/label/c.CB_ViewAll'; // Importing label for "View All"
import SEND_MONEY from '@salesforce/label/c.CB_SendMoney';
import QR_CODE from '@salesforce/label/c.CB_QrCode';
import APPROVALS from '@salesforce/label/c.CB_Approvals';
import CREDIT_CARDS from '@salesforce/label/c.CB_CreditCards';
import INVESTMENT_PROFILES from '@salesforce/label/c.CB_InvestmentProfiles';
import ACCOUNT_STATEMENTS from '@salesforce/label/c.CB_AccountStatements';
import APPLY_FOR_LOANS from '@salesforce/label/c.CB_ApplyForLoans';
import PAY_BILLS from '@salesforce/label/c.CB_PayBills';
import SERVICE_REQUEST from '@salesforce/label/c.CB_ServiceRequest';
import BANK_ACCOUNTS from '@salesforce/label/c.CB_BankAccounts';
import SCAN_AND_PAY from '@salesforce/label/c.CB_ScanAndPay';
import OFFERS from '@salesforce/label/c.CB_Offers';
import ACCOUNTS_AND_DEPOSITS from '@salesforce/label/c.CB_AccountsAndDeposits';
import CHEQUEBOOK_SERVICES from '@salesforce/label/c.CB_ChequebookServices';
import ENABLE_DISABLE_BIOMETRIC from '@salesforce/label/c.CB_EnableDisableBiometric';

import PromImage from "@salesforce/resourceUrl/PromImage";
import CBSVG from "@salesforce/resourceUrl/DashboardIconsSVG"


export default class CBHomeDashboards extends NavigationMixin(LightningElement) {
    // Labels for dashboard icons
    label = {
        PREDEFINED,
        OWN_ACC_PAYMENTS,
        INTRABANK_PAYMENTS,
        DOMESTIC_PAYMENTS,
        INTERNATIONAL_PAYMENTS,
        MANAGE_BENEF,
        ADHOC_PAYMENTS,
        BILL_PAYMENTS,
        VIEW_ALL,
        SEND_MONEY,
        QR_CODE,
        APPROVALS,
        CREDIT_CARDS,
        INVESTMENT_PROFILES,
        ACCOUNT_STATEMENTS,
        PAY_BILLS,
        APPLY_FOR_LOANS,
        SERVICE_REQUEST,
        BANK_ACCOUNTS,
        SCAN_AND_PAY,
        OFFERS,
        ACCOUNTS_AND_DEPOSITS,
        CHEQUEBOOK_SERVICES,
        ENABLE_DISABLE_BIOMETRIC,
    };


    PromImage = PromImage;
    accountNo = 658745869;
    balance = 1452.45;
    holdBalance = 784.145;
    showViewALl = true

    //SVG's from static resource
    CBSendMoney = `${CBSVG}/DashboardIconsSVG/CBSendMoney.svg#CBSendMoney`;
    CBQRCode = `${CBSVG}/DashboardIconsSVG/CBQRCode.svg#CBQRCode`;
    CBBillPayments = `${CBSVG}/DashboardIconsSVG/CBBillPayments.svg#CBBillPayments`;
    CBApprovals = `${CBSVG}/DashboardIconsSVG/CBApprovals.svg#CBApprovals`;
    CBCreditCards = `${CBSVG}/DashboardIconsSVG/CBCreditCards.svg#CBCreditCards`;
    CBInvestmentProfiles = `${CBSVG}/DashboardIconsSVG/CBInvestmentProfiles.svg#CBInvestmentProfiles`;
    CBAccountStatements = `${CBSVG}/DashboardIconsSVG/CBAccountStatements.svg#CBAccountStatements`;
    CBApplyForLoans = `${CBSVG}/DashboardIconsSVG/CBApplyForLoans.svg#CBApplyForLoans`;

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

    isPageLoading = true
    // @wire(getSessionDetails)
    // sessionDetailsResult;

    // Initial values for password fields
    username = '';
    password = '';
    formId = '';
    requestUUID = ''

    /**
    * Lifecycle hook invoked when the component is inserted into the DOM
    * Loads the username, password from local session storage when the component is connected to the DOM.
    * @returns {void}
    */
    connectedCallback() {
        //if(getSessData(profileData)){
        // this.getSessionData();
        //}
    }

    getSessionData() {
        if (getSessData('CBSessionId')) {
            let sessionId = getSessData('CBSessionId')
            this.headerObj = {
                "Cookie": 'jsessionid=' + sessionId.substring(0, sessionId.indexOf("."))
            }
        }
        if (getSessData('CBUserName')) {
            this.username = getSessData('CBUserName');
        }
        if (getSessData('CBPassword')) {
            this.password = getSessData('CBPassword');
        }
        if (getSessData('CBFormId')) {
            this.formId = getSessData('CBFormId');
        }
        if (dateToTimestamp()) {
            this.requestUUID = dateToTimestamp();
        }
        this.fetchJsonData();
    }
    renderedCallback() {
        this.isPageLoading = false

    }

    apiName = 'Profile_Search';
    reqBody = '';
    jsonPathData = [];
    headerObj = '';

    getProfileDetails() {
        this.reqBody = this.dataMap(this.reqBody, this.jsonPathData);
        let reqWrapper = {
            payload: JSON.stringify(this.reqBody),
            metadataName: this.apiName,
            headers: JSON.stringify(this.headerObj)
        }
        console.log('reqWrapper ', JSON.stringify(reqWrapper));
        searchProfile({ reqWrapper: reqWrapper })
            .then((result) => {
                console.log('result:', result)
                let profileData = JSON.parse(result);
                console.log('Name:', setSessData('customerName', profileData?.cLName))
                console.log('Phone', setSessData('customePhoneNo', profileData?.cMPhoneNo))
                console.log('Email', setSessData('customeEmailId', profileData?.cEmailId))
                //console.log('fetchedProfileData',setSessData('profileData', false))
            })
            .catch((error) => {
                console.error("Error:", JSON.stringify(error))
            })
    }


    /**
    * This function uses a method from the cBJsonDataHandler package that calls an Apex method that returns the API's request body and JSON paths for substitution.
    * @param {String} apiName - The API details's metadata name.
    * @returns {void}
    */
    fetchJsonData() {
        getJsonData(this.apiName)
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
            eval(`jsonReq${record.JSON_Path__c}=this.${record.Field_Name__c}`);
        });
        return jsonReq
    }


    navigateToAllQuickLinks() {
        this.navigateTo('CBQuickLinks__c')
    }
    navigateToInvestmentProfile() {
        this.navigateTo('CBInvestmentProfile__c')
    }

    // Helper function for navigation
    navigateTo(pageApiName) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            }
        });
    }

}