/*
    Author - 
    Created Date - 28/03/2024
    Modified Date - 
    Description - 
*/

import { LightningElement } from 'lwc';

import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality

import PREDEFINED from '@salesforce/label/c.CB_Predefined'; // Importing label for predefined transactions
import OWN_ACC_PAYMENTS from '@salesforce/label/c.CB_OwnAccountTransfers'; // Importing label for own account transfers
import INTRABANK_PAYMENTS from '@salesforce/label/c.CB_IntrabankTransfers'; // Importing label for intrabank transfers
import DOMESTIC_PAYMENTS from '@salesforce/label/c.CB_DomesticPayments'; // Importing label for domestic payments
import INTERNATIONAL_PAYMENTS from '@salesforce/label/c.CB_InternationalPayments'; // Importing label for international payments
import MANAGE_BENEF from '@salesforce/label/c.CB_ManageBeneficiaries'; // Importing label for managing beneficiaries
import VIEW_ALL from '@salesforce/label/c.CB_ViewAll'; // Importing label for "View All"
import SEND_MONEY from '@salesforce/label/c.CB_SendMoney';
import QR_CODE from '@salesforce/label/c.CB_QrCode';
import APPROVALS from '@salesforce/label/c.CB_Approvals';
import CREDIT_CARDS from '@salesforce/label/c.CB_CreditCards';
import INVESTMENT_PLANS from '@salesforce/label/c.CB_InvestmentPlans';
import INVESTMENT from '@salesforce/label/c.CB_InvestmentProfiles';
import ACCOUNT_STATEMENTS from '@salesforce/label/c.CB_AccountStatements';
import APPLY_FOR_LOANS from '@salesforce/label/c.CB_ApplyForLoans';
import ADHOC_PAYMENTS from '@salesforce/label/c.CB_AdHocPayments';
import OPEN_AN_ACCOUNT from '@salesforce/label/c.CB_Open_An_Account';
import BANK_ACCOUNTS from '@salesforce/label/c.CB_BankAccounts';
import SCAN_AND_PAY from '@salesforce/label/c.CB_ScanAndPay';
import OFFERS from '@salesforce/label/c.CB_Offers';
import ACCOUNTS_AND_DEPOSITS from '@salesforce/label/c.CB_AccountsAndDeposits';
import CHEQUEBOOK_SERVICES from '@salesforce/label/c.CB_ChequebookServices';
import ENABLE_DISABLE_BIOMETRIC from '@salesforce/label/c.CB_EnableDisableBiometric';
import QUICKLINKS_PAGE from '@salesforce/label/c.CB_Page_Quicklinks';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

import INVESTMENTPROFILE_PAGE from '@salesforce/label/c.CB_Page_Investmentprofile';
import ACCOUNTSTATEMENTSEARCH_PAGE from '@salesforce/label/c.CB_Page_AccountStatementSearch';


import { getMobileSessionStorage, setPagePath } from 'c/cBUtilities';


export default class CBQuickLinks extends NavigationMixin(LightningElement) {

    // Labels for dashboard icons
    label = {
        PREDEFINED,
        OWN_ACC_PAYMENTS,
        INTRABANK_PAYMENTS,
        DOMESTIC_PAYMENTS,
        INTERNATIONAL_PAYMENTS,
        MANAGE_BENEF,
        ADHOC_PAYMENTS,
        VIEW_ALL,
        SEND_MONEY,
        QR_CODE,
        APPROVALS,
        CREDIT_CARDS,
        INVESTMENT_PLANS,
        INVESTMENT,
        ACCOUNT_STATEMENTS,
        APPLY_FOR_LOANS,
        OPEN_AN_ACCOUNT,
        BANK_ACCOUNTS,
        SCAN_AND_PAY,
        OFFERS,
        ACCOUNTS_AND_DEPOSITS,
        CHEQUEBOOK_SERVICES,
        ENABLE_DISABLE_BIOMETRIC,
    }

