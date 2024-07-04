import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';



import CB_Page_ManageBillers from '@salesforce/label/c.CB_Page_ManageBillers'
import CB_AddBiller from '@salesforce/label/c.CB_AddBiller'
import CB_BillerName from '@salesforce/label/c.CB_BillerName'
import CB_PayeeName from '@salesforce/label/c.CB_PayeeName'
import CB_BillerCategory from '@salesforce/label/c.CB_BillerCategory'
import CB_AccountNo from '@salesforce/label/c.CB_AccountNo'
import CB_Done from '@salesforce/label/c.CB_Done'
import CB_SearchBillers from '@salesforce/label/c.CB_SearchBillers'
import CB_ProcessinsKindlyWait from '@salesforce/label/c.CB_ProcessinsKindlyWait';
import CB_Yes from '@salesforce/label/c.CB_Yes'
import CB_Ok from '@salesforce/label/c.CB_Ok'
import CB_Cancel from '@salesforce/label/c.CB_Cancel'
import CB_AddTheBiller from '@salesforce/label/c.CB_AddTheBiller'
import CB_BillerAddedSuccessFully from '@salesforce/label/c.CB_BillerAddedSuccessFully'


export default class CBAddBiller extends NavigationMixin(LightningElement) {



    label = {
        CB_BillerName,
        CB_PayeeName,
        CB_BillerCategory,
        CB_AccountNo,
        CB_Done,
        CB_SearchBillers,
        CB_Yes,
        CB_Cancel
    }


    headerConfguration = {
        previousPageUrl: CB_Page_ManageBillers,
        heading: CB_AddBiller,
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        },
    }

    @track finalModalConf = {
        title: '',
        message: CB_BillerAddedSuccessFully,
        loadingStatusMsg: CB_ProcessinsKindlyWait,
        isLoading: true,
        yesButton: {
            exposed: true,
            label: CB_Ok,
            implementation: () => {
                this.navigateTo(CB_Page_ManageBillers, this.billerToAdd)
                this.finalModal = false
            }
        },
        notOkButton: {
            exposed: false,
        }
    }


    billerName = ''
    confirmAddModal = false
    billerToAdd = {}
    finalModal = false


    apiCallout() {
        this.finalModal = true
        setTimeout(() => {
            this.finalModalConf.isLoading = false
        }, 2500)
    }


    billers = [
        { id: 1, name: "Cable TV", category: "Entertainment", accountNo: "684755432109876", payeeName: "Aiden Cole" },
        { id: 2, name: "Electricity Board", category: "Utilities", accountNo: "684756543210987", payeeName: "Brittany Dawson" },
        { id: 3, name: "Heating Services", category: "Utilities", accountNo: "684757654321098", payeeName: "Carlos Edwards" },
        { id: 4, name: "Mobile Data Provider", category: "Telecommunications", accountNo: "684758765432109", payeeName: "Dana Foster" },
        { id: 5, name: "Satellite TV", category: "Entertainment", accountNo: "684759876543210", payeeName: "Evan Green" },
        { id: 6, name: "Digital Newspaper", category: "News", accountNo: "684750987654321", payeeName: "Fiona Harris" },
        { id: 7, name: "Home Internet", category: "Telecommunications", accountNo: "684751234567809", payeeName: "George Irwin" },
        { id: 8, name: "Car Insurance", category: "Insurance", accountNo: "684752345678901", payeeName: "Hannah Jackson" },
        { id: 9, name: "Life Insurance", category: "Insurance", accountNo: "684753456789012", payeeName: "Ian Kelly" },
        { id: 10, name: "Fitness Club", category: "Health", accountNo: "684754567890123", payeeName: "Jenna Lewis" },
        { id: 11, name: "Home Mortgage", category: "Finance", accountNo: "684755678901234", payeeName: "Kyle Morgan" },
        { id: 12, name: "Personal Loan", category: "Finance", accountNo: "684756789012345", payeeName: "Lara Nichols" },
        { id: 13, name: "Electric Vehicle Loan", category: "Finance", accountNo: "684757890123456", payeeName: "Michael Owens" },
        { id: 14, name: "Household Maintenance", category: "Home", accountNo: "684758901234567", payeeName: "Nina Parker" },
        { id: 15, name: "Gardening Service", category: "Home", accountNo: "684759012345678", payeeName: "Oscar Quinn" },
        { id: 16, name: "Residential Cleaning", category: "Home", accountNo: "684750123456789", payeeName: "Paula Rivera" },
        { id: 17, name: "Magazine Renewal", category: "Entertainment", accountNo: "684751234567891", payeeName: "Quentin Stevens" },
        { id: 18, name: "Tech Support", category: "Technology", accountNo: "684752345678902", payeeName: "Rachel Thomas" },
        { id: 19, name: "Antivirus Subscription", category: "Technology", accountNo: "684753456789013", payeeName: "Steven Underwood" },
        { id: 20, name: "E-learning Platform", category: "Education", accountNo: "684754567890124", payeeName: "Tara Vincent" }
    ];

    /**
    * Method to open the logout confirmation modal
    * Sets the modalOpen property to true to open the logout confirmation modal.
    * @returns {void}
    */
    modal = {
        title: CB_AddTheBiller,
        message: '',
        yesButton: {
            exposed: true,
            label: CB_Yes,
            implementation: () => {
                this.confirmAddModal = false
                this.addBiller()
            }
        },
        noButton: {
            exposed: true,
            label: CB_Cancel,
            implementation: () => {
                this.confirmAddModal = false
            }
        },
    };



    connectedCallback() {
        this.searchedBillers = [...this.billers]
    }


    searchBiller(event) {
        this.billerName = event.target.value
        this.filterBillers(this.billerName)
    }

    filterBillers(substr) {
        let newBillers = this.billers.filter((biller) => {
            return biller.name.includes(substr)
        })
        this.searchedBillers = newBillers
    }





    addBiller() {
        this.apiCallout()
    }



    // Helper function for navigation to a specified page with optional state data.
    // Uses the NavigationMixin to navigate.
    navigateTo(pageApiName, data = {}) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            },
            state: { data }
        });
    }


    openConfirmModal(event) {
        let id = event.currentTarget.dataset.id
        let selectedBiller = this.billers.find(biller => biller.id == Number(id))
        this.billerToAdd = { ...selectedBiller }
        this.confirmAddModal = true
    }

}