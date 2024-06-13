import { LightningElement } from 'lwc';

export default class CBDomesticBeneficiary extends LightningElement{

    beneficiaryType = [
        'Domestic Beneficiary', 'Intra Bank Beneficiary', 'International Beneficiary'
    ]

    beneficiaryList = [
        {
            accountNum : 604567894,
            name: 'Walter',
            accountType : 'Saving',
            beneficiaryBank: 'Clarien Bank Limited',
            status : true
        },
        {
            accountNum : 604567885,
            name: 'John',
            accountType : 'Saving',
            beneficiaryBank: 'Clarien Bank Limited',
            status : false
        }
        ,
        {
            accountNum : 604567796,
            name: 'Rohit',
            accountType : 'Saving',
            beneficiaryBank: 'Bermuda Commercial Bank Limited',
            status : true
        }
    ]
}