import { LightningElement, track } from 'lwc';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBFavoriteAccountAdd extends LightningElement {

    CBAddIcon = `${CBSVG}/CBSVGs/CBAddIcon.svg#CBAddIcon`;
    CBBin = `${CBSVG}/CBSVGs/CBBin.svg#CBBin`;
    CBCloseModel = `${CBSVG}/CBSVGs/CBCloseModel.svg#CBCloseModel`;

    addActivated = false
    addClass = 'add-logo header-logos header-add inactive'
    deleteActivated = false
    deleteClass = 'delete-logo header-logos header-delete inactive'

    @track accounts = [
        {
            accountNo: '658745823',
            accountType: 'Savings Account',
        },
        {
            accountNo: '698745123',
            accountType: 'Current Account',
        },
        {
            accountNo: '645128796',
            accountType: 'Loan Account',
        },
        {
            accountNo: '697452145',
            accountType: 'Time Deposit Account',
        },
        {
            accountNo: '654141478',
            accountType: 'Credit card Account',
        },
        {
            accountNo: '698745823',
            accountType: 'Savings Account',
        },
        {
            accountNo: '665545589',
            accountType: 'Current Account',
        },
        {
            accountNo: '654142536',
            accountType: 'Time Deposit Account',
        },

    ]

    accountsToAdd = []
    accountsToDelete = []

    get addOrDelete() {
        return !this.addActivated && !this.deleteActivated
    }


    get disableDivClass() {
        return !this.addActivated && !this.deleteActivated ? 'account-tile inactive' : 'account-tile'
    }

    activateAdd() {
        this.addActivated = true
        this.addClass = 'add-logo header-logos header-add active'
        this.deleteActivated = false
        this.deleteClass = 'delete-logo header-logos header-delete inactive'
    }

    activateDelete() {
        this.deleteActivated = true
        this.deleteClass = 'delete-logo header-logos header-delete active'
        this.addActivated = false
        this.addClass = 'add-logo header-logos header-add inactive'
    }




    get showCheckBox() {
        return this.addActivated || this.deleteActivated
    }


    handleSave() {
        const addCheckboxes = this.template.querySelectorAll('.checkbox-input');
        Array.from(addCheckboxes).map((checkbox) => {
            if (checkbox.checked) {
                this.accountsToAdd.push(this.accounts.find((acc) => {
                    return acc.accountNo === checkbox.dataset.id
                }))
            }
        })
        console.log(JSON.stringify(this.accountsToAdd))
        this.closeModal()
    }

    handleDelete() {
        const addCheckboxes = this.template.querySelectorAll('.checkbox-input');
        Array.from(addCheckboxes).map((checkbox) => {
            if (checkbox.checked) {
                this.deleteAccount.push(this.accounts.find((acc) => {
                    return acc.accountNo === checkbox.dataset.id
                }))
            }
        })
        console.log(JSON.stringify(this.accountsToDelete))
        this.closeModal()
    }



    closeModal() {
        let event = new CustomEvent('closemodal', {
            bubbles: true,
            detail: {

            }
        })

        this.dispatchEvent(event)
    }
}