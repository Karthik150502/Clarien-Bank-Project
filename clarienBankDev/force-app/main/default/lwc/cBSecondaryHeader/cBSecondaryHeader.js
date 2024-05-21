import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBSecondaryHeader extends NavigationMixin(LightningElement) {

    CBBackIcon = `${CBSVG}/CBSVGs/CBBackIcon.svg#CBBackIcon`;
    CBSearchIcon = `${CBSVG}/CBSVGs/CBSearchIcon.svg#CBSearchIcon`;
    CBHeaderLogOut = `${CBSVG}/CBSVGs/CBHeaderLogOut.svg#CBHeaderLogOut`;

    @api configuration = {
        // previousPageUrl: '',
        // heading: 'Feedback/ Rate Us',
        // iconsExposed: true,
        // logout: {
        //     exposed: true
        // },
        // search: {
        //     exposed: true
        // }

    }


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

}