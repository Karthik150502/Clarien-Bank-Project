import { LightningElement } from 'lwc';

// Importing labels for easy manipulation of the data in labels
import PAGE_INTERNATIONALBENEFICIARY from '@salesforce/label/c.CB_Page_InternationalBeneficiary';
import PAGE_MANAGEBENEFICIARIES from '@salesforce/label/c.CB_Page_ManageBeneficiaries';
import INTERNATIONAL_BENEFICIARY from '@salesforce/label/c.CB_InternationalBeneficiary';

export default class CBInternationalBeneficiary extends LightningElement {

    // Configuration object for the component
    configuration = {
        previousPageUrl: PAGE_MANAGEBENEFICIARIES,
        heading: INTERNATIONAL_BENEFICIARY,
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    //Variable stores the type of Beneficiary
    beneficiaryType = 'International Beneficiary'

    //Variable to store current page Api name
    pageApiName = PAGE_INTERNATIONALBENEFICIARY

    //List of International Beneficiary accounts
    beneficiaryList = [
        {
            accountNum: 604567897,
            name: 'Robin',
            accountType: 'Saving',
            beneficiaryBank: 'The Bank Of N.T. Butterfield & Son Limited',
            beneficiaryAddress: '5W Main Street',
        },
        {
            accountNum: 604567888,
            name: 'Michael',
            accountType: 'Saving',
            beneficiaryBank: 'Clarien Bank Limited',
            beneficiaryAddress: '4W main Street',
        }
    ]
}