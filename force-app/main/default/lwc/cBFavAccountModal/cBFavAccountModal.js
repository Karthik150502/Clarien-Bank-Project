import { LightningElement } from 'lwc';

export default class CBFavAccountModal extends LightningElement {


    addAccountsShow = true
    addAccsBtnClass = 'add-accs-toggle box-shadowed'
    deleteAccsBtnClass = 'delete-accs-toggle backdrop'




    showAddAccounts() {
        this.addAccountsShow = true
        this.deleteAccsBtnClass = 'delete-accs-toggle backdrop'
        this.addAccsBtnClass = 'add-accs-toggle box-shadowed'
        console.log('this.addAccountsShow --> ' + this.addAccountsShow)
    }

    showDeleteAccounts() {
        this.addAccountsShow = false
        this.addAccsBtnClass = 'add-accs-toggle backdrop'
        this.deleteAccsBtnClass = 'delete-accs-toggle box-shadowed'
        console.log('this.addAccountsShow --> ' + this.addAccountsShow)
    }
}