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
        { id: '1', CHQSId: 'Received money from david - credit account', EMIId: 'IBM0010200988901', date: '01/09/23', amount: '3.00', transactionType:'Transfer', type: 'credit' },
        { id: '2', CHQSId: 'Sent money to JIO Recharge - credit account', EMIId: 'IBM0010200988902', date: '01/10/23', amount: '4.00', transactionType:'Recharge', type: 'debit' },
        { id: '3', CHQSId: 'Received money from david - credit account', EMIId: 'IBM0010200988903', date: '01/11/23', amount: '6.00', transactionType:'Transfer', type: 'credit' },
        { id: '4', CHQSId: 'Sent money to Starbucks - credit account', EMIId: 'IBM0010200988904', date: '01/12/23', amount: '8.00', transactionType:'Fee', type: 'debit' },
        { id: '5', CHQSId: 'Sent money to Mr Dave - credit account', EMIId: 'IBM0010200988905', date: '01/03/24', amount: '9.88', transactionType:'Rent', type: 'credit' },
        { id: '6', CHQSId: 'Sent money to david - credit account', EMIId: 'IBM0010200988906', date: '01/04/24', amount: '9.00', transactionType:'Transfer', type: 'debit' },
        { id: '7', CHQSId: 'Recieved money from david - credit account', EMIId: 'IBM0010200988907', date: '01/05/24', amount: '6.00', transactionType:'Transfer', type: 'credit' },
        { id: '8', CHQSId: 'Sent money to david - credit account', EMIId: 'IBM0010200988908', date: '01/06/24', amount: '2.00', transactionType:'Transfer', type: 'debit' },
        { id: '9', CHQSId: 'Sent money to david - credit account', EMIId: 'IBM0010200988909', date: '01/07/24', amount: '2.20', transactionType:'Transfer', type: 'debit' },
        { id: '10', CHQSId: 'Recieved money from david - credit account', EMIId: 'IBM0010200988910', date: '01/08/24', amount: '5.00', transactionType:'Transfer', type: 'credit' }
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