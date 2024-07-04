import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import QUICKLINKS_PAGE from '@salesforce/label/c.CB_Page_Quicklinks';
import FROM_ACCOUNT from '@salesforce/label/c.CB_FromAccount';
import TO_ACCOUNT from '@salesforce/label/c.CB_TO_ACCOUNT';
import STATUS from '@salesforce/label/c.CB_STATUS';
import AMOUNT from '@salesforce/label/c.CB_Amount';
import APPROVED from '@salesforce/label/c.CB_Approved';
import REJECT from '@salesforce/label/c.CB_Reject';

export default class CBApprovals extends NavigationMixin(LightningElement) {

    APPROVED = APPROVED.toUpperCase();
    REJECT = REJECT.toUpperCase();

    modalOpen = false;
    checkbox = '';

    configuration = {
        previousPageUrl: QUICKLINKS_PAGE,
        heading: 'Approvals',
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

    @track approvals = [
        {
            id: '1',
            fromAccount: 'Sasha',
            toAccount: 'John',
            amount: 'BMD 100',
            status: 'Pending',
            selected: false,
        },
        {
            id: '2',
            fromAccount: 'Sasha',
            toAccount: 'Max',
            amount: 'BMD 545',
            status: 'Pending',
            selected: false,
        },
        {
            id: '3',
            fromAccount: 'Sasha',
            toAccount: 'Robert',
            amount: 'BMD 126',
            status: 'Pending',
            selected: false,
        },
        {
            id: '4',
            fromAccount: 'Sasha',
            toAccount: 'Helen',
            amount: 'BMD 632',
            status: 'Pending',
            selected: false,
        }
    ]

    modal = {
        title: '',
        message: 'Approved successfully',
        yesButton: {
            exposed: true,
            label: "OK",
            // Implementation for the "OK" button click action.
            implementation: () => {
                this.modalOpen = false;
                this.navigateToHome('CBQuickLinks__c');
            }
        },
        noButton: {
            exposed: false,
            label: "Not",
            //Implementation for the "Not" button click action.
            implementation: () => {
                console.log('no');
                this.modalOpen = false;
            }
        }
    };

    navigateToHome() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: QUICKLINKS_PAGE
            }
        });
    }

    approveHandler() {
        this.modalOpen = true;
    }

    checkboxHandler(event) {
        let id = event.currentTarget.dataset.id;
        console.log(event.currentTarget.dataset.id);
        for (let i = 0; i < this.approvals.length; i++) {
            if (id === this.approvals[i].id) {
                this.approvals[i] = { ...this.approvals[i], selected: !this.approvals[i].selected };
                break;
            }
        }
    }

    get isDisabled() {
        for (let i = 0; i < this.approvals.length; i++) {
            if (this.approvals[i].selected) {
                return false;
            }
        }
        return true;
    }

}