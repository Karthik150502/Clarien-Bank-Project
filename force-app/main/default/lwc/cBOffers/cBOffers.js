import { LightningElement } from 'lwc';


export default class CBOffers extends LightningElement {


    configuration = {
        previousPageUrl: 'Home',
        heading: 'Offers & Promotions',
        iconsExposed: false,
        logout: {
            exposed: true
        },
        search: {
            exposed: false
        }, favorite: {
            selected: false
        }
    }

    offers = [
        {
            id:1,
            message: '0% interest for 12 months on credit card balance transfers. Save now!',
            time: '15 min ago'
        },
        {
            id:2,
            message: ' Open a new checking account, get a $200 bonus with direct deposit',
            time: '24 min ago'
        },
        {
            id:3,
            message: 'Auto loans at 2.99% APR. Quick approval. Apply now!',
            time: '5 day ago'
        },
        {
            id:4,
            message: 'Home Equity Line of Credit at 1.99% APR for 6 months. Apply today!',
            time: '6 day ago'
        },
        {
            id:5,
            message: 'New Online Banking! Enhanced features and security. Log in to explore.',
            time: '12 day ago'
        }
    ]

}