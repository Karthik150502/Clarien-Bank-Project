/*
    Author - 
    Created Date - 28/03/2024
    Modified Date - 
    Description - 
*/

import { LightningElement, track } from 'lwc';
import getFavoriteStatus from '@salesforce/apex/CBFavAccountController.getFavoriteStatus';
import addFavorite from '@salesforce/apex/CBFavAccountController.addFavorite';
import removeFavorite from '@salesforce/apex/CBFavAccountController.removeFavorite';

export default class CBFavoriteAccounts extends LightningElement {

    expandDetails = true;
    isDataLoading=true;
    configuration = {
        previousPageUrl: 'Home',
        heading: 'Accounts',
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }, favorite: {
            selected: false
        }
    }


    // Sample data for account number, balance, and hold balance
   @track accountsData = [
        { accountNo: '600017725563', accountBal: 'BMD 5556.54', currentBal:'BMD 6857.42', totalHolds: 'BMD 0.0', accountType: 'SAVINGS ACCOUNT', favorite: false },
        { accountNo: '698547452632', accountBal: 'BMD 5556.54', currentBal:'BMD 6857.42', totalHolds: 'BMD 0.0', accountType: 'CURRENT ACCOUNT', favorite: false },
        { accountNo: '658596541425', accountBal: 'BMD 5556.54', totalHolds: 'BMD 0.0', currentBal:'BMD 6857.42', accountType: 'SAVINGS ACCOUNT', favorite: false },
        { accountNo: '652547896541', accountBal: 'BMD 5556.54', totalHolds: 'BMD 0.0', currentBal:'BMD 6857.42', accountType: 'JOINT ACCOUNT', favorite: false },
        { accountNo: '365474859654', accountBal: 'BMD 55874.65', totalHolds: 'BMD 112.65', currentBal:'BMD 6857.42', accountType: 'CREDIT CARD ACCOUNT', favorite: false },
        { accountNo: '645187941316', accountBal: 'BMD 87845.33', totalHolds: 'BMD 45.65', currentBal:'BMD 6857.42', accountType: 'TIME DEPOSIT ACCOUNT', favorite: false },
        { accountNo: '654125698745', accountBal: 'BMD 99874.66', accountType: 'LOAN ACCOUNT', favorite: false, nextInterestDate: '22/05/2024', nextInterestAmt: 'BMD 2564.00' }
    ];


    connectedCallback() {
        this.updateFavoriteStatus();
    }

    updateFavoriteStatus() {
        let accountNumbers = this.accountsData.map(account => account.accountNo);

        getFavoriteStatus({ accountNumbers })
            .then(result => {
                console.log('Result --->'+JSON.stringify(result))

                this.accountsData = this.accountsData.map(account => {
                    console.log(account.accountNo+'--->'+result[account.accountNo])
                    return { ...account, favorite: result[account.accountNo] };
                });
                this.formatAccData()
            })
            .catch(error => {
                console.log('Error:', error);
                console.log('Error:', error.body.message);
            });
    }

    formatAccData() {
        this.accountsData = this.sort0sAnd1s(this.accountsData)
    }

    sort0sAnd1s(arr) {
        let i = 0;
        let j = arr.length - 1;
        let N = arr.length - 1
        while (i < j) {
            while (i < N && arr[i].favorite) {
                i++;
            }
            while (j > 0 && !arr[j].favorite) {
                j--;
            }
            if (!arr[i].favorite && arr[j].favorite) {
                [arr[i], arr[j]] = [arr[j], arr[i]]
            }
        }
        if (arr[i].favorite && !arr[j].favorite) {
            [arr[i], arr[j]] = [arr[j], arr[i]]
        }
        this.isDataLoading=false;
        return [...arr]
    }


    // Object to manage header icons
    header_icons = {
        // Announcements icon settings
        announcements: {
            exposed: true,  // Whether to display the Announcements icon
            haveItems: true // Whether the Announcements icon has items to display
        },
        // Whether to display the Announcements icon
        notifications: {
            exposed: true,  // Whether to display the Notifications icon
            haveItems: true // Whether the Notifications icon has items to display
        },
        // Inbox icon settings
        inbox: {
            exposed: true,  // Whether to display the Inbox icon
            haveItems: true // Whether the Inbox icon has items to display
        },
        // Scan Code icon settings
        scanCode: {
            exposed: false, // Whether to display the Scan Code icon
            haveItems: false    // Whether the Scan Code icon has items to display
        }
    };


    removefavacc(event) {
        this.isDataLoading=true;
        if (event.detail && event.detail.accountNo) {
            const accountNo =event.detail.accountNo;
            const account = this.accountsData.find(acc => acc.accountNo === accountNo);
            if (account.favorite) {
                removeFavorite({ accountNumber: accountNo })
                .then(() => {
                    this.updateFavoriteStatus();
                })
                .catch(error => {
                    console.error('Error:', error);
                });            }
        }
    }


    addfavacc(event) {
        this.isDataLoading=true;
        if (event.detail && event.detail.accountNo) {
            const accountNo =event.detail.accountNo;
            const account = this.accountsData.find(acc => acc.accountNo === accountNo);
            if (!account.favorite) {
                addFavorite({ accountNumber: accountNo })
                .then(() => {
                    this.updateFavoriteStatus();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }
        }

       
    }


}