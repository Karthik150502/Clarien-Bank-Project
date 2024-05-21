import { LightningElement, track} from 'lwc';

export default class CBCreditAccountDetails extends LightningElement {

    accountType = {
        savingAccount: false,
        creditAccount: true,
        jointAccount: false,
        timeDepositAccount: false,
        loanAccount: false
    }
    
    @track
    transactionData = [
        { id: '1', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988901', date: '01/09/23', amount: '3.00', transactionType:'Transfer' },
        { id: '2', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988902', date: '01/10/23', amount: '4.00', transactionType:'Loan' },
        { id: '3', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988903', date: '01/11/23', amount: '6.00', transactionType:'Transfer' },
        { id: '4', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988904', date: '01/12/23', amount: '8.00', transactionType:'Fee' },
        { id: '5', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988905', date: '01/13/23', amount: '9.88', transactionType:'Transfer' },
        { id: '6', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988906', date: '01/14/23', amount: '9.00', transactionType:'Lorem' },
        { id: '7', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988907', date: '01/15/23', amount: '6.00', transactionType:'Transfer' },
        { id: '8', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988908', date: '01/16/23', amount: '2.00', transactionType:'Transfer' },
        { id: '9', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988909', date: '01/17/23', amount: '2.20', transactionType:'Transfer' },
        { id: '10', CHQSId: 'Sent money to david - saving debit account', EMIId: 'IBM0010200988910', date: '01/18/23', amount: '5.00', transactionType:'Transfer' }
    ];


    overviewData = [
        { id: 0, label: "Credit Limit", value: "BMD 10,000.00" },
        { id: 1, label: "Last Statement Balance", value: "BMD 8,000.00" },
        { id: 2, label: "Minimum Payment", value: "BMD 500.00" },
        { id: 3, label: "Payment Due Date", value: "27/12/23" },
        { id: 4, label: "Last Payment Amount", value: "BMD 2000.00" },
        { id: 5, label: "Available Limit", value: "BMD 8000.00" },
        { id: 6, label: "Last Payment Date", value: "05/01/24" }
    ]

    sortDetails(){
        this.mergeSort(this.transactionData);
    }

    mergeSort(arr){
        if(arr.length > 1){
            let leftArr = arr.slice(0,  Math.floor(arr.length/2))
            let rightArr = arr.slice(Math.floor(arr.length/2), arr.length)
            this.mergeSort(leftArr)
            this.mergeSort(rightArr)
            let i = 0
            let j = 0
            let k = 0
            while(i < leftArr.length && j < rightArr.length){
                if(Number(leftArr[i].amount) > Number(rightArr[j].amount)){
                    arr[k] = leftArr[i]
                    i++
                }else{
                    arr[k] = rightArr[j]
                    j++
                }
                k++
            }
            while(i<leftArr.length){
                arr[k] = leftArr[i]
                i++
                k++
            }        
            while(j<rightArr.length){
                arr[k] = rightArr[j]
                j++
                k++
            }
        }
    }
}