import { LightningElement } from 'lwc';

import { NavigationMixin } from 'lightning/navigation';
import CONTINUE from '@salesforce/label/c.CB_Continue';
import COMMENTS_OPTIONAL from '@salesforce/label/c.CB_CommentsOptional'
import REMARKS from '@salesforce/label/c.CB_Remarks'
import UNTIL_END_DATE from '@salesforce/label/c.CB_UntilEndDate'


import CB_SelectAccount from '@salesforce/label/c.CB_SelectAccount';
import CB_FromAccount from '@salesforce/label/c.CB_FromAccount';
import CB_TO_ACCOUNT from '@salesforce/label/c.CB_TO_ACCOUNT';
import CB_Repeat from '@salesforce/label/c.CB_Repeat';
import CB_Recurring from '@salesforce/label/c.CB_Recurring';
import CB_Name from '@salesforce/label/c.CB_Name';
import DATE from '@salesforce/label/c.CB_Date';
import CBCurrency from '@salesforce/label/c.CBCurrency';
import CB_SelectCurrency from '@salesforce/label/c.CB_SelectCurrency';
import CB_Amount from '@salesforce/label/c.CB_Amount';
import CB_Page_IntrabankTransfers from '@salesforce/label/c.CB_Page_IntrabankTransfers';
import CB_Page_IntrabankTransfersConf from '@salesforce/label/c.CB_Page_IntrabankTransfersConf';


import { setPagePath, formatDate, getMobileSessionStorage } from 'c/cBUtilities';

export default class CBIntraBankTransfers extends NavigationMixin(LightningElement) {

    // Object to hold imported labels
    label = {
        CONTINUE, // Converting "Submit" label to uppercase
        COMMENTS_OPTIONAL,
        REMARKS,
        DATE,
        UNTIL_END_DATE,
        CB_SelectAccount,
        CB_FromAccount,
        CB_TO_ACCOUNT,
        CB_Repeat,
        CB_Recurring,
        CB_Name,
        CBCurrency,
        CB_Amount,
        CB_SelectCurrency
    };


    // Lifecycle hook, that gets called upon component connect.
    connectedCallback() {
        this.headerConfguration.previousPageUrl = setPagePath(CB_Page_IntrabankTransfers)
        this.setAccountData()
    }

    setAccountData() {
        this.accounts = JSON.parse(getMobileSessionStorage('CB_All_Account_Details')) ? JSON.parse(getMobileSessionStorage('CB_All_Account_Details')) : [];
    }

