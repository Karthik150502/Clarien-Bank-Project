import { LightningElement } from 'lwc';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBAlert extends LightningElement {

    CBBackIcon = `${CBSVG}/CBSVGs/CBBackIcon.svg#CBBackIcon`;
CBNotification = `${CBSVG}/CBSVGs/CBNotification.svg#CBNotification`;
CBLogOut = `${CBSVG}/CBSVGs/CBLogOut.svg#CBLogOut`;

    previousPageUrl = '';
    modalOpen = false;
    alerts = [
        {
            id:1,
            message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, ullam!',
            time: '15 min ago'
        },
        {
            id:2,
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, beatae? Quisquam iusto cumque magnam sint!',
            time: '24 min ago'
        },
        {
            id:3,
            message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, ullam!',
            time: '5 day ago'
        },
        {
            id:4,
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, beatae? Quisquam iusto cumque magnam sint!',
            time: '6 day ago'
        },
        {
            id:5,
            message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, ullam!',
            time: '12 day ago'
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