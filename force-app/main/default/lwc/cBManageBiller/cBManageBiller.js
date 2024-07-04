import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { CurrentPageReference } from 'lightning/navigation';


import CB_Page_Transfers from '@salesforce/label/c.CB_Page_Transfers'
import CB_ManageBillers from '@salesforce/label/c.CB_ManageBillers'
import CB_Add from '@salesforce/label/c.CB_Add'
import CB_Page_AddBiller from '@salesforce/label/c.CB_Page_AddBiller'
import CB_Yes from '@salesforce/label/c.CB_Yes'
import CB_Cancel from '@salesforce/label/c.CB_Cancel'
import CB_ConfirmBillerDelete from '@salesforce/label/c.CB_ConfirmBillerDelete'



export default class CBManageBiller extends NavigationMixin(LightningElement) {


    label = {
        CB_Add,
    }

    confirmDeleteModal = false
    openBillerEditModal = false
    billerToDelete = ''
    @track billerToEdit = {}

    headerConfguration = {
        previousPageUrl: CB_Page_Transfers,
        heading: CB_ManageBillers,
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        },
    }

    /**
    * Method to open the logout confirmation modal
    * Sets the modalOpen property to true to open the logout confirmation modal.
    * @returns {void}
    */
    modal = {
        title: '',
        message: CB_ConfirmBillerDelete,
        yesButton: {
            exposed: true,
            label: CB_Yes,
            implementation: () => {
                this.deleteBiller(this.billerToDelete)
                this.confirmDeleteModal = false
            }
        },
        noButton: {
            exposed: true,
            label: CB_Cancel,
            implementation: () => {
                this.confirmDeleteModal = false
            }
        },
    };


    @track billers = [
        { id: 1, name: "Electric Company", category: "Utilities", accountNo: "684751234567890", payeeName: "John Doe" },
        { id: 2, name: "Water Supply Co.", category: "Utilities", accountNo: "684759876543210", payeeName: "Jane Smith" },
        { id: 3, name: "Gas Provider", category: "Utilities", accountNo: "684755551234567", payeeName: "Alice Johnson" },
        { id: 4, name: "Internet Service", category: "Telecommunications", accountNo: "684754445678901", payeeName: "Bob Brown" },
        { id: 5, name: "Mobile Carrier", category: "Telecommunications", accountNo: "684753337890123", payeeName: "Charlie Davis" },
        { id: 6, name: "Streaming Service", category: "Entertainment", accountNo: "684752223456789", payeeName: "Diana Evans" },
        { id: 7, name: "Insurance Co.", category: "Insurance", accountNo: "684751112345678", payeeName: "Frank Garcia" },
        { id: 8, name: "Health Insurance", category: "Insurance", accountNo: "684751234567891", payeeName: "Grace Hall" },
        { id: 9, name: "Gym Membership", category: "Health", accountNo: "684759876543211", payeeName: "Henry King" },
        { id: 10, name: "Credit Card Company", category: "Finance", accountNo: "684755551234568", payeeName: "Ivy Lee" },
        { id: 11, name: "Mortgage Lender", category: "Finance", accountNo: "684754445678902", payeeName: "Jack Martin" },
        { id: 12, name: "Auto Loan", category: "Finance", accountNo: "684753337890124", payeeName: "Karen Nelson" },
        { id: 13, name: "Student Loan", category: "Finance", accountNo: "684752223456790", payeeName: "Larry Ortiz" },
        { id: 14, name: "Home Security", category: "Home", accountNo: "684751112345679", payeeName: "Mona Perez" },
        { id: 15, name: "Lawn Service", category: "Home", accountNo: "684751234567892", payeeName: "Nina Quinn" },
        { id: 16, name: "Pest Control", category: "Home", accountNo: "684759876543212", payeeName: "Oscar Roberts" },
        { id: 17, name: "Magazine Subscription", category: "Entertainment", accountNo: "684755551234569", payeeName: "Paula Scott" },
        { id: 18, name: "Cloud Storage", category: "Technology", accountNo: "684754445678903", payeeName: "Quinn Taylor" },
        { id: 19, name: "Software License", category: "Technology", accountNo: "684753337890125", payeeName: "Rita Upton" },
        { id: 20, name: "Online Education", category: "Education", accountNo: "684752223456791", payeeName: "Sam Vance" },
        { id: 21, name: "Charity Donation", category: "Charity", accountNo: "684751112345680", payeeName: "Tina White" },
        { id: 22, name: "Music Streaming", category: "Entertainment", accountNo: "684751234567893", payeeName: "Uma Xavier" },
        { id: 23, name: "Online Newspaper", category: "News", accountNo: "684759876543213", payeeName: "Victor Young" },
        { id: 24, name: "E-commerce Subscription", category: "Retail", accountNo: "684755551234570", payeeName: "Wendy Zhao" },
        { id: 25, name: "Travel Agency", category: "Travel", accountNo: "684754445678904", payeeName: "Xander Blue" }
    ]


    // Handler for the current page reference.
    // Initializes component properties based on the state object.
    @wire(CurrentPageReference)
    pageRefHandler({ state }) {
        if (state && state.data) {
            let newBiller = {
                name: state.data.name ? state.data.name : "",
                payeeName: state.data.payeeName ? state.data.payeeName : "",
                category: state.data.category ? state.data.category : "",
                accountNo: state.data.accountNo ? state.data.accountNo : "",
            }
            console.log(newBiller)
            this.billers.push(newBiller);
        }
    }




    // Function to perform actions on navigation to Add Biller Page, and navigating to Add Biller Page
    navigateToAddBiller() {
        this.navigateTo(CB_Page_AddBiller)
    }


    confirmAndDeleteBiller(event) {
        this.billerToDelete = event.detail.id
        this.confirmDeleteModal = true
    }

    deleteBiller(id) {
        this.billers = this.billers.filter(biller => biller.id !== id)
    }
    editBiller(event) {
        let id = event.detail.id
        this.billerToEdit = this.billers.find((biller) => biller.id === id)
        this.openBillerEditModal = true
    }


    closeEditModal(event) {
        let updatedBiller = event.detail.data
        this.openBillerEditModal = false
        let ind = 0
        let newBillers = this.billers.filter((biller, i) => {
            if (biller.id === updatedBiller.id) {
                ind = i
            }
            return biller.id !== updatedBiller.id
        })

        newBillers[ind] = updatedBiller;
        this.billers = newBillers
    }


    // Helper function for navigation to a specified page with optional state data.
    // Uses the NavigationMixin to navigate.
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