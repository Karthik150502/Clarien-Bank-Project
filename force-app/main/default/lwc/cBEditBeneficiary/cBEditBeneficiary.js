import { LightningElement } from 'lwc';

export default class CBEditBeneficiary extends LightningElement {
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
}