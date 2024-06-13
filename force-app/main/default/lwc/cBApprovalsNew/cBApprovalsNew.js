import { LightningElement, track } from 'lwc';
import QUICKLINKS_PAGE from '@salesforce/label/c.CB_Page_Quicklinks';

export default class CBApprovalsNew extends LightningElement {

    approvedOpen = false
    rejectedOpen = false
    pendingOpen = false

    @track accordion = {
        approved: {
            opened: false
        },
        rejected: {
            opened: false
        },
        pending: {
            opened: false
        },

    }

    headerConfguration = {
        previousPageUrl: QUICKLINKS_PAGE,
        heading: 'Approvals',
        iconsExposed: false,
    }

    // Object to manage header icons
    header_icons = {
        // Announcements icon settings
        announcements: {
            exposed: true,  // Whether to display the Announcements icon
            haveItems: true // Whether the Announcements icon has items to display
        },
        // Whether to display the Announcements icon
        notifications: {
            exposed: true,  // Whether to display the Notifications icon
            haveItems: true // Whether the Notifications icon has items to display
        },
        // Inbox icon settings
        inbox: {
            exposed: true,  // Whether to display the Inbox icon
            haveItems: true // Whether the Inbox icon has items to display
        },
        // Scan Code icon settings
        scanCode: {
            exposed: false, // Whether to display the Scan Code icon
            haveItems: false    // Whether the Scan Code icon has items to display
        }
    };


    approvals = [
        {
            id: '598',
            status: 'pending',
            fromAcc: '54545841658',
            toAcc: '64454564584',
            amt: 'BMD 54514.00'
        },
        {
            id: '156',
            status: 'rejected',
            fromAcc: '54545841658',
            toAcc: '64454564584',
            amt: 'BMD 54514.00'
        },
        {
            id: '564',
            status: 'approved',
            fromAcc: '54545841658',
            toAcc: '64454564584',
            amt: 'BMD 54514.00'
        },
        {
            id: '554',
            status: 'pending',
            fromAcc: '54545841658',
            toAcc: '64454564584',
            amt: 'BMD 54514.00'
        },
        {
            id: '574',
            status: 'approved',
            fromAcc: '54545841658',
            toAcc: '64454564584',
            amt: 'BMD 54514.00'
        },
        {
            id: '764',
            status: 'rejected',
            fromAcc: '54545841658',
            toAcc: '64454564584',
            amt: 'BMD 54514.00'
        },
        {
            id: '464',
            status: 'pending',
            fromAcc: '54545841658',
            toAcc: '64454564584',
            amt: 'BMD 54514.00'
        },
        {
            id: '164',
            status: 'pending',
            fromAcc: '54545841658',
            toAcc: '64454564584',
            amt: 'BMD 54514.00'
        },
        {
            id: '123',
            status: 'pending',
            fromAcc: '54545841658',
            toAcc: '64454564584',
            amt: 'BMD 54514.00'
        },
        {
            id: '789',
            status: 'rejected',
            fromAcc: '54545841658',
            toAcc: '64454564584',
            amt: 'BMD 54514.00'
        },
        {
            id: '498',
            status: 'approved',
            fromAcc: '54545841658',
            toAcc: '64454564584',
            amt: 'BMD 54514.00'
        },
    ]


    @track approved = []
    @track rejected = []
    @track pending = []


    connectedCallback() {
        this.segregateApprovals()
    }


    segregateApprovals() {
        this.approvals.forEach((approval) => {
            if (approval.status === 'approved') {
                this.approved.push(
                    {
                        ...approval
                    }
                )
            } else if (approval.status === 'rejected') {
                this.rejected.push(
                    {
                        ...approval
                    }
                )
            } else {
                this.pending.push(
                    {
                        ...approval
                    }
                )
            }
        })
    }


    openCloseApproval() {
        this.approvedOpen = !this.approvedOpen
        this.pendingOpen = false
        this.rejectedOpen = false
    }
    openCloseRejected() {
        this.rejectedOpen = !this.rejectedOpen
        this.approvedOpen = false
        this.pendingOpen = false
    }
    openClosePending() {
        this.pendingOpen = !this.pendingOpen
        this.approvedOpen = false
        this.rejectedOpen = false
    }




    handleApprovalApprove(event) {
        console.log('Approval Approved = ' + event.detail.approvalId)
    }

    handleApprovalReject(event) {
        console.log('Approval Rejected = ' + event.detail.approvalId)
    }


}