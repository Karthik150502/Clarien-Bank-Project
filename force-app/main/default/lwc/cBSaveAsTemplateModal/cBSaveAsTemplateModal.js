import { LightningElement, api } from 'lwc';
import CBSVG from "@salesforce/resourceUrl/CBSVG"



export default class CBSaveAsTemplateModal extends LightningElement {


    CBReusableModelSuccessfull = `${CBSVG}/CBSVGs/CBReusableModelSuccessfull.svg#CBReusableModelSuccessfull`;
    okButtonVisible = false
    hasRendered = false
    textArea = null


    renderedCallback() {
        if (!this.hasRendered) {
            this.hasRendered = true
        }
    }
    saveTemplateClicked = false

    @api configuration = {
        title: 'Transfer Successful',
        message:'',
        okButton: {
            exposed: true,
            label: 'SAVE',
            function: () => {

            }
        },
        noButton: {
            exposed: true,
            label: 'CLOSE',
            function: () => {
            }
        },
    }


    closeModal(data = {}) {
        let evt = new CustomEvent('closemodal', {
            bubbles: true,
            detail: {
                ...data
            }
        })

        this.dispatchEvent(evt)
    }
    closeModalWithComments(comments) {
        let evt = new CustomEvent('closemodalwithcomments', {
            bubbles: true,
            detail: {
                comments
            }
        })

        this.dispatchEvent(evt)
    }

    saveTemplate() {
        // Save template functionality....
        this.closeModal()
    }

    okHandler() {
        let comments = this.template.querySelector(".success-modal-desc").value
        this.closeModalWithComments(comments)
    }


    handleEReceipt() {

    }

    handleSaveAsTemplate() {
        this.saveTemplateClicked = true
    }



}