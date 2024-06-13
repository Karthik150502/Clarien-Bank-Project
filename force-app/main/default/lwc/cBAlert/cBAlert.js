import { LightningElement } from 'lwc';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBAlert extends LightningElement {

    CBBackIcon = `${CBSVG}/CBSVGs/CBBackIcon.svg#CBBackIcon`;
    CBNotification = `${CBSVG}/CBSVGs/CBNotification.svg#CBNotification`;
    CBLogOut = `${CBSVG}/CBSVGs/CBLogOut.svg#CBLogOut`;
    headerConfguration = {
        previousPageUrl: 'Home',
        heading: 'Alerts',
        iconsExposed: true,
        logout: {
            exposed: true
        },
        search: {
            exposed: false
        }
    }

    previousPageUrl = '';
    modalOpen = false;
    alerts = [
        {
            id: 1,
            message: '0% interest for 12 months on credit card balance transfers. Save now!',
            time: '15 mins ago'
        },
        {
            id: 2,
            message: 'Open a new checking account, get a $200 bonus with direct deposit',
            time: '24 mins ago'
        },
        {
            id: 3,
            message: 'Auto loans at 2.99% APR. Quick approval. Apply now!',
            time: '5 days ago'
        },
        {
            id: 4,
            message: 'Home Equity Line of Credit at 1.99% APR for 6 months. Apply today!',
            time: '6 days ago'
        },
        {
            id: 5,
            message: 'New Online Banking! Enhanced features and security. Log in to explore.',
            time: '12 days ago'
        }
    ]

    modal = {
        title: 'Do you want to logout from Clarien Bank?',
        message: '',
        yesButton: {
            exposed: true,
            label: "Yes",
            implementation: () => {

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
        },
        noButton: {
            exposed: true,
            label: "Cancel",
            implementation: () => {
                console.log('no');
                this.modalOpen = false
            }
        },
    }

    navigateBack() {
        history.back();
    }

    logout() {
        this.modalOpen = true;
    }
}