import { LightningElement } from 'lwc';

export default class CBOwnAccountTransferOtpVerf extends LightningElement {



    otpconf = {
        title: '',
        implementation: () => {
            console.log("Implementation from OTP Handler")
        },
        tokenValue: '123456',

    }
}