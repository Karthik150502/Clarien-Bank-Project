import { LightningElement, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality

// import getSessionDetails from '@salesforce/apex/CBApiController.getSessionDetails';

import PREDEFINED from '@salesforce/label/c.CB_Predefined';
import OWN_ACC_PAYMENTS from '@salesforce/label/c.CB_OwnAccountTransfers';
import INTRABANK_PAYMENTS from '@salesforce/label/c.CB_IntrabankTransfers';
import DOMESTIC_PAYMENTS from '@salesforce/label/c.CB_DomesticPayments';
import INTERNATIONAL_PAYMENTS from '@salesforce/label/c.CB_InternationalPayments';
import MANAGE_BENEF from '@salesforce/label/c.CB_ManageBeneficiaries';
import ADHOC_PAYMENTS from '@salesforce/label/c.CB_AdHocPayments';
import BILL_PAYMENTS from '@salesforce/label/c.CB_BillPayments';
import VIEW_ALL from '@salesforce/label/c.CB_ViewAll';
import SEND_MONEY from '@salesforce/label/c.CB_SendMoney';
import QR_CODE from '@salesforce/label/c.CB_QrCode';
import APPROVALS from '@salesforce/label/c.CB_Approvals';
import CREDIT_CARDS from '@salesforce/label/c.CB_CreditCards';
import INVESTMENT_PROFILES from '@salesforce/label/c.CB_InvestmentProfiles';
import ACCOUNT_STATEMENTS from '@salesforce/label/c.CB_AccountStatements';
import APPLY_FOR_LOANS from '@salesforce/label/c.CB_ApplyForLoans';
import SERVICE_REQUEST from '@salesforce/label/c.CB_ServiceRequest';
import BANK_ACCOUNTS from '@salesforce/label/c.CB_BankAccounts';
import OPEN_AN_ACCOUNT from '@salesforce/label/c.CB_Open_An_Account';
import SCAN_AND_PAY from '@salesforce/label/c.CB_ScanAndPay';
import OFFERS from '@salesforce/label/c.CB_Offers';
import ACCOUNTS_AND_DEPOSITS from '@salesforce/label/c.CB_AccountsAndDeposits';
import CHEQUEBOOK_SERVICES from '@salesforce/label/c.CB_ChequebookServices';
import ENABLE_DISABLE_BIOMETRIC from '@salesforce/label/c.CB_EnableDisableBiometric';
import ACCOUNTS from '@salesforce/label/c.CB_ACCOUNTS';
import PROMOTIONS from '@salesforce/label/c.CB_Promotions';
import StartAGoal from '@salesforce/label/c.CB_StartAGoal';
import QUICKLINKS_PAGE from '@salesforce/label/c.CB_Page_Quicklinks';
import ACCOUNTSTATEMENTSEARCH_PAGE from '@salesforce/label/c.CB_Page_AccountStatementSearch';
import TRY_AGAIN from '@salesforce/label/c.CB_TryAgain';
import BIOMETRIC_AUTH_SUCCESS from '@salesforce/label/c.CB_BiomtricAuthenHasBeenSuccess';
import QUICK_LINKS from '@salesforce/label/c.CB_QuickLinks';
import LATER from '@salesforce/label/c.CB_Later';
import ACTIVATE_BIOMETRIC_AUTHEN from '@salesforce/label/c.CB_ActivateBiometricAuthen';
import OK from '@salesforce/label/c.CB_Ok';
import Page_Investmentprofile from '@salesforce/label/c.CB_Page_Investmentprofile';
import SBA from '@salesforce/label/c.CB_Saving_Account';
import CAA from '@salesforce/label/c.CB_Current_Account';
import LAA from '@salesforce/label/c.CB_Loan_Account';
import TUA from '@salesforce/label/c.CB_Top_Up_Account';
import TDA from '@salesforce/label/c.CB_Time_Demposit_Account';

import PromImage from "@salesforce/resourceUrl/PromImage";
import CBSVG from "@salesforce/resourceUrl/CBSVG"

import getFavSBAAcctNo from '@salesforce/apex/CBRetCustInqHandler.getFavoriteSBAAccount'
import getFavSBAAccDetails from '@salesforce/apex/CBGeneralAcctInquiryHandler.getSBAAccount'
import getCustomerId from '@salesforce/apex/CBUtilityController.getCustomerId'
import getSBAAccDetails from '@salesforce/apex/CBGeneralAcctInquiryHandler.handleGeneralAcctInquiry'
import getLAAAccDetails from '@salesforce/apex/CBLoanAccInqController.handleLoanAcctInquiry'

import { getMobileSessionStorage, setMobileSessionStorage, dateToTimestamp, getJsonData, setAllSessData, removeMobileSessionStorage, setLocalStorage, getLocalStorage, setPagePath, removeLocalStorage, checkLocalkey, checkSessionkey } from 'c/cBUtilities';

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
        APPLY_FOR_LOANS,
        SERVICE_REQUEST,
        BANK_ACCOUNTS,
        SCAN_AND_PAY,
        OFFERS,
        ACCOUNTS_AND_DEPOSITS,
        CHEQUEBOOK_SERVICES,
        ENABLE_DISABLE_BIOMETRIC,
        OPEN_AN_ACCOUNT,
        ACTIVATE_BIOMETRIC_AUTHEN,
        LATER,
        TRY_AGAIN,
        BIOMETRIC_AUTH_SUCCESS,
        OK,
        QUICK_LINKS,
        SBA,
        CAA,
        LAA,
        TUA,
        TDA
    };

    @track account = {
        accountNo: '*********',
        accountBal: '00000.00',
        currentBal: '0000.00',
        totalHolds: '00000.00',
        accountType: 'Saving Account',
        accountCur: 'BMD',
        favorite: true
    }

    ScanPay = false
    isLoading = true
    PromImage = PromImage;
    accountNo = 658745869;
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
    CBOpenAAccount = `${CBSVG}/CBSVGs/CBOpenAAccount.svg#CBOpenAAccount`;
    CBBiometricIcon = `${CBSVG}/CBSVGs/CBBiometricIcon.svg#CBBiometricIcon`;
    CBApprovals = `${CBSVG}/CBSVGs/CBApprovals.svg#CBApprovals`;
    CBInvestmentProfiles = `${CBSVG}/CBSVGs/CBInvestmentProfiles.svg#CBInvestmentProfiles`;
    CBAccountStatements = `${CBSVG}/CBSVGs/CBAccountStatements.svg#CBAccountStatements`;
    CBApplyForLoans = `${CBSVG}/CBSVGs/CBApplyForLoans.svg#CBApplyForLoans`;
    CBOffers = `${CBSVG}/CBSVGs/CBOffers.svg#CBOffers`;
    CBAccountsDeposits = `${CBSVG}/CBSVGs/CBAccountsDeposits.svg#CBAccountsDeposits`;
    CBScanPay = `${CBSVG}/CBSVGs/CBScanPay.svg#CBScanPay`;
    CBManageBeneficiaries = `${CBSVG}/CBSVGs/CBManageBeneficiaries.svg#CBManageBeneficiaries`;

    // Configuration object for biometric modal
    confirmModal1 = {
        title: this.label.ACTIVATE_BIOMETRIC_AUTHEN,
        message: '',
        yesButton: {
            exposed: true,
            label: this.label.OK,
            implementation: () => {
                this.showConfirmModal1 = false
                this.showConfirmModal2 = true
            }
        },
        noButton: {
            exposed: true,
            label: this.label.LATER,
            implementation: () => {
                this.showConfirmModal1 = false
            }
        }
    }

    // Configuration object for success modal
    confirmModal2 = {
        title: this.label.BIOMETRIC_AUTH_SUCCESS,
        message: '',
        yesButton: {
            exposed: true,
            label: this.label.OK,
            implementation: () => {
                this.showConfirmModal2 = false
            }
        },
        noButton: {
            exposed: false,
            label: this.label.TRY_AGAIN,
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
        this.fetchCustomerId()
        this.getUserDetails()
        this.fetchRetCustInqJsonData();
        setPagePath('Home')
    }

    //Function used to get the customer ID
    fetchCustomerId() {
        getCustomerId({})
            .then(result => {
                this.CustomerId = result
                console.log('CustomerId', this.CustomerId);
            }).catch((error) => {
                console.log('Some error occured: ' + error)
            })
    }

    //Function used to get the customer name and password from local mobile session storage 
    getUserDetails() {
        // this.username = getMobileSessionStorage("CBUsername")
        // this.password = getMobileSessionStorage("CBPassword")
        this.username = getLocalStorage("CBUsername")
        this.password = getLocalStorage("CBPassword")
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

    // Variables to store RetCustInq API details
    RetCustInqReqBody = ''
    RetCustInqjsonPathData = ''
    RetCustInqAPiName = 'CB_Retail_Customer_Inquiry'


    //Variables for saving account details
    branchId = ''
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

    // This function used get favorite saving account details, if favorite saving account exists it will return 1st saving account details from API response
    getFavoriteSBAAccountNo() {
        this.RetCustInqReqBody = this.mapTheData(this.RetCustInqReqBody, this.RetCustInqjsonPathData);

        let requestWrapper = {
            payload: JSON.stringify(this.RetCustInqReqBody), // Ensure payload is a string
            metadataName: this.RetCustInqAPiName,
            headers: ''  // Provide metadata name
        };

        getFavSBAAcctNo({ wrapper: requestWrapper })
            .then((result) => {
                console.log('Fav Account No and branchId', JSON.stringify(result))
                let favSBAccount = result.favoriteSBAAccount;
                this.accountNo = favSBAccount.acctId;
                this.branchId = favSBAccount.acctBranchCode;
                this.account.accountNo = favSBAccount.acctId;
                let allAccounts = result.allAccounts;
                setMobileSessionStorage('CB_All_Accounts', allAccounts);
                this.fetchRetGenAccInqJsonData();

            }).catch((error) => {
                console.log('Error while logging : ', JSON.stringify(error), error.message);
            })
    }

    // mapAccountDetails(accounts){
    //     let accountList = JSON.parse(accounts);
    //     return accountList.map((account)=>{
    //         return {
    //             accountNumber : account.acctId,
    //             accountType : this.label[account.productCategory],
    //             availableBalance : '200',
    //             branchId : account.acctBranchCode
    //         }
    //     })
    // }

    // Sample data for account number, balance, and hold balance
    @track accountsData = [

    ];

    //Variables for account details
    RetLoanAccInqAPiName = 'CB_Loan_Acc_Details'

    handleAccounts() {
        const accountsData = []; // Initialize an empty array to hold account data
        let allAccounts = getMobileSessionStorage('CB_All_Accounts')
        let parsedResult = JSON.parse(allAccounts);
        const promises = parsedResult.map((item) => {
            switch (item.productCategory) {
                case 'LAA':
                    return this.handleLAA(item.acctBranchCode, item.acctId, accountsData);
                case 'CAA':
                    return this.handleCAA(item.acctBranchCode, item.acctId, accountsData);
                case 'SBA':
                    return this.handleSBA(item.acctBranchCode, item.acctId, accountsData);
                case 'TDA':
                    return this.handleTDA(item.acctBranchCode, item.acctId, accountsData);
                case 'TUA':
                    return this.handleTUA(item.acctBranchCode, item.acctId, accountsData);
                default:
                    return this.handleUnknown(item.acctBranchCode, item.acctId, accountsData);
            }
        });

        Promise.all(promises).then(() => {
            this.accountsData = [...this.accountsData, ...accountsData];
            console.log(JSON.stringify(this.accountsData));
            setMobileSessionStorage('CB_All_Account_Details', JSON.stringify(this.accountsData));
        }).catch(error => {
            console.error('Error processing all accounts:', error, error.message);
            throw error;
        });
    }

    handleLAA(acctBranchCode, acctId, accountsData) {
        const defaultValues = this.getDefaultValues(acctId, 'Loan Account');
        const requestWrapper = {
            payload: '',
            metadataName: this.RetLoanAccInqAPiName,
            headers: ''
        };
        const accountDetailsWrapper = {
            requestUUID: this.requestUUID,
            acid: acctId,
            branchId: acctBranchCode
        };

        return getLAAAccDetails({ wrapper: requestWrapper, acDetailsWrapper: accountDetailsWrapper })
            .then(inquiryResult => {
                console.log(' getLAAAccDetails Inquiry Result : ', JSON.stringify(inquiryResult));
                const parsedResult = JSON.parse(inquiryResult);

                const accountBal = parsedResult.loanAcctDetails.accountBalances.availableBalance.currencyCode + ' ' + this.formatAmount(parsedResult.loanAcctDetails.accountBalances.availableBalance.amountValue);
                const nextInterestAmt = parsedResult.loanAcctDetails.installmentAmount.amountValue;
                const nextInterestDate = this.formatDate(parsedResult.loanAcctDetails.nextInstallmentDate);
                const date = this.formatDate(parsedResult.loanAcctDetails.accountOpenDate);
                const beneficiary = parsedResult.loanAcctDetails.customerName;
                const productCode = parsedResult.loanAcctDetails.accountCategory;

                const overviewData = [
                    { id: 0, label: "Disbursement Amount", value: `BMD ${parsedResult.loanAcctDetails.disbursedAmount.amountValue}` },
                    { id: 1, label: "Outstanding Balance", value: `BMD ${parsedResult.loanAcctDetails.accountBalances.availableBalance.amountValue}` },
                    { id: 2, label: "Interest Rate", value: `${parsedResult.loanAcctDetails.interestRate.value}%` },
                    { id: 3, label: "Next Payment Amount", value: `BMD ${parsedResult.loanAcctDetails.installmentAmount.amountValue}` },
                    { id: 4, label: "Next Payment Date", value: this.formatDate(parsedResult.loanAcctDetails.nextInstallmentDate) },
                    { id: 5, label: "Overdue Date", value: this.formatDate(this.addDays(parsedResult.loanAcctDetails.nextInstallmentDate, 5)) },
                    { id: 6, label: "Overdue Amount", value: `BMD ${parsedResult.loanAcctDetails.overDueAmount.amountValue}` },
                    { id: 7, label: "Available Amount", value: `BMD ${parsedResult.loanAcctDetails.accountBalances.availableBalance.amountValue}` }
                ];

                console.log('overviewData ' + JSON.stringify(overviewData))

                const result = {
                    accountBal: accountBal,
                    nextInterestDate: nextInterestDate,
                    nextInterestAmt: nextInterestAmt,
                    date: date,
                    beneficiary: beneficiary,
                    branchId: acctBranchCode,
                    productCode: productCode,
                    overviewData: overviewData
                };

                console.log('Account Result : ', JSON.stringify(result));
                accountsData.push({
                    ...defaultValues,
                    ...result
                });
            })
            .catch(error => {
                console.error('Error occurred: ', error.body.message);
                throw error;
            });
    }

    handleTDA(acctBranchCode, acctId, accountsData) {
        const defaultValues = this.getDefaultValues(acctId, 'Loan Account');
        const result = {
            accountBal: 'BMD 0000.00',
            currentBal: 'BMD 0000.00',
            totalHolds: 'BMD 0.0',
            accountType: 'Time Deposit Account',
            favorite: false,
            branchId: acctBranchCode
        };

        accountsData.push({
            ...defaultValues,
            ...result
        });

        return Promise.resolve();
    }

    handleTUA(acctBranchCode, acctId, accountsData) {
        const defaultValues = this.getDefaultValues(acctId, 'Loan Account');
        const result = {
            accountBal: 'BMD 0000.00',
            currentBal: 'BMD 0000.00',
            totalHolds: 'BMD 0.0',
            accountType: 'Top Up Account',
            favorite: false,
            branchId: acctBranchCode
        };

        accountsData.push({
            ...defaultValues,
            ...result
        });

        return Promise.resolve();
    }

    handleCAA(acctBranchCode, acctId, accountsData) {
        this.handleSBA(acctBranchCode, acctId, accountsData, 'Current Account')
        return Promise.resolve();
    }

    formatAmount(amount) {
        return Number(amount).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
    }

    handleSBA(acctBranchCode, acctId, accountsData, type = 'Saving Account') {
        const defaultValues = this.getDefaultValues(acctId, 'Loan Account');
        const requestWrapper = {
            payload: '',
            metadataName: this.RetGenAccInqAPiName,
            headers: ''
        };
        const accountDetailsWrapper = {
            requestUUID: this.requestUUID,
            acid: acctId,
            branchId: acctBranchCode
        };

        return getSBAAccDetails({ wrapper: requestWrapper, acDetailsWrapper: accountDetailsWrapper })
            .then(inquiryResult => {
                const parsedResult = JSON.parse(inquiryResult);

                const accountBal = parsedResult.generalAcctInquiryOutput.accountBalances.availableBalance.currencyCode + ' ' + this.formatAmount(parsedResult.generalAcctInquiryOutput.accountBalances.availableBalance.amountValue);
                const currentBal = this.formatAmount(parsedResult.generalAcctInquiryOutput.accountBalances.ledgerBalance.amountValue);
                const totalHolds = this.formatAmount(this.formatNumberString(parsedResult.generalAcctInquiryOutput.lienAmount))

                const jointHolderName1 = parsedResult.generalAcctInquiryOutput.jointHolderName1
                const jointHolderName2 = parsedResult.generalAcctInquiryOutput.jointHolderName2
                const jointHolderName3 = parsedResult.generalAcctInquiryOutput.jointHolderName3
                const beneficiary = parsedResult.generalAcctInquiryOutput.custName
                const productCode = parsedResult.generalAcctInquiryOutput.schemeCode
                const date = this.formatDate(parsedResult.generalAcctInquiryOutput.acctOpenDate)
                let result = {
                    accountBal: accountBal,
                    currentBal: currentBal,
                    totalHolds: totalHolds,
                    accountType: type,
                    jointHolderName1: jointHolderName1,
                    jointHolderName2: jointHolderName2,
                    jointHolderName3: jointHolderName3,
                    beneficiary: beneficiary,
                    date: date,
                    branchId: acctBranchCode,
                    productCode: productCode
                };

                console.log('Account Result : ', JSON.stringify(result));
                accountsData.push({
                    ...defaultValues,
                    ...result
                });
            })
            .catch(error => {
                console.error('Error occurred: ', error.body.message);
                throw error;
            });
    }

    handleUnknown(acctBranchCode, acctId, accountsData) {

        const defaultValues = this.getDefaultValues(acctId, 'Loan Account');
        const result = {
            accountBal: 'BMD 5556.54',
            accountType: 'Unknown Account',
            favorite: false,
            branchId: acctBranchCode
        };

        accountsData.push({
            ...defaultValues,
            ...result
        });

        return Promise.resolve();
    }

    getDefaultValues(acctId, accountType) {
        return {
            accountNo: acctId,
            accountBal: '',
            currentBal: '',
            totalHolds: '',
            accountType: accountType,
            favorite: false,
            nextInterestDate: '',
            nextInterestAmt: ''
        };
    }

    formatDate(dateStr) {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Add days to a date
    addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    formatNumberString(value) {
        // Check if the line starts with a + or - sign
        const hasSign = /^[+-]/.test(value);
        const sign = hasSign ? value[0] : '';

        // Remove the sign for processing if it exists
        const numericPart = hasSign ? value.slice(1) : value;

        // Ensure the numeric part is a valid number string
        if (!/^\d+$/.test(numericPart)) {
            return 'Invalid input';
        }

        // Get the length of the numeric part
        const length = numericPart.length;

        // Extract the integer part and the decimal part
        const integerPart = numericPart.slice(0, length - 2);
        const decimalPart = numericPart.slice(length - 2);

        // Remove leading zeros from the integer part
        const integerPartWithoutZeros = Number(integerPart).toString();

        // Combine the sign, integer part, and decimal part
        const formattedValue = `${integerPartWithoutZeros}.${decimalPart}`;

        // Return the formatted value
        return formattedValue;
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


    formatAmount(amount) {
        return Number(amount).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
    }

    //Methos used to get the account of the customer via API
    doGenAccInquiry() {
        this.RetGenAccInqReqBody = this.mapTheData(this.RetGenAccInqReqBody, this.RetGenAccInqjsonPathData);

        let requestWrapper = {
            payload: JSON.stringify(this.RetGenAccInqReqBody), // Ensure payload is a string
            metadataName: this.RetGenAccInqAPiName,
            headers: ''  // Provide metadata name
        };

        getFavSBAAccDetails({ wrapper: requestWrapper })
            .then((result) => {
                // Parse the JSON string into a JavaScript object
                const parsedResult = JSON.parse(result);
                console.log('Fav Account Details', result);

                this.account.accountBal = this.formatAmount(parsedResult.generalAcctInquiryOutput.accountBalances.availableBalance.amountValue)
                this.account.currencyCode = parsedResult.generalAcctInquiryOutput.accountBalances.availableBalance.currencyCode
                this.account.currentBal = this.formatAmount(parsedResult.generalAcctInquiryOutput.accountBalances.ledgerBalance.amountValue)
                this.account.accountType = 'Saving Account'
                this.account.accountCur = parsedResult.generalAcctInquiryOutput.accountBalances.availableBalance.currencyCode
                let holdAmmount = parsedResult.generalAcctInquiryOutput.lienAmount
                this.account.totalHolds = this.formatAmount(this.formatNumberString(holdAmmount));
                console.log('Hold balance : ', this.account.totalHolds);
                this.handleAccounts();
                this.isLoading = false;
            }).catch((error) => {
                this.isLoading = false;

                console.log('Error whil logging : ', JSON.stringify(error), error.message);
            })
    }

    //Method help to navigate to QR Code Generation Page
    navigateToORCode() {
        this.navigateTo('CBQrCodeGeneration__c')
    }
    navigateToApprovals() {
        this.navigateTo('CBApprovals__c')
    }
    navigateToInvestmentProfile() {
        this.navigateTo(Page_Investmentprofile)
    }
    //Method help to navigate to Transfers Page
    navigateToSendMoney() {
        this.navigateTo('CBTransfers__c')
    }
    //Method help to navigate to Account Statements Page
    navigateToAccountStatements() {
        this.navigateTo(ACCOUNTSTATEMENTSEARCH_PAGE)
    }
    //Method help to navigate to Manage Beneficiaries Page
    navigateToManageBeneficiaries() {
        this.navigateTo('CBManageBeneficiaries__c')
    }
    //Method help to navigate to Open a Account Page
    navigateToOpenAnAccount() {
        this.navigateTo('CBServiceRequest__c')
    }
    //Method help to navigate to Scan and Pay Page
    navigateToScanPay() {
        this.ScanPay = true
        // this.navigateTo('CBScanAndPay__c')
    }
    //Method help to navigate to Quick Links Page
    navigateToAllQuickLinks() {
        this.navigateTo(QUICKLINKS_PAGE)
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

    /**
    * Method to map JSON data with specified paths
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

    formatNumberString(value) {
        // Check if the line starts with a + or - sign
        const hasSign = /^[+-]/.test(value);
        // Remove the sign for processing if it exists
        const numericPart = hasSign ? value.slice(1) : value;

        // Ensure the numeric part is a valid number string
        if (!/^\d+$/.test(numericPart)) {
            return 'Invalid input';
        }

        // Get the length of the numeric part
        const length = numericPart.length;

        // Extract the integer part and the decimal part
        const integerPart = numericPart.slice(0, length - 2);
        const decimalPart = numericPart.slice(length - 2);

        // Remove leading zeros from the integer part
        const integerPartWithoutZeros = Number(integerPart).toString();

        // Combine the sign, integer part, and decimal part
        const formattedValue = `${integerPartWithoutZeros}.${decimalPart}`;

        // Return the formatted value
        return formattedValue;
    }

    // function to close the modal
    closeScanModal() {
        this.ScanPay = false;
    }
}