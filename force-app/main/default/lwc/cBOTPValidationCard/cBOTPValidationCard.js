import { LightningElement, track } from 'lwc';
import SECURITY_TOKEN_LABEL from '@salesforce/label/c.CBTokenValidationCard_Token_label';
import SUBMIT from '@salesforce/label/c.CB_Submit';

export default class cBOTPValidationCard extends LightningElement {
    // Declare tracked properties
    securityTokenLabel=SECURITY_TOKEN_LABEL
    @track inputValues = ['', '', '', '', '', '']; // Array to store input values
    @track tokenErrorMessage = 'The OTP has been sent to your updated email address'; // Error message for token validation
    @track tokenValidClass = 'invalidToken'; // CSS class for token validation
    @track validTokenType = true; // Flag indicating token type validity
    clarienHorizontalLogo = clarienHorizontalLogo; // Logo resource
    @track buttonClass='inActive';
    // Hardcoded token value
    token = '585326';
    buttonDisable = true; // Button disable state
    Otp = ''; // User-entered OTP

    // Handle form submission
    
    handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission
        // Dispatch custom event with the form data
        this.dispatchEvent(new CustomEvent('otpsubmit', {
            detail: data
        }));
    }
    label = {
        SUBMIT: SUBMIT.toUpperCase()
    };
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
        } else {
            this.tokenValidClass = 'invalidToken';
            this.tokenErrorMessage = 'Wrong Token or Expired';
        }
        this.validTokenType = false;
    }
}