import { LightningElement, track, api, wire } from 'lwc';

export default class CBFavoriteAccountNew extends LightningElement {


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



    handleAccountAddDelete(event) {
        if (this.addActivated || this.deleteActivated) {
            const accountIdFromDiv = event.currentTarget.dataset.acc;
            const accountIdFromCheckB = event.currentTarget.dataset.id;
            const addCheckbox = this.template.querySelector(`input[data-id="${accountIdFromDiv ? accountIdFromDiv : accountIdFromCheckB}"]`);
            addCheckbox.checked = addCheckbox.checked ? false : true
        }
    }







    handleSave() {
        const addCheckboxes = this.template.querySelectorAll('.checkbox-input');
        console.log(addCheckboxes)
        Array.from(addCheckboxes).map((checkbox) => {
            if (checkbox.checked) {
                this.addAccount(checkbox.dataset.id)
            }
        })
        console.log(JSON.stringify(this.accountsToAdd))
        this.closeModal()
    }

    handleDelete() {
        const addCheckboxes = this.template.querySelectorAll('.checkbox-input');
        console.log(addCheckboxes)
        Array.from(addCheckboxes).map((checkbox) => {
            if (checkbox.checked) {
                this.deleteAccount(checkbox.dataset.id)
            }
        })
        console.log(JSON.stringify(this.accountsToDelete))
        this.closeModal()
    }

    addAccount(id) {
        this.accounts.map((acc) => {
            if (acc.accountNo === id) {
                this.accountsToAdd.push(acc)
            }
        })
    }


    deleteAccount(id) {
        this.accounts.map((acc) => {
            if (acc.accountNo === id) {
                this.accountsToDelete.push(acc)
            }
        })

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