import { LightningElement, wire, api, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

// import docSearch from '@salesforce/apex/CBApiController.docSearch';
// import docDownload from '@salesforce/apex/CBApiController.docDownload';
// import generatePdf from '@salesforce/apex/TestDocSearchWrapper.generatePdf';
import { getJsonData } from 'c/cBUtilities';
import { docSearchh } from 'c/cBDocSearch';

export default class TestDocSearch extends LightningElement {

    apiName = ['CB_Ret_Cust', 'CB_Do_General_Acct_Inq', 'CB_Acct_Inq']
    retCustBody = ''
    retCustJsonPathData = []
    generalAcctInqBody = ''
    generalAcctInqJsonPathData = []
    acctInqBody = ''
    acctInqJsonPathData = []

    custDetail = {
        acctId: "3100000023",
        productCategory: "SBA",
        acctBranchCode: "100"
    }

    connectedCallback() {
        // Example API calls (uncomment and implement these if needed)
        // this.fetchRetCustJsonData(this.apiName[0])
        // this.fetchGeneralAcctInqJsonData(this.apiName[1])
        // this.fetchAcctInqJsonData(this.apiName[2])
    
        console.log('Called CC');
        console.log(JSON.stringify(this.getAccountDetails(this.custDetail)));
        console.log('Ended CC');
    }
    
    getAccountDetails(retCust) {
        let accountType = retCust.productCategory;
        console.log('Acc Type', accountType);
    
        switch (accountType) {
            case 'SBA': {
                let accountDetails = JSON.parse(this.callGeneral(retCust.acctId, retCust.acctBranchCode));
                console.log('callGeneral Ended');
                return {
                    accountNo: retCust.acctId,
                    accBal: this.checkBalType(accountDetails.acctInqRs.acctBal, 'AVAIL'),
                    currentBal: this.checkBalType(accountDetails.acctInqRs.acctBal, 'ACCBAL'),
                    totalHolds: this.checkBalType(accountDetails.acctInqRs.acctBal, 'LEDGER'),
                    productName: 'PERSONAL SAVINGS USD',
                    beneficiary: accountDetails.acctInqRs.custId.custId.personName.custName,
                    date: accountDetails.acctInqRs.acctOpenDt,
                };
            }
            // case 'TUA': {
            //     let accountDetails = JSON.parse(this.callGeneral(retCust.acctId, retCust.acctBranchCode));
            //     console.log('callGeneral Ended');
            //     return  {
            //         accountNo: retCust.acctId,
            //         accBal: this.checkBalType(accountDetails.acctInqRs.acctBal, 'AVAIL'),
            //         currentBal: this.checkBalType(accountDetails.acctInqRs.acctBal, 'ACCBAL'),
            //         totalHolds: this.checkBalType(accountDetails.acctInqRs.acctBal, 'LEDGER'),
            //         principalAmount: 'BMD 10,000.0',
            //         depositStartDate: '12/12/2023',
            //         maturityDate: '13/12/2025'
            //     }
            // }
            // case 'LAA': {
            //     return {
            //         accountNo: retCust.acctId,
            //         accBal: ,
            //         interestAmount: ,
            //         interestDate: '11/12/24',
            //         productName: 'Cash Secured BMD-Regular',
            //         beneficiary: accountDetails.acctInqRs.custId.custId.personName.custName,
            //         date: '11/12/2024',
            //     }
            // }
            // case 'CAA': {
            //     return {
            //         accountNo: retCust.acctId,
            //         accBal: this.checkBalType(accountDetails.acctInqRs.acctBal, 'AVAIL'),
            //         currentBal: this.checkBalType(accountDetails.acctInqRs.acctBal, 'ACCBAL'),
            //         totalHolds: this.checkBalType(accountDetails.acctInqRs.acctBal, 'LEDGER'),
            //         holderName: 'John Due',
            //         productName: 'CURRENT ACCOUNT',
            //         beneficiary: accountDetails.acctInqRs.custId.custId.personName.custName,
            //         date: '7/05/2024',
            //     }
            // }
            default: {
                console.log(`Unsupported account type: ${accountType}`);
                return null;
            }
        }
    }
    
    checkBalType(data, balType) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].balType == balType) {
                return data[i].balAmt.amountValue;
            }
        }
        return 'N/A';
    }
    
    callGeneral(acctId, acctBranchCode) {
        // Simulating a callout for general account inquiry. This should ideally be an asynchronous function with actual API call.
        console.log('callGeneral Called');
        return JSON.stringify({
            "requestUUID": "Req_12345667890",
            "acctInqRs": {
                "acctId": {
                    "acctType": {
                        "schmCode": "SVREG",
                        "schmType": "SBA"
                    },
                    "acctCurr": "BMD",
                    "bankInfo": {
                        "bankId": null,
                        "name": null,
                        "branchId": "100",
                        "branchName": "RETAIL BANKING",
                        "postAddr": {
                            "addr1": null,
                            "addr2": null,
                            "addr3": null,
                            "city": null,
                            "stateProv": null,
                            "postalCode": null,
                            "country": null,
                            "addrType": null
                        }
                    }
                },
                "custId": {
                    "custId": {
                        "personName": {
                            "custName": "AJSHJS"
                        }
                    }
                },
                "acctOpenDt": "2023-06-22T00:00:00.000",
                "bankAcctStatusCode": "A",
                "acctBal": [
                    {
                        "balType": "LEDGER",
                        "balAmt": {
                            "amountValue": "0.00",
                            "currencyCode": ""
                        }
                    },
                    {
                        "balType": "AVAIL",
                        "balAmt": {
                            "amountValue": "0.00",
                            "currencyCode": ""
                        }
                    },
                    {
                        "balType": "EFFAVL",
                        "balAmt": {
                            "amountValue": "0.00",
                            "currencyCode": ""
                        }
                    },
                    {
                        "balType": "FLOAT",
                        "balAmt": {
                            "amountValue": "0.00",
                            "currencyCode": ""
                        }
                    },
                    {
                        "balType": "LIEN",
                        "balAmt": {
                            "amountValue": "0.00",
                            "currencyCode": ""
                        }
                    },
                    {
                        "balType": "DRWPWR",
                        "balAmt": {
                            "amountValue": "0.00",
                            "currencyCode": ""
                        }
                    },
                    {
                        "balType": "ACCBAL",
                        "balAmt": {
                            "amountValue": "0.00",
                            "currencyCode": "BMD"
                        }
                    },
                    {
                        "balType": "SHADOW",
                        "balAmt": {
                            "amountValue": "0.00",
                            "currencyCode": "BMD"
                        }
                    },
                    {
                        "balType": "FUTBAL",
                        "balAmt": {
                            "amountValue": "0.00",
                            "currencyCode": "BMD"
                        }
                    }
                ],
                "custStat": {
                    "refCode": null,
                    "refRecType": "25",
                    "refDesc": null
                }
            }
        });
    }
    

    callAcct() {
        //making call out accountInq
    }

    mapData(xmlBody, xmlPath) {
    }

    fetchRetCustJsonData(apiName) {
        getJsonData(apiName)
            .then(result => {
                this.retCustBody = result[0];
                this.retCustJsonPathData = result[1];
                // console.log('retCustBody: ', this.retCustBody);
                // console.log('retCustJsonPathData: ', this.retCustJsonPathData);
            }).catch((error) => {
                console.error('Some error occured in Fetch: ' + error)
            })
    }
    fetchGeneralAcctInqJsonData(apiName) {
        getJsonData(apiName)
            .then(result => {
                this.generalAcctInqBody = result[0];
                this.generalAcctInqJsonPathData = result[1];
                // console.log('generalAcctInqBody: ', this.generalAcctInqBody);
                // console.log('generalAcctInqJsonPathData: ', this.generalAcctInqJsonPathData);
            }).catch((error) => {
                console.error('Some error occured in Fetch: ' + error)
            })
    }
    fetchAcctInqJsonData(apiName) {
        getJsonData(apiName)
            .then(result => {
                this.acctInqBody = result[0];
                this.acctInqJsonPathData = result[1];
                // console.log('acctInqBody: ', this.acctInqBody);
                // console.log('acctInqJsonPathData: ', this.acctInqJsonPathData);
            }).catch((error) => {
                console.error('Some error occured in Fetch: ' + error)
            })
    }

}