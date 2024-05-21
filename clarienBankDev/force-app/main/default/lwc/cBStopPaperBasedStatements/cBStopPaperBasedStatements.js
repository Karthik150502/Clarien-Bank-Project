import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CBStopPaperBasedStatements extends NavigationMixin(LightningElement) {

    configuration = {
        previousPageUrl: 'CBServiceRequest__c',
        heading: 'Stop Paper Based',
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    selectedAccounts = []
    accounts = [
        {
            accNumber: 6000316231,
            currency: 'USD',
            accType: 'Personal Saving Account',
            accStatus: 'Personal Actice Saving USD',
            TransStatus: 'Sent to the bank'
        },
        {
            accNumber: 6000334231,
            currency: 'USD',
            accType: 'Personal Saving Account',
            accStatus: 'Personal Actice Saving USD',
            TransStatus: 'Sent to the bank'
        },
        {
            accNumber: 6000367345,
            currency: 'USD',
            accType: 'Personal Saving Account',
            accStatus: 'Personal Actice Saving USD',
            TransStatus: 'Sent to the bank'
        }
    ]

    submitForm() {
        this.checkboxAction('submit');
        // this.selectedAccounts.forEach(account =>{
        //     console.log(account)
        // })
        console.log('1st Page',JSON.stringify(this.selectedAccounts))
        this.navigateTo('CB__c',JSON.stringify(this.selectedAccounts));//need to add after creating the page for SPBS detail

    }

    navigateTo(pageApiName,dataToSend) {
        console.log('navigate executed')
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                // name: pageApiName
                name : 'testpage2__c'
            },
            state: dataToSend
        });
    }

    resetForm() {
        this.checkboxAction('reset');
    }

    checkboxAction(action) {
        const selectedAccount = this.template.querySelectorAll(".checkBox");
        selectedAccount.forEach(checkbox => {
            if (checkbox.checked) {
                if (action === 'submit') {

                    // this.accounts.forEach((account)=>{
                    //     if(account.accNumber == checkbox.value){
                    //         this.selectedAccounts.push(account);
                    //     }
                    // })

                    this.selectedAccounts.push(this.accounts.find( account=>{
                        return account.accNumber == checkbox.value
                    }))

                } else if (action === 'reset') {
                    checkbox.checked = false;
                }
            }
        });
    }

}