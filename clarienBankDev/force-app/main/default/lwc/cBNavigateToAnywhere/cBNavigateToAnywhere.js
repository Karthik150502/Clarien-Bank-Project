/*
    Author - __
    Created Date - __/__/202_
    Modified Date - __/__/202_, __/__/202_
    Description - {***Purpose of creation or modification, Additional Comment***}
*/

import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class CBNavigateToAnywhere extends NavigationMixin(LightningElement) {

    apiName = ''
    modalOpen = false
    handleInput(event) {
        this.apiName = event.target.value
    }

    errorCallback(error, stack) {
        console.log('Error--> ' + JSON.stringify(error))
        console.log('Stack --> ' + JSON.stringify(stack))
    }

    connectedCallback() {
    }

    modal = {
        title: 'session has ended',
        message: '',
        yesButton: {
            exposed: true,
            label: "Ok",
            implementation: () => {
                console.log('yes');
                this.modalOpen = false
                this.logout();
            }
        },
        noButton: {
            exposed: false,
            label: "Cancel",
            implementation: () => {
                console.log('no');
                this.modalOpen = false
            }
        },
    }


    modalOpenHandler() {
        console.log("Modal opened!!")
        this.modalOpen = true;
    }


    navigate() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: this.apiName
            }
        })
    }



    logout() {
        // your function for too long inactivity goes here
        // e.g. window.location.href = 'logout.php';
        console.log('session ended');
        // Get the current domain
        let domain = window.location.href;
        // Find the index of "/s"
        let index = domain.indexOf("/s");
        if (index !== -1) {
            // Remove everything till "/s"
            domain = domain.substring(0, index);
        }
        console.log('Logout link:', `${domain}/secur/logout.jsp`);

        window.location.href = `${domain}/secur/logout.jsp`;
    }

    darkMode = false;
    darkModeLabel = 'Enable Dark Mode';

    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        this.darkModeLabel = this.darkMode ? 'Disable Dark Mode' : 'Enable Dark Mode';
        const htmlElement = document.querySelector('html');
        console.log(htmlElement);
        htmlElement.classList.toggle('native-dark-active', this.darkMode);
    }
    favAccModalOpened = false
    openFavAccountModal() {
        this.favAccModalOpened = true
    }
    closeFavAccountModal() {
        this.favAccModalOpened = false
    }
}