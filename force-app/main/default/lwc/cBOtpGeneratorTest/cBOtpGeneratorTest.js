import { LightningElement, api, track } from 'lwc';
import OtpGen from '@salesforce/resourceUrl/OtpGen';
import { loadScript } from 'lightning/platformResourceLoader';

export default class CBOtpGeneratorTest extends LightningElement {



    @api recordId;
    @api title;
    @api iconName;
    secret = '12345';
    code = '';
    refreshCounter;
    counter = 1;
    @track loaded = false;
    @track disabled = false;
    connectedCallback() {
        console.log('---connected call back---');
        this.loadResources()
    }


    loadResources() {
        loadScript(this, OtpGen + '/OtpGen/Otp.js').then(() => {
            console.log("Resource successfully loaded....")
            console.log(OtpGen)
            this.loaded = true
        }).catch((error) => {
            console.log("Some error occured....")
        })
    }

    get ringCounter() {
        return (100 / 30) * this.refreshCounter;
    }

    get ringVariant() {
        if (this.refreshCounter < 3) {
            return 'expired'
        }
        if (this.refreshCounter < 10) {
            return 'warning'
        }
        return 'base';
    }

    generateOTP() {
        console.log("generateOpt called...!")
        if (this.loaded) {
            try {
                this.code = new OtpGen().totp().getOtp(this.secret);
            } catch (error) {
                console.log("Some error occured = " + error)
            }
            this.sendOTP(this.code);
            console.log("OTP generated...!")
            this.disabled = true;
            var interval = setInterval(function () {
                if (this.refreshCounter == 1) {
                    this.counter = 1;
                    this.refreshCounter = 0;
                    this.disabled = false;
                    clearInterval(interval);
                }
                this.refreshCounter = 30 - (this.counter++);
            }.bind(this), 1000);
        }
    }

    sendOTP(code) {
        console.log('The OTP is = ' + code)
    }
    verifyOTP() {
        var input = this.template.querySelector('.verify');
        var otp = input.value;
        if (otp != undefined && otp !== null) {
            if (this.code !== otp) {
                this.showMessage('Notification', 'OTP is not matching, please try again', 'error');
            }
            else {
                this.showMessage('Notification', 'OTP verification is completed', 'success');
            }
        }
    }

    showMessage(t, m, type) {
        const toastEvt = new ShowToastEvent({
            title: t,
            message: m,
            variant: type
        });
        this.dispatchEvent(toastEvt);
    };

}