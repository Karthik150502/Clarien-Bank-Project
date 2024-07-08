import { LightningElement, wire } from 'lwc';

import { NavigationMixin } from 'lightning/navigation';
import CONTINUE from '@salesforce/label/c.CB_Continue';
import REMARKS from '@salesforce/label/c.CB_Remarks'
import UNTIL_END_DATE from '@salesforce/label/c.CB_UntilEndDate'
import INTERNATIONAL_TRANSFERS from '@salesforce/label/c.CB_InternationalPayments'
import PREDEFINED_PAGE_LINK from '@salesforce/label/c.CB_Predefined'
import INTER_TRANSFERS_PAGE_LINK from '@salesforce/label/c.CB_Page_InternationalTransfers'
import DATE from '@salesforce/label/c.CB_Date'
import CB_SelectAccount from '@salesforce/label/c.CB_SelectAccount';
import CB_FromAccount from '@salesforce/label/c.CB_FromAccount';
import CB_Amount from '@salesforce/label/c.CB_Amount';
import CB_BeneficiaryAddress from '@salesforce/label/c.CB_BeneficiaryAddress';
import CB_BeneficiaryName from '@salesforce/label/c.CB_BeneficiaryName';
import CB_BeneficiaryCountry from '@salesforce/label/c.CB_BeneficiaryCountry';
import CB_Payments_Amount from '@salesforce/label/c.CB_Payments_Amount';
import CB_Repeat from '@salesforce/label/c.CB_Repeat';
import CB_Recurring from '@salesforce/label/c.CB_Recurring';
import CB_BeneficiarysAcctIBAN from '@salesforce/label/c.CB_BeneficiarysAcctIBAN';
import CB_BankCode from '@salesforce/label/c.CB_BankCode';
import CB_BankName from '@salesforce/label/c.CB_BankName';
import CB_SelectCode from '@salesforce/label/c.CB_SelectCode';
import CB_BeneficiaryCityState from '@salesforce/label/c.CB_BeneficiaryCityState';
import CB_SwiftCode from '@salesforce/label/c.CB_SwiftCode';
import CB_IntermediaryBanking from '@salesforce/label/c.CB_IntermediaryBanking';
import CB_SelectBankCode from '@salesforce/label/c.CB_SelectBankCode';
import CB_RecipientCodeOption from '@salesforce/label/c.CB_RecipientCodeOption';
import CB_ClearingCode from '@salesforce/label/c.CB_ClearingCode';
import CB_BankCountry from '@salesforce/label/c.CB_BankCountry';
import CB_SelectBankCountry from '@salesforce/label/c.CB_SelectBankCountry';
import CB_Select from '@salesforce/label/c.CB_Select';


import confTransferPage from '@salesforce/label/c.CB_Page_InternationalTransfersConf';



import { setPagePath, formatDate, getMobileSessionStorage } from 'c/cBUtilities';



// LMS
import LMS from "@salesforce/messageChannel/cBRecurringTransferLMS__c";
import { APPLICATION_SCOPE, MessageContext, subscribe, unsubscribe } from 'lightning/messageService';


export default class CBInternationalTransfers extends NavigationMixin(LightningElement) {





    @wire(MessageContext)
    context;


    subscription = null;



    // Object to hold imported labels
    label = {
        REMARKS,
        UNTIL_END_DATE,
        INTERNATIONAL_TRANSFERS,
        PREDEFINED_PAGE_LINK,
        INTER_TRANSFERS_PAGE_LINK,
        CB_SelectAccount,
        CB_FromAccount,
        CB_Amount,
        CB_BeneficiaryAddress,
        CB_BeneficiaryName,
        CB_BeneficiaryCountry,
        CB_Payments_Amount,
        CB_Repeat,
        CB_Recurring,
        CB_BeneficiarysAcctIBAN,
        CB_BankCode,
        CB_BankName,
        CB_SelectCode,
        CB_BeneficiaryCityState,
        CB_SwiftCode,
        CB_IntermediaryBanking,
        CB_SelectBankCode,
        CB_RecipientCodeOption,
        CB_ClearingCode,
        CB_BankCountry,
        CB_SelectBankCountry,
        DATE,
        CONTINUE,
        CB_Select
    };


