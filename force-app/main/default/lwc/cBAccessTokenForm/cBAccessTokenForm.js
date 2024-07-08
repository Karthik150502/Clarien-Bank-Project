import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import YOUR_PASSWORD_EXPIRED from '@salesforce/label/c.CB_YourPasswordExpired';
import PLS_ENTER_SECURITY_TOKEN from '@salesforce/label/c.CB_PlsEnterSecurityToken';
import SUBMIT from '@salesforce/label/c.CB_Submit';





export default class CBAccessTokenForm extends NavigationMixin(LightningElement) {

    label={
        YOUR_PASSWORD_EXPIRED,
        PLS_ENTER_SECURITY_TOKEN,
        SUBMIT:SUBMIT.toUpperCase()
    }



    // Track is only for non-primitive data types, to track the changes precisely,
    // so removed the @track for primitive data-types, Karthik J, 15-03-2024, 10:44 AM

    // Declare tracked properties
    @track inputValues = ['', '', '', '', '', '']; // Array to store input values
    tokenErrorMessage = ''; // Error message for token validation
    tokenValidClass = 'invalidToken'; // CSS class for token validation
    validTokenType = true; // Flag indicating token type validity
    // clarienHorizontalLogo = clarienHorizontalLogo; // Logo resource
    buttonClass='inActive';
    // Hardcoded token value
    token = '585326';
    buttonDisable = true; // Button disable state
    Otp = ''; // User-entered OTP









    nextPageApiName


    connectedCallback(){
    }






    // Handle form submission
    handleSubmit() {
        if (this.Otp.length === 6) {
            // Reset OTP and set token type validity
            this.Otp = '';
            this.validTokenType = true;
        }
    }

    // Handle user input in OTP fields
    handleInput(event) {
        const targetIndex = parseInt(event.target.dataset.index);
        const value = event.target.value;

        // If more than one character is entered, split OTP
        if (value.length > 1) {
            this.splitOTP(value);
            return;
        }

        // Validate input and enable next field
        if (!isNaN(targetIndex) && targetIndex >= 0 && targetIndex <= 5) {
            this.inputValues[targetIndex] = value;
            this.updateButtonClass();
            if (value !== '' && value.length === 1) {
                const nextIndex = targetIndex + 1;
                if (nextIndex <= 6) {
                    const nextInput = this.template.querySelector(`input[data-index='${nextIndex}']`);
                    if (nextInput) {
                        nextInput.removeAttribute('disabled');
                        nextInput.focus();
                    }
                }

            }
        }
        console.log('inputValues : ', this.inputValues.join(''));

    }

    // Split OTP into individual fields
    splitOTP(value) {
        for (let i = 0; i < value.length; i++) {
            let inputField = this.template.querySelector(`input[data-index='${i}']`);
            inputField.removeAttribute('disabled');
            inputField.value = value.charAt(i);
            this.Otp = value;
        }
        if (value.length < 6) {
            const nextInput = this.template.querySelector(`input[data-index='${value.length}']`);
            if (nextInput) {
                nextInput.removeAttribute('disabled');
                nextInput.focus();
            }
        }
        this.updateButtonClass();
    }

    // Handle focusing on the previous input field
    focusPrevious(event) {
        let i = parseInt(event.target.dataset.index);
        if (event.target.value === '') {
            this.inputValues[i] = '';
            if (event.key === 'Backspace' && i > 0) {
                let previousInputField = this.template.querySelector(`input[data-index='${i - 1}']`);
                previousInputField.focus();
            }
            this.updateButtonClass();
        }
    }

    // Update button state based on input validity
    updateButtonClass() {
        const isValid = this.inputValues.join('').length === 6 && !this.inputValues.some(value => value === '');
        this.validTokenType = isValid;
        this.buttonDisable = !isValid;
        this.Otp = this.inputValues.join('');
        if (!isValid) {
            this.buttonDisable = !isValid
            this.buttonClass='inActive'
        }else{
            this.buttonClass='active'

        }
    }

    // Verify OTP entered by the user
    verifyOTP() {
        if (this.Otp === this.token) {
            this.tokenValidClass = 'validToken';
            this.tokenErrorMessage = 'Token validated Successfully';
            this.navigateToSignUp()
            // this.navigateToNextPage()
        } else {
            this.tokenValidClass = 'invalidToken';
            this.tokenErrorMessage = 'Wrong Token or Expired';
        }
        this.validTokenType = false;

    }



    navigateToSignUp(){
        this[NavigationMixin.Navigate]({
            type:'comm__namedPage',
            attributes:{
                name:'CBSignUp__c'
            }
        })
    }


    navigateToNextPage(){
        this[NavigationMixin.Navigate]({
            type:'comm__namedPage',
            attributes:{
                name:this.nextPageApiName
            }
        })
    }




}