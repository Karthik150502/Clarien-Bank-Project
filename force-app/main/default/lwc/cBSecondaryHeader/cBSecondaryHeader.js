import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import LOGOUT_CONFIRM_MESSAGE from '@salesforce/label/c.CB_Logout_Confirm_Message';

import CBSVG from "@salesforce/resourceUrl/CBSVG"
import { logout } from 'c/cBUtilities';

export default class CBSecondaryHeader extends NavigationMixin(LightningElement) {

    CBBackIcon = `${CBSVG}/CBSVGs/CBBackIcon.svg#CBBackIcon`;
    CBSearchIcon = `${CBSVG}/CBSVGs/CBSearchIcon.svg#CBSearchIcon`;
    CBHeaderLogOut = `${CBSVG}/CBSVGs/CBHeaderLogOut.svg#CBHeaderLogOut`;
    modalOpen = false;

    @api configuration = {
        previousPageUrl: '',
        heading: 'Feedback/ Rate Us',
        iconsExposed: true,
        logout: {
            exposed: true
        },
        search: {
            exposed: true
        },
        openTemplates: {
            transferTypePage: '',
        }
    }

    modal = {
        // Title of the logout confirmation modal
        title: LOGOUT_CONFIRM_MESSAGE,
        // Message in the logout confirmation modal (empty for now)
        message: '',
        // Metadata for the "Yes" button in the logout confirmation modal
        yesButton: {
            // Exposed property indicating visibility of the button
            exposed: true,
            // Label for the "Yes" button
            label: "Yes",
            // Implementation of the action performed when the "Yes" button is clicked
            implementation: () => {
                logout();
            }
        },
        // Metadata for the "Cancel" button in the logout confirmation modal
        noButton: {
            // Exposed property indicating visibility of the button
            exposed: true,
            // Label for the "Cancel" button
            label: "Cancel",
            // Implementation of the action performed when the "Cancel" button is clicked
            implementation: () => {
                // Close the modal by setting modalOpen property to false
                this.modalOpen = false;
            }
        },
    };

    navigateToTemplate() {
        this.navigateTo(this.configuration.favorite.templatePageName)
    }

    /**
    * Method to navigate back to a specified page
    * @param {string} pageName - The name of the page to navigate to
    */
    navigateTo(pageName) {
        console.log('navigate called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageName
            }
        });
    }

    // Actuates the user navigation to the previous page 
    navigateBack() {
        if (!this.configuration.previousPageUrl) {
            history.back();
        } else {
            try {
                const pageReference = {
                    type: 'comm__namedPage',
                    attributes: {
                        name: this.configuration.previousPageUrl
                    }
                };
                this[NavigationMixin.Navigate](pageReference);
            } catch (error) {
                console.log("Error occured--> " + error.body.message)
            }

        }
    }


    /**
    * Method to navigate back to a specified page with data to send
    * @param {string} pageName - The name of the page to navigate to
    */
    navigateWithParams(pageName, data = {}) {
        console.log('navigate called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageName
            },
            state: data
        });
    }


    // Modal is showed that directs the user to log out
    logoutUser() {
        this.modalOpen = true
    }

    navigateToTemplates() {
        this.navigateWithParams('CBTemplatesAndBenefs__c', { transfersTypePage: this.configuration.openTemplates.transferTypePage })
    }

}