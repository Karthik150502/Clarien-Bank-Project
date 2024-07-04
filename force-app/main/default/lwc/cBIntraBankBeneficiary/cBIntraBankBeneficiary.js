import { LightningElement } from 'lwc';

// Importing labels for easy manipulation of the data in labels
import PAGE_INTRABANKBENEFICIARY from '@salesforce/label/c.CB_Page_IntraBankBeneficiary';
import PAGE_MANAGEBENEFICIARIES from '@salesforce/label/c.CB_Page_ManageBeneficiaries';
import INTRABANK_BENEFICIARY from '@salesforce/label/c.CB_IntraBankBeneficiary';

export default class CBIntraBankBeneficiary extends LightningElement {

    // Configuration object for the component
    configuration = {
        previousPageUrl: PAGE_MANAGEBENEFICIARIES,
        heading: INTRABANK_BENEFICIARY,
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    //Variable stores the type of Beneficiary 
    beneficiaryType = 'Intrabank Beneficiary'

    //Variable to store current page Api name
    pageApiName = PAGE_INTRABANKBENEFICIARY

    //List of Intrabank Beneficiary accounts
    beneficiaryList = [
        {
            accountNum: 604567796,
            name: 'John',
            accountType: 'Current',
        },
        {
            accountNum: 604567899,
            name: 'Walter',
            accountType: 'Saving',
        },
        {
            accountNum: 604567810,
            name: 'Qian',
            accountType: 'Saving',
        }
    ]

}