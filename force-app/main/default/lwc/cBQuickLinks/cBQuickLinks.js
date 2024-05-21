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
import BILL_PAYMENTS from '@salesforce/label/c.CB_BillPayments'; 
import APPROVALS from '@salesforce/label/c.CB_Approvals';
import CREDIT_CARDS from '@salesforce/label/c.CB_CreditCards';
import INVESTMENT_PLANS from '@salesforce/label/c.CB_InvestmentPlans';
import INVESTMENT_PROFILES from '@salesforce/label/c.CB_InvestmentProfiles';
import ACCOUNT_STATEMENTS from '@salesforce/label/c.CB_AccountStatements';
import APPLY_FOR_LOANS from '@salesforce/label/c.CB_ApplyForLoans';
import ADHOC_PAYMENTS from '@salesforce/label/c.CB_AdHocPayments';
import SERVICE_REQUEST from '@salesforce/label/c.CB_ServiceRequest';
import BANK_ACCOUNTS from '@salesforce/label/c.CB_BankAccounts';
import SCAN_AND_PAY from '@salesforce/label/c.CB_ScanAndPay';
import OFFERS from '@salesforce/label/c.CB_Offers';
import ACCOUNTS_AND_DEPOSITS from '@salesforce/label/c.CB_AccountsAndDeposits';
import CHEQUEBOOK_SERVICES from '@salesforce/label/c.CB_ChequebookServices';
import ENABLE_DISABLE_BIOMETRIC from '@salesforce/label/c.CB_EnableDisableBiometric';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

import INVESTMENTPROFILE_PAGE from '@salesforce/label/c.CB_Page_Investmentprofile';
import ACCOUNTSTATEMENTSEARCH_PAGE from '@salesforce/label/c.CB_Page_AccountStatementSearch';

export default class CBQuickLinks extends  NavigationMixin(LightningElement) {

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
        INVESTMENT_PLANS,
        INVESTMENT_PROFILES,
        ACCOUNT_STATEMENTS,
        APPLY_FOR_LOANS,
        SERVICE_REQUEST,
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

    // Initial Header Item Configuration
    header_icons = {
        // Announcements icon settings
        announcements: {
            exposed: false, // Whether to display the Announcements icon
            haveItems: false   // Whether the Announcements icon has items to display
        },
        // Notifications icon settings
        notifications: {
            exposed: false, // Whether to display the Notifications icon
            haveItems: false   // Whether the Notifications icon has items to display
        },
        // Inbox icon settings
        inbox: {
            exposed: true,  // Whether to display the Inbox icon
            haveItems: true // Whether the Inbox icon has items to display
        },
        // Scan Code icon settings
        scanCode: {
            exposed: true,  // Whether to display the Scan Code icon
            haveItems: false    // Whether the Scan Code icon has items to display
        },

    };

    navigateToInvestmentProfile(){
        this.navigateTo(INVESTMENTPROFILE_PAGE)
    }
    navigateToAccountStatements() {
        this.navigateTo(ACCOUNTSTATEMENTSEARCH_PAGE)
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