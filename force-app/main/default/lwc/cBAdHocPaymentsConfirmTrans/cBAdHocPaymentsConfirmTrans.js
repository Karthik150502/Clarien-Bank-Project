import { LightningElement ,wire} from 'lwc';
import CONTINUE from '@salesforce/label/c.CB_Continue';
import CANCEL from '@salesforce/label/c.CB_Cancel';
import { CurrentPageReference } from 'lightning/navigation';
export default class CBAdHocPaymentsConfirmTrans extends LightningElement {

    @wire(CurrentPageReference) pageRef;

    label = {
        CONTINUE: CONTINUE.toUpperCase(), // Converting "Submit" label to uppercase
        CANCEL: CANCEL.toUpperCase(), // Converting "Cancel" label to uppercase
    };
    headerConfguration = {
        previousPageUrl: 'CBAdHocPayments__c',
        heading: 'Confirm Transaction',
        iconsExposed: false,
    }
    showModal = false
    modalconf = {
        title: 'Transfer Successful',
        message: '',
        okButton: {
            exposed: true,
            label: 'SAVE',
            function: () => {
                this.showModal = false
            }
        },
        noButton: {
            exposed: true,
            label: 'CLOSE',
            function: () => {
                this.showModal = false
            }
        },
        alertMsg: ''
    }


    fcpt = 'N/A'
    date = 'N/A'
    fcc = 'N/A'
    amount = 'N/A'
    fees = 'N/A'
    customerName = 'N/A'
    accRefNo = 'N/A'
    fromAccount = 'N/A'
    toAccount = 'N/A'
    disclaimer = 'Please be advised that payments that are not scheduled within the bank\'s normal business hours will not be processed until the next business date.'



    connectedCallback() {
        this.populateValues()
    }

    populateValues() {
        const state = this.pageRef && this.pageRef.state;
        if (state) {
            this.name = state.name || this.name;
            this.fromAccount = state.fromAccount || this.fromAccount;
            this.toAccount = state.toAccount || this.toAccount;
            this.date = state.date || this.date;
            this.fees = state.fees || this.fees;
            this.fcpt = state.fcpt || this.fcpt;
            this.fcc = state.fcc || this.fcc;
        }
    }



    handleCancel() {

    }


    handleSubmit() {
        console.log("Submitted...!")
        this.showModal = true
    }

    get disableSubmit() {

    }




    handleSaveAsTemplate() {
        console.log("handleSaveAsTemplate")
    }


    handleEReceipt() {
        console.log("handleEReceipt")
    }
    
    @wire(CurrentPageReference)
    handlePageReferenceChange(pageRef) {
        this.populateValues();
    }
}