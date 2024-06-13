import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality

// import getSessionDetails from '@salesforce/apex/CBApiController.getSessionDetails';

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
import OPEN_AN_ACCOUNT from '@salesforce/label/c.CB_Open_An_Account';
import MAKE_A_REQUEST from '@salesforce/label/c.MAKE_A_REQUEST';

import SCAN_AND_PAY from '@salesforce/label/c.CB_ScanAndPay';
import OFFERS from '@salesforce/label/c.CB_Offers';
import ACCOUNTS_AND_DEPOSITS from '@salesforce/label/c.CB_AccountsAndDeposits';
import CHEQUEBOOK_SERVICES from '@salesforce/label/c.CB_ChequebookServices';
import ENABLE_DISABLE_BIOMETRIC from '@salesforce/label/c.CB_EnableDisableBiometric';
import ACCOUNTS from '@salesforce/label/c.CB_ACCOUNTS';
import PROMOTIONS from '@salesforce/label/c.CB_Promotions';
import StartAGoal from '@salesforce/label/c.CB_StartAGoal';

import QUICKLINKS_PAGE from '@salesforce/label/c.CB_Page_Quicklinks';
import INVESTMENTPROFILE_PAGE from '@salesforce/label/c.CB_Page_Investmentprofile';
import ACCOUNTSTATEMENTSEARCH_PAGE from '@salesforce/label/c.CB_Page_AccountStatementSearch';

import PromImage from "@salesforce/resourceUrl/PromImage";
import CBSVG from "@salesforce/resourceUrl/CBSVG"

import getFavSBAAcctNo from '@salesforce/apex/CBRetCustInqHandler.getFavoriteSBAAccount'
import getFavSBAAccDetails from '@salesforce/apex/CBGeneralAcctInquiryHandler.getSBAAccount'


import { getMobileSessionStorage, dateToTimestamp, getJsonData, setAllSessData, removeMobileSessionStorage, setLocalStorage, getLocalStorage, setPagePath, removeLocalStorage, checkLocalkey, checkSessionkey } from 'c/cBUtilities';

import { getBiometricsService } from 'lightning/mobileCapabilities';


export default class CBHomeDashboards extends NavigationMixin(LightningElement) {
    // Labels for dashboard icons
    label = {
        ACCOUNTS,
        PREDEFINED,
        PROMOTIONS,
        StartAGoal,
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
        OPEN_AN_ACCOUNT,
        MAKE_A_REQUEST
    };


    PromImage = PromImage;
    accountNo = 658745869;
    balance = 1452.45;
    holdBalance = 784.145;
    showViewALl = true
    isIronKidsAccount = false
    showConfirmModal1 = false
    showConfirmModal2 = false

    //variables for RetCustInq
    CustomerId = '4100000032'

    //SVG's from static resource
    CBSendMoney = `${CBSVG}/CBSVGs/CBSendMoney.svg#CBSendMoney`;
    CBQRCode = `${CBSVG}/CBSVGs/CBQRCode.svg#CBQRCode`;
    CBBillPayments = `${CBSVG}/CBSVGs/CBBillPayments.svg#CBBillPayments`;
    CBApprovals = `${CBSVG}/CBSVGs/CBApprovals.svg#CBApprovals`;
    CBCreditCards = `${CBSVG}/CBSVGs/CBCreditCards.svg#CBCreditCards`;
    CBInvestmentProfiles = `${CBSVG}/CBSVGs/CBInvestmentProfiles.svg#CBInvestmentProfiles`;
    CBAccountStatements = `${CBSVG}/CBSVGs/CBAccountStatements.svg#CBAccountStatements`;
    CBApplyForLoans = `${CBSVG}/CBSVGs/CBApplyForLoans.svg#CBApplyForLoans`;
    CBOffers = `${CBSVG}/CBSVGs/CBOffers.svg#CBOffers`;
    CBAccountsDeposits = `${CBSVG}/CBSVGs/CBAccountsDeposits.svg#CBAccountsDeposits`;
    CBScanPay = `${CBSVG}/CBSVGs/CBScanPay.svg#CBScanPay`;
    CBAdHocPayment = `${CBSVG}/CBSVGs/CBAdHocPayment.svg#CBAdHocPayment`;




