import { LightningElement, api } from 'lwc';
export default class CBTransaction extends LightningElement {
    @api transactionData

    // transactionData={
    //     CHQSId:'CHQS2374904890',
    //     EMIId:'233749082665',
    //     date:'01/09/23'
    // }



    transactionTypeFlag = false;
    get transactionStyle() {
        return this.transactionTypeFlag ? 'transactionDetail' : 'caption';
    }

    connectedCallback() {
            this.transactionTypeFlag = Object.keys(this.transactionData).includes('transactionType')
    }

    showDetails = false
    handleSectionToggle(event) {
        if (event.detail.openSections) {
            this.showDetails = !this.showDetails
            console.log('showDetails : ', this.showDetails);
        }
        console.log(event.detail.openSections);
        console.log('showDetails : ', this.showDetails);
    }

    get checkCreditDebit() {
        return this.transactionData.type === 'credit' ? 'credit':'debit';
    }
}