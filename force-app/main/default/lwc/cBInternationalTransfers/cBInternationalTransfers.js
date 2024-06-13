import { LightningElement } from 'lwc';

import { NavigationMixin } from 'lightning/navigation';
import SUBMIT from '@salesforce/label/c.CB_Submit';
import CANCEL from '@salesforce/label/c.CB_Cancel';

import { setPagePath } from 'c/cBUtilities';

export default class CBInternationalTransfers extends NavigationMixin(LightningElement) {

    // Object to hold imported labels
    label = {
        SUBMIT: SUBMIT.toUpperCase(), // Converting "Submit" label to uppercase
        CANCEL: CANCEL.toUpperCase(), // Converting "Cancel" label to uppercase
    };


    configuration = {
        previousPageUrl: '',
        heading: 'International Payments',
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    connectedCallback(){
        this.configuration.previousPageUrl= setPagePath('CBInternationalTransfers__c')
    }

    toggle = false;

    handleHeight() {
        this.toggle = !this.toggle
    }

    beneficiaryName = ''
    beneficiaryState = ''
    beneficiaryCountry = ''
    recipientCode = ''
    bankCode = ''
    bankName = ''
    recurringTransfer = false
    amount = ''
    toAccount = ''
    selectedAccount = 'Select Account'
    selectedBeneficiary = 'Select Account'
    date = 'YYYY-MM-DD'
    name = ''
    currency = 'BMD'
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

    beneficiary = [
        {
            id : '1',
            account : '11085929800200',
        },
        {
            id : '2',
            account : '11085929800211',
        },
        {
            id : '3',
            account : '11085929800456',
        },
        {
            id : '4',
            account : '11085929800484',
        }
    ]

    handleBeneficiaryAccount(event) {
        this.selectedBeneficiary = event.target.value;
    }
    
    handleBeneficiaryName(event) {
        this.beneficiaryName = event.target.value;
    }

    handleBeneficiaryState(event) {
        this.beneficiaryState = event.target.value;
    }

    handleBeneficiaryCountry(event) {
        this.beneficiaryCountry = event.target.value;
    }

    handleRecipientCode(event) {
        this.recipientCode = event.target.value;
    }

    handleBankCode(event) {
        this.bankCode = event.target.value;
    }

    handleBankName(event) {
        this.bankName = event.target.value;
    }

    handleAmount(event) {
        this.amount = event.target.value
    }

    handleToAccount(event) {
        this.toAccount = event.target.value
    }

    handleFromAccount(event) {
        this.selectedAccount = event.target.value
    }

    // dateHandler(event) {
    //     this.date = event.target.value !== '' ? event.target.value : 'YYYY-MM-DD'
    // }

    handleName(event) {
        this.name = event.target.value
    }

    handleSubmit(event) {
        // event.preventDefaault();
        let comment = this.template.querySelector(".text-area-inp").value
        let data = {
            fromAccount: this.selectedAccount,
            beneficiaryAccount : this.selectedBeneficiary,
            beneficiaryName : this.beneficiaryName,
            beneficiaryBankName : this.bankName,
            beneficiaryCity : this.beneficiaryState,
            amount : this.amount,
            bankCode : this.bankCode,
            date : this.date,
            purpose : comment
        }
        console.log(JSON.stringify(data))
        this.navigateTo('CBInternationalTransfersConfirmation__c', data)
    }

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

    date = ''
    untilDate = ''
    frequencySelected = ''
    showTransDatePicker = false
    openTransDateSelect() {
        this.showTransDatePicker = true
    }
    closeTransDatInput() {
        this.showTransDatePicker = false
    }
    handleTransDate(event) {
        this.showTransDatePicker = false
        this.date = event.detail.transDate

        if(event.detail.recurring){
            this.untilDate = event.detail.untilDate
            this.frequencySelected = event.detail.frequencySelected != 'End of every month' ? `Every ${event.detail.repeat} ${event.detail.frequencySelected} `: 'End of every month';
            this.recurringTransfer = event.detail.recurring
            this.recurringTransferView = true
        }
        else{
            this.recurringTransferView = false
        } }

    intermediaryBanking = false
    intermediaryBank(){
        this.intermediaryBanking = !this.intermediaryBanking
    }

    recurringTransferView = false

    clearingCodeList = ['BARCGB21','BARCGB22','BARCGB23','BARCGB24']
    bankCountryList = ['UK','USA','IND']
    bankCodeList = ['BANK001','BANK002','BANK003']

    recipientCode = 'Swift Code'
    swiftclearingCode = false
    recipientCodeHandler(event){
        this.recipientCode = event.target.value;
        console.log('recipientCode', this.recipientCode);
        this.swiftclearingCode = this.recipientCode == 'Clearing Code'
    }

    swiftCode = ''
    swiftCodeHandler(event){
        this.swiftCode = event.target.value;
        console.log('swiftCode',this.swiftCode);
    }

    clearingCode = ''
    clearingCodeHandler(event){
        this.clearingCode = event.target.value;
        console.log('clearingCode', this.clearingCode);
    }

    bankCountry = ''
    bankCountryHandler(event){
        this.bankCountry = event.target.value;
        console.log('bankCountry',this.bankCountry);
    }

    bankCode = ''
    bankCodeHandler(event){
        this.bankCode = event.target.value;
        console.log('bankCode',this.bankCode);
    }

}