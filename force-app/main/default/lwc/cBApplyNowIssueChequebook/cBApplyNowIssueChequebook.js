import { LightningElement, track } from 'lwc';

import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality

// Importing labels for easy manipulation of the data in labels
import ACCOUNT_NO from '@salesforce/label/c.CB_AccountNo';
import ACCOUNT_NAME from '@salesforce/label/c.CB_AccountName';
import NO_OF_CHEQUE_BOOKS from '@salesforce/label/c.CB_NoOfChequeBooks';
import SUBMIT from '@salesforce/label/c.CB_Submit';
import OK_BUTTON from '@salesforce/label/c.CB_Ok';
import CANCEL_BUTTON from '@salesforce/label/c.CB_Cancel';
import APPLYNOWCHEQUEBOOK_PAGE from '@salesforce/label/c.CB_Page_Applynowchequebook';
import HEADER_ISSUECHEQUEBOOK from '@salesforce/label/c.CB_Header_IssueChequeBook';
import ISSUECHEQUEMODAL_TITLE from '@salesforce/label/c.CB_IssueChequeModal_Title';
import ISSUECHEQUEMODAL_MESSAGE from '@salesforce/label/c.CB_IssueChequeModal_Message';

import CBSVG from "@salesforce/resourceUrl/CBSVG" // Importing SVG file from Static Resource

// Extending the LightningElement class and applying the NavigationMixin for navigation capabilities
export default class CBApplyNowIssueChequebook extends NavigationMixin(LightningElement) {

    // Labels for UI elements
    label = {
        ACCOUNT_NO,
        ACCOUNT_NAME,
        NO_OF_CHEQUE_BOOKS,
        SUBMIT
    }

    //SVG's from static resource
    // CBUpArrow = `${CBSVG}/CBSVGs/CBUpArrow.svg#CBUpArrow`;
    // CBDownArrow = `${CBSVG}/CBSVGs/CBDownArrow.svg#CBDownArrow`;

    // Configuration for the header and modal
    configuration = {
        previousPageUrl: APPLYNOWCHEQUEBOOK_PAGE,
        heading: HEADER_ISSUECHEQUEBOOK,
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    // Configuration for the success modal
    successModalConfiguration = {
        title: ISSUECHEQUEMODAL_TITLE,
        message: ISSUECHEQUEMODAL_MESSAGE,
        okButton: {
            exposed: true,
            label: OK_BUTTON,
            function: () => {
                this.navigateBack();
            }
        },
        noButton: {
            exposed: false,
            label: CANCEL_BUTTON,
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


    // Method to handle form submission
    handleSubmit() {
        this.successModalOpen = true;
    }

    // Method to navigate back to the previous page
    navigateBack() {
        console.log('navigateBack called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: APPLYNOWCHEQUEBOOK_PAGE
            }
        });
    }

    // Method to navigate to the fee page
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

    // Lifecycle hook to populate account numbers when the component is connected to the DOM
    connectedCallback() {
        console.log('call back called');
        this.populateAccountNumbers();
    }

    // Method to populate account numbers in the dropdown
    populateAccountNumbers() {
        setTimeout(() => {
            const selectAccount = this.template.querySelector('.account-list');
            console.log(selectAccount);
            if (selectAccount) {
                this.accountList.forEach((account) => {
                    const option = document.createElement('option');
                    option.value = account.accountNo;
                    option.textContent = account.accountNo;
                    selectAccount.appendChild(option);
                });
            }
        }, 0);
    }

    // Method to handle account selection change
    listHandler(event) {
        const selectedAccountNo = event.target.value;
        const selectedAccount = this.accountList.find(account => account.accountNo === selectedAccountNo);

        if (selectedAccount) {
            this.selectedAccountType = selectedAccount.accountType.toUpperCase();
        } else {
            this.selectedAccountType = '';
        }
    }

    // Method to increment the number of chequebooks
    incrementChequebook() {
        if (this.chequebookCount < 10) {
            this.chequebookCount += 1;
        }
    }

    // Method to decrement the number of chequebooks
    decrementChequebook() {
        if (this.chequebookCount > 1) {
            this.chequebookCount -= 1;
        }
    }
}