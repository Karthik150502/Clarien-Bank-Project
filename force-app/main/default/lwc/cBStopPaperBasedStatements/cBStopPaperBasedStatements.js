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
        
        this.navigateTo('CBStopPaperBasedStatementsAccountDeatils__c',{accounts:JSON.stringify(this.selectedAccounts)});

    }

    navigateTo(pageApiName,dataToSend) {
        console.log('navigate executed')
        console.log('1st Page',dataToSend)
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            },
            state:dataToSend
        });
    }

    resetForm() {
        this.checkboxAction('reset');
    }

    // get buttonDiable(){
    //     return this.checkSelected()
    // }

    buttonEnable = true
    checkSelected(){
        const selectedAccount = this.template.querySelectorAll(".checkBox");
        for(let i=0;i<selectedAccount.length;i++){
            if (selectedAccount[i].checked) {
                console.log('one true');
                this.buttonEnable = false;
                break;
            }
            this.buttonEnable = true
        }
        // selectedAccount.forEach(checkbox => {
        //     if (checkbox.checked) {
        //         console.log('one true');
        //         this.buttonEnable = false;
        //     }
        // });
 
    }

    checkboxAction(action) {
        console.log('test selected',this.checkSelected())
        const selectedAccount = this.template.querySelectorAll(".checkBox");
        selectedAccount.forEach(checkbox => {
            if (checkbox.checked) {
                console.log('checkbox',checkbox)
                console.log('cc',checkbox.checked);
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