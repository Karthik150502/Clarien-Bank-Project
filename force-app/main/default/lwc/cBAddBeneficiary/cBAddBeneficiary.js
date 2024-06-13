import { LightningElement, api,track } from 'lwc';

export default class CBAddBeneficiary extends LightningElement {

    configuration = {
        previousPageUrl: '',
        heading: 'Add Beneficiaries',
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    modalOpen = false;
    /**
    * Metadata for the Phone Update modal.
    */
    @track modal = {
        title: '',
        message: 'Beneficiary added succesfully.',
        yesButton: {
            exposed: true,
            label: "OK",
            // Implementation for the "OK" button click action.
            implementation: () => {
                this.modalOpen = false;
                this.dispatchEvent(new CustomEvent("createbeneficiary"));
            }
        },
        noButton: {
            exposed: false,
            label: "Not",
            //Implementation for the "Not" button click action.
            implementation: () => {
                console.log('no');
                this.modalOpen = false;
            }
        }
    };
    @api bankName=false
    status = true
    statusHandler(){
        this.status = !this.status
    }
    accountNumber = ''
    accountNumberHandler(event){
        this.accountNumber = event.target.value
    }
    beneficiaryName = ''
    beneficiaryNameHandler(event){
        this.beneficiaryName = event.target.value
    }
    beneficiaryBank = ''
    beneficiaryBankHandler(event){
        this.beneficiaryBank = event.target.value
    }

    get disableButton(){
        if(this.bankName){
            return this.accountNumber==='' || this.beneficiaryName==='' || this.beneficiaryBank ===''
        }
        else{
            return this.accountNumber==='' || this.beneficiaryName===''
        }
    }

    handleSubmit(){
        this.modalOpen = true;
    }
}