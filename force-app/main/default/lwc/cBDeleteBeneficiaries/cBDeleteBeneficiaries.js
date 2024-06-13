import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';

import CBSVG from "@salesforce/resourceUrl/CBSVG";

export default class CBDeleteBeneficiaries extends NavigationMixin(LightningElement) {

    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
        console.log('Page Ref', this.pageRef);
        console.log('Page Ref State', this.pageRef.state.benefList);
        this.beneficiaryList = JSON.parse(this.pageRef.state.benefList);
        console.log(JSON.stringify(this.beneficiaryList));
    }

    confirmModal = false

    configuration = {
        previousPageUrl: '',
        heading: 'Delete Beneficiaries',
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    @track confirmModalConfiguration = {
        logo: true,
        message: ' Are you sure do you want to delete beneficiaries?'
    }

    successfullyDeleted(){
        this.confirmModal = false
        this.modalOpen = true;
    }

    modalOpen = false;
    /**
    * Metadata for the Phone Update modal.
    */
    @track modal = {
        title: '',
        message: 'Beneficiaries deleted succesfully.',
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
    beneficiaryAction = {
        delete: true,
        detailView: false
    }

    beneficiaryList = []

    beneficiarySelected = []
    get disableButton() {
        this.beneficiarySelected.length < 1
    }
    selectedBeneficiary(event) {
        if (this.beneficiarySelected.includes(event.detail.accountNum)) {
            this.beneficiarySelected.pop(event.detail.accountNum)
        }
        else {
            this.beneficiarySelected.push(event.detail.accountNum)
        }
        console.log(this.beneficiarySelected.length, this.beneficiarySelected.length < 1);
        console.log(JSON.stringify(this.beneficiarySelected));
    }

    // navigateToIntraBankBeneficiary(){
    //     console.log('Intra called');
    //     this.navigateTo('CBIntraBankBeneficiary__c')
    // }

    // navigateToDomesticBeneficiary(){
    //     console.log('Domestic Called');
    //     this.navigateTo('CBDomesticBeneficiary__c')
    // }
    // navigateToInternationalBeneficiary(){
    //     console.log('called');
    //     this.navigateTo('CBInternationalBeneficiary__c')
    // }

    navigateTo(pageName) {
        console.log('navigate called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageName
            }
        });
    }

    handleDelete(event) {
        event.preventDefault()
        console.log("Delete Called");
        this.confirmModal = true
    }

    closeConfirmModal() {
        this.confirmModal = false
    }
}