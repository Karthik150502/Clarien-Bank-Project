import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import QUICKLINKS_PAGE from '@salesforce/label/c.CB_Page_Quicklinks';
import CB_Pending from '@salesforce/label/c.CB_Pending';
import CB_Approved from '@salesforce/label/c.CB_Approved';
import CB_Rejected from '@salesforce/label/c.CB_Rejected';

export default class CBApprovalsNew extends NavigationMixin(LightningElement) {

    approvedOpen = false
    rejectedOpen = false
    pendingOpen = true
    modalOpen = false

    label = {
        CB_Pending,
        CB_Approved,
        CB_Rejected
    }



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


    /**
   * Method to open the logout confirmation modal
   * Sets the modalOpen property to true to open the logout confirmation modal.
   * @returns {void}
  */
    modal = {
        title: '',
        yesButton: {
            exposed: true,
            label: "Ok",
            implementation: () => {
                this.navigateTo(QUICKLINKS_PAGE)
            }
        },
        noButton: {
            exposed: false,
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

    // Lifecycle hook that gets called when the component is inserted into the DOM
    // Calls segregateApprovals method to classify approvals into approved, rejected, and pending lists
    connectedCallback() {
        this.segregateApprovals()
    }

    // Segregates approvals into approved, rejected, and pending categories
    // Iterates over the approvals list and pushes each approval into the respective array based on its status
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

    // Toggles the state of approvedOpen and closes other sections
    openCloseApproval() {
        this.approvedOpen = !this.approvedOpen
        this.pendingOpen = false
        this.rejectedOpen = false
    }

    // Toggles the state of rejectedOpen and closes other sections
    openCloseRejected() {
        this.rejectedOpen = !this.rejectedOpen
        this.approvedOpen = false
        this.pendingOpen = false
    }

    // Toggles the state of pendingOpen and closes other sections
    openClosePending() {
        this.pendingOpen = !this.pendingOpen
        this.approvedOpen = false
        this.rejectedOpen = false
    }



    // Handles the approval of an approval request
    // Logs the approval ID and opens a modal with a success message
    handleApprovalApprove(event) {
        console.log('Approval Approved = ' + event.detail.approvalId)
        this.modal.title = 'The Approval Has Been Approved.'
        this.modalOpen = true
    }


    // Handles the rejection of an approval request
    // Logs the approval ID and opens a modal with a rejection message
    handleApprovalReject(event) {
        console.log('Approval Rejected = ' + event.detail.approvalId)
        this.modal.title = 'The Approval Has Been Rejected.'
        this.modalOpen = true
    }


    // Helper function for navigation
    navigateTo(pageApiName) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            }
        });
    }


}