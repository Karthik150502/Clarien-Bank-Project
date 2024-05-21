/*
    Author - Mahalakshmi
    Created Date - 06/03/2024
    Modified Date - 21/03/2024, 20/03/2024
    Description - "User information validations, Confirmation Modal Open"
*/


// Ṣalesforce Plugins and variables
import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { CurrentPageReference } from 'lightning/navigation';

// Custom labels
import USERNAME from '@salesforce/label/c.CB_Username';
import NEW_PASSWORD from '@salesforce/label/c.CB_NewPassword';
import CONFIRM_PASSWORD from '@salesforce/label/c.CB_ConfirmPassword';
import PASSWORD_MUST_CONTAIN from '@salesforce/label/c.CB_PasswordMustContain10';
import MIN_10_CHARS from '@salesforce/label/c.CB_Min10Chars';
import ATLEAST_ONE_UPPER from '@salesforce/label/c.CB_AtLeastOneUpperCase';
import ATLEAST_SPEC_CHAR from '@salesforce/label/c.CB_AtLeastOneSpecChar';
import SUBMIT from '@salesforce/label/c.CB_Submit';
import CREATE_USER_CREDS from '@salesforce/label/c.CB_CreateUserCred';
import MARKETING_CONSENT from '@salesforce/label/c.CB_MarketingConsent';
import I_AGREE_TO_COMPANY from '@salesforce/label/c.CB_IAgreeToCompanyConduct';
import TERMS_CONDITIONS from '@salesforce/label/c.CB_TermsConditions';
import AND_PRIVACY_POLICY from '@salesforce/label/c.CB_AndPrivacyPolicy';
import CODE_OF_CONDUCT from '@salesforce/label/c.CB_CodeOfConduct';
import ERROR_CRITERIA_NOT_MATCH from '@salesforce/label/c.CB_ErrorCriteriaNotMatch';
import ERROR_PASS_MISMATCH from '@salesforce/label/c.CB_ErrorPassMismatch';
import ERROR_ENTER_THE_PASS from '@salesforce/label/c.CB_ErrorEnterThePass';
import CANCEL from '@salesforce/label/c.CB_Cancel';
import USER_CREATED_MESSAGE from '@salesforce/label/c.CB_User_Created_Message';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBCreateUserCredentials extends NavigationMixin(LightningElement) {

    CBBackIcon = `${CBSVG}/CBSVGs/CBBackIcon.svg#CBBackIcon`;
    CBShowPassword = `${CBSVG}/CBSVGs/CBShowPassword.svg#CBShowPassword`;
    CBHidePassword = `${CBSVG}/CBSVGs/CBHidePassword.svg#CBHidePassword`;

    // Custom Labels
    label = {
        USERNAME,
        NEW_PASSWORD,
        CONFIRM_PASSWORD,
        PASSWORD_MUST_CONTAIN,
        MIN_10_CHARS,
        ATLEAST_ONE_UPPER,
        ATLEAST_SPEC_CHAR,
        SUBMIT: SUBMIT.toUpperCase(),
        CANCEL: CANCEL.toUpperCase(),
        CREATE_USER_CREDS,
        MARKETING_CONSENT,
        I_AGREE_TO_COMPANY,
        TERMS_CONDITIONS,
        AND_PRIVACY_POLICY,
        CODE_OF_CONDUCT,
        ERROR_CRITERIA_NOT_MATCH,
        ERROR_PASS_MISMATCH,
        ERROR_ENTER_THE_PASS,
    }

    // Initial properties
    username = '';
    newPassword = '';
    confirmPassword = '';
    newPasswordShow = false;
    confirmPasswordShow = false;
    checkCompanyPolicy = false;
    codeOfConduct = false;
    marketingConsent = false;
    errors = ['', ''];
    confirmModal = false;
    firstname = '';
    lastname = '';
    usernameUniqueError = ''

    @wire(CurrentPageReference)
    urlDataHandler({ state }) {
        this.firstname = state.firstname;
        this.lastname = state.lastname;
    }

    @track comfirmModalConf = {
        title: USER_CREATED_MESSAGE,
        message: '',
        yesButton: {
            exposed: true,
            label: "OK",
            implementation: () => {
                this.navigateBack();
                this.modalOpen = false;
            }
        },
    }


    /**
     * Input handler - Handler for username input change
     *
     * @param {Object} event - The event received from HTML element 
     * @return {void}
    */
    usernameHandler(event) {
        this.username = event.target.value;
    }


    /**
     * Input handler - Handler for new password input change
     *
     * @param {Object} event - The event received from HTML element 
     * @return {void}
    */
    newPasswordHandler(event) {
        this.newPassword = event.target.value;
        this.checkPasswordRegex(event.target.value);
    }



    /**
     * Input handler - Handler for confirm password input change
     *
     * @param {Object} event - The event received from HTML element 
     * @return {void}
    */
    confirmPasswordHandler(event) {
        this.confirmPassword = event.target.value;
        this.checkPasswordMismatch(event.target.value);
    }



    /**
     * Input handler - Handler for company policy checkbox change
     *
     * @return {void}
    */
    checkCompanyPolicyHandler() {
        this.checkCompanyPolicy = !this.checkCompanyPolicy;
    }




    /**
     * Input handler - Handler for code of conduct checkbox change
     *
     * @return {void}
    */
    codeOfConductHandler() {
        this.codeOfConduct = !this.codeOfConduct;
    }


    /**
     * Input handler - Handler for marketing consent checkbox change
     *
     * @return {void}
    */
    marketingConsentHandler() {
        this.marketingConsent = !this.marketingConsent;
    }



    /**
     * Checking password strength - Validating password's strength
     *
     * @param {string} password
     * @return {void}
    */
    checkPasswordRegex(password) {
        // Checking for the password's strength through regex
        // - For Length more than 10
        // - For containing atleast one uppercase character 
        // - For containing atleast one special character 
        if (this.newPassword !== '') {
            this.errors[0] = !/^.{10,}$/.test(password) || !/[A-Z]/.test(password) || !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? this.label.ERROR_CRITERIA_NOT_MATCH : '';
        } else {
            this.errors[0] = this.label.ERROR_ENTER_THE_PASS;
        }

        // Checking for Password mismatch also on the go
        this.checkPasswordMismatch();
    }


    /**
     * Checking Password Mismatch - checking the Password match
     *
     * @return {void}
    */
    checkPasswordMismatch() {
        if (this.confirmPassword !== '') {
            if (this.newPassword !== this.confirmPassword) {
                this.errors[1] = this.label.ERROR_PASS_MISMATCH;
            } else {
                this.errors[1] = '';
            }
        }
    }


    /**
     * Password hide and Show
     *
     * @return {void}
    */
    toggleNewPassVisibility() {
        // Getting the password input field
        let newPassField = this.template.querySelector('.new-password ');

        // checking if the input type is password, if yes then changing it to text
        if (newPassField.type == 'password') {
            newPassField.type = 'text';

            // Setting the property this.newPasswordShow to true so that we can use it in the template to show the eye open svg
            this.newPasswordShow = true;
            // Or else changing it to password again
        } else {
            newPassField.type = 'password';
            // Setting the property this.newPasswordShow to false so that we can use it in the template to show the eye shut svg
            this.newPasswordShow = false;
        }
    }



    /**
     * Getter Method - Getter for confirm password error message
     *
     * @return {String} - Consfirm password error
    */
    get confirmPasswordError() {
        return this.errors[1] ? this.errors[1] : '';
    }

    /**
     * Getter Method - Getter for new password error message
     *
     * @return {String} - New password error
    */
    get newPasswordError() {
        return this.errors[0] ? this.errors[0] : '';
    }


    /**
     * Getter Method - Getter for CSS class of new password input field
     *
     * @return {String} - New password input css class
    */
    get newPasswordClass() {
        return this.errors[0] ? 'new-password error-input-field' : 'new-password';
    }


    /**
     * Getter Method - Getter for CSS class of confirm password input field
     *
     * @return {String} - Confirm password input css class
    */
    get confirmPasswordClass() {
        return this.errors[1] ? 'confirm-password error-input-field' : 'confirm-password';
    }

    /**
     * Getter Method - Getter for CSS class of new password label
     *
     * @return {String} - New password label font css class
    */
    get newPasswordLabelClass() {
        return this.errors[0] ? 'error-input-label' : '';
    }

    /**
     * Getter Method - Getter for CSS class of confirm password label
     *
     * @return {String} - Confirm password label font css class
    */
    get confirmPasswordLabelClass() {
        return this.errors[1] ? 'error-input-label' : '';
    }



    /**
     * Getter Method - Getter for button disable condition
     *
     * @return {Boolean} - Boolean to disable the button untill errors and empty input fields and checkboxes
    */
    get disableButton() {
        return this.errors[0] || this.errors[1] || !this.username || !this.newPassword || !this.confirmPassword || !this.checkCompanyPolicy || !this.codeOfConduct || !this.marketingConsent;
    }


    /**
     * Using a single Navigate function is more efficient, accepts source type and source name as parameters
     *
     * @param {String} type - The page destination type
     * @param {String} url_name - source name as parameter
     * @return {void}
    */
    navigateTo(type, url_name) {
        const pageReference = {
            type,
            attributes: {
                name: url_name
            }
        };
        this[NavigationMixin.Navigate](pageReference);
    }

    /**
     * Navigate to Sign up page
     *
     * @return {void}
    */
    navigateToSignUp() {
        this.navigateTo('comm__namedPage', 'CBSignUp__c')
    }

    /**
     * Navigate to Login page
     *
     * @return {void}
    */
    navigateBack() {
        this.navigateTo('comm__namedPage', 'Login')
    }

    /**
     * Submit method to validate the information provided and create an User
     *
     * @param {Object} event - The event received from HTML element 
     * @return {void}
    */
    submit(event) {
        // Prevent the default submit for Form element in HTML
        event.preventDefault();



        // User Object --> Salesforce Username, ClarienUsername
        // Apex class to check the uniqueness of the username from the User object.
        // If it is not unique, we provide an error, saying that 'Enter a unique Username, username already taken!'
        // this.usernameUniqueError = 'Enter a unique Username, username already taken!'
        // If it is unique, then we need to create the User having the username equal to  
        // Username + '@clarienbank.com'




        // Open the Confirmation Popup
        this.confirmModal = true;

    }


}