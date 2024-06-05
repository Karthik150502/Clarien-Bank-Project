import { LightningElement } from 'lwc';

export default class CBApprovals extends LightningElement {

    configuration = {
        previousPageUrl: 'Home',
        heading: 'Approvals',
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

    approvals = [
        {
            id : 1,
            fromAccount : 'Sasha',
            toAccount : 'John',
            amount : 'BMD 100',
            status : 'Approved'
        },
        {
            id : 2,
            fromAccount : 'Sasha',
            toAccount : 'Max',
            amount : 'BMD 545',
            status : 'Approved'
        },
        {
            id : 3,
            fromAccount : 'Sasha',
            toAccount : 'Robert',
            amount : 'BMD 126',
            status : 'Rejected'
        },
        {
            id : 4,
            fromAccount : 'Sasha',
            toAccount : 'Helen',
            amount : 'BMD 632',
            status : 'Approved'
        }
    ]
        
    
}