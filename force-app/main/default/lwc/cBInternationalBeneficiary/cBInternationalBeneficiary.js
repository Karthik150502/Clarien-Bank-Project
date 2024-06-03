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
            beneficiaryBank: 'SBI',
            beneficiaryAddress: '5W main street',
            status : true
        },
        {
            accountNum : 604567888,
            name: 'Devil',
            accountType : 'Saving',
            beneficiaryBank: 'HDFC',
            beneficiaryAddress: '4W main street',
            status : false
        }
    ]
}