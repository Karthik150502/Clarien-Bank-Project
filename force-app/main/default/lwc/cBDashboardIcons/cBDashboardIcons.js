/*
	Author - Prateek Deshmukh
	Created Date - 2024-03-06
	Modified Date - 2024-03-06,2024-03-11
	Description - This child component is employed on the dashboard page to display a list of icons.
*/

import { LightningElement } from 'lwc';
import PREDEFINED from '@salesforce/label/c.CB_Predefined'; // Importing label for predefined transactions
import OWN_ACC_PAYMENTS from '@salesforce/label/c.CB_OwnAccountTransfers'; // Importing label for own account transfers
import INTRABANK_PAYMENTS from '@salesforce/label/c.CB_IntrabankTransfers'; // Importing label for intrabank transfers
import DOMESTIC_PAYMENTS from '@salesforce/label/c.CB_DomesticPayments'; // Importing label for domestic payments
import INTERNATIONAL_PAYMENTS from '@salesforce/label/c.CB_InternationalPayments'; // Importing label for international payments
import MANAGE_BENEF from '@salesforce/label/c.CB_ManageBeneficiaries'; // Importing label for managing beneficiaries
import ADHOC_PAYMENTS from '@salesforce/label/c.CB_AdHocPayments'; // Importing label for ad hoc payments
import BILL_PAYMENTS from '@salesforce/label/c.CB_BillPayments'; // Importing label for bill payments
import VIEW_ALL from '@salesforce/label/c.CB_ViewAll'; // Importing label for "View All"

import CBSVG from "@salesforce/resourceUrl/DashboardIconsSVG"

export default class CBDashboardIcons extends LightningElement {

    viewAll = true
    quickLinksViewAll = false;

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
        VIEW_ALL
    };

    //SVG's from static resource
    CBSendMoney = `${CBSVG}/DashboardIconsSVG/CBSendMoney.svg#CBSendMoney`;
    CBQRCode = `${CBSVG}/DashboardIconsSVG/CBQRCode.svg#CBQRCode`;
    CBBillPayments = `${CBSVG}/DashboardIconsSVG/CBBillPayments.svg#CBBillPayments`;
    CBApprovals = `${CBSVG}/DashboardIconsSVG/CBApprovals.svg#CBApprovals`;
    CBCreditCards = `${CBSVG}/DashboardIconsSVG/CBCreditCards.svg#CBCreditCards`;
    CBInvestmentProfiles = `${CBSVG}/DashboardIconsSVG/CBInvestmentProfiles.svg#CBInvestmentProfiles`;
    CBAccountStatements = `${CBSVG}/DashboardIconsSVG/CBAccountStatements.svg#CBAccountStatements`;
    CBApplyForLoans = `${CBSVG}/DashboardIconsSVG/CBApplyForLoans.svg#CBApplyForLoans`;
    CBAdHocPayment = `${CBSVG}/DashboardIconsSVG/CBAdHocPayment.svg#CBAdHocPayment`;
    CBServiceRequest = `${CBSVG}/DashboardIconsSVG/CBServiceRequest.svg#CBServiceRequest`;
    CBBankAccounts = `${CBSVG}/DashboardIconsSVG/CBBankAccounts.svg#CBBankAccounts`;
    CBScanPay = `${CBSVG}/DashboardIconsSVG/CBScanPay.svg#CBScanPay`;
    CBOffers = `${CBSVG}/DashboardIconsSVG/CBOffers.svg#CBOffers`;
    CBAccountsDeposits = `${CBSVG}/DashboardIconsSVG/CBAccountsDeposits.svg#CBAccountsDeposits`;
    CBChequebookServices = `${CBSVG}/DashboardIconsSVG/CBChequebookServices.svg#CBChequebookServices`;
    CBEnableDisableBiometric = `${CBSVG}/DashboardIconsSVG/CBEnableDisableBiometric.svg#CBEnableDisableBiometric`;

    // Sample data for account number, balance, and hold balance
    accountNo = '600017725563';
    balance = '5,585.54';
    holdBalance = '0.0';

    showQuickLinks(){
        this.quickLinksViewAll = true
    }
}