    configuration = {
        previousPageUrl: this.label.PREDEFINED_PAGE_LINK,
        heading: this.label.INTERNATIONAL_TRANSFERS,
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        },
        openTemplates: {
            transferTypePage: INTER_TRANSFERS_PAGE_LINK
        }
    }



    // Lifecycle hook to be called at comonent connect
    connectedCallback() {
        this.configuration.previousPageUrl = setPagePath(this.label.INTER_TRANSFERS_PAGE_LINK)
        this.setAccountData()
        this.subscribeMessage()

    }

    setAccountData() {
        this.accounts = JSON.parse(getMobileSessionStorage('CB_All_Account_Details')) ? JSON.parse(getMobileSessionStorage('CB_All_Account_Details')) : [];
    }



    // Toggles the hidden section's visibility
    handleHeight() {
        this.toggle = !this.toggle
    }

    intermediaryBanking = false
    clearingCodeList = ['BARCGB21', 'BARCGB22', 'BARCGB23', 'BARCGB24']
    bankCountryList = ['UK', 'USA', 'IND']
    bankCodeList = ['BANK001', 'BANK002', 'BANK003']
    recipientCode = 'Swift Code'
    swiftCode = ''
    clearingCode = ''
    bankCountry = ''
    swiftclearingCode = false
    beneficiary = [
        {
            id: '1',
            account: '11085929800200',
        },
        {
            id: '2',
            account: '11085929800211',
        },
        {
            id: '3',
            account: '11085929800456',
        },
        {
            id: '4',
            account: '11085929800484',
        }
    ]
    toggle = false;
    beneficiaryName = ''
    beneficiaryState = ''
    beneficiaryCountry = ''
    bankCode = ''
    bankName = ''
    recurring = false
    untilDate = 'DD/MM/YYYY'
    frequencySelected = ''
    frequencies = ["Day", "Month", "End of every month"]
    amount = ''
    toAccount = ''
    selectedAccount = 'Select Account'
    selectedBeneficiary = 'Select Account'
    dateSelected = 'DD/MM/YYYY'
    name = ''
    currency = 'BMD'
    remarks = ''
    number = 1
    accounts = [
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855541255',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855000054',
            accountType: 'Joint Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '651235641254',
            accountType: 'Time Deposit Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '709945651354',
            accountType: 'Current Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
    ]



    // Handles the selection of a beneficiary account from the dropdown
    handleBeneficiaryAccount(event) {
        this.selectedBeneficiary = event.target.value;
    }


    // Handles the input for the beneficiary's name
    handleBeneficiaryName(event) {
        this.beneficiaryName = event.target.value;
    }


    // Handles the input for the beneficiary's state or city
    handleBeneficiaryState(event) {
        this.beneficiaryState = event.target.value;
    }


    // Handles the input for the beneficiary's country
    handleBeneficiaryCountry(event) {
        this.beneficiaryCountry = event.target.value;
    }


    // Handles the input for the recipient code
    handleRecipientCode(event) {
        this.recipientCode = event.target.value;
    }

    // Handles the input for the bank code
    handleBankCode(event) {
        this.bankCode = event.target.value;
    }


    // Handles the input for the bank name
    handleBankName(event) {
        this.bankName = event.target.value;
    }
    // Handles the input for the amount
    handleAmount(event) {
        this.amount = event.target.value
    }


    // Handles the input for the "to account" field
    handleToAccount(event) {
        this.toAccount = event.target.value
    }


    // Handles the input for the "from account" field
    handleFromAccount(event) {
        this.selectedAccount = event.target.value
    }




    // Handles the input for the name
    handleName(event) {
        this.name = event.target.value
    }












    // Handles the form submission and navigates to the confirmation transfer page
    handleSubmit() {
        // event.preventDefaault();
        let data = {
            fromAccount: this.selectedAccount,
            beneficiaryAccount: this.selectedBeneficiary,
            beneficiaryName: this.beneficiaryName,
            beneficiaryBankName: this.bankName,
            beneficiaryCity: this.beneficiaryState,
            amount: this.amount,
            bankCode: this.bankCode,
            date: this.dateSelected,
            purpose: this.remarks
        }
        console.log(JSON.stringify(data))
        this.navigateTo(confTransferPage, data)
    }



    // Helper function for navigation to a specified page
    navigateTo(pageApiName, data = {}) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            },
            state: data
        });
    }



    get disableSubmit() {
        return false
    }






    // Toggles the intermediary banking status
    intermediaryBank() {
        this.intermediaryBanking = !this.intermediaryBanking
    }

    // Handles the input for the remarks field
    handleRemarks(event) {
        this.remarks = event.detail.remarks
    }



    // Handles the selection of the recipient code type and toggles the visibility of the clearing code input
    recipientCodeHandler(event) {
        this.recipientCode = event.target.value;
        console.log('recipientCode', this.recipientCode);
        this.swiftclearingCode = this.recipientCode == 'Clearing Code'
    }


    // Handles the input for the swift code
    swiftCodeHandler(event) {
        this.swiftCode = event.target.value;
        console.log('swiftCode', this.swiftCode);
    }


    // Handles the input for the clearing code
    clearingCodeHandler(event) {
        this.clearingCode = event.target.value;
        console.log('clearingCode', this.clearingCode);
    }


    // Handles the selection of the bank country
    bankCountryHandler(event) {
        this.bankCountry = event.target.value;
        console.log('bankCountry', this.bankCountry);
    }


    // Handles the input for the bank code// Handles the input for the bank code
    bankCodeHandler(event) {
        this.bankCode = event.target.value;
        console.log('bankCode', this.bankCode);
    }


    // Subscribing to LMS
    subscribeMessage() {
        //subscribe(messageContext, messageChannel, listener, subscribeOptions)
        this.subscription = subscribe(this.context, LMS, (lmsMessage) => { this.handleLMSData(lmsMessage) }, { scope: APPLICATION_SCOPE })
    }


    startDate = ''
    endDate = ''
    noOfInstallments = ''
    noOfPayments = ''
    frequency = CB_Select
    recurring = false
    endDateAllowed = false

    // Helper function for handling LMS Data
    handleLMSData(data) {
        console.log(data.lmsData)
        if (data.lmsData) {
            this.startDate = data.lmsData.startDate ? data.lmsData.startDate : ''
            this.endDate = data.lmsData.endDate ? data.lmsData.endDate : ''
            this.noOfPayments = data.lmsData.numberOfPayments ? data.lmsData.numberOfPayments : 0
            this.noOfInstallments = data.lmsData.noOfInstallments ? data.lmsData.noOfInstallments : 0
            this.frequency = data.lmsData.frequency ? data.lmsData.frequency : ''
            this.endDateAllowed = data.lmsData.endDateAllowed ? data.lmsData.endDateAllowed : ''
        }
    }

}