    confirmModal1 = {
        title: 'Activate biometric authentication?',
        message: '',
        yesButton: {
            exposed: true,
            label: 'OK',
            implementation: () => {
                this.showConfirmModal1 = false
                this.showConfirmModal2 = true
            }
        },
        noButton: {
            exposed: true,
            label: 'LATER',
            implementation: () => {
                this.showConfirmModal1 = false
            }
        }
    }
    confirmModal2 = {
        title: 'Biometric authentication has been successfully activated',
        message: '',
        yesButton: {
            exposed: true,
            label: 'OK',
            implementation: () => {
                this.showConfirmModal2 = false
            }
        },
        noButton: {
            exposed: false,
            label: 'TRY AGAIN',
            implementation: () => {
                this.showConfirmModal2 = false
            }
        }
    }


    activateBiometric() {
        this.showConfirmModal2 = false
        this.showConfirmModal3 = true

        const biometricsService = getBiometricsService();
        console.log('biometricsService', biometricsService);
        if (biometricsService.isAvailable()) {
            setLocalStorage('CBIsBiometricEnabled', true)
            this.confirmModal3.title = 'Biometric authentication has been successfully activated'
            this.showConfirmModal1 = false
            this.showConfirmModal2 = true
        }
        else {
            this.confirmModal3.title = 'There was some error while enabling the biometric authentication'
            this.showConfirmModal1 = false
            this.showConfirmModal2 = true
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


    // Initial values for password fields
    username = ''
    password = ''
    requestUUID = ''

    /**
    * Lifecycle hook invoked when the component is inserted into the DOM
    * Loads the username, password from local session storage when the component is connected to the DOM.
    * @returns {void}
    */
    connectedCallback() {
        if ((getLocalStorage('CBIsBiometricEnabled') === 'false' || !checkLocalkey('CBIsBiometricEnabled')) && getLocalStorage('CBFirstHomeLanding') === 'true') {
            removeLocalStorage('CBFirstHomeLanding')
            this.showConfirmModal1 = true
        }

        if (checkSessionkey("isIronKidsAccount")) {
            this.isIronKidsAccount = getMobileSessionStorage("isIronKidsAccount") === 'true'
        }
        this.requestUUID = dateToTimestamp()
        this.fetchRetCustInqJsonData();
        this.getUserDetails()

        setPagePath('Home')
    }



    getUserDetails() {
        this.username = getMobileSessionStorage("CBUsername")
        this.password = getMobileSessionStorage("CBPassword")
        console.log(localStorage);
        if (this.username && this.password) {
            let data = {
                "CBUsername": this.username,
                "CBPassword": this.password
            }

            console.log('Mobile session data: ' + JSON.stringify(data))
            setAllSessData(JSON.stringify(data)).then((result) => {
                removeMobileSessionStorage('CBUsername', 'CBPassword')
                console.log("SUCCESSFULLY SET SESSION DATA")
            }).catch((error) => {
                console.log(JSON.stringify(error))
            })
        }
    }

    RetCustInqReqBody = ''
    RetCustInqjsonPathData = ''
    RetCustInqAPiName = 'CB_Retail_Customer_Inquiry'

    
    //Variables for saving account details
    branchId=''
    AccountNumber=this.accountNo;
    RetGenAccInqReqBody = ''
    RetGenAccInqjsonPathData = ''
    RetGenAccInqAPiName = 'CB_Gen_Acc_Inq'

    /**
    * This function uses a method from the cBJsonDataHandler package that calls an Apex method that returns the API's request body and JSON paths for substitution.
    * @param {String} apiName - The API details's metadata name.
    * @returns {void}
    */
    fetchRetCustInqJsonData() {
        getJsonData(this.RetCustInqAPiName)
            .then(result => {
                this.RetCustInqReqBody = JSON.parse(result[0]);
                this.RetCustInqjsonPathData = result[1];
                this.getFavoriteSBAAccountNo();
            }).catch((error) => {
                console.log('Some error occured: ' + error)
            })
    }

    getFavoriteSBAAccountNo() {
        this.RetCustInqReqBody = this.mapTheData(this.RetCustInqReqBody, this.RetCustInqjsonPathData);

        let requestWrapper = {
            payload: JSON.stringify(this.RetCustInqReqBody), // Ensure payload is a string
            metadataName: this.RetCustInqAPiName,
            headers: ''  // Provide metadata name
        };

        getFavSBAAcctNo({ wrapper: requestWrapper })
            .then((result) => {
                if (result.length > 0) {
                    console.log('Fav Account No and branchId',JSON.stringify(result))
                    this.accountNo = JSON.stringify(result).acctId;
                    this.AccountNumber=JSON.stringify(result).acctId;
                    this.branchId=JSON.stringify(result).acctBranchCode;
                    this.fetchRetGenAccInqJsonData();
                }
            }).catch((error) => {
                console.log('Error whil logging : ', JSON.stringify(error));
            })
    }


    /**
    * This function uses a method from the cBJsonDataHandler package that calls an Apex method that returns the API's request body and JSON paths for substitution.
    * @param {String} apiName - The API details's metadata name.
    * @returns {void}
    */
    fetchRetGenAccInqJsonData() {
        getJsonData(this.RetGenAccInqAPiName)
            .then(result => {
                this.RetGenAccInqReqBody = JSON.parse(result[0]);
                this.RetGenAccInqjsonPathData = result[1];
                this.doGenAccInquiry();
            }).catch((error) => {
                console.log('Some error occured: ' + error)
            })
    }

    doGenAccInquiry() {
        this.RetGenAccInqReqBody = this.mapTheData(this.RetGenAccInqReqBody, this.RetGenAccInqjsonPathData);

        let requestWrapper = {
            payload: JSON.stringify(this.RetGenAccInqReqBody), // Ensure payload is a string
            metadataName: this.RetGenAccInqAPiName,
            headers: ''  // Provide metadata name
        };

        getFavSBAAccDetails({ wrapper: requestWrapper })
            .then((result) => {
                console.log('OUTPUT : ', JSON.stringify(result));
            }).catch((error) => {
                console.log('Error whil logging : ', JSON.stringify(error));
            })
    }

    navigateToORCode() {
        this.navigateTo('CBQrCodeGeneration__c')
    }
    navigateToSendMoney() {
        this.navigateTo('CBTransfers__c')
    }
    navigateToBillPayments() {
        this.navigateTo('CBBillPayments__c')
    }
    navigateToApplyNow() {
        this.navigateTo('CBApplyNow__c')
    }
    navigateToAccountStatements() {
        this.navigateTo(ACCOUNTSTATEMENTSEARCH_PAGE)
    }
    navigateToManageBeneficiaries() {
        this.navigateTo('CBManageBeneficiaries__c')
    }
    navigateToAdHocPayments() {
        this.navigateTo('CBAdHocPayments__c')
    }
    navigateToOpenAnAccount() {
        this.navigateTo('CBServiceRequest__c')
    }

    navigateToScanPay() {
        this.navigateTo('CBScanAndPay__c')
    }

    navigateToAllQuickLinks() {
        this.navigateTo(QUICKLINKS_PAGE)
    }

    // navigateToInvestmentProfile() {
    //     this.navigateTo(INVESTMENTPROFILE_PAGE)
    // }
    // navigateToApprovals() {
    //     this.navigateTo('CBApprovals__c')
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
    /**
    * Method to map JSON data with specified paths
    * 
    * @param {Object} jsonReq - The JSON request object
    * @param {Array} JsonPath - The array of JSON paths to map
    * @returns {Object} - The mapped JSON request object
    */
    mapTheData(jsonReq, JsonPath) {
        console.log(jsonReq)
        console.log(JsonPath)
        JsonPath.forEach((record) => {
            // Dynamically set values in JSON request object
            eval(`jsonReq${record.JSON_Path__c}=this.${record.Field_Name__c};`);
        });
        console.log('jsonReq : ', JSON.stringify(jsonReq));
        return jsonReq;
    }

}