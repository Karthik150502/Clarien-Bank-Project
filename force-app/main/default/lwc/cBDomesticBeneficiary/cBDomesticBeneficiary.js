import { LightningElement } from 'lwc';

// Importing labels for easy manipulation of the data in labels
import PAGE_MANAGEBENEFICIARIES from '@salesforce/label/c.CB_Page_ManageBeneficiaries';
import PAGE_DOMESTICBENEFICIARY from '@salesforce/label/c.CB_Page_DomesticBeneficiary';
import DOMESTIC_BENEFICIARY from '@salesforce/label/c.CB_DomesticBeneficiary';

export default class CBDomesticBeneficiary extends LightningElement{

    configuration = {
        previousPageUrl: PAGE_MANAGEBENEFICIARIES,
        heading: DOMESTIC_BENEFICIARY,
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    //Variable stores the type of Beneficiary 
    beneficiaryType = 'Domestic Beneficiary'
    
    //Variable to store current page Api name
    pageApiName = PAGE_DOMESTICBENEFICIARY

    //List of Domestic Beneficiary accounts
    beneficiaryList = [
        {
            accountNum : 604567894,
            name: 'Walter',
            accountType : 'Saving',
            beneficiaryBank: 'Clarien Bank Limited',
        },
        {
            accountNum : 604567885,
            name: 'John',
            accountType : 'Saving',
            beneficiaryBank: 'Clarien Bank Limited',
        }
        ,
        {
            accountNum : 604567796,
            name: 'Rohit',
            accountType : 'Saving',
            beneficiaryBank: 'Bermuda Commercial Bank Limited',
        }
    ]
}