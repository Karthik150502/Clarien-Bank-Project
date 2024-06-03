import { LightningElement,api } from 'lwc';

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
        this.dispatchEvent(new CustomEvent("createbeneficiary"));
    }
}