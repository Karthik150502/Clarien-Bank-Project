import { LightningElement } from 'lwc';


export default class CBOffers extends LightningElement {


    configuration = {
        previousPageUrl: 'Home',
        heading: 'Offers & Announcement',
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

}