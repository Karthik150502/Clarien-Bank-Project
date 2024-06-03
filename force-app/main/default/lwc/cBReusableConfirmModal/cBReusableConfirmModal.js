import { LightningElement, api } from 'lwc';

export default class CBReusableConfirmModal extends LightningElement {

    @api configuration // = {
    //     logo : true,
    //     message : ' Are you sure do you want to delete beneficiaries',
    //     navigateTo : {}
    // }

    handleCancel(){
        this.dispatchEvent(new CustomEvent('close'))
    }

    handleDelete(){
        // this.configuration.navigateTo()
        history.back();
    }
}