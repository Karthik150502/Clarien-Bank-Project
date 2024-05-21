/*
    Author - 
    Created Date - 28/03/2024
    Modified Date - 
    Description - 
*/

import { LightningElement, track } from 'lwc';

export default class CBFavoriteAccounts extends LightningElement {

    expandDetails = true;
    favAccModalOpened = false





    // Sample data for account number, balance, and hold balance
    accountsData = [
        {
            accountNo: '600017725563',
            accountBal: 'BMD 5556.54',
            totalHolds: 'BMD 0.0',
            accountType: 'SAVINGS ACCOUNT',
            favorite: false
        },
        {
            accountNo: '698547452632',
            accountBal: 'BMD 5556.54',
            totalHolds: 'BMD 0.0',
            accountType: 'SAVINGS ACCOUNT',
            favorite: true
        },
        {
            accountNo: '658596541425',
            accountBal: 'BMD 5556.54',
            totalHolds: 'BMD 0.0',
            accountType: 'SAVINGS ACCOUNT',
            favorite: false
        },
        {
            accountNo: '652547896541',
            accountBal: 'BMD 5556.54',
            totalHolds: 'BMD 0.0',
            accountType: 'SAVINGS ACCOUNT',
            favorite: false
        },
        {
            accountNo: '365474859654',
            accountBal: 'BMD 55874.65',
            totalHolds: 'BMD 112.65',
            accountType: 'CURRENT ACCOUNT',
            favorite: true
        },
        {
            accountNo: '645187941316',
            accountBal: 'BMD 87845.33',
            totalHolds: 'BMD 45.65',
            accountType: 'TIME ACCOUNT',
            favorite: true
        },
        {
            accountNo: '654125698745',
            accountBal: 'BMD 99874.66',
            accountType: 'LOAN ACCOUNT',
            favorite: true,
            nextInterestDate: '22/05/2024',
            nextInterestAmt: 'BMD 2564.00'
        }
    ]


    connectedCallback() {
        this.formatAccData()
    }


    formatAccData() {
        this.accountsData = [...this.sortByFavorites(this.accountsData)]
    }

    sortByFavorites(accs) {
        Array.prototype.sortByFavorite = function () {

            return this.sort((a, b) => {

                if (a.favorite && !b.favorite) {
                    return -1; // a comes before b
                } else if (!a.favorite && b.favorite) {
                    return 1; // b comes before a
                } else {
                    return 0; // maintain original order
                }
            });
        };
        return accs.sortByFavorite()
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

    favAccountIdsAdd = new Set();
    favAccountIdsDelete = new Set();


    disconnectedCallback() {
        // Update the favorite accounts on component disconnect!!!
    }

    removefavacc(event) {
        if (event.detail && event.detail.accountNo) {
            if (this.favAccountIdsAdd.has(event.detail.accountNo)) {
                this.favAccountIdsAdd.delete(event.detail.accountNo)
            } else {
                this.favAccountIdsDelete.add(event.detail.accountNo);
            }
        }
        let updatedAccounts = this.accountsData.map((acc, index) => {
            return {
                ...acc,
                favorite: acc.accountNo === event.detail.accountNo ? false : acc.favorite
            }

        })
        this.accountsData = [...this.sortByFavorites(updatedAccounts)]
        console.log('Favorite Accounts needed to be added -->' + Array.from(this.favAccountIdsAdd))
        console.log('Favorite Accounts needed to be removed -->' + Array.from(this.favAccountIdsDelete))

    }


    addfavacc(event) {
        if (event.detail && event.detail.accountNo) {
            if (this.favAccountIdsDelete.has(event.detail.accountNo)) {
                this.favAccountIdsDelete.delete(event.detail.accountNo)
            } else {
                this.favAccountIdsAdd.add(event.detail.accountNo)
            }
        }

        let updatedAccounts = this.accountsData.map((acc, index) => {
            return {
                ...acc,
                favorite: acc.accountNo === event.detail.accountNo ? true : acc.favorite
            }

        })
        this.accountsData = [...this.sortByFavorites(updatedAccounts)]
        console.log('Favorite Accounts needed to be added -->' + Array.from(this.favAccountIdsAdd))
        console.log('Favorite Accounts needed to be removed -->' + Array.from(this.favAccountIdsDelete))
    }


    openFavAccountModal() {
        this.favAccModalOpened = true
    }
    closeFavAccountModal() {
        this.favAccModalOpened = false
    }

}