import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import CB_From from '@salesforce/label/c.CB_From';
import CB_Reject from '@salesforce/label/c.CB_Reject';
import CB_To from '@salesforce/label/c.CB_To';
import CB_Amount from '@salesforce/label/c.CB_Amount';
import CB_Approve from '@salesforce/label/c.CB_Approve';
export default class CBApprovalTile extends NavigationMixin(LightningElement) {

    label = {
        CB_From,
        CB_To,
        CB_Reject,
        CB_Approve,
        CB_Amount
    }

    @api info = {
        id: '',
        status: 'approved',
        fromAcc: '54545841658',
        toAcc: '64454564584',
        amt: 'BMD 54514.00'
    }



    // Checks if the status of the transaction is 'pending'
    get statusPending() {
        return this.info.status === 'pending'
    }

    // Returns a string combining 'wrapper' with the status of the transaction
    get wrapperClass() {
        return 'wrapper ' + this.info.status
    }


    // Fires a custom event with the specified event name and approval ID
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


    // Approves the approval by firing an 'approvalapproved' event with the approval ID
    approveApproval() {
        this.fireCustomEvent('approvalapproved', this.info.id)
    }


    // Rejects the approval by firing an 'approvalrejected' event with the approval ID
    rejectApproval() {
        this.fireCustomEvent('approvalrejected', this.info.id)
    }




}