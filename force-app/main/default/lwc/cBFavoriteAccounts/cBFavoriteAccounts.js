/*
    Author - 
    Created Date - 28/03/2024
    Modified Date - 
    Description - 
*/

import { LightningElement, track } from 'lwc';
import getFavoriteStatus from '@salesforce/apex/CBFavAccountController.getFavoriteStatus';
import addFavorite from '@salesforce/apex/CBFavAccountController.addFavorite';
import removeFavorite from '@salesforce/apex/CBFavAccountController.removeFavorite';
import getAllAcctNo from '@salesforce/apex/CBRetCustInqHandler.handleRetCustInq'
import getSBAAccDetails from '@salesforce/apex/CBGeneralAcctInquiryHandler.handleGeneralAcctInquiry'
import getLAAAccDetails from '@salesforce/apex/CBLoanAccInqController.handleLoanAcctInquiry'
import SBA from '@salesforce/label/c.CB_Saving_Account';
import CAA from '@salesforce/label/c.CB_Current_Account';
import LAA from '@salesforce/label/c.CB_Loan_Account';
import TUA from '@salesforce/label/c.CB_Top_Up_Account';
import TDA from '@salesforce/label/c.CB_Time_Demposit_Account';


import { getMobileSessionStorage, dateToTimestamp, getJsonData, setAllSessData, removeMobileSessionStorage, setLocalStorage, getLocalStorage, setPagePath, removeLocalStorage, checkLocalkey, checkSessionkey } from 'c/cBUtilities';

export default class CBFavoriteAccounts extends LightningElement {

    expandDetails = true;
    isDataLoading = true;
    typeOrder = ['Saving Account', 'Chequing Account', 'Current Account', 'Time Deposit Account', 'Loan Account', 'Credit Account']
    configuration = {
        previousPageUrl: 'Home',
        heading: 'Accounts',
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }, favorite: {
            selected: false
        }
    }


    // Sample data for account number, balance, and hold balance
    @track accountsData = [

    ];

    accountType = {
        SBA,
        CAA,
        TDA,
        TUA,
        LAA
    }


    connectedCallback() {
        this.requestUUID = dateToTimestamp()
        this.handleAccounts();
    }

    updateFavoriteStatus() {
        let accountNumbers = this.accountsData.map(account => account.accountNo);

        getFavoriteStatus({ accountNumbers })
            .then(result => {
                console.log('Result --->' + JSON.stringify(result))

                this.accountsData = this.accountsData.map(account => {
                    console.log(account.accountNo + '--->' + result[account.accountNo])
                    return { ...account, favorite: result[account.accountNo] };
                });
                this.formatAccData()
            })
            .catch(error => {
                console.log('Error:', error);
                console.log('Error:', error.body.message);
            });
    }

    sortModified() {
        let newArr = [...this.accountsData]


        // Sort the array
        newArr.sort((a, b) => {
            // First, sort by favorite (true comes before false)
            if (a.favorite !== b.favorite) {
                return b.favorite - a.favorite;
            }
            // Then, sort by type according to the predefined order
            if (a.favorite && b.favorite) {
                return this.typeOrder.indexOf(a.accountType) - this.typeOrder.indexOf(b.accountType);
            }
            if (!a.favorite && !b.favorite) {
                return this.typeOrder.indexOf(a.accountType) - this.typeOrder.indexOf(b.accountType);
            }
            // If both are not favorite or both are favorite and types are the same, keep their order
            return 0;
        });

        console.log("Sorted " + JSON.stringify(newArr))
        this.isDataLoading = false
        return newArr;
    }

    formatAccData() {
        this.accountsData = this.sortModified()
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


    removefavacc(event) {
        this.isDataLoading = true;
        if (event.detail && event.detail.accountNo) {
            const accountNo = event.detail.accountNo;
            const account = this.accountsData.find(acc => acc.accountNo === accountNo);
            if (account.favorite) {
                removeFavorite({ accountNumber: accountNo })
                    .then(() => {
                        this.updateFavoriteStatus();
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        }
    }


    addfavacc(event) {
        this.isDataLoading = true;
        if (event.detail && event.detail.accountNo) {
            const accountNo = event.detail.accountNo;
            const account = this.accountsData.find(acc => acc.accountNo === accountNo);
            if (!account.favorite) {
                addFavorite({ accountNumber: accountNo })
                    .then(() => {
                        this.updateFavoriteStatus();
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        }


    }
    //variables for RetCustInq
    CustomerId = '4100000032'
    RetCustInqReqBody = ''
    requestUUID = ''
    RetCustInqjsonPathData = ''
    RetCustInqAPiName = 'CB_Retail_Customer_Inquiry'


    //Variables for account details
    branchId = ''
    accountNo = 658745869;
    RetGenAccInqAPiName = 'CB_Gen_Acc_Inq'
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
            this.updateFavoriteStatus()
            this.isDataLoading = false;
        }).catch(error => {
            console.error('Error processing all accounts:', error);
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

}