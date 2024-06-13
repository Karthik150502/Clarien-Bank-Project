import { LightningElement, wire, track } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBEditBeneficiary extends LightningElement {

    CBEditIcon = `${CBSVG}/CBSVGs/CBEditIcon.svg#CBEditIcon`;

    @wire(CurrentPageReference) pageRef;
    get accountNumber() {
        return this.pageRef && this.pageRef.state.accountNum;
    }
    get accountType() {
        return this.pageRef && this.pageRef.state.accountType;
    }
    get beneficiaryBank() {
        return this.pageRef && this.pageRef.state.beneficiaryBank;
    }

    connectedCallback(){
        this.beneficiaryName = this.pageRef.state.name;
        this.status = this.pageRef?.state?.status
        console.log(this.status);
    }

    beneficiaryName = ''

    beneficiaryNameHandler(event){
        this.beneficiaryName = event.target.value
    }

    configuration = {
        previousPageUrl: '',
        heading: 'Edit Beneficiaries',
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    status = true
    statusHandler(){
        this.status = !this.status
    }

    // detail = [
    //     { id:0, label : 'Account', value : '6000017836'},
    //     { id:0, label : 'Account Type', value : 'Savings'},
    // ]
    handleSubmit(){
        this.modalOpen = true;
    }

    modalOpen = false;
    /**
    * Metadata for the Phone Update modal.
    */
    @track modal = {
        title: '',
        message: 'Beneficiary updated succesfully.',
        yesButton: {
            exposed: true,
            label: "OK",
            // Implementation for the "OK" button click action.
            implementation: () => {
                this.modalOpen = false;
                this.navigateBack()
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

    navigateBack(){
        history.back();
    }
}