    headerConfguration = {
        previousPageUrl: 'CBTransfers__c',
        heading: 'Intra Bank Transfer',
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        },
        openTemplates: {
            transferTypePage: CB_Page_IntrabankTransfers
        }
    }
    recurring = false
    amount = ''
    toAccount = ''
    selectedAccount = 'Select Account'
    selectedBank = 'Select Bank'
    name = ''
    currency = 'Select Currency'
    currencies = ["BMD", "USD"]
    frequencySelected = ''
    frequencies = ["Day", "Month", "End of every month"]
    dateSelected = 'DD/MM/YYYY'
    untilDate = 'DD/MM/YYYY'
    remarks = ''
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

    toAccountsList = [
        {
            accountNum: 604567894,
            name: 'Jhon',
            accountType: 'Saving',
            status: true
        },
        {
            accountNum: 604567885,
            name: 'Robert',
            accountType: 'Saving',
            status: false
        }
        ,
        {
            accountNum: 604567796,
            name: 'Mike',
            accountType: 'Current',
            status: true
        },
        {
            accountNum: 604567899,
            name: 'Robin',
            accountType: 'Saving',
            status: false
        },
        {
            accountNum: 604567810,
            name: 'Bruce',
            accountType: 'Saving',
            status: false
        }
        ,
        {
            accountNum: 604567711,
            name: 'Donna',
            accountType: 'Current',
            status: true
        }
    ]
    banks = [
        {
            "id": '51561',
            "name": 'Bank of NT Butterfield and Son LTD'
        },
        {
            "id": '51461',
            "name": 'Bank of NT Butterfield and Son LTD'
        },
    ]


    /**
    * Handles the input event for the fromAccount field.
    * @param {Event} event - The input event.
    */
    handleAmount(event) {
        this.amount = event.target.value
    }


    /**
    * Handles the input event for the toAccount field.
    * @param {Event} event - The input event.
    */
    handleToAccount(event) {
        this.toAccount = event.target.value
        console.log(this.toAccount);
        for (let i = 0; i < this.toAccountsList.length; i++) {
            console.log(this.toAccountsList[i].accountNum)
            if (this.toAccountsList[i].accountNum == this.toAccount) {
                console.log(this.toAccountsList[i].name);
                this.name = this.toAccountsList[i].name;
                break;
            }
        }
    }


    /**
    * Handles the input event for the fromAccount field.
    * @param {Event} event - The input event.
    */
    handleFromAccount(event) {
        this.selectedAccount = event.target.value
    }


    /**
    * Handles the input event for the bank selection.
    * @param {Event} event - The input event.
    */
    handleBankSelect(event) {
        this.selectedBank = event.target.value
    }


    /**
    * Handles the input event for the currency selection.
    * @param {Event} event - The input event.
    */
    handleCurrency(event) {
        this.currency = event.target.value
    }



    /**
    * Handles the input event for the name field.
    * @param {Event} event - The input event.
    */
    handleName(event) {
        this.name = event.target.value
    }



    /**
    * Handles the input event for the remarks field.
    * @param {Event} event - The input event.
    */
    handleRemarks(event) {
        this.remarks = event.detail.remarks
    }


    /**
    * Toggles the recurring flag.
    */
    recurringHandler() {
        this.recurring = !this.recurring
    }



    /**
    * Handles the input event for the date field and formats the date.
    * @param {Event} event - The input event.
    */
    handleDate(event) {
        this.dateSelected = formatDate(event.target.value)
    }


    /**
    * Handles the input event for the untilDate field and formats the date.
    * @param {Event} event - The input event.
    */
    handleUntilDate(event) {
        this.untilDate = formatDate(event.target.value)
    }



    /**
    * Handles the input event for the frequency selection.
    * @param {Event} event - The input event.
    */
    handleFreq(event) {
        this.frequencySelected = event.target.value
    }



    /**
    * Increases the number by 1.
    */
    increaseNumber() {
        this.number = this.number + 1

    }


    /**
    * Decreases the number by 1, ensuring it does not go below 1.
    */
    decreaseNumber() {
        this.number = this.number > 1 ? this.number - 1 : this.number
    }



    /**
    * Checks if the submit button should be disabled based on field validations.
    * @return {boolean} - True if the submit button should be disabled, false otherwise.
    */
    get disableSubmit() {
        return this.verifyValues()
    }



    /**
    * Verifies if all required values are provided and valid.
    * @return {boolean} - True if any required value is missing or invalid, false otherwise.
    */
    verifyValues() {
        return this.selectedAccount === 'Select Account' || this.toAccount === '' || this.currency === 'Select Currency' || this.amount === '' || this.name === '' || this.date === 'DD/MM/YYYY'
    }




    /**
    * Helper function for navigation to a specified page.
    * @param {string} pageApiName - The API name of the page to navigate to.
    * @param {Object} data - The state data to pass during navigation.
    */
    navigateTo(pageApiName, data = {}) {
        console.log('Navigation Called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            },
            state: data
        });
    }





    /**
    * Handles the form submission by collecting data and navigating to the confirmation page.
    */
    handleSubmit() {
        let data = {
            fromAccount: this.selectedAccount,
            toAccount: this.toAccount,
            name: this.name,
            amount: this.amount,
            dateSelected: this.date,
            currency: this.currency,
            comment: this.remarks
        }
        console.log(JSON.stringify(data))
        this.navigateTo(CB_Page_IntrabankTransfersConf, data)
    }


}