    //SVG's from static resource
    CBSendMoney = `${CBSVG}/CBSVGs/CBSendMoney.svg#CBSendMoney`;
    CBQRCode = `${CBSVG}/CBSVGs/CBQRCode.svg#CBQRCode`;
    CBBillPayments = `${CBSVG}/CBSVGs/CBBillPayments.svg#CBBillPayments`;
    CBApprovals = `${CBSVG}/CBSVGs/CBApprovals.svg#CBApprovals`;
    CBCreditCards = `${CBSVG}/CBSVGs/CBCreditCards.svg#CBCreditCards`;
    CBInvestmentProfiles = `${CBSVG}/CBSVGs/CBInvestmentProfiles.svg#CBInvestmentProfiles`;
    CBAccountStatements = `${CBSVG}/CBSVGs/CBAccountStatements.svg#CBAccountStatements`;
    CBApplyForLoans = `${CBSVG}/CBSVGs/CBApplyForLoans.svg#CBApplyForLoans`;
    CBAdHocPayment = `${CBSVG}/CBSVGs/CBAdHocPayment.svg#CBAdHocPayment`;
    CBServiceRequest = `${CBSVG}/CBSVGs/CBServiceRequest.svg#CBServiceRequest`;
    CBBankAccounts = `${CBSVG}/CBSVGs/CBBankAccounts.svg#CBBankAccounts`;
    CBScanPay = `${CBSVG}/CBSVGs/CBScanPay.svg#CBScanPay`;
    CBOffers = `${CBSVG}/CBSVGs/CBOffers.svg#CBOffers`;
    CBAccountsDeposits = `${CBSVG}/CBSVGs/CBAccountsDeposits.svg#CBAccountsDeposits`;
    CBChequebookServices = `${CBSVG}/CBSVGs/CBChequebookServices.svg#CBChequebookServices`;
    CBEnableDisableBiometric = `${CBSVG}/CBSVGs/CBEnableDisableBiometric.svg#CBEnableDisableBiometric`;



    configuration = {
        previousPageUrl: 'Home',
        heading: 'Quick Links',
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

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

    /**
    * Lifecycle hook invoked when the component is inserted into the DOM
    * Loads the username, password from local session storage when the component is connected to the DOM.
    * @returns {void}
    */
    connectedCallback() {
        setPagePath(QUICKLINKS_PAGE)
    }

    ScanPay = false;
    navigateToScanPay() {
        console.log('Navigate to Scan and Pay');
        this.ScanPay = true;
        // this.navigateTo()
    }

    navigateToORCode() {
        this.navigateTo('CBQrCodeGeneration__c')
    }

    navigateToSendMoney() {
        this.navigateTo('CBTransfers__c')
    }

    navigateToAccountStatements() {
        this.navigateTo(ACCOUNTSTATEMENTSEARCH_PAGE)
    }

    navigateToOpenAnAccount() {
        this.navigateTo('CBServiceRequest__c')
    }

    navigateToAdHocPayments() {
        this.navigateTo('CBAdHocPayments__c')
    }

    navigateToAccountsDeposits() {
        this.navigateTo('CBFavoriteAccounts__c')
    }

    navigateToOffers() {
        this.navigateTo('CBOffers__c')
    }

    navigateToApprovals() {
        this.navigateTo('CBApprovals__c')
    }

    navigateToInvestmentProfile() {
        this.navigateTo(INVESTMENTPROFILE_PAGE)
    }



    // navigateToSecuritySetting() {
    //     this.navigateTo('CBSecuritySettings__c')
    // }

    // navigateToChequebookServices() {
    //     this.navigateTo('CBApplyNowChequebook__c')
    // }

    // navigateToBankAccounts() {
    //     this.navigateTo('CBFavoriteAccounts__c')
    // }

    // Helper function for navigation
    navigateTo(pageApiName) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            }
        });
    }

    // function to close the modal
    closeScanModal() {
        this.ScanPay = false;
    }

}