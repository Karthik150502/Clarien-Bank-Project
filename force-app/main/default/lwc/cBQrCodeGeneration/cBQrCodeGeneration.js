import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { loadScript } from 'lightning/platformResourceLoader';

import CONTINUE from '@salesforce/label/c.CB_Continue';
import CANCEL from '@salesforce/label/c.CB_Cancel';
import logoQrCode from '@salesforce/resourceUrl/LogoQrCode';
import ClarienLogo from "@salesforce/resourceUrl/ClarienLogo";
import getDownloadLink from '@salesforce/apex/CBUtilityController.getDownloadLink';
import encrypt from '@salesforce/apex/CBUtilityController.performEncrypt';

import { setPagePath, getMobileSessionStorage } from 'c/cBUtilities';

export default class CBQrCodeGeneration extends NavigationMixin(LightningElement) {


    clarienLogo = ''
    qrCodeLoading = true
    qrCodeObj = null

    // Object to hold imported labels
    label = {
        CONTINUE: CONTINUE.toUpperCase(), // Converting "Submit" label to uppercase
        CANCEL: CANCEL.toUpperCase(), // Converting "Cancel" label to uppercase
    };


    // Object to manage header icons
    header_icons = {
        // Announcements icon settings
        announcements: {
            exposed: true,  // Whether to display the Announcements icon
            haveItems: true // Whether the Announcements icon has items to display
        },
        // Whether to display the Announcements icon
        notifications: {
            exposed: true,  // Whether to display the Notifications icon
            haveItems: true // Whether the Notifications icon has items to display
        },
        // Inbox icon settings
        inbox: {
            exposed: true,  // Whether to display the Inbox icon
            haveItems: true // Whether the Inbox icon has items to display
        },
        // Scan Code icon settings
        scanCode: {
            exposed: false, // Whether to display the Scan Code icon
            haveItems: false    // Whether the Scan Code icon has items to display
        }
    };


    headerConfguration = {
        previousPageUrl: '',
        heading: 'Select Account',
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        },
        favorite: {
            selected: false
        }
    }



    connectedCallback() {
        this.headerConfguration.previousPageUrl = setPagePath('CBQrCodeGeneration__c')
        this.loadResource()
        this.clarienLogo = ClarienLogo
        // this.setAccountData()
    }


    loadResource() {
        Promise.all([
            loadScript(this, logoQrCode),
        ]).then(() => {
            console.log("Resource Loaded successfully...!")
        }).catch((error) => {
            console.log(error)
        })
    }


    get qrCodeShowClass() {
        return this.qrCodeLoading || this.selectedAccount === 'Select Account' ? 'hide' : 'qr-code-content'

    }

    qrCodeChores(accNo) {
        this.qrCodeLoading = true
        // 7080 characters is the Limit 
        let options = {
            canvas: this.template.querySelector(".canvas"),
            content: `www.clarienbank.com/account/${accNo}/`,
            width: 380,
            // download: true,
            image: this.template.querySelector(".image"),
            logo: {
                src: this.clarienLogo,
            }
        }
        try {
            this.qrCodeObj = new QrCodeWithLogo(options);
            this.qrCodeLoading = false
        } catch (error) {
            console.log(error)
        }
    }

    setAccountData(){
        this.accounts = JSON.parse(getMobileSessionStorage('CB_All_Account_Details')) ? JSON.parse(getMobileSessionStorage('CB_All_Account_Details')) : [];
    }

    accounts = [
        {
            "name": 'Bill',
            "accountNo": '659874586954',
            "accountType": "Savings Account"
        },
        {
            "name": 'James',
            "accountNo": '658745896541',
            "accountType": "Loan Account"
        },
        {
            "name": 'John',
            "accountNo": '666658987452',
            "accountType": "Time Deposit Account"
        },
        {
            "name": 'Sasha',
            "accountNo": '698547458265',
            "accountType": "Joint Account"
        },

    ]


    selectedAccount = 'Select Account'
    selectedName = ''
    handleAccount(event) {
        if (event.target.value === 'Select Account') {
            this.selectedAccount = event.target.value;
        } else {
            this.selectedAccount = event.target.value;
            this.selectedName = this.accounts.find((acc)=> acc.accountNo === this.selectedAccount).name;
            console.log(this.selectedAccount);
            console.log(this.selectedName);
            this.encryptAccount(this.selectedAccount + ','+ this.selectedName);
        }
    }
    

    encryptAccount(accData) {
        encrypt({ strClearText: accData })
        .then((result)=> {
            console.log(result);
            this.qrCodeChores(result[0] + '$#$' + result[1]);
        })
        .catch((error)=> {
            console.log('error in encryption:', error);
        })
    }

    get maskedAccountNo() {
        let accNo = this.selectedAccount
        return accNo.slice(accNo.length - 4, accNo.length).padStart(accNo.length, 'X')
    }



    get disableSubmit() {
        return this.selectedAccount === 'Select Account'
    }

    handleCancel() {
        this.navigateTo(this.headerConfguration.previousPageUrl)
    }

    downloadQrCode() {
        try {
            this.qrCodeObj.downloadImage("Account_QRCode.png").then(() => {

            })
        } catch (error) {
            console.log(error)
        }
    }

    handleSubmit() {
        console.log("Submitted....!")
        this.navigateTo("CBQrCodeDisplay__c", {
            "accountNo": this.selectedAccount
        })
    }

    contentDistributionLink = 'https://clarienbank--developer.sandbox.file.force.com/sfc/dist/version/download/?oid=00DDy0000008rXh&ids=0687z000003s9O3&d=%2Fa%2F7z000000dqOX%2FbI3UsBpMgOelZsuUHOm7Rplai2PFFMUpLeR3urPuG1k&asPdf=false'
    downloadByContentVersionDoc() {
        // this.qrCodeObj.getCanvas().then(canvas => {
        //     let encoded = canvas.toDataURL().replace("data:image/png;base64,", '')
        //     return getDownloadLink({ base64String: encoded })
        // }).then((result) => {
        //     console.log(result)
        // }).catch(error => console.log('Error sharing:', error));

        window.location.href = this.contentDistributionLink
    }




    async shareQRCode() {
        this.qrCodeObj.getCanvas().then(canvas => {
            let encoded = canvas.toDataURL().replace("data:image/png;base64,", '')
            const blob = this.base64ToBlob(encoded, 'image/png');

            const files = [new File([blob], 'QrCode.png', { type: blob.type })]
            const shareData = {
                files
            }
            if (navigator.canShare(shareData)) {
                try {
                    navigator.share(shareData)
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        console.error(err.name, err.message)
                    }
                }
            } else {
                console.warn('Sharing not supported', shareData)
            }

        }).then(() => console.log('Shared successfully'))
            .catch(error => console.log('Error sharing:', error));

    }


    base64ToBlob(b64Data, contentType = '', sliceSize = 512) {
        const byteCharacters = window.atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }


    // Helper function for navigation
    navigateTo(pageApiName, data = {}) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            },
            state: data
        });
    }


}