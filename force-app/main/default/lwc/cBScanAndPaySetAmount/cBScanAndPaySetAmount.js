import { LightningElement, wire } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';
import { getMobileSessionStorage } from 'c/cBUtilities';

import SUBMIT from '@salesforce/label/c.CB_Submit';
import REMARKS from '@salesforce/label/c.CB_Remarks'
import DATE from '@salesforce/label/c.CB_Date'
import AMOUNT from '@salesforce/label/c.CB_Amount'
import FROM_ACCOUNT from '@salesforce/label/c.CB_FromAccount'
import SELECT_ACCOUNT from '@salesforce/label/c.CB_SelectAccount'
import CUSTOMER_NAME from '@salesforce/label/c.CB_CustomerName'
import I_TRANSFER from '@salesforce/label/c.CB_iTransfer';


import decrypt from '@salesforce/apex/CBUtilityController.performDecrypt';

export default class CBScanAndPaySetAmount extends NavigationMixin(LightningElement) {
    // Object to hold imported labels
    label = {
        SUBMIT, // Converting "Submit" label to uppercase
        REMARKS,
        DATE,
        AMOUNT,
        FROM_ACCOUNT,
        SELECT_ACCOUNT,
        CUSTOMER_NAME,
        I_TRANSFER
    };

    encryptKey = ''
    encryptData = ''

    @wire(CurrentPageReference)
    urlHandler({ state }) {
        if(state) {
            console.log(state.data);
            this.getEncryptedValue(String(state.data));
            this.decryptAccount();
        }else {
            console.log('no data in url');
        }
    }

    getEncryptedValue(url) {     
        const regex = /account\/(.*)$/;
        const match = url.match(regex);
        if (match) {
            let [key, data] = match[1].slice(0, -1).split('$#$');
            this.encryptKey = key;
            this.encryptData = data;
            console.log('key: ', this.encryptKey);
            console.log('data: ', this.encryptData);
        }
    }

    decryptAccount() {
        decrypt({ encryptedKeyText: this.encryptKey, encryptedBlobText: this.encryptData })
        .then((result)=> {
            console.log(result);
            const [ accountNo, name ] = result.split(',');
            this.customerName = name;
            this.toAccount = accountNo;
        })
        .catch((error)=> {
            console.log('error in decrypting value', error);
        })
    }

    headerConfguration = {
        previousPageUrl: 'Home',
        heading: I_TRANSFER,
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        },
        favorite: {
            selected: false
        }
    }



    connectedCallback() {

    }


    setAccountData(){
        this.accounts = JSON.parse(getMobileSessionStorage('CB_All_Account_Details')) ? JSON.parse(getMobileSessionStorage('CB_All_Account_Details')) : [];
    }

    accounts = [
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
        {
            accountNo: '659855541254',
            accountType: 'Savings Account',
            accBal: 'BMD 1,5601.55'
        },
    ]


    selectedFromAccount = ''
    remarks = ''
    number = 1
    amount = ''
    dateSelected = new Date().toLocaleDateString();
    customerName = ''
    toAccount = ''

    handleAmount(event) {
        this.amount = event.target.value
    }

    handleFromAccount(event) {
        this.selectedFromAccount = event.target.value
    }

    handleRemarks(event) {
        this.remarks = event.detail.remarks
    }

    handleSubmit() {
        console.log('this.date = ' + this.dateSelected)
        console.log('this.amount = ' + this.amount)
        console.log('this.selectedFromAccount = ' + this.selectedFromAccount)
        let data = {
            amount: this.amount,
            date: this.dateSelected,
            customerName: this.customerName,
            fromAccount: this.selectedFromAccount,
        }
        this.navigateTo('CBBillPaymentsConfirmTrans__c', data)
    }

    navigateTo(pageApiName, state = {}) {
        const pageReference = {
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            },
            state
        };
        this[NavigationMixin.Navigate](pageReference);
    }


    get disableSubmit() {
        return this.verifyValues()
    }

    verifyValues() {
        return this.amount === '' || this.dateSelected === 'DD-MM-YYYY' || this.selectedFromAccount === this.label.SELECT_ACCOUNT
    }


}