import { LightningElement, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CBApprovalTile extends NavigationMixin(LightningElement) {


    confirmModal = false

    @api info = {
        id: '',
        status: 'approved',
        fromAcc: '54545841658',
        toAcc: '64454564584',
        amt: 'BMD 54514.00'
    }

    /**
 * Method to open the logout confirmation modal
 * Sets the modalOpen property to true to open the logout confirmation modal.
 * @returns {void}
*/
    @track modal = {
        // Title of the logout confirmation modal
        title: '',
        // Message in the logout confirmation modal (empty for now)
        message: '',
        // Metadata for the "Yes" button in the logout confirmation modal
        yesButton: {
            // Exposed property indicating visibility of the button
            exposed: true,
            // Label for the "Yes" button
            label: "Ok",
            // Implementation of the action performed when the "Yes" button is clicked
            implementation: () => {
                this.confirmModal = false
                this.navigateTo('CBQuickLinks__c')
            }
        },
        noButton: {
            exposed: false,
        },
    };




    get statusPending() {
        return this.info.status === 'pending'
    }


    get wrapperClass() {
        return 'wrapper ' + this.info.status
    }

    fireCustomEvent(eventname = '', approvalId = '') {
        let evt = new CustomEvent(eventname, {
            bubbles: true,
            detail: {
                approvalId: approvalId
            }
        }
        )
        this.dispatchEvent(evt)
    }



    approveApproval() {
        this.fireCustomEvent('approvalapproved', this.info.id)
        this.modal.title = 'The Approval has been approved!'
        this.confirmModal = true
    }
    rejectApproval() {
        this.fireCustomEvent('approvalrejected', this.info.id)
        this.modal.title = 'The Approval has been rejected!'
        this.confirmModal = true
    }

    // Helper function for navigation
    navigateTo(pageApiName, data = {}) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            },
            state: data
        });
    }


}