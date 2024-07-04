import { LightningElement, api } from 'lwc';
export default class CBTransaction extends LightningElement {

    // Public property to hold transaction data passed from the parent component
    @api transactionData

    transactionTypeFlag = false;
    // Computed property to return the appropriate style based on the transaction type flag
    get transactionStyle() {
        return this.transactionTypeFlag ? 'transactionDetail' : 'caption';
    }
    // Lifecycle hook that runs when the component is inserted into the DOM
    // Check if the transaction data contains the 'transactionType' key and set the flag accordingly
    connectedCallback() {
        this.transactionTypeFlag = Object.keys(this.transactionData).includes('transactionType')
    }

    get formattedAmount() {
        return Number(this.transactionData.amount).toLocaleString("en-US")
    }

    get runningFormattedAmount() {
        console.log(this.transactionData.runningAmount);
        return Number(this.transactionData.runningAmount).toLocaleString("en-US")
    }

    get runningAccountAvailable(){
        return this.transactionData.runningAmount ? true : false;
    }

    // Method to format the 

    showDetails = false
    // Handler for section toggle event to show or hide transaction details
    handleSectionToggle(event) {
        if (event.detail.openSections) {
            this.showDetails = !this.showDetails
            console.log('showDetails : ', this.showDetails);
        }
        console.log(event.detail.openSections);
        console.log('showDetails : ', this.showDetails);
    }

    // Computed property to return the appropriate class based on the transaction type (credit or debit)
    get checkCreditDebit() {
        return this.transactionData.type === 'credit' ? 'credit' : 'debit';
    }
}