import { LightningElement } from 'lwc';

export default class CBDomesticBeneficiary extends LightningElement{

    beneficiaryType = [
        'Domestic Beneficiary', 'Intra Bank Beneficiary', 'International Beneficiary'
    ]

    beneficiaryList = [
        {
            accountNum : 604567894,
            name: 'Kumaran',
            accountType : 'Saving',
            beneficiaryBank: 'SBI',
            status : true
        },
        {
            accountNum : 604567885,
            name: 'Raju',
            accountType : 'Saving',
            beneficiaryBank: 'Citi',
            status : false
        }
        ,
        {
            accountNum : 604567796,
            name: 'Rohit',
            accountType : 'Saving',
            beneficiaryBank: 'ICIC',
            status : true
        }
    ]
}