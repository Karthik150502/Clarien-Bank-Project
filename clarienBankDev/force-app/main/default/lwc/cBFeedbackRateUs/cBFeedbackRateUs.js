import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBFeedbackRateUs extends NavigationMixin(LightningElement) {

    CBSelectedStar = `${CBSVG}/CBSVGs/CBSelectedStar.svg#CBSelectedStar`;
    CBUnselectedStar = `${CBSVG}/CBSVGs/CBUnselectedStar.svg#CBUnselectedStar`;

    rating = 1
    comments = ''
    openSuccessModal = false


    headerConfguration = {
        previousPageUrl: '',
        heading: 'Feedback/ Rate Us',
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    stars = [
        { value: 1, selected: true },
        { value: 2, selected: false },
        { value: 3, selected: false },
        { value: 4, selected: false },
        { value: 5, selected: false },
    ]

    selectedParemeters = []
    whatCanBeImproved = [
        { value: 'Overall Service', selected: false, class: 'inactive' },
        { value: 'Customer Support', selected: false, class: 'inactive' },
        { value: 'Speed and Efficiency', selected: false, class: 'inactive' },
        { value: 'Banking Quality', selected: false, class: 'inactive' },
        { value: 'Application enhancements', selected: false, class: 'inactive' }
    ]


    successModalConf = {
        title: 'Thank You',
        message: 'Your  Feedback was successfully submitted',
        okButton: {
            exposed: true,
            label: 'HOME',
            function: () => {
                this.openSuccessModal = false
                this.navigateBack();
            }
        },
        noButton: {
            exposed: false,
            label: 'Cancel',
            function: () => {

            }
        },
        alertMsg: ''

    }



    handleStarClick(event) {
        let item = event.currentTarget.dataset.value
        this.rating = item
        let updatedStars = this.stars.map((star) => {
            return {
                ...star, selected: star.value <= Number(item) ? true : false
            }
        })
        this.stars = updatedStars
    }


    selectParameter(event) {
        let parameter = event.currentTarget.dataset.value
        let updatedItems = this.whatCanBeImproved.map((item) => {
            if (item.value === parameter) {
                return {
                    ...item,
                    selected: item.selected ? false : true,
                    class: item.class === 'active' ? 'inactive' : 'active'
                }
            } else {
                return { ...item }
            }
        })

        this.whatCanBeImproved = updatedItems
    }

    emptyFeedback() {
        this.rating = 1
        let comments = this.template.querySelector('.comments')
        comments.value = ''
        let updatedParams = this.whatCanBeImproved.map((item) => {
            return {
                ...item, selected: false, class: 'inactive'
            }
        })
        this.whatCanBeImproved = updatedParams
    }

    handleSubmit() {
        console.log('Rating provided--> ' + this.rating)
        let comments = this.template.querySelector('.comments')
        console.log('Comments given--> ' + comments.value);
        this.whatCanBeImproved.forEach((param, index) => {
            if (param.selected) {
                console.log(`${index + 1} Parameter--> ` + param.value)
            }
        })
        this.emptyFeedback()
        this.openSuccessModal = true
    }

    // Method to navigate back to Previous page
    navigateBack() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Home'
            }
        });
    }

}