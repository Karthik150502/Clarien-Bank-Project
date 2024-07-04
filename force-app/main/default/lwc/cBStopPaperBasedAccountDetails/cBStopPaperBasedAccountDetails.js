import { LightningElement, wire, track } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';

import CURRENCY from '@salesforce/label/c.CBCurrency';
import REMARKS from '@salesforce/label/c.CB_Remarks';
import SAVING_ACCOUNT from '@salesforce/label/c.CB_Header_SavingAccount';
import ACCOUNT_TYPE from '@salesforce/label/c.CB_AccountType';
import TRANSACTION_STATUS from '@salesforce/label/c.CB_TransactionStatus';
import SUBMIT from '@salesforce/label/c.CB_Submit';
import YourRequestIsSub from '@salesforce/label/c.CB_YourRequestIsSub';
import StopPaperBasedStatements from '@salesforce/label/c.CB_StopPaperBasedStatements';
import Page_Stoppaperbasedstatements from '@salesforce/label/c.CB_Page_Stoppaperbasedstatements';
import OK_BUTTON from '@salesforce/label/c.CB_Ok';
import CANCEL_BUTTON from '@salesforce/label/c.CB_Cancel';

import CB_Page_Applynow from '@salesforce/label/c.CB_Page_Applynow';

import createStopPaperBasedStatementRequest from '@salesforce/apex/CBMakeARequestController.createStopPaperBasedStatementRequest';

export default class CBStopPaperBasedAccountDetails extends NavigationMixin(LightningElement) {
    /**
 * Wire decorator to access the CurrentPageReference in the component.
 */
    @wire(CurrentPageReference) pageRef;

    /**
 * Lifecycle hook called when the component is inserted into the DOM.
 * Retrieves and parses the account details from the CurrentPageReference state.
 */
    connectedCallback() {
        console.log('Page Ref', this.pageRef);
        console.log('Page Ref State', this.pageRef.state);
        console.log('Page Ref State acc', this.pageRef.state.accounts);
        this.accounts = JSON.parse(this.pageRef.state.accounts);
        console.log(JSON.stringify(this.accounts));
    }

    label = {
        CURRENCY,
        REMARKS,
        SAVING_ACCOUNT,
        SUBMIT,
        ACCOUNT_TYPE,
        TRANSACTION_STATUS
    }

    // Sample data representing accounts with different details.
    accounts = [
        {
            accNumber: 5000316231,
            currency: 'USD',
            accType: 'Personal Saving Account',
            accStatus: 'Personal Active Saving USD',
            TransStatus: 'Sent to the bank'
        },
        {
            accNumber: 5000334231,
            currency: 'USD',
            accType: 'Personal Saving Account',
            accStatus: 'Personal Active Saving USD',
            TransStatus: 'Sent to the bank'
        }
    ];

    // configuration for the secondary header
    configuration = {
        previousPageUrl: Page_Stoppaperbasedstatements,
        heading: StopPaperBasedStatements,
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    };

    successModalOpen = false;

    // configuration for the success modal
    @track
    successModalconfig = {
        title: YourRequestIsSub,
        message: '',
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
        }
    }

    /**
 * Method to handle form submission
 */
    submitForm() {
        console.log('Submit');
        createStopPaperBasedStatementRequest({ accountList: JSON.stringify(this.accounts) })
            .then(() => {
                console.log("Created")
            })
            .catch((error) => {
                console.error("Error", error)
                console.log("Error Msg", error.message);
                this.successModalconfig.title = 'Unable to Submit The Request, Please Try After Some Time'
            })
        this.successModalOpen = true
    }

    /**
 * Method to navigate back to a specific page
 */
    navigateBack() {
        console.log('navigate called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: CB_Page_Applynow
            }
        });
    }
}