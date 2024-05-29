import { LightningElement } from 'lwc';

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

    status = true
    statusHandler(){
        this.status = !this.status
    }
}