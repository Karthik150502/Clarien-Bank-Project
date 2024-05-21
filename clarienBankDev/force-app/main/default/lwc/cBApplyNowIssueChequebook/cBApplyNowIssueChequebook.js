import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import ACCOUNT_NO from '@salesforce/label/c.CB_AccountNo';
import ACCOUNT_NAME from '@salesforce/label/c.CB_AccountName';
import NO_OF_CHEQUE_BOOKS from '@salesforce/label/c.CB_NoOfChequeBooks';
import SUBMIT from '@salesforce/label/c.CB_Submit';

export default class CBApplyNowIssueChequebook extends NavigationMixin(LightningElement) {

    label = {
        ACCOUNT_NO,
        ACCOUNT_NAME,
        NO_OF_CHEQUE_BOOKS,
        SUBMIT
    }

    configuration = {
        previousPageUrl: 'CBApplyNowChequebook__c',
        heading: 'Issue Cheque Book',
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    successModalConfiguration = {
        title: 'Your cheque book has been applied successfully',
        message: 'Chequebook will be delivered to your mailing address',
        okButton: {
            exposed: true,
            label: 'OK',
            function: () => {
                this.navigateBack();
            }
        },
        noButton: {
            exposed: false,
            label: 'Cancel',
            function: () => {
            }
        },
        alertMsg: ''
    }

    @track accountList = [
        {
            id: 1,
            accountNo: "600017725563",
            accountType: "savings"
        }, 
        {
            id: 2,
            accountNo: "600017987455",
            accountType: "current"
        }
    ]
    selectedAccountType = this.accountList.length > 0 ? this.accountList[0].accountType.toUpperCase() : '';
    successModalOpen = false;
    chequebookCount = 1;

    handleSubmit() {
        this.successModalOpen = true;
    }

    navigateBack() {
        console.log('navigate called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'CBApplyNowChequebook__c'
            }
        });
    }

    openFeePage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: 'https://clarienbank.com/fees/' // URL for Help page
            }
        }).then((url) => {
            window.location.href = url; // Redirecting to the Help page
        });
    }

    connectedCallback() {
        console.log('call back called');
        this.populateAccountNumbers();
    }

    populateAccountNumbers() {
        setTimeout(()=> {
            const selectAccount = this.template.querySelector('.account-list');
            console.log(selectAccount);
            if(selectAccount) {
                this.accountList.forEach((account)=> {
                    const option = document.createElement('option');
                    option.value = account.accountNo;
                    option.textContent = account.accountNo;
                    selectAccount.appendChild(option);
                });
            }
        },0);
    }

    listHandler(event) {
        const selectedAccountNo = event.target.value;
        const selectedAccount = this.accountList.find(account => account.accountNo === selectedAccountNo);

        if (selectedAccount) {
            this.selectedAccountType = selectedAccount.accountType.toUpperCase();
        } else {
            this.selectedAccountType = '';
        }
    }

    incrementChequebook() {
        if(this.chequebookCount > 10) {
            this.chequebookCount = 10;
        } else {
            this.chequebookCount += 1; 
        }
    }
    decrementChequebook() {
        if(this.chequebookCount < 1) {
            this.chequebookCount = 1;
        } else {
            this.chequebookCount -=1;
        }
    }
}