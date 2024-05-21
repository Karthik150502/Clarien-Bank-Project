import { LightningElement } from 'lwc';

export default class CBAccountStatementResult extends LightningElement {

    statements = [
        {
            id:1,
            transactionType: 'Transfer',
            time: '01/02/2013',
            amount: 354
        },
        {
            id:2,
            transactionType: 'Debit',
            time: '01/02/2013',
            amount: 50
        },
        {
            id:3,
            transactionType: 'Recharge',
            time: '01/02/2013',
            amount: 34
        },
        {
            id:4,
            transactionType: 'Loan Repayment',
            time: '01/02/2013',
            amount: 3540
        },
        {
            id:5,
            transactionType: 'Transfer',
            time: '01/02/2013',
            amount: 3154
        }
    ]
}