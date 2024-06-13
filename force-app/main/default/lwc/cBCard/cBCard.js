import { LightningElement, api } from 'lwc';
import CBSVG from "@salesforce/resourceUrl/CBSVG"
import CB_CurrentBalance from '@salesforce/label/c.CB_CurrentBalance';
import CB_TotalHolds from '@salesforce/label/c.CB_TotalHolds';
import CB_AvailableBalance from '@salesforce/label/c.CB_AvailableBalance';
import CB_Account_Number from '@salesforce/label/c.CB_Account_Number';
import CB_Beneficiary from '@salesforce/label/c.CB_Beneficiary';
import CB_Product_Name from '@salesforce/label/c.CB_Product_Name';
import CB_Maturity_Date from '@salesforce/label/c.CB_Maturity_Date';
import CB_Deposit_StartDate from '@salesforce/label/c.CB_Deposit_StartDate';
import CB_Pending_Balance from '@salesforce/label/c.CB_Pending_Balance';


export default class CBCard extends LightningElement {
    label = {
        CB_CurrentBalance,
        CB_TotalHolds ,
        CB_AvailableBalance,
        CB_Account_Number,
        CB_Beneficiary,
        CB_Product_Name,
        CB_Maturity_Date,
        CB_Deposit_StartDate,
        CB_Pending_Balance
    }
    @api cardType = {
        // CreditAccount: {
        //     cardNum: 600015474586,
        //     accBal: 'BMD 10,000.00',
        //     currentBal: 'BMD 10,000.00',
        //     pendingBal: 'BMD 8000.00',
        //     cardExpiryDate : '06/27',
        //     productName: 'PLATINUM CREDIT CARD',
        //     cardStatus: 'Active',
        // },
        // LoanAccount: {
        //     accountNo: 6000154360,
        //     accBal: 'BMD 201,210.21',
        //     interestAmount: 'BMD 602.00',
        //     interestDate: '11/12/24',
        //     productName: 'Cash Secured BMD-Regular',
        //     beneficiary: 'John LTD Demo',
        //     date: '11/12/2024',
        // },
        // JointAccount: {
        //     accountNo: 6000876590564,
        //     accBal: 'BMD 9000.00',
        //     currentBal: 'BMD 9000.00',
        //     totalHolds: 'BMD 0.00',
        //     holderName: 'John Due',
        //     secHolderName: 'Abhraram'
        // },
        // SavingsAccount: {
        //     accountNo: 600015474586,
        //     accBal: 'BMD 5,546.54',
        //     currentBal: 'BMD 5664.55',
        //     totalHolds: 'BMD 0.00',
        //     productName: 'PERSONAL SAVINGS USD',
        //     beneficiary: 'Mr. Retail Demo',
        //     date: '7/05/2024',
        // },
        // TimeDepositAccount: {
        //     accountNo: 600017725563,
        //     accBal: 'BMD 5,585.54',
        //     currentBal: 'BMD 5,585.54',
        //     totalHolds: 'BMD 0.00',
        //     principalAmount: 'BMD 10,000.0',
        //     depositStartDate: '12/12/2023',
        //     maturityDate: '13/12/2025',
        // }
    }

    creditCardView = true
    CBCardRotate = `${CBSVG}/CBSVGs/CBCardRotate.svg#CBCardRotate`;
    CBHideCardNumber = `${CBSVG}/CBSVGs/CBHideCardNumber.svg#CBHideCardNumber`;
    CBShare = `${CBSVG}/CBSVGs/CBShare.svg#CBShare`;

    
    get style() {
        return this.creditCardView ? 'container front' : 'container back';
    }


    rotateToBack() {
        this.creditCardView = false;
    }

    rotateToFront() {
        this.creditCardView = true;
    }

    hideCardNo = true;

    showCardNumber() {
        this.hideCardNo = !this.hideCardNo
    }

    get cardNumber() {
        if (this.hideCardNo && this.cardType.CreditAccount.cardNum) {
            return '****  ****  ****' + (this.cardType.CreditAccount.cardNum).toString().slice(-4)
        } else {
            return this.cardType.CreditAccount.cardNum
        }
    }
}