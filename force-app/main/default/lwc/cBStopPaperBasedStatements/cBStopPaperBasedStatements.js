import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import SAVING_ACCOUNT from '@salesforce/label/c.CB_Header_SavingAccount';
import NEXT from '@salesforce/label/c.CB_Next';
import RESET from '@salesforce/label/c.CB_Reset';
import StopPaperBasedStatements from '@salesforce/label/c.CB_StopPaperBasedStatements';
import Page_Stoppaperbasedstatementsaccountdeatils from '@salesforce/label/c.CB_Page_Stoppaperbasedstatementsaccountdeatils';
import Page_Applynow from '@salesforce/label/c.CB_Page_Applynow';

import { getMobileSessionStorage } from 'c/cBUtilities';

export default class CBStopPaperBasedStatements extends NavigationMixin(LightningElement) {

    label = {
        SAVING_ACCOUNT,
        NEXT,
        RESET
    }

    /**
     * Configuration object for secondary header
     * @type {Object}
     */
    configuration = {
        previousPageUrl: Page_Applynow,
        heading: StopPaperBasedStatements,
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    selectedAccounts = []

    connectedCallback() {
        this.setAccountData()
    }

    setAccountData() {
        this.accounts = JSON.parse(getMobileSessionStorage('CB_All_Account_Details')) ? JSON.parse(getMobileSessionStorage('CB_All_Account_Details')) : [];
    }

    /**
     * Array of account objects.
     * @type {Array}
     */
    accounts = [
        {
            accountNo: '6000316231',
            currency: 'USD',
            accountType: 'Personal Saving Account',
            accStatus: 'Personal Actice Saving USD',
            TransStatus: 'Sent to the bank'
        },
        {
            accountNo: '6000334231',
            currency: 'USD',
            accountType: 'Personal Saving Account',
            accStatus: 'Personal Actice Saving USD',
            TransStatus: 'Sent to the bank'
        },
        {
            accountNo: '6000367345',
            currency: 'USD',
            accountType: 'Personal Saving Account',
            accStatus: 'Personal Actice Saving USD',
            TransStatus: 'Sent to the bank'
        }
    ]

    /**
     * Handles the form submission.
     * Gathers selected accounts and navigates to the next page with the selected accounts' data.
     */
    submitForm() {
        this.checkboxAction('submit');
        // this.selectedAccounts.forEach(account =>{
        //     console.log(account)
        // })
        this.navigateTo(Page_Stoppaperbasedstatementsaccountdeatils, { accounts: JSON.stringify(this.selectedAccounts) });
    }


    /**
     * Navigates to the specified page with the provided data.
     * 
     * @param {string} pageApiName - The API name of the page to navigate to.
     * @param {Object} dataToSend - The data to send to the next page.
     */
    navigateTo(pageApiName, dataToSend) {
        console.log('navigate executed')
        console.log('1st Page', dataToSend)
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            },
            state: dataToSend
        });
    }

        /**
     * Resets the form by unchecking all checkboxes and disabling the submit button.
     */
    resetForm() {
        this.checkboxAction('reset');
    }

    /**
     * Getter to determine if the submit button should be enabled.
     * @type {boolean}
     */
    get buttonEnable() {
        return this.buttonDisabled
    }
    buttonDisabled = true

    /**
 * Getter to determine if the submit button should be enabled.
 * @type {boolean}
 */
    checkSelected() {
        const selectedAccount = this.template.querySelectorAll(".checkBox");
        for (let i = 0; i < selectedAccount.length; i++) {
            if (selectedAccount[i].checked) {
                console.log('one true');
                this.buttonDisabled = false;
                break;
            }
            this.buttonDisabled = true
        }
        // selectedAccount.forEach(checkbox => {
        //     if (checkbox.checked) {
        //         console.log('one true');
        //         this.buttonEnable = false;
        //     }
        // });

    }

        /**
     * Handles checkbox actions (submit or reset).
     * 
     * @param {string} action - The action to perform ('submit' or 'reset').
     */
    checkboxAction(action) {
        console.log('test selected', this.checkSelected())
        const selectedAccount = this.template.querySelectorAll(".checkBox");
        selectedAccount.forEach(checkbox => {
            if (checkbox.checked) {
                console.log('checkbox', checkbox)
                console.log('cc', checkbox.checked);
                if (action === 'submit') {

                    // this.accounts.forEach((account)=>{
                    //     if(account.accountNo == checkbox.value){
                    //         this.selectedAccounts.push(account);
                    //     }
                    // })

                    this.selectedAccounts.push(this.accounts.find(account => {
                        return account.accountNo == checkbox.value
                    }))

                } else if (action === 'reset') {
                    checkbox.checked = false;
                    this.buttonDisabled = true;
                }
            }
        });
    }

}