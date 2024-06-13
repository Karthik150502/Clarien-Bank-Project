import { LightningElement } from 'lwc';

export default class CBInternationalBeneficiary extends LightningElement {
    
    
    beneficiaryType = [
        'International Beneficiary', 'Intra Bank Beneficiary', 'Domestic Beneficiary'
    ]

    beneficiaryList = [
        {
            accountNum : 604567897,
            name: 'Robin',
            accountType : 'Saving',
            beneficiaryBank: 'The Bank of N.T. Butterfield & Son Limited',
            beneficiaryAddress: '5W main street',
            status : true
        },
        {
            accountNum : 604567888,
            name: 'Michael',
            accountType : 'Saving',
            beneficiaryBank: 'Clarien Bank Limited',
            beneficiaryAddress: '4W main street',
            status : false
        }
    ]
}