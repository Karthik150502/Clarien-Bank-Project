import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'
export default class CBFilterTransactionPage extends NavigationMixin(LightningElement) {

    @api previousPageUrl = '';

    fromDate = 'DD-MM-YYYY'
    toDate = 'DD-MM-YYYY'
    selectedTransactionType = ''
    transactionTypes = ["Credit", "Debit"]
    fromAmount = ''
    toAmount = ''

    filterDate = false;
    filterType = false;

    headerConfguration = {
        previousPageUrl: this.previousPageUrl,
        heading: 'Filter Transaction',
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }



    connectedCallback() {
        console.log(this.previousPageUrl, this.headerConfguration.previousPageUrl);
        this.setCurrentDate()
    }

    fromDateHandler(event) {
        this.fromDate = this.formatDate(event.target.value)
    }

    toDateHandler(event) {
        this.toDate = this.formatDate(event.target.value)
    }
    handleFromAmount(event) {
        this.fromAmount = event.target.value
    }


    handleToAmount(event) {
        this.toAmount = event.target.value
    }

    formatDate(date) {
        let res = date.split("-")
        return `${res[2]}-${res[1]}-${res[0]}`
    }
      

    handleFilterDate() {
        this.filterDate = !this.filterDate;
        this.filterType = false;
        this.fromAmount = ''
        this.toAmount = ''
        this.selectedTransactionType = ''
    }

    handleFilterType() {
        this.filterType = !this.filterType;
        this.filterDate = false;
        this.fromDate = 'YYYY-MM-DD';
        this.toDate = 'YYYY-MM-DD';
    }

    handleSubmit() {
        console.log(this.fromAmount)
        console.log(this.toAmount)
        console.log(this.fromDate)
        console.log(this.toDate)
        console.log(this.selectedTransactionType)
        if(this.filterDate) {
            this.navigateTo(this.previousPageUrl,{fromDate:this.fromDate,toDate:this.toDate})
        }
        else if(this.filterType) {
            this.navigateTo(this.previousPageUrl,{fromAmount:this.fromAmount,toAmount:this.toAmount,selectedTransaction:this.selectedTransactionType})
        }
    }

    handleCancel() {
        this.navigateTo(this.previousPageUrl)
    }

    // Helper function for navigation
    navigateTo(pageApiName,data) {
        console.log('Navigation Called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            },
            state:data
        });
    }

    get disableDoneButton() {
        if(this.filterDate) {
            return this.fromDate === 'YYYY-MM-DD' || this.toDate === 'YYYY-MM-DD'
        }
        if(this.filterType) {
            return  this.selectedTransactionType === '' || this.fromAmount === '' || this.toAmount === '' 
        }
        return false;
    }



    setCurrentDate() {
        let today = new Date()
        this.currDate = `${today.getFullYear()}-${String(today.getMonth() + 1) < 10 ? "0" : ""}${today.getMonth() + 1}-${today.getDate() < 10 ? '0' : ''}${today.getDate()}`
        console.log(this.currDate)
    }


    get fromDateMax() {
        if (this.currDate && this.toDate === 'YYYY-MM-DD') {
            return this.currDate
        } else if (this.toDate) {
            return this.toDate
        }
        return ''
    }

    get toDateMax() {
        if (this.currDate) {
            return this.currDate
        }
        return ''
    }


    handleTransactionType(event) {
        this.selectedTransactionType = event.target.value
